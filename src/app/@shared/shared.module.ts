import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitterModule } from 'primeng/splitter';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import { DynamicInputComponent } from './components/dynamic-field/dynamic-input/dynamic-input.component';
import { DynamicSelectComponent } from './components/dynamic-field/dynamic-select/dynamic-select.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { CommonModule } from '@angular/common';
import { DynamicDropdownComponent } from './components/dynamic-form/dynamic-dropdown/dynamic-dropdown.component';

@NgModule({
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    SplitterModule,
    ListboxModule,
    CheckboxModule,
    AccordionModule,
    EditorModule,
    DropdownModule,
  ],
  exports: [
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    SplitterModule,
    ListboxModule,
    CheckboxModule,
    AccordionModule,
    EditorModule,
    DropdownModule,
    DynamicFormComponent,
    DynamicFieldComponent,
    DynamicDropdownComponent,
  ],
  declarations: [
    DynamicFieldComponent,
    DynamicInputComponent,
    DynamicSelectComponent,
    DynamicFormComponent,
    DynamicDropdownComponent,
  ],
})
export class SharedModule {}
