import { BaseDto } from "./_base.dto";
import { ActDto } from "./act.dto";
import { InterventionDto } from "./intervention.dto";

export class MaterialDto extends BaseDto {
    name!: string;
    interventions: InterventionDto[];
    acts: ActDto[];
}