import { BaseDto } from "./_base.dto";
import { ActDto } from "./act.dto";
import { CategoryDto } from "./category.dto";
import { InterventionDto } from "./intervention.dto";
import { PractitionerDto } from "./practitioner.dto";
import { PredicamentPlanDto } from "./predicament-plan.dto";

export enum PredicamentType {
    DIAGNOSTIC,
    TREATMENT,
}

export class PredicamentDto extends BaseDto {
    practitioner?: PractitionerDto;
   // plan?: PredicamentPlanDto;
    type!: PredicamentType;
    name!: string;
    //categories: CategoryDto[];
    //acts: ActDto[];
    interventions: InterventionDto[]
}