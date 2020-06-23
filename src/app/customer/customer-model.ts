export class CustomerInfo {
    CustomerId: string;
    Fname: string;
    Lname: string;
    Address: string;
    MobileNo: string;
    HomePhone: string;
    Email: string;
    Gender: string;
    Age: number;
    DoB: string;
    Profession: string;
    FullName: string;
    LoyaltyCardNo: string;
    IsFilledInitConcern: boolean;
    SignatureURL: string;
    NIC: string;
}

export class CustomerSearchRequest {
    CustomerId: string;
    CustomerName: string;
    MobileNo: string;
}