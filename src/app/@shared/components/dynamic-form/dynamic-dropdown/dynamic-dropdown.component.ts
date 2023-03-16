import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-dropdown',
  templateUrl: './dynamic-dropdown.component.html',
  styleUrls: ['./dynamic-dropdown.component.scss'],
})
export class DynamicDropdownComponent {
  @Input() fieldType: string = '';
  @Output() onChanged: EventEmitter<any> = new EventEmitter();

  onChange(event: any) {
    this.onChanged.emit(event.value);
  }
}
