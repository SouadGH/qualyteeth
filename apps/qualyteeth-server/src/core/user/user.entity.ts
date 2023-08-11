import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany } from "typeorm";
import { Practitioner } from "../practitioner/practitioner.entity";
import { Patient } from "../patient/patient.entity";
import { Base } from "../_base.entity";
import { Feedback } from "../feedback/feedback.entity";
import { UserType } from "../../../../../libs/shared/src/lib/dto/user.dto";

@Entity()
export class User extends Base {

  @Column({ type: 'enum', enum: UserType, nullable: false })
  type: UserType;

  @Column({ nullable: false })
  firstname!: string;

  @Column({ nullable: false })
  lastname!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: true, select: false })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  streetNb?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  postalCode?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Practitioner, practitioner => practitioner.user, { nullable: true })
  practitioners?: Practitioner[];

  @OneToMany(() => Patient, patient => patient.user, { nullable: true })
  patients?: Patient[];

  @OneToMany(() => Feedback, f => f.user, { nullable: true })
  feedbacks?: Feedback[];
}