<<<<<<< HEAD
import { Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
=======
import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
import { Actor } from '../_actor.entity';
import { Document } from '../document/document.entity';
import { Patient } from '../patient/patient.entity';
import { Predicament } from '../predicament/predicament.entity';
import { User } from '../user/user.entity';
<<<<<<< HEAD
import { PredicamentPlan } from '../predicamentplan/predicament-plan.entity';
import { Surgery } from '../surgery/surgery.entity';


=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Entity()
export class Practitioner extends Actor {

    @ManyToOne(() => User, user => user.practitioners, { nullable: true })
    user?: User;

    // @Column({ nullable: true })
    // color: string;

    @ManyToMany(() => Patient, p => p.practitioners, { nullable: true })
    patients?: Patient[];

<<<<<<< HEAD
     /*@OneToOne(() => PractitionerTimetable, timetable => timetable.practitioner, { nullable: true })
     timetable?: PractitionerTimetable;*/
=======
    // @OneToOne(() => PractitionerTimetable, timetable => timetable.dentist, { nullable: true })
    // timetable?: PractitionerTimetable;
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    // @ManyToMany(() => Service, service => service.dentists, { nullable: true })
    // services?: Service[]

    // @OneToMany(() => Intervention, intervention => intervention.dentist, { nullable: true })
    // interventions?: Intervention[];

<<<<<<< HEAD
    @OneToMany(() => Predicament, p => p.practitioner, { nullable: true })
    predicaments?: Predicament[];

    @OneToMany(() => Document, d => d.practitioner)
    documents?: Document[];

    @OneToMany(() => PredicamentPlan, p => p.practitioner, { nullable: true })
    predicamentPlans?: PredicamentPlan[];

    @ManyToMany(() => Surgery, s => s.practitioners, { nullable: true })
    surgerys?: Surgery[];

=======
    @OneToMany(() => Predicament, p => p.practitioner)
    predicaments?: Predicament[];

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.createdBy)
    // diagnostics?: Diagnostic[];

    // @OneToMany(() => Treatment, treatment => treatment.createdBy)
    // treatments?: Treatment[];

    // @OneToMany(() => ServiceCategory, serviceCategory => serviceCategory.createdBy)
    // serviceCategories?: ServiceCategory[];

<<<<<<< HEAD
     /*@OneToMany(() => ServiceDefinition, serviceDefinition => serviceDefinition.createdBy)
     serviceDefinitions?: ServiceDefinition[];*/

    
    
=======
    // @OneToMany(() => ServiceDefinition, serviceDefinition => serviceDefinition.createdBy)
    // serviceDefinitions?: ServiceDefinition[];

    @OneToMany(() => Document, d => d.practitioner)
    documents?: Document[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}