import { Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Actor } from '../_actor.entity';
import { Document } from '../document/document.entity';
import { Patient } from '../patient/patient.entity';
import { Predicament } from '../predicament/predicament.entity';
import { User } from '../user/user.entity';
import { PredicamentPlan } from '../predicamentplan/predicament-plan.entity';
import { Surgery } from '../surgery/surgery.entity';



@Entity()
export class Practitioner extends Actor {

    @ManyToOne(() => User, user => user.practitioners, { nullable: true })
    user?: User;

    // @Column({ nullable: true })
    // color: string;

    @ManyToMany(() => Patient, p => p.practitioners, { nullable: true })
    patients?: Patient[];

     /*@OneToOne(() => PractitionerTimetable, timetable => timetable.practitioner, { nullable: true })
     timetable?: PractitionerTimetable;*/

    // @ManyToMany(() => Service, service => service.dentists, { nullable: true })
    // services?: Service[]

    // @OneToMany(() => Intervention, intervention => intervention.dentist, { nullable: true })
    // interventions?: Intervention[];

    @OneToMany(() => Predicament, p => p.practitioner, { nullable: true })
    predicaments?: Predicament[];

    @OneToMany(() => Document, d => d.practitioner)
    documents?: Document[];

    @OneToMany(() => PredicamentPlan, p => p.practitioner, { nullable: true })
    predicamentPlans?: PredicamentPlan[];

    @ManyToMany(() => Surgery, s => s.practitioners, { nullable: true })
    surgerys?: Surgery[];

    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.createdBy)
    // diagnostics?: Diagnostic[];

    // @OneToMany(() => Treatment, treatment => treatment.createdBy)
    // treatments?: Treatment[];

    // @OneToMany(() => ServiceCategory, serviceCategory => serviceCategory.createdBy)
    // serviceCategories?: ServiceCategory[];

     /*@OneToMany(() => ServiceDefinition, serviceDefinition => serviceDefinition.createdBy)
     serviceDefinitions?: ServiceDefinition[];*/

    
    
}