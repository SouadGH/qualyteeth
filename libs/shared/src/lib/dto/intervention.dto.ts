import { BaseDto } from "./_base.dto";
import { ActDto } from "./act.dto";
import { CommentDto } from "./comment.dto";
import { MaterialDto } from "./material.dto";
<<<<<<< HEAD
import { PredicamentPlanDto } from "./predicament-plan.dto";
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
import { PredicamentDto } from "./predicament.dto";
import { ToothPartDto } from "./tooth-part.dto";
import { ToothDto } from "./tooth.dto";

export class InterventionDto extends BaseDto {
    startDate: Date;
    endDate: Date;
    predicament: PredicamentDto;
<<<<<<< HEAD
    plan: PredicamentPlanDto;
    //acts: ActDto[];
=======
    acts: ActDto[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    tooth: ToothDto[];
    parts: ToothPartDto[];
    materials: MaterialDto[];
    comments?: CommentDto[];
}