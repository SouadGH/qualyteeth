import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany } from "typeorm";
import { Dentist } from "./dentist.entity";
import { Patient } from "./patient.entity";
import { Base } from "./_base.entity";

export enum UserType {
  DENTIST,
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

  @OneToMany(() => Dentist, dentist => dentist.user, { nullable: true })
  dentists?: Dentist[];

  @OneToMany(() => Patient, patient => patient.user, { nullable: true })
  patients?: Patient[];
}