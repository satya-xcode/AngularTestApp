import { Component } from '@angular/core';

@Component({
  selector: 'CustomerCard',
  template: `
    <div class="card-shadow1 mb-3">
      <ng-content select="card-title">Default Title</ng-content>  <!-- If no use of this slot then default title will display in use of CustomerCard -->
      <div class="card-divider"></div>
      <ng-content select="card-body"></ng-content>

      <ng-content></ng-content>  <!-- Capture all unmatched elements : anything else -->
    </div>
  `,
  styles: [`
    .card-shadow1 { border: 1px solid #ccc; border-radius: 8px; padding: 1rem; }
    .card-divider { border-top: 1px solid #eee; margin: .5rem 0; }
  `]
})
export class CustomerCard { }



// 👉 Notice:

// <ng-content select="card-title"></ng-content> picks up <card-title> children.

// <ng-content select="card-body"></ng-content> picks up <card-body> children.