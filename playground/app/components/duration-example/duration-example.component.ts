import { Component } from '@angular/core';

@Component({
  selector: 'duration-example',
  templateUrl: 'duration-example.component.html'
})
export class DurationExampleComponent {

  public durations = {
    seconds: 2,
    secondsOld: 2,

    hourMinute: 1234,
    hourMinuteOld: 1234,

    dayHour: 12345,
    dayHourOld: 12345,

    monthDay: 123456,
    monthDayOld: 12345,

    suffixDayHour: 12345,
    suffixDayHourOld: 12345,

    suffixDay: 172800,
    suffixDayOld: 172800,

    full: 194013300,
    fullOld: 194013300
  };

  constructor() {}

  public changeSeconds(event) {
    console.log('changeSeconds', event);
    this.durations.seconds = event.newValue;
    this.durations.secondsOld = event.oldValue;
  }

  public changeHourMinute(event) {
    console.log('changeHourMinute', event);
    this.durations.hourMinute = event.newValue;
    this.durations.hourMinuteOld = event.oldValue;
  }

  public changeDayHour(event) {
    console.log('changeDayHour', event);
    this.durations.dayHour = event.newValue;
    this.durations.dayHourOld = event.oldValue;
  }

  public changeMonthDay(event) {
    console.log('changeMonthDay', event);
    this.durations.monthDay = event.newValue;
    this.durations.monthDayOld = event.oldValue;
  }

  public changeSuffixDayHour(event) {
    console.log('changeSuffixDayHour', event);
    this.durations.suffixDayHour = event.newValue;
    this.durations.suffixDayHourOld = event.oldValue;
  }

  public changeSuffixDay(event) {
    console.log('changeSuffixDay', event);
    this.durations.suffixDay = event.newValue;
    this.durations.suffixDayOld = event.oldValue;
  }

  public changeFull(event) {
    console.log('changeFull', event);
    this.durations.full = event.newValue;
    this.durations.fullOld = event.oldValue;
  }

}
