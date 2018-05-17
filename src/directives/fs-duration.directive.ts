import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { duration, parse } from '@firestitch/date'


@Directive({
  selector: '[fsDuration]'
})
export class FsDurationDirective implements OnInit, OnDestroy {

  private _model: number;

  @Input()
  get data() {
    return this._model;
  };
  @Output() dataChange = new EventEmitter();

  set data(val: number) {
    this._model = val;
    this.dataChange.emit(this._model);
  }

  // Options
  @Input() unit: 'seconds' | 'minutes' | 'hours' = 'minutes';
  @Input() suffix = false;
  @Input() seconds = false;
  @Input() minutes = false;
  @Input() hours = false;
  @Input() days = false;
  @Input() months = false;
  @Input() years = false;

  constructor(private _el: ElementRef) {}

  public ngOnInit() {
    if (!this.seconds && !this.minutes && !this.hours && !this.days && !this.months && !this.years) {
      this.minutes = true;
      this.hours = true;
    }

    this._el.nativeElement.value = this.data;

    this.changeValue();
  }

  public ngOnDestroy() {}

  @HostListener('keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.changeValue();
    }
  }

  @HostListener('blur', ['$event'])
  blurEvent() {
    this.changeValue();
  }

  private changeValue() {
    if (!this._el.nativeElement.value || this._el.nativeElement.value == 0) {
      this.data = 0;
      return;
    }

    let value = this._el.nativeElement.value;

    if (Number(value)) {
      value = Number(value);
      this.data = Math.round(value);
      this._el.nativeElement.value = duration(this.data, {
        unit: this.unit,
        suffix: this.suffix,
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
        days: this.days,
        months: this.months,
        years: this.years
      });
    } else {
      let parsedResult;
      parse(value).subscribe((result: any) => {
        parsedResult = result;
      });

      if (parsedResult && parsedResult.error || !parsedResult.time) {
        this._el.nativeElement.value = 'Incorrect Input Value';
        this.data = 0;
      } else {
        this._el.nativeElement.value = duration(parsedResult.time, {
          unit: 'seconds',
          suffix: this.suffix,
          seconds: this.seconds,
          minutes: this.minutes,
          hours: this.hours,
          days: this.days,
          months: this.months,
          years: this.years
        });

        let time = parsedResult.time;

        if (this.unit === 'minutes') {
          time = time / 60;
        } else if (this.unit === 'hours') {
          time = time / 60 / 60;
        }
        this.data = Math.round(time);
      }
    }
  }
}
