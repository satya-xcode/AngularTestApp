// box.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-box',
  standalone: true,
  template: `<div [style.background]="bgColor()" [style.padding.px]="padding()">
               <ng-content></ng-content>
             </div>`,
})
export class BoxComponent {
  bgColor = input('lightgray');
  padding = input(10);
}
