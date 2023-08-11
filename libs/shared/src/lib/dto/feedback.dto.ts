import { BaseDto } from "./_base.dto";
import { UserDto } from "./user.dto";

export class FeedbackDto extends BaseDto {
    stars: number;
    comment: string;
    user?: UserDto;
}