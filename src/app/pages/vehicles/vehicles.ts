import { inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../models/car';


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
  vehicles: VehiclesData[] = []

  ngOnInit() {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.http.get<APIResponse>('http://localhost:3000/api/testing/vehicles').subscribe((data: APIResponse) => {

      if (data?.data && Array.isArray(data?.data))
        console.log('Data fetched successfully:', data.data);
      this.vehicles = data?.data;
    })

  }
  addVehicle(newVehicle: VehiclesData) {

  }

  editVehicle(updatedVehicle: VehiclesData) {

  }

  deleteVehicle(carId: number) {


  }

}
