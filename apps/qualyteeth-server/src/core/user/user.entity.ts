import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany } from "typeorm";
import { Practitioner } from "../practitioner/practitioner.entity";
import { Patient } from "../patient/patient.entity";
import { Base } from "../_base.entity";
import { Feedback } from "../feedback/feedback.entity";
<<<<<<< HEAD
import { GenderType, UserType } from "../../../../../libs/shared/src/lib/dto/user.dto";

@Entity()
export class User extends Base {
  
=======
import { UserType } from "../../../../../libs/shared/src/lib/dto/user.dto";

@Entity()
export class User extends Base {
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  @Column({ type: 'enum', enum: UserType, nullable: false })
  type: UserType;

  @Column({ nullable: false })
  firstname!: string;

  @Column({ nullable: false })
  lastname!: string;

  @Column({ nullable: false })
  email!: string;

<<<<<<< HEAD
  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender!: GenderType;

=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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