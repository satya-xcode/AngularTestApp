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

  // signals for state
  bookings = signal<VehicleBooking[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  saveloading = signal<boolean>(false);
  saveError = signal<string | null>(null);
  message = signal<string | null>(null);

  ngOnInit() {
    this.getCarList()
    this.getAllBookings()
  }


  bookingService = inject(BookingService)
  carList: any[] = []
  // bookingList: any[] = []
  bookingForm = new FormGroup({
    CarId: new FormControl(''),
    BookingDate: new FormControl(new Date().toISOString()),
    Discount: new FormControl(''),
    TotalBillAmount: new FormControl(''), // optional
    CustomerName: new FormControl(''),
    MobileNo: new FormControl(''),
    Brand: new FormControl(''),
    Model: new FormControl(''),
    BookingUid: new FormControl(''),
    BookingId: new FormControl(''),
  })

  getCarList() {
    this.bookingService.getAllCars().subscribe((response: any) => {
      this.carList = response?.data
    })
  }

  getAllBookings() {
    this.loading.set(true);
    this.error.set(null);

    this.bookingService.getAllBookings().subscribe({
      next: (data: any) => {
        if (data?.data && Array.isArray(data?.data)) {
          this.bookings.set(data.data);
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

  saveNewBooking() {
    this.saveloading.set(true)
    this.error.set(null)
    this.message.set(null)
    const formValues = this.bookingForm.value

    this.bookingService.saveBooking(formValues).subscribe({
      next: (value: any) => {
        this.saveloading.set(false)
        this.message.set(value.message)
      },
      error: (error) => {
        this.error.set(error.error.message)
        this.saveloading.set(false)
      }
    })
  }

  editBooking(Booking: VehicleBooking) {

  }
  deleteBooking(bookingId: Number) {
    this.message.set(null)
    this.error.set(null)
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: (res: any) => {
        this.message.set(res.message)
      },
      error: (er) => {
        this.error.set(er.error.message)
      }
    })
  }

}
