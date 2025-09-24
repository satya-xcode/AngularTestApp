import { BookingService } from './../../services/booking-service';
import { inject, OnInit, signal } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
export interface VehicleBooking {
  BookingId: number;
  BookingDate: string; // ISO string format, e.g., "2025-09-24T00:00:00"
  Discount?: number; // optional
  TotalBillAmount?: number; // optional
  CustomerName?: string;
  MobileNo?: string;
  Brand?: string;
  Model?: string;
  BookingUid: string;
}

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking implements OnInit {

  ngOnInit() {
    this.getCarList()
    this.getAllBookings()
  }

  bookings: VehicleBooking[] = []
  bookingService = inject(BookingService)
  carList: any[] = []
  bookingList: any[] = []
  bookingForm = new FormGroup({
    CarId: new FormControl(''),
    BookingDate: new FormControl(new Date().toISOString()),
    Discount: new FormControl(''),
    TotalBillAmount: new FormControl(''), // optional
    CustomerName: new FormControl(''),
    MobileNo: new FormControl(''),
    Brand: new FormControl(''),
    Model: new FormControl(''),
    BookingUid: new FormControl('1244'),
    BookingId: new FormControl(123),
  })

  getCarList() {
    this.bookingService.getAllCars().subscribe((response: any) => {
      this.carList = response?.data
    })
  }

  getAllBookings() {
    this.bookingService.getAllBookings().subscribe((response: any) => {
      this.bookingList = response?.data
    })
  }


  saveNewBooking() {
    const formValues = this.bookingForm.value
    console.log('values', formValues)
    this.bookingService.saveBooking(formValues).subscribe((response: any) => {
      console.log('saving response', response)
    })
  }

  editBooking(Booking: VehicleBooking) {

  }
  deleteBooking(bookingId: Number) {

  }

}
