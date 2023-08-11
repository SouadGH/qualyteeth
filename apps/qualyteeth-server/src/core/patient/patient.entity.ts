import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { PredicamentPlan } from "../predicament/predicament-plan.entity";
import { User } from "../user/user.entity";
import { Base } from "../_base.entity";
import { Document } from '../document/document.entity';
import { Practitioner } from "../practitioner/practitioner.entity";

@Entity()
export class Patient extends Base {

    @ManyToOne(() => User, user => user.patients, { nullable: true })
    user?: User;

    @ManyToMany(() => Practitioner, p => p.patients, { nullable: true })
    @JoinTable()
    practitioners?: Practitioner[];

    // @OneToMany(() => Treatment, treatment => treatment.patient, { nullable: true })
    // treatments?: Treatment[];

    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.patient, { nullable: true })
    // diagnostics?: Diagnostic[];

    // @OneToMany(() => TreatmentPlan, treatmentPlan => treatmentPlan.patient, { nullable: true })
    // treatmentPlans?: TreatmentPlan[];

    @OneToMany(() => PredicamentPlan, p => p.patient, { nullable: true })
    predicamentPlans?: PredicamentPlan[];

    // @OneToMany(() => Intervention, intervention => intervention.patient, { nullable: true })
    // interventions?: Intervention[];

    @OneToMany(() => Document, d => d.patient)
    documents?: Document[];
    
}