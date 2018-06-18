import { Component } from '@angular/core';

@Component({
  selector: 'configurable-duration-example',
  templateUrl: 'configurable-duration-example.component.html'
})
export class ConfigurableDurationExampleComponent {

  public unit = 'minutes';
  public inputUnit = 'hours';
  public suffix = false;
  public seconds = false;
  public minutes = true;
  public hours = true;
  public days = false;
  public months = false;
  public years = false;

  public model = 0;

  public units = {
    seconds: 'Seconds',
    minutes: 'Minutes',
    hours: 'Hours'
  }

  constructor() {}

  unitChange(value) {
    this.unit = value;
  }
}
