import { Component } from "@angular/core";

@Component({
    selector: 'SimpleCustomCard',
    template: `
   <div class="alert alert-warning">
       <ng-content/>   
    </div>
    `
})
export class SimpleCustomCard {/* ... */ }






