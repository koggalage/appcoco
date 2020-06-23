export class TreatmentHistoryDates {
    Date: Date;
    Tduid: number;
    DoctorAppointmentId: number;
    DoctorNote: string;
}

export class TreatmentDetailsResponse {
    Tduid: number;
    CustomerId: string;
    Date: Date;
    Problem: string;
    DoctorNote: string;
    BranchId: number;
    UserId: number;
    IsSkinCare: boolean;
    IsSalon: boolean;
    IsHair: boolean;
    IsSpa: boolean;
    IsPaid: boolean;
    DoctorAppointmentId: number;
    ServiceAppointmentId: number;
    TreatmentImageURLs = new Array<string>();
}