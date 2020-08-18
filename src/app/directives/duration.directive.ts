import { Directive, Input, HostListener, ElementRef, OnInit, OnChanges, AfterViewInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { duration } from '@firestitch/date';

import { parse } from '../helpers/parse';


@Directive({
  selector: '[fsDuration]',
  host: {
    '(blur)' : 'blur()',
  },
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDurationDirective),
    multi: true
  }]
})
export class FsDurationDirective implements OnInit, AfterViewInit, ControlValueAccessor  {

  @Input() unit: 'seconds' | 'minutes' | 'hours' = 'minutes';
  @Input() inputUnit: 'seconds' | 'minutes' | 'hours' = 'hours';
  @Input() suffix = false;
  @Input() seconds = false;
  @Input() minutes = false;
  @Input() hours = false;
  @Input() days = false;
  @Input() months = false;
  @Input() years = false;

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

  public blur() {
    this._parseInput();
    this.format();
  }

  @HostListener('keydown', ['$event'])
  public keydown(event: KeyboardEvent) {
    if (['Enter', 'Backspace'].indexOf(event.code) !== -1) {
      this.blur();
    }
  }

  public ngOnInit() {
    if (!this.seconds && !this.minutes && !this.hours && !this.days && !this.months && !this.years) {
      this.minutes = true;
      this.hours = true;
    }
  }

  public writeValue(value: any) {
    this._model = value;
    this.format();
  }

  public ngAfterViewInit() {
    this.format();
  }

  public format() {
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

    if (this.inputUnit && !!Number(model)) {
      model += this.inputUnit.charAt(0);
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

    } catch (e) { }

    this.format();
  }

  private _change(value) {
    this._model = value;
    this._onChange(value);
  }
}
