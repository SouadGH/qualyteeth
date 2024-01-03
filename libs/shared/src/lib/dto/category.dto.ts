import { BaseDto } from "./_base.dto";
import { ActDto } from "./act.dto";
import { PredicamentDto } from "./predicament.dto";

export class CategoryDto extends BaseDto {
    name!: string;
    predicaments: PredicamentDto[];
    acts: ActDto[];
}