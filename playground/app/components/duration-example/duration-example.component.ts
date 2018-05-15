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

}
