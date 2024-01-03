import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { PredicamentPlan } from "../predicamentplan/predicament-plan.entity";
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

    @OneToMany(() => PredicamentPlan, p => p.patient, { nullable: true })
    predicamentPlans?: PredicamentPlan[];

    // @OneToMany(() => Treatment, treatment => treatment.patient, { nullable: true })
    // treatments?: Treatment[];

    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.patient, { nullable: true })
    // diagnostics?: Diagnostic[];

    // @OneToMany(() => TreatmentPlan, treatmentPlan => treatmentPlan.patient, { nullable: true })
    // treatmentPlans?: TreatmentPlan[];

    

    // @OneToMany(() => Intervention, intervention => intervention.patient, { nullable: true })
    // interventions?: Intervention[];

    @OneToMany(() => Document, d => d.patient)
    documents?: Document[];
    
}