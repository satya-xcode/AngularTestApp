
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from './../../services/booking-service';
import { VehicleService } from '../../services/vehicle-service';
import { VehicleBooking } from '../../models/booking';
import { Vehicle } from '../../models/car';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
  imports: [ReactiveFormsModule]
})
export class BookingComponent implements OnInit {
  private bookingService = inject(BookingService);
  private vehicleService = inject(VehicleService);
  private formBuilder = inject(FormBuilder);

  bookings = signal<VehicleBooking[]>([]);
  cars = signal<Vehicle[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  message = signal<string | null>(null);

  bookingForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
    this.loadInitialData();
  }

  private initializeForm() {
    this.bookingForm = this.formBuilder.group({
      bookingId: [null],
      carId: ['', Validators.required],
      bookingDate: [this.formatDate(new Date()), Validators.required],
      discount: [0],
      totalBillAmount: [0],
      customerName: ['', Validators.required],
      mobileNo: ['', Validators.required],
    });
  }

  private loadInitialData() {
    this.loadCars();
    this.loadBookings();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }

  private loadCars() {
    this.vehicleService.getVehicles().subscribe({
      next: (response) => this.cars.set(response.data),
      error: (err) => this.handleError('Failed to fetch cars: ' + err.message),
    });
  }

  private loadBookings() {
    this.loading.set(true);
    this.bookingService.getAllBookings().subscribe({
      next: (response) => {
        this.bookings.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.handleError('Failed to fetch bookings: ' + err.message);
        this.loading.set(false);
      },
    });
  }

  saveBooking() {
    if (this.bookingForm.invalid) {
      this.error.set('Please fill all required fields.');
      return;
    }

    this.loading.set(true);
    this.clearMessages();

    const formValues = this.bookingForm.value;
    const bookingData: Omit<VehicleBooking, 'bookingId'> = {
      ...formValues,
    };

    if (formValues.bookingId) {
      this.updateBooking(formValues.bookingId, bookingData);
    } else {
      this.createBooking(bookingData);
    }
  }

  private createBooking(bookingData: Omit<VehicleBooking, 'bookingId'>) {
    this.bookingService.saveBooking(bookingData).subscribe({
      next: (response) => {
        this.handleSuccess(response.message);
        this.loadBookings();
        this.bookingForm.reset();
        this.initializeForm();
      },
      error: (err) => this.handleError(err.error.message),
    }).add(() => this.loading.set(false));
  }

  private updateBooking(bookingId: number, bookingData: Partial<VehicleBooking>) {
    this.bookingService.updateBooking(bookingId, bookingData).subscribe({
      next: (response) => {
        this.handleSuccess(response.message);
        this.loadBookings(); // Refresh the list
        this.bookingForm.reset();
        this.initializeForm();
      },
      error: (err) => this.handleError(err.error.message),
    }).add(() => this.loading.set(false));
  }

  editBooking(booking: VehicleBooking) {
    this.bookingForm.patchValue({
      ...booking,
      bookingDate: this.formatDate(new Date(booking.BookingDate))
    });
  }

  deleteBooking(bookingId: number) {
    this.loading.set(true);
    this.clearMessages();

    this.bookingService.deleteBooking(bookingId).subscribe({
      next: (response) => {
        this.handleSuccess(response.message);
        this.loadBookings(); // Refresh the list
      },
      error: (err) => this.handleError(err.error.message),
    }).add(() => this.loading.set(false));
  }

  private handleSuccess(message: string) {
    this.message.set(message);
    this.error.set(null);
  }

  private handleError(errorMessage: string) {
    this.error.set(errorMessage);
    this.message.set(null);
  }

  private clearMessages() {
    this.message.set(null);
    this.error.set(null);
  }
}
