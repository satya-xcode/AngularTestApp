import { HttpClient } from "@angular/common/http"
import { inject, Injectable, OnInit } from "@angular/core"
import { APIresponse } from "../models/car"

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


@Injectable({
    providedIn: 'root'
})

export class VehicleServices implements OnInit {
    private http = inject(HttpClient);
    private vehicles: VehiclesData[] = []

    ngOnInit(): void {
        this.getAllVehicles();
    }

    getAllVehicles() {
        return this.http.get<APIresponse>('https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars').subscribe((data: APIresponse) => {
            console.log('get response', data);
            this.vehicles = data.data;
            return this.vehicles;
        })

    }


    addVehicle(vehicle: VehiclesData) {
        this.http.post<APIresponse>('https://example.com/api/vehicles', vehicle).subscribe((response: APIresponse) => {
            if (response.success) {
                this.vehicles.push(response.data);
                alert('Vehicle added successfully');
            } else {
                alert('Failed to add vehicle: ' + response.message);
            }

        });
    }
    editVehicle(updatedVehicle: VehiclesData) {

    }
    deleteVehicle(carId: number) {
        this.http.delete<APIresponse>(`https://freeapi.miniprojectideas.com/api/CarRentalApp/DeleteCarbyCarId?carid=${carId}`).subscribe((response: APIresponse) => {
            if (response.success) {
                this.vehicles = this.vehicles.filter(v => v.CarId !== carId);
                alert('Vehicle deleted successfully');
            } else {
                alert('Failed to delete vehicle: ' + response.message);
            }
        });

    }

}