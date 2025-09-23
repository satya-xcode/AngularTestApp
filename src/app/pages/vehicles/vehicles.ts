import { Component } from '@angular/core';
import { VehiclesData, VehicleServices } from '../../services/VehicleServices';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  imports: [FormsModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class Vehicles {
  vehicles: VehiclesData[] = [];

  constructor(private vehicleService: VehicleServices) {
    // this.vehicles = this.vehicleService.getAllVehicles() || [];
  }

  addVehicle(newVehicle: VehiclesData) {
    this.vehicleService.addVehicle(newVehicle);
  }

  editVehicle(updatedVehicle: VehiclesData) {
    this.vehicleService.editVehicle(updatedVehicle);
  }

  deleteVehicle(carId: number) {
    this.vehicleService.deleteVehicle(carId);

  }

}
