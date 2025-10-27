import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsPromptModule } from '@firestitch/prompt';
import { FsAutocompleteModule } from '@firestitch/autocomplete';
import { FsFormModule } from '@firestitch/form';
import { provideRouter } from '@angular/router';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsDialogModule } from '@firestitch/dialog';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsApiModule } from '@firestitch/api';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsPromptModule, FsAutocompleteModule, FsFormModule.forRoot(), FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsSkeletonModule, FsDialogModule.forRoot(), FsDatePickerModule.forRoot(), FsCheckboxGroupModule, FsRadioGroupModule, FsApiModule, FsAutocompleteChipsModule.forRoot()),
        provideAnimations(),
        provideRouter([]),
    ]
})
  .catch(err => console.error(err));

