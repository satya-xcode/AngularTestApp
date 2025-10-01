// button.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button [disabled]="disabled()">{{ label() }}</button>`,
})
export class ButtonComponent {
  label = input('Click me');
  disabled = input(false);
}
