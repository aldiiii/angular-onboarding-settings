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
    id: new FormControl(''),
    processName: new FormControl('', Validators.required),
    sections: new FormArray<any>([]),
  });

  constructor() {
    this.buildForm();
  }

  // =======public methods============

  get form() {
    return this.onboardingProcessForm.controls;
  }

  get sections(): FormArray<any> {
    return this.onboardingProcessForm.get('sections') as FormArray;
  }

  get isEditable(): boolean {
    return this.dataEditable !== undefined;
  }

  // =======public methods============

  onShow(): void {
    // auto trigger first section
    let element: HTMLElement = document.getElementById(
      'category-0'
    ) as HTMLElement;
    element.click();
    this.onboardingProcessForm.patchValue(this.dataEditable);
  }

  getTasks(section: any): FormArray<any> {
    return section.get('tasks') as FormArray;
  }

  getDynamics(task: any): FormArray<any> {
    return task.get('dynamic') as FormArray;
  }

  addSection(): void {
    for (const category of this.categories) {
      const taskForm = new FormArray([]);

      const sectionForm = new FormGroup({
        [category.id]: new FormControl([
          { id: category.id, label: category.label, tasks: taskForm },
        ]),
      });
      this.sections.push(sectionForm);
    }
  }

  sectionOnClick(event: any): void {
    this.selectedSection = event.value.id;
  }

  onHide(): void {
    this.onboardingProcessForm.reset();
    this.onClose.emit();
  }

  addFields(section: number, task: number): boolean {
    const tasks = this.sections.controls[section].get('tasks') as FormArray;
    const dynamics = tasks.controls[task].get('dynamic') as FormArray;
    dynamics.push(this.createDynamic());
    return false;
  }

  removeCustomField(indexDynamic: number, section: number, task: number): void {
    const tasks = this.sections.controls[section].get('tasks') as FormArray;
    const dynamics = tasks.controls[task].get('dynamic') as FormArray;
    dynamics.removeAt(indexDynamic);
  }

  countTask(data: FormArray): number {
    const currentSection = this.filterTask(data);
    const Taskslength = currentSection.filter(
      (section) => section.isEnabled
    ).length;
    return Taskslength;
  }

  isTaskNotEmpty(data: FormArray): boolean {
    const currentSection = this.filterTask(data);
    // tests whether at least one element in the array passes then will return true
    return currentSection.some((section) => section.isEnabled == true);
  }

  onSubmit(): void {
    if (this.onboardingProcessForm.invalid) return;

    if (!this.isEditable) {
      this.form.id.setValue(randomString());
    }
    this.onSave.emit(this.onboardingProcessForm.value);
  }

  // =======private methods============

  private buildForm(): void {
    this.categories.forEach((section) => {
      const sectionsForm = new FormGroup({
        tasks: new FormArray<any>([]),
      });
      section.tasks.forEach((task) => {
        const tasksForm = new FormGroup({
          id: new FormControl(task.id),
          sectionId: new FormControl(task.categoryId),
          isEnabled: new FormControl(false),
          editor: new FormControl('', Validators.required),
          dynamic: new FormArray([]),
        });
        sectionsForm.controls.tasks.push(tasksForm);
      });
      this.sections.push(sectionsForm);
    });
  }

  private createDynamic() {
    return new FormGroup({
      fieldName: new FormControl(randomString()),
      label: new FormControl(''),
      type: new FormControl('text'),
      value: new FormControl('', Validators.required),
    });
  }

  private filterTask(data: FormArray): any[] {
    const tasks = data.value as Array<any>;
    const currentSection = tasks.filter(
      (section) => section.sectionId == this.selectedSection
    );
    return currentSection;
  }
}
