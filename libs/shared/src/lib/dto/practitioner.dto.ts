import { ActorDto } from "./_actor.dto";
import { PatientDto } from "./patient.dto";
import { PredicamentDto } from "./predicament.dto";
import { UserDto } from "./user.dto";

export class PractitionerDto extends ActorDto {
    user?: UserDto;
    patients?: PatientDto[];
    predicaments?: PredicamentDto[];
    documents?: Document[];
}