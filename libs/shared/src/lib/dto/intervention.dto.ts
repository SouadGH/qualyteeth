import { BaseDto } from "./_base.dto";
import { ActDto } from "./act.dto";
import { CommentDto } from "./comment.dto";
import { MaterialDto } from "./material.dto";
import { PredicamentPlanDto } from "./predicament-plan.dto";
import { PredicamentDto } from "./predicament.dto";
import { ToothPartDto } from "./tooth-part.dto";
import { ToothDto } from "./tooth.dto";

export class InterventionDto extends BaseDto {
    startDate: Date;
    endDate: Date;
    predicament: PredicamentDto;
    plan: PredicamentPlanDto;
    //acts: ActDto[];
    tooth: ToothDto[];
    parts: ToothPartDto[];
    materials: MaterialDto[];
    comments?: CommentDto[];
}