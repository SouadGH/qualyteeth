import { Entity, ManyToOne, OneToMany } from "typeorm";
import { PredicamentPlan } from "./predicament-plan.entity";
import { User } from "./user.entity";
import { Base } from "./_base.entity";

@Entity()
export class Patient extends Base {

    @ManyToOne(() => User, user => user.patients, { nullable: true })
    user?: User;

    // @ManyToMany(() => Dentist, dentist => dentist.patients, { nullable: true })
    // @JoinTable()
    // dentists?: Dentist[];

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
    
}