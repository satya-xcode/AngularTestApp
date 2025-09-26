export interface VehicleBooking {
  BookingId: number;
  CarId: number;
  BookingDate: string;
  Discount?: number;
  TotalBillAmount?: number;
  CustomerName?: string;
  MobileNo?: string;
  readonly Brand?: string;
  readonly Model?: string;
  readonly BookingUid?: string;
}