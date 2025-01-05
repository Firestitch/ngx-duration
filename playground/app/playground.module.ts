import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FsApiModule } from '@firestitch/api';
import { FsAutocompleteModule } from '@firestitch/autocomplete';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsDialogModule } from '@firestitch/dialog';
import { FsDurationModule } from '@firestitch/duration';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsPromptModule } from '@firestitch/prompt';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConfigurableDurationExampleComponent } from './components/configurable-duration-example/configurable-duration-example.component';
import { DurationExampleComponent } from './components/duration-example/duration-example.component';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    FsDurationModule,
    FsPromptModule,
    FsAutocompleteModule,
    FsFormModule.forRoot(),
    RouterModule.forRoot([]),
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsSkeletonModule,
    FsDialogModule.forRoot(),
    FsDatePickerModule.forRoot(),
    FsCheckboxGroupModule,
    FsRadioGroupModule,
    FsApiModule,
    FsAutocompleteChipsModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    DurationExampleComponent,
    ConfigurableDurationExampleComponent,
  ],
})
export class PlaygroundModule {
}
