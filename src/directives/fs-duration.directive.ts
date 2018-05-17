import { Directive, Input, OnInit, Output, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { duration } from '@firestitch/date';
import { parse } from '../helpers';


@Directive({
  providers: [NgModel],
  selector: '[fsDuration]',
  host: {
    '(blur)' : 'blur()',
    '(focus)' : 'focus()',
    '(keyup)' : 'keyup($event)'
  }
})
export class FsDurationDirective implements OnInit, AfterContentInit {

  @Input() ngModel: any;
  @Input() unit: 'seconds' | 'minutes' | 'hours' = 'minutes';
  @Input() suffix = false;
  @Input() seconds = false;
  @Input() minutes = false;
  @Input() hours = false;
  @Input() days = false;
  @Input() months = false;
  @Input() years = false;

  focused = false;

  constructor(private model: NgModel) {}

  public focus() {
    this.focused = true;
  }

  public blur() {
    this.focused = false;
    this.changeValue();
  }

  public keyup(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.changeValue();
    }
  }

  public ngOnInit() {
    if (!this.seconds && !this.minutes && !this.hours && !this.days && !this.months && !this.years) {
      this.minutes = true;
      this.hours = true;
    }
  }

  public ngAfterContentInit() {
    this.model.valueChanges.subscribe(value => {
      if (!this.focused) {
        this.changeValue();
      }
    });
  }

  public formatInput() {
    const dur = duration(Number(this.ngModel), {
      unit: this.unit,
      suffix: this.suffix,
      seconds: this.seconds,
      minutes: this.minutes,
      hours: this.hours,
      days: this.days,
      months: this.months,
      years: this.years
    });
    this.model.valueAccessor.writeValue(dur);
  }

  private changeValue() {

    try {

      if (!Number(this.ngModel)) {
        this.ngModel = parse(this.ngModel);
        if (this.unit === 'minutes') {
          this.ngModel = this.ngModel / 60;
        } else if (this.unit === 'hours') {
          this.ngModel = this.ngModel / 60 / 60;
        }
      }

      this.ngModel = Math.round(this.ngModel);

    } catch (e) {
      this.ngModel = 0;
    }

    this.formatInput();
  }
}
