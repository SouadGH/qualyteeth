import { BaseDto } from "./_base.dto";
import { PatientDto } from "./patient.dto";
import { PractitionerDto } from "./practitioner.dto";

export class DocumentDto extends BaseDto {
    file: Blob;
    filename: string;
    practitioner?: PractitionerDto;
    patient?: PatientDto;
}