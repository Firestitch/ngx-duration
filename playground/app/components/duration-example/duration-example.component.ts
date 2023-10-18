import { Component } from '@angular/core';

@Component({
  selector: 'duration-example',
  templateUrl: './duration-example.component.html',
})
export class DurationExampleComponent {

  public durations = {
    seconds: 2,
    hourMinute: 1234,
    dayHour: 12345,
    monthDay: 123456,
    suffixDayHour: 12345,
    suffixDay: 172800,
    full: 194013300,
  };

}
