import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { randomString } from 'src/app/@core/helpers';
import { CategorySectionList } from '../../models';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent {
  @Input() isVisible = false;
  @Input() dataEditable: any;

  @Output() onSave = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  categories = CategorySectionList;
  selectedSection = 'personal_information_id';

  onboardingProcessForm = new FormGroup({
    id: new FormControl('', Validators.required),
    processName: new FormControl('', Validators.required),
    sections: new FormArray<any>([]),
  });

  constructor() {
    this.categories.forEach((section) => {
      const sectionsForm = new FormGroup({
        tasks: new FormArray<any>([]),
      });

      section.tasks.forEach((task) => {
        const tasksForm = new FormGroup({
          id: new FormControl(task.id),
          sectionId: new FormControl(task.categoryId),
          isActive: new FormControl(false),
          editor: new FormControl('', Validators.required),
          dynamic: new FormArray([]),
        });

        sectionsForm.controls.tasks.push(tasksForm);
      });

      this.sections.push(sectionsForm);
    });
  }

  onShow() {
    this.onboardingProcessForm.patchValue(this.dataEditable);
  }

  get form() {
    return this.onboardingProcessForm.controls;
  }

  get sections() {
    return this.onboardingProcessForm.get('sections') as FormArray;
  }

  getTasks(section: any) {
    return section.get('tasks') as FormArray;
  }

  getDynamics(task: any) {
    return task.get('dynamic') as FormArray;
  }

  addSection() {
    for (const category of this.categories) {
      const taskForm = new FormArray([]);

      const sectionForm = new FormGroup({
        [category.id]: new FormControl([
          { id: category.id, label: category.label, tasks: taskForm },
        ]),
      });
      this.sections.push(sectionForm);
      console.log(this.onboardingProcessForm.value);
    }
  }

  sectionOnClick(event: any) {
    this.selectedSection = event.value.id;
  }

  onHide() {
    this.onboardingProcessForm.reset();
    this.onClose.emit();
  }

  addFields(section: number, task: number) {
    const tasks = this.sections.controls[section].get('tasks') as FormArray;
    const dynamics = tasks.controls[task].get('dynamic') as FormArray;
    dynamics.push(this.createDynamic());
    return false;
  }

  createDynamic() {
    return new FormGroup({
      fieldName: new FormControl(randomString()),
      label: new FormControl(''),
      type: new FormControl('text'),
      value: new FormControl('', Validators.required),
    });
  }

  removeCustomField(indexDynamic: number, section: number, task: number) {
    const tasks = this.sections.controls[section].get('tasks') as FormArray;
    const dynamics = tasks.controls[task].get('dynamic') as FormArray;
    dynamics.removeAt(indexDynamic);
  }

  onSubmit() {
    if (this.onboardingProcessForm.invalid) return;

    if (this.dataEditable === undefined) {
      this.form.id.setValue(randomString());
    }
    this.onSave.emit(this.onboardingProcessForm.value);
  }
}
