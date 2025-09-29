import { Component } from '@angular/core';
import { SummaryCard } from "../../components/summary-card/summary-card";
import { CustomCard } from '../../components/cards/CustomCard';
import { CardBody, CardTitle, CustomCardPanel } from '../../components/cards/CardTwo';

@Component({
  selector: 'app-dashboard',
  imports: [SummaryCard, CustomCard, CustomCardPanel, CardTitle, CardBody],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  customerData = { title: 'Total Customers', value: '1,234', bgColor: 'bg-primary' };
  bookingData = { title: 'Total Bookings', value: '568', bgColor: 'bg-success' };
  vehicleData = { title: 'Total Vehicles', value: '89', bgColor: 'bg-info' };
}
