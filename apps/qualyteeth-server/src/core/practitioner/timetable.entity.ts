/*import { Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Actor } from '../_actor.entity';
import { Document } from '../document/document.entity';
import { Patient } from '../patient/patient.entity';
import { Predicament } from '../predicament/predicament.entity';
import { User } from '../user/user.entity';


 import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
 import { Practitioner } from './practitioner.entity';
 import { Dentist } from './dentist.entity';
 import { Base } from './_base.entity';*/

/*import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Practitioner } from "./practitioner.entity";
import { Base } from "../_base.entity";



 @Entity()
 export class PractitionerTimetable extends Base {
     @OneToOne(() => Practitioner, practitioner => practitioner.timetable, { nullable: true })
     @JoinColumn()
     public practitioner: Practitioner;

     @Column({ nullable: true })
     day: number;

     @Column({ nullable: true })
     fromHour: number;

     @Column({ nullable: true })
     toHour: number;

     @Column({ nullable: true })
     fromMinute: number;

     @Column({ nullable: true })
     toMinute: number
 }*/