import { BaseDto } from "./_base.dto";
import { InterventionDto } from "./intervention.dto";
export enum ToothGroupe {
    INCISIVES,
    CANINES,
    PREMOLAIRES,
    MOLAIRES
}
export enum ToothPosition {
    MAXILAR,
    MANDIBULAR,
}
export class ToothDto extends BaseDto {
    fdiNumber!: number;
    palmerNumber : number;
    universalNumber!: number;
    group: ToothGroupe;
    position: ToothPosition;
    svg?: string;
    name!: string;
    description?: string;
    interventions: InterventionDto[];
}