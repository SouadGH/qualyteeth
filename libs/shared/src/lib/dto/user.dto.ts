import { BaseDto } from "./_base.dto";
import { FeedbackDto } from "./feedback.dto";
import { PatientDto } from "./patient.dto";
import { PractitionerDto } from "./practitioner.dto";

export enum UserType {
  PRACTITIONER,
  PATIENT
}
export enum GenderType {
  WOMAN,
  MAN
}
export class UserDto extends BaseDto {
  type: UserType;
  firstname!: string;
  lastname!: string;
  email!: string;
  password?: string;
  gender?: GenderType;
  street?: string;
  streetNb?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  image?: string;
  practitioners?: PractitionerDto[];
  patients?: PatientDto[];
  feedbacks?: FeedbackDto[];
}