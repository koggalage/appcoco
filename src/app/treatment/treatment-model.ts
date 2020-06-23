export class DailyUpdateSaveRequest {
    Date: Date;
    Problem: string;
    DoctorNote: string;
    TreatmentImageURLs = new Array<any>();
    CustomerId: string;
}

export class TreatmentHistory {
    CustomerId: string;
    FullName: string;
    Mobile: string;
}