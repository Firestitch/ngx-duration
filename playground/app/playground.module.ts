import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsDurationModule } from '@firestitch/duration';
import { FsMessageModule } from '@firestitch/message';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { DurationExampleComponent } from './components/duration-example/duration-example.component';
import {
  ConfigurableDurationExampleComponent,
} from './components/configurable-duration-example/configurable-duration-example.component';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    FsDurationModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    DurationExampleComponent,
    ConfigurableDurationExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
