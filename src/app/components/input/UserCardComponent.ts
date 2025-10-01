// user-card.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `<h3>{{ name() }}</h3><p>{{ age() }} years old</p>`,
})
export class UserCardComponent {
  name = input.required<string>();
  age = input(0);
}
