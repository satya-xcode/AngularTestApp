import { inject, OnInit } from '@angular/core';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../models/car';
import { BookingService } from '../../services/booking-service';

export interface VehiclesData {
  CarId: number
  Brand: string
  Model: string
  Year: number
  Color: string
  DailyRate: number
  CarImage: string
  RegNo: string
}

@Component({
  selector: 'app-vehicles',
  imports: [FormsModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class Vehicles implements OnInit {
  http = inject(HttpClient);
  bookServices = inject(BookingService)
  // signals for state
  vehicles = signal<VehiclesData[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.getAllVehicles()
  }

  getAllVehicles() {
    this.loading.set(true);
    this.error.set(null);
    this.bookServices.getAllCars().subscribe({
      next: (data: any) => {
        if (data?.data && Array.isArray(data?.data)) {
          this.vehicles.set(data.data);
        } else {
          this.error.set('Invalid data received');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to fetch vehicles: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  addVehicle(newVehicle: VehiclesData) { }
  editVehicle(updatedVehicle: VehiclesData) { }
  deleteVehicle(carId: number) { }
}
