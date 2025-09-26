export interface ApiResponse<T> {
    data: T;
    message: string;
}

export interface Vehicle {
    CarId: number;
    Brand: string;
    Model: string;
    Year: number;
    Color: string | null;
    DailyRate: number;
    CarImage: string | null;
    RegNo: string;
}