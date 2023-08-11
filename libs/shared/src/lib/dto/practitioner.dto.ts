import { BaseDto } from "./_base.dto";
import { PatientDto } from "./patient.dto";
import { PredicamentDto } from "./predicament.dto";
import { UserDto } from "./user.dto";

export class PractitionerDto extends BaseDto {
    user?: UserDto;
    patients?: PatientDto[];
    predicaments?: PredicamentDto[];
    documents?: Document[];
}