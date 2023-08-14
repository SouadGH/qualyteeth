import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Actor } from '../_actor.entity';
import { Document } from '../document/document.entity';
import { Patient } from '../patient/patient.entity';
import { Predicament } from '../predicament/predicament.entity';
import { User } from '../user/user.entity';

@Entity()
export class Practitioner extends Actor {

    @ManyToOne(() => User, user => user.practitioners, { nullable: true })
    user?: User;

    // @Column({ nullable: true })
    // color: string;

    @ManyToMany(() => Patient, p => p.practitioners, { nullable: true })
    patients?: Patient[];

    // @OneToOne(() => PractitionerTimetable, timetable => timetable.dentist, { nullable: true })
    // timetable?: PractitionerTimetable;

    // @ManyToMany(() => Service, service => service.dentists, { nullable: true })
    // services?: Service[]

    // @OneToMany(() => Intervention, intervention => intervention.dentist, { nullable: true })
    // interventions?: Intervention[];

    @OneToMany(() => Predicament, p => p.practitioner)
    predicaments?: Predicament[];

    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.createdBy)
    // diagnostics?: Diagnostic[];

    // @OneToMany(() => Treatment, treatment => treatment.createdBy)
    // treatments?: Treatment[];

    // @OneToMany(() => ServiceCategory, serviceCategory => serviceCategory.createdBy)
    // serviceCategories?: ServiceCategory[];

    // @OneToMany(() => ServiceDefinition, serviceDefinition => serviceDefinition.createdBy)
    // serviceDefinitions?: ServiceDefinition[];

    @OneToMany(() => Document, d => d.practitioner)
    documents?: Document[];
}