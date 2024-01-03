import { BaseDto } from "./_base.dto";
import { InterventionDto } from "./intervention.dto";
<<<<<<< HEAD
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
=======

export class ToothDto extends BaseDto {
    fdiNumber!: number;
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    svg?: string;
    name!: string;
    description?: string;
    interventions: InterventionDto[];
}