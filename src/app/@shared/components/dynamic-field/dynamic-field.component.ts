import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicInputComponent } from './dynamic-input/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-select/dynamic-select.component';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss'],
})
export class DynamicFieldComponent implements AfterViewInit {
  supportedDynamicComponents = [
    {
      name: 'text',
      component: DynamicInputComponent,
    },
    {
      name: 'number',
      component: DynamicInputComponent,
    },
    {
      name: 'date',
      component: DynamicInputComponent,
    },
    {
      name: 'select',
      component: DynamicSelectComponent,
    },
  ];

  @ViewChild('dynamicInputContainer', { read: ViewContainerRef })
  dynamicInputContainer!: ViewContainerRef;
  @Input() field: any;
  formName: FormGroup | undefined;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.registerDynamicField();
  }

  getComponentByType(type: string): any {
    let componentDynamic = this.supportedDynamicComponents.find(
      (component) => component.name === type
    );

    return componentDynamic!.component || DynamicInputComponent;
  }

  private registerDynamicField() {
    this.dynamicInputContainer.clear();
    const componentInstance = this.getComponentByType(this.field.type);
    const dynamicComponent =
      this.dynamicInputContainer.createComponent(componentInstance);
    dynamicComponent.setInput('field', this.field);
    console.log(this.field);
    this.changeDetector.detectChanges();
  }
}
