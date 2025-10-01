// banner.component.ts
import { Component, input } from '@angular/core';
import { booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  template: `
    @if (isVisible()) {
      <div class="alert alert-success">Welcome Banner! {{title()}}</div>
    }
  `,
})
export class BannerComponent {
  title = input()
  isVisible = input(false);
}
