import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { duration } from '@firestitch/date'


@Directive({
  selector: '[fsDuration]'
})
export class FsDurationDirective implements OnInit, OnDestroy {

  @Input() ngModel: any;

  // Options
  @Input() unit: 'seconds' | 'minutes' | 'hours' = 'minutes';
  @Input() suffix = false;
  @Input() seconds = false;
  @Input() minutes = false;
  @Input() hours = false;
  @Input() days = false;
  @Input() months = false;
  @Input() years = false;

  // Others
  @Output() fsChange: EventEmitter<any> = new EventEmitter<any>(true);

  constructor() {}

  public ngOnInit() {
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
    if (this.ngModel) {
      if (Number(this.ngModel)) {
        this.ngModel = Number(this.ngModel);
      }
      const formatted = duration(this.ngModel, {
        unit: this.unit,
        suffix: this.suffix,
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
        days: this.days,
        months: this.months,
        years: this.years
      });

      if (formatted !== this.ngModel) {
        this.fsChange.emit({oldValue: this.ngModel, newValue: formatted});
      }
    }
  }
}
