import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";
import { Base } from "./_base.entity";

export enum UserType {
  DENTIST,
  PATIENT
}

@Entity()
export class User extends Base {

  @Column({ type: 'enum', enum: UserType, default: UserType.DENTIST, nullable: false })
  type: UserType;

  @Column({ nullable: false })
  firstname!: string;

  @Column({ nullable: false })
  lastname!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

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
  lastLogin?: Date;

  @Column({ nullable: true })
  image?: any;
}