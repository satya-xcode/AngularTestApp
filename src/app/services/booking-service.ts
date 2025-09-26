import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Vehicle } from '../models/car';
import { VehicleBooking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/testing';

  getAllBookings(): Observable<ApiResponse<VehicleBooking[]>> {
    return this.http.get<ApiResponse<VehicleBooking[]>>(`${this.apiUrl}/bookings`);
  }

  saveBooking(bookingData: Omit<VehicleBooking, 'bookingId'>): Observable<ApiResponse<VehicleBooking>> {
    return this.http.post<ApiResponse<VehicleBooking>>(`${this.apiUrl}/bookings`, bookingData);
  }

  updateBooking(bookingId: number, bookingData: Partial<VehicleBooking>): Observable<ApiResponse<VehicleBooking>> {
    return this.http.put<ApiResponse<VehicleBooking>>(`${this.apiUrl}/bookings/${bookingId}`, bookingData);
  }

  deleteBooking(bookingId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/bookings`, { body: { BookingId: bookingId } });
  }
}
