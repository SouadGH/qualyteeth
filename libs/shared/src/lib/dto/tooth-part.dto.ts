import { BaseDto } from "./_base.dto";
import { InterventionDto } from "./intervention.dto";

export class ToothPartDto extends BaseDto {
    name!: string;
    description?: string;
    interventions?: InterventionDto[];
}