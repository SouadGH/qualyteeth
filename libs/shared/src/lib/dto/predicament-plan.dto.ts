<<<<<<< HEAD
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
=======
import { BaseDto } from "./_base.dto";
import { PatientDto } from "./patient.dto";
import { PredicamentDto } from "./predicament.dto";

export class PredicamentPlanDto extends BaseDto {
    patient?: PatientDto;
    predicaments?: PredicamentDto[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}