import { BaseDto } from "./_base.dto";
import { CategoryDto } from "./category.dto";
import { InterventionDto } from "./intervention.dto";
import { PredicamentDto } from "./predicament.dto";

export class ActDto extends BaseDto {
    name!: string;
    points?: {};
    vat?: number;
    predicaments: PredicamentDto[];
    categories: CategoryDto[];
    interventions: InterventionDto[];
}