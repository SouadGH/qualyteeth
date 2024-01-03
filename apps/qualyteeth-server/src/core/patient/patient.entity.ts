import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
<<<<<<< HEAD
import { PredicamentPlan } from "../predicamentplan/predicament-plan.entity";
=======
import { PredicamentPlan } from "../predicament/predicament-plan.entity";
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
import { User } from "../user/user.entity";
import { Base } from "../_base.entity";
import { Document } from '../document/document.entity';
import { Practitioner } from "../practitioner/practitioner.entity";
import { Actor } from "../_actor.entity";

@Entity()
export class Patient extends Actor {

    @ManyToOne(() => User, user => user.patients, { nullable: true })
    user?: User;

    @ManyToMany(() => Practitioner, p => p.patients, { nullable: true })
    @JoinTable()
    practitioners?: Practitioner[];

<<<<<<< HEAD
    @OneToMany(() => PredicamentPlan, p => p.patient, { nullable: true })
    predicamentPlans?: PredicamentPlan[];

=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    // @OneToMany(() => Treatment, treatment => treatment.patient, { nullable: true })
    // treatments?: Treatment[];

    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.patient, { nullable: true })
    // diagnostics?: Diagnostic[];

    // @OneToMany(() => TreatmentPlan, treatmentPlan => treatmentPlan.patient, { nullable: true })
    // treatmentPlans?: TreatmentPlan[];

<<<<<<< HEAD
    
=======
    @OneToMany(() => PredicamentPlan, p => p.patient, { nullable: true })
    predicamentPlans?: PredicamentPlan[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    // @OneToMany(() => Intervention, intervention => intervention.patient, { nullable: true })
    // interventions?: Intervention[];

    @OneToMany(() => Document, d => d.patient)
    documents?: Document[];
    
}