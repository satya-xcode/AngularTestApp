// card.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
  <h2>Hi, {{ title() }}</h2>
  <p>
    <ng-content></ng-content>
  </p>
  `,
})
export class CardComponent {
  title = input('Default', { alias: 'cardTitle' });
}
