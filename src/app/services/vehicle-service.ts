import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Vehicle } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/testing';

  getVehicles(): Observable<ApiResponse<Vehicle[]>> {
    return this.http.get<ApiResponse<Vehicle[]>>(`${this.apiUrl}/vehicles`);
  }

  addVehicle(vehicleData: Omit<Vehicle, 'carId'>): Observable<ApiResponse<Vehicle>> {
    return this.http.post<ApiResponse<Vehicle>>(`${this.apiUrl}/vehicles`, vehicleData);
  }

  updateVehicle(carId: number, vehicleData: Partial<Vehicle>): Observable<ApiResponse<Vehicle>> {
    return this.http.put<ApiResponse<Vehicle>>(`${this.apiUrl}/vehicles/${carId}`, vehicleData);
  }

  deleteVehicle(carId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/vehicles/${carId}`);
  }
}
