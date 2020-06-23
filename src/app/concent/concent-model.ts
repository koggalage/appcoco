export class DailyConcentSaveRequest {
    CustomerId: string;
    ConsentDatetime: string;
    NameOfTheTreatment: string;
    PreviousListOfTreatment: string;
    ExplainedBy: string;
    ConsentBy: string;
    Relationship: string;
    IsClientSigned: boolean;
    TherapistId: number;
    IsTherapistSigned: boolean;
    DoctorId: number;
    IsDoctorSinged: boolean;
    RelativeName: string;
    NIC: string;
}

export class InitConcentSaveRequest {
    CustomerId: string;
    IsDiabetes: boolean;
    IsHypertension: boolean;
    IsHeartDisease: boolean;
    IsAsthma: boolean;
    IsSinusitis: boolean;
    IsHyperlipidemia: boolean;
    IsOther: boolean;
    IsSurgical: boolean;
    IsMarried: boolean;
    IsSmoker: boolean;
    IsAlcoholic: boolean;
    CurrentMedication: string;
    IsAllergies: boolean;
    IsMenstrualAbnormalities: boolean;
    CurrentyUsedProducts: string;
    IsAnySkinTreatment: boolean;
    OtherDiseases: string;
    SurgicalHistory: string;
    KnownAllergies: string;
    MenstrualAbnormalities: string;
    PreviousSkinTreatments: string;
    IsClientSigned: boolean;
    IsTherapistSigned: boolean;
    TherapistId: number;
    IsDoctorSinged: boolean;
    DoctorId: number;
}