import { Component, ViewChild } from '@angular/core';

import { FsDurationDirective } from '@firestitch/duration';

import { of } from 'rxjs';


@Component({
  selector: 'configurable-duration-example',
  templateUrl: 'configurable-duration-example.component.html'
})
export class ConfigurableDurationExampleComponent {

  @ViewChild(FsDurationDirective) duration: FsDurationDirective;

  public unit: any = 'minutes';
  public inputUnit: any = 'hours';
  public suffix = false;
  public seconds = false;
  public minutes = true;
  public hours = true;
  public days = false;
  public months = false;
  public years = false;

  public model;

  public units = {
    seconds: 'Seconds',
    minutes: 'Minutes',
    hours: 'Hours'
  }

  constructor() {}

  public unitChange() {
    this.duration.unit = this.unit;
    this.duration.format();
  }

  public inputUnitChange() {
    this.duration.inputUnit = this.inputUnit;
    this.duration.format();
  }

  public change() {
    this.duration.format();
  }

  public save = () => {
    console.log('Submitted');
    return of(true);
  }

}
