import { BaseDto } from "./_base.dto";
import { PatientDto } from "./patient.dto";
import { PredicamentDto } from "./predicament.dto";

export class PredicamentPlanDto extends BaseDto {
    patient?: PatientDto;
    predicaments?: PredicamentDto[];
}