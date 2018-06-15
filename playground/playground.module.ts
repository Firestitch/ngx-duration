import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { AppMaterialModule } from './app/material.module';
import { FsDurationModule } from '../src';

import { AppComponent } from './app/app.component';
import { DurationExampleComponent } from './app/components/duration-example/duration-example.component';
import { ConfigurableDurationExampleComponent } from './app/components/configurable-duration-example/configurable-duration-example.component';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsExampleModule,
    AppMaterialModule,
    FsDurationModule,
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
