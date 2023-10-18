import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsDurationModule } from '@firestitch/duration';
import { FsMessageModule } from '@firestitch/message';
import { FsFormModule } from '@firestitch/form';
import { FsPromptModule } from '@firestitch/prompt';
import { FsAutocompleteModule } from '@firestitch/autocomplete';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsDialogModule } from '@firestitch/dialog';

import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsApiModule } from '@firestitch/api';

import { AppMaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { DurationExampleComponent } from './components/duration-example/duration-example.component';
import { ConfigurableDurationExampleComponent } from './components/configurable-duration-example/configurable-duration-example.component';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    FsDurationModule,
    FsPromptModule,
    FsAutocompleteModule,
    FsFormModule.forRoot(),
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
