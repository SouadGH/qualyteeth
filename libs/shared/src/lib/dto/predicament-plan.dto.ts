import { Intervention } from "apps/qualyteeth-server/src/core/intervention/intervention.entity";
import { BaseDto } from "./_base.dto";
import { PatientDto } from "./patient.dto";
import { PredicamentDto } from "./predicament.dto";
import { InterventionDto } from "./intervention.dto";
import { PractitionerDto } from "./practitioner.dto";

export class PredicamentPlanDto extends BaseDto {
    patient?: PatientDto;
   // predicaments?: PredicamentDto[];
    interventions?: InterventionDto[];
    practitioner: PractitionerDto;
}