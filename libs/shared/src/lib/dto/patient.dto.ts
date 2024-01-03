import { ActorDto } from "./_actor.dto";
import { PractitionerDto } from "./practitioner.dto";
import { PredicamentPlanDto } from "./predicament-plan.dto";
import { UserDto } from "./user.dto";

export class PatientDto extends ActorDto {
    user?: UserDto;
    practitioners?: PractitionerDto[];
    predicamentPlans?: PredicamentPlanDto[];
    documents?: Document[];
}