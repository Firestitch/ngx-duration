import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FsDurationDirective } from '../../../../src/app/directives/duration.directive';
import { FsFormModule } from '@firestitch/form';

@Component({
    selector: 'duration-example',
    templateUrl: './duration-example.component.html',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        FsDurationDirective,
        FsFormModule,
    ],
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
