import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { ConfigurableDurationExampleComponent } from './components/configurable-duration-example/configurable-duration-example.component';
import { DurationExampleComponent } from './components/duration-example/duration-example.component';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [FsExampleModule, ConfigurableDurationExampleComponent, DurationExampleComponent]
})
export class AppComponent {
  public config = environment;
}
