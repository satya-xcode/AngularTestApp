import { Component } from '@angular/core';
import { CustomerCard } from '../../components/cardpage/CustomerCard';
import { CardTitle, CardBody } from '../../components/cardpage/CardElements';
import { SimpleCustomCard } from '../../components/cardpage/SimpleCustomCard';

@Component({
  selector: 'ComponentProjectings',
  imports: [CustomerCard,CardTitle,  CardBody, SimpleCustomCard],
  template: `
    <div>
      <h3>Component Projectings</h3>
      <CustomerCard>
        <card-title>Hello</card-title>
        
  <!-- h3 is not "card-title", but we can alias it -->
        <h3 ngProjectAs="card-title">Hello H3</h3>

        <card-body>Welcome to the example</card-body>
        <h1>hi anything else</h1>
      </CustomerCard>

      <SimpleCustomCard>
        <h4>Alert Using Simple Slot</h4>
        <strong>Warning!</strong> Something went wrong. using
      </SimpleCustomCard>
    </div>
  `,
})
export class ComponentProjectings {}
