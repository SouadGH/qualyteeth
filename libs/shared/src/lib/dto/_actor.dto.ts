import { BaseDto } from "./_base.dto";

export abstract class ActorDto extends BaseDto {
    email!: string;
    firstname?: string;
    lastname?: string;
    phoneNumber?: string;
}

