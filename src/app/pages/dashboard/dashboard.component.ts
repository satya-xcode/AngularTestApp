import { Component } from '@angular/core';
import { SummaryCard } from "../../components/summary-card/summary-card";
import { SimpleCustomCard } from '../../components/cardpage/SimpleCustomCard';
@Component({
  selector: 'app-dashboard',
  imports: [SummaryCard, SimpleCustomCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  customerData = { title: 'Total Customers', value: '1,234', bgColor: 'bg-primary' };
  bookingData = { title: 'Total Bookings', value: '568', bgColor: 'bg-success' };
  vehicleData = { title: 'Total Vehicles', value: '89', bgColor: 'bg-info' };
}
