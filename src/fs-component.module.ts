import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsDurationDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsDurationDirective
  ],
  entryComponents: [
  ],
  declarations: [
    FsDurationDirective
  ],
  providers: [
  ],
})
export class FsComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsComponentModule,
      providers: []
    };
  }
}
