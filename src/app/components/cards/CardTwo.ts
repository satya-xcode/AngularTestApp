import { Component } from "@angular/core";

@Component({
    selector: 'card-title',
    template: `<ng-content>

        card-title
        
        </ng-content>`,
})
export class CardTitle { }

@Component({
    selector: 'card-body',
    template: `<ng-content>card-body</ng-content>`,
})
export class CardBody { }



@Component({
    selector: 'custom-card-panel',
    template: `
  <div class="card-shadow">
    <ng-content select="card-title"></ng-content>
    <div class="card-divider"></div>
    <ng-content select="card-body"></ng-content>
  </div>
  `,
})
export class CustomCardPanel { }