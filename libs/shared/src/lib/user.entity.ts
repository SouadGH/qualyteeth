import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany } from "typeorm";
import { Practitioner } from "./practitioner.entity";
import { Patient } from "./patient.entity";
import { Base } from "./_base.entity";

export enum UserType {
  PRACTITIONER,
  PATIENT
}

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

  @Column({ nullable: true })
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

  //   @Column({ nullable: true })
  //   lastLogin?: Date;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Practitioner, practitioner => practitioner.user, { nullable: true })
  practitioners?: Practitioner[];

  @OneToMany(() => Patient, patient => patient.user, { nullable: true })
  patients?: Patient[];
}