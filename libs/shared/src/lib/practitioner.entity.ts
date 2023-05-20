import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Predicament } from './predicament.entity';
import { User } from './user.entity';
import { Base } from './_base.entity';

@Entity()
export class Practitioner extends Base {

    @ManyToOne(() => User, user => user.practitioners, { nullable: true })
    user?: User;

    // @Column({ nullable: true })
    // color: string;

    // @ManyToMany(() => Patient, patient => patient.dentists, { nullable: true })
    // patients?: Patient[];

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
}