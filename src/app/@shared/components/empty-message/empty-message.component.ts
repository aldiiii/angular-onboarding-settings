import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-message',
  templateUrl: './empty-message.component.html',
  styleUrls: ['./empty-message.component.scss'],
})
export class EmptyMessageComponent {
  @Input() title = '';
  @Input() subTitle = '';
}
