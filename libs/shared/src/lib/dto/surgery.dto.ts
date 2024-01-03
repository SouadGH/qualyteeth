import { BaseDto } from "./_base.dto";
import { PractitionerDto } from "./practitioner.dto";

export class SurgeryDto extends BaseDto{
    //practitioner?: PractitionerDto;

    name: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    city: string;
    postalCode: string;
    region?: string;
    country?: string;
    createdBy: number;
  
    image?: any;
    active: boolean;
    
}
