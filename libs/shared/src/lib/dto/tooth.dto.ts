import { BaseDto } from "./_base.dto";
import { InterventionDto } from "./intervention.dto";

export class ToothDto extends BaseDto {
    fdiNumber!: number;
    svg?: string;
    name!: string;
    description?: string;
    interventions: InterventionDto[];
}