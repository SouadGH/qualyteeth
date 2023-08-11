import { BaseDto } from "./_base.dto";
import { PractitionerDto } from "./practitioner.dto";
import { PredicamentPlanDto } from "./predicament-plan.dto";
import { UserDto } from "./user.dto";

export class PatientDto extends BaseDto {
    user?: UserDto;
    practitioners?: PractitionerDto[];
    predicamentPlans?: PredicamentPlanDto[];
    documents?: Document[];
}