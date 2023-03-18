export interface Surgery {
    id: number;
    name: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    city: string;
    postalCode: string;
    region?: string;
    country?: string;
    createdBy: number,
    createdOn: Date;
    image?: any;
    active: boolean;
    deleted: boolean;
}