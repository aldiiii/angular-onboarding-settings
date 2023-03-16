import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent {
  @Input() field: any;
  formName: FormGroup;

  constructor(formgroupDirective: FormGroupDirective) {
    this.formName = formgroupDirective.control;
  }
}
