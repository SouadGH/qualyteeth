import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Dentist } from "./dentist.entity";
import { Diagnostic } from './diagnostic.entity';
import { Intervention } from "./intervention.entity";
import { TreatmentPlan } from "./treatment-plan.entity";
import { Treatment } from './treatment.entity';
import { User } from "./user.entity";
import { Base } from "./_base.entity";

@Entity()
export class Patient extends Base {

    @ManyToOne(() => User, user => user.patients, { nullable: true })
    user?: User;

    @ManyToMany(() => Dentist, dentist => dentist.patients, { nullable: true })
    @JoinTable()
    dentists?: Dentist[];

    // @OneToMany(() => Treatment, treatment => treatment.patient, { nullable: true })
    // treatments?: Treatment[];

    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.patient, { nullable: true })
    // diagnostics?: Diagnostic[];

    @OneToMany(() => TreatmentPlan, treatmentPlan => treatmentPlan.patient, { nullable: true })
    treatmentPlans?: TreatmentPlan[];

    @OneToMany(() => Intervention, intervention => intervention.patient, { nullable: true })
    interventions?: Intervention[];
    
}