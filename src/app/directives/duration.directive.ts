import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { duration } from '@firestitch/date';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, delay, takeUntil, tap } from 'rxjs/operators';

import { cleanupInput } from '../helpers/cleanup-input';
import { parse } from '../helpers/parse';
import { DurationUnit } from '../types/duration-unit';

@Directive({
  selector: '[fsDuration]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDurationDirective),
    multi: true,
  }],
})
export class FsDurationDirective 
implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {

  @Input() public unit: DurationUnit = 'minutes';
  @Input() public inputUnit: DurationUnit = 'hours';
  @Input() public suffix = false;
  @Input() public seconds = false;
  @Input() public minutes = false;
  @Input() public hours = false;
  @Input() public days = false;
  @Input() public months = false;
  @Input() public years = false;

  public _onTouched: () => void;
  public _onChange: (value: any) => void;

  private _destroy$ = new Subject();

  private _model;

  constructor(
    private _el: ElementRef,
    private _ngZone: NgZone,
  ) {}

  public registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  public ngOnChanges(changes): void {
    const changed = Object.keys(changes).map((key) => changes[key]).some((change: SimpleChange) => {
      return !change.firstChange;
    });

    if (changed) {
      this._format();
    }
  }

  public ngOnInit() {
    if (!this.seconds && !this.minutes && !this.hours && !this.days && !this.months && !this.years) {
      this.minutes = true;
      this.hours = true;
    }

    this._listenKeyDown();
    this._listenFocus();
    this._listenBlur();
  }

  public writeValue(value: any) {
    this._model = value;
    this._format();
  }

  public ngAfterViewInit() {
    this._format();
  }

  private _format() {
    let value = '';

    if (this._model !== null && this._model !== undefined) {
      value = duration(Number(this._model), {
        unit: this.unit,
        suffix: this.suffix,
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
        days: this.days,
        months: this.months,
        years: this.years,
      });
    }

    this._el.nativeElement.value = value;
  }

  private _parseInput() {

    let model = cleanupInput(this._el.nativeElement.value);

    if (!model.length) {
      const parsedValue = parseFloat(this._el.nativeElement.value);

      if (isNaN(parsedValue)) {
        return this._change(null);
      }

      model = parsedValue.toString();
    }

    try {
      let result = parse(model, this.inputUnit);

      switch (this.unit) {
        case 'minutes': {
          result = result / 60;
      
          break;
        }
        case 'hours': {
          result = result / 60 / 60;
      
          break;
        }
        case 'days': {
          result = result / 60 / 60 / 24;
      
          break;
        }
      // No default
      }

      this._change(Math.round(result));

    } catch (e) {}
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _change(value) {
    this._model = value;
    this._onChange(value);
  }

  private _listenKeyDown(): void {
    this._ngZone.runOutsideAngular(() => {
      fromEvent(this._el.nativeElement, 'keydown')
        .pipe(
          debounceTime(200),
          tap(() => {
            this._onTouched();
          }),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this._ngZone.run(() => {
            this._parseInput();
          });
        });
    });
  }

  private _listenFocus(): void {
    fromEvent(this._el.nativeElement, 'focus')
      .pipe(
        delay(50),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._el.nativeElement.select();
      });
  }

  private _listenBlur(): void {
    fromEvent(this._el.nativeElement, 'blur')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._parseInput();

        this._format();
      });
  }
}
