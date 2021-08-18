import { Directive, Input, ElementRef, OnInit, AfterViewInit, forwardRef, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { duration } from '@firestitch/date';
import { fromEvent, Subject } from 'rxjs';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';

import { parse } from '../helpers/parse';

@Directive({
  selector: '[fsDuration]',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDurationDirective),
    multi: true
  }]
})
export class FsDurationDirective implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {

  @Input() unit: 'seconds' | 'minutes' | 'hours' = 'minutes';
  @Input() inputUnit: 'seconds' | 'minutes' | 'hours' = 'hours';
  @Input() suffix = false;
  @Input() seconds = false;
  @Input() minutes = false;
  @Input() hours = false;
  @Input() days = false;
  @Input() months = false;
  @Input() years = false;

  private _destroy$ = new Subject();

  public _onTouched = () => {};
  public _onChange = (value: any) => {};

  private _model;

  constructor(private _el: ElementRef) {}

  public registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn
  }

  public registerOnTouched(fn: () => any): void {
    this._onTouched = fn
  }

  public ngOnChanges(changes): void {
    const changed = Object.keys(changes).map(key => changes[key]).some((change: SimpleChange) => {
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

    fromEvent(this._el.nativeElement, 'keydown')
      .pipe(
        tap(() => {
          this._onTouched();
        }),
        filter((event: KeyboardEvent) => {
          return event.key === 'Enter';
        }),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._parseInput();
      });

    fromEvent(this._el.nativeElement, 'blur')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._parseInput();
      });

    fromEvent(this._el.nativeElement, 'focus')
      .pipe(
        delay(50),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._el.nativeElement.select();
      });

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
        years: this.years
      });
    }

    this._el.nativeElement.value = value;
  }

  private _parseInput() {

    let model = this._el.nativeElement.value;

    if (!model.length) {
      return this._change(null);
    }

    if (this.inputUnit && !isNaN(parseFloat(model))) {
      model = parseFloat(model) + this.inputUnit.charAt(0);
    }

    try {

      if (!Number(model)) {
        model = parse(model);
        if (this.unit === 'minutes') {
          model = model / 60;
        } else if (this.unit === 'hours') {
          model = model / 60 / 60;
        }
      }

      this._change(Math.round(model));

    } catch (e) {}

    this._format();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _change(value) {
    this._model = value;
    this._onChange(value);
  }
}
