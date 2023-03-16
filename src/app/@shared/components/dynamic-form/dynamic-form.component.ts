import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomField } from '../../models';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() customFields: CustomField[] = [];

  dynamicFormGroup!: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  addField(): void {
    const customField = {
      fieldName: this.randomString(),
      type: 'text',
      value: '',
      label: '',
      rules: {
        required: true,
      },
    };
    this.customFields.push(customField);
    this.buildForm();
  }

  removeField(field: CustomField): void {
    this.customFields.splice(this.customFields.indexOf(field), 1);
    this.buildForm();
  }

  private buildForm() {
    const formGroupFields = this.getFormControlsFields();
    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }

  private getFormControlsFields() {
    const formGroupFields: { [key: string]: any } = {};
    for (const field of this.customFields) {
      const validators = this.addValidator(field.rules);
      formGroupFields[field.fieldName] = new FormControl(
        field.value,
        validators
      );
      // this.customFields.push(field);
    }
    return formGroupFields;
  }

  private addValidator(rules: any) {
    if (!rules) {
      return [];
    }

    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case 'required':
          return Validators.required;
        //add more case for future.
        default:
          return Validators.nullValidator;
      }
    });
    return validators;
  }

  private randomString(length = 6) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
}
