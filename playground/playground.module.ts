import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { AppMaterialModule } from './app/material.module';
import { FsExamplesComponent } from '../tools/components/examples/examples.component';
import { FsComponentModule } from '../src';

import { AppComponent } from './app/app.component';
import { DurationExampleComponent } from './app/components/duration-example/duration-example.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    FsExampleModule,
    AppMaterialModule,

    FsComponentModule,
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FsExamplesComponent,

    DurationExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
