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
<<<<<<< HEAD
   // plan?: PredicamentPlanDto;
    type!: PredicamentType;
    name!: string;
    //categories: CategoryDto[];
    //acts: ActDto[];
=======
    plan?: PredicamentPlanDto;
    type!: PredicamentType;
    name!: string;
    categories: CategoryDto[];
    acts: ActDto[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    interventions: InterventionDto[]
}