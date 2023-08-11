import { BaseDto } from "./_base.dto";
import { InterventionDto } from "./intervention.dto";

export class CommentDto extends BaseDto {
    text!: string;
    intervention?: InterventionDto;
}