import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle-service';
import { Vehicle } from '../../models/car';

@Component({
  selector: 'app-vehicles',
  imports: [ReactiveFormsModule],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css']
})
export class VehiclesComponent implements OnInit {
  private vehicleService = inject(VehicleService);
  private formBuilder = inject(FormBuilder);

  vehicles = signal<Vehicle[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  message = signal<string | null>(null);

  vehicleForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
    this.loadVehicles();
  }

  initializeForm() {
    this.vehicleForm = this.formBuilder.group({
      carId: [null],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      color: [''],
      dailyRate: ['', Validators.required],
      carImage: [''],
      regNo: ['', Validators.required]
    });
  }

  loadVehicles() {
    this.loading.set(true);
    this.vehicleService.getVehicles().subscribe({
      next: (response) => {
        this.vehicles.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.handleError('Failed to fetch vehicles: ' + err.message);
        this.loading.set(false);
      },
    });
  }

  saveVehicle() {
    if (this.vehicleForm.invalid) {
      this.error.set('Please fill all required fields.');
      return;
    }

    this.loading.set(true);
    this.clearMessages();

    const formValues = this.vehicleForm.value;
    const vehicleData: Omit<Vehicle, 'carId'> = {
      ...formValues,
    };

    if (formValues.carId) {
      this.updateVehicle(formValues.carId, vehicleData);
    } else {
      this.createVehicle(vehicleData);
    }
  }

  private createVehicle(vehicleData: Omit<Vehicle, 'carId'>) {
    this.vehicleService.addVehicle(vehicleData).subscribe({
      next: (response) => {
        this.handleSuccess(response.message);
        this.loadVehicles();
        this.vehicleForm.reset();
        this.initializeForm();
      },
      error: (err) => this.handleError(err.error.message),
    }).add(() => this.loading.set(false));
  }

  private updateVehicle(carId: number, vehicleData: Partial<Vehicle>) {
    this.vehicleService.updateVehicle(carId, vehicleData).subscribe({
      next: (response) => {
        this.handleSuccess(response.message);
        this.loadVehicles();
        this.vehicleForm.reset();
        this.initializeForm();
      },
      error: (err) => this.handleError(err.error.message),
    }).add(() => this.loading.set(false));
  }

  editVehicle(vehicle: Vehicle) {
    this.vehicleForm.patchValue(vehicle);
  }

  deleteVehicle(carId: number) {
    this.loading.set(true);
    this.clearMessages();

    this.vehicleService.deleteVehicle(carId).subscribe({
      next: (response) => {
        this.handleSuccess(response.message);
        this.loadVehicles();
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
