import { Component } from "@angular/core";

@Component({
    selector: 'card-title',
    standalone: true,
    template: `<ng-content></ng-content>`
})
export class CardTitle { }

@Component({
    selector: 'card-body',
    standalone: true,
    template: `<ng-content></ng-content>`
})
export class CardBody { }


// 👉 These are just wrappers. They don’t render extra markup (other than what you put inside), but Angular uses them as selectors for projection.