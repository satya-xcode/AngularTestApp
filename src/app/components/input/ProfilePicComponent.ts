// profile-pic.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  standalone: true,
  template: `<img [src]="src()" alt="Profile picture" />`,
})
export class ProfilePicComponent {
  src = input.required<string>();
}
