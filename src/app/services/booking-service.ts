import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleBooking } from '../pages/booking/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) { }

  getAllBookings() {
    return this.http.get('http://localhost:3000/api/testing/bookings');
  }
  saveBooking(bookingData: any) {
    return this.http.post('http://localhost:3000/api/testing/bookings', bookingData)
  }
  deleteBooking(BookingId: Number) {
    return this.http.delete('http://localhost:3000/api/testing/bookings', { body: { BookingId } })
  }
  getAllCars() {
    return this.http.get('http://localhost:3000/api/testing/vehicles');
  }
}
