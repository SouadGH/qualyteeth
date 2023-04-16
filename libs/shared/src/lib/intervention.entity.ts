import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Comment } from "./comment.entity";
import { Dentist } from "./dentist.entity";
import { Diagnostic } from "./diagnostic.entity";
import { Patient } from "./patient.entity";
import { ToothPart } from "./tooth-part.entity";
import { Tooth } from "./tooth.entity";
import { TreatmentPlan } from "./treatment-plan.entity";
import { Treatment } from "./treatment.entity";
import { Visit } from "./visit.entity";
import { Base } from "./_base.entity";

@Entity()
export class Intervention extends Base {

    @Column({ nullable: false, type: "timestamptz" })
    startDate: Date;

    @Column({ nullable: true, type: "timestamptz" })
    endDate: Date;

    @ManyToOne(() => Patient, patient => patient.interventions)
    patient: Patient;

    @ManyToOne(() => Dentist, dentist => dentist.interventions)
    dentist: Dentist;

    @ManyToMany(() => Tooth, tooth => tooth.interventions, { nullable: false })
    @JoinTable()
    tooth: Tooth;

    @ManyToMany(() => ToothPart, parts => parts.intervention, { nullable: true })
    @JoinTable()
    parts: ToothPart[];

    @ManyToOne(() => Diagnostic, diagnostic => diagnostic.interventions, { nullable: true })
    diagnostic?: Diagnostic;

    @ManyToOne(() => Treatment, treatment => treatment.interventions, { nullable: true })
    treatment?: Treatment;

    @ManyToOne(() => TreatmentPlan, treatmentPlan => treatmentPlan.interventions, { nullable: true })
    treatmentPlan?: TreatmentPlan;

    @ManyToOne(() => Visit, visit => visit.interventions, { nullable: true })
    visit?: Visit;

    @OneToMany(() => Comment, comment => comment.intervention, { nullable: true })
    comments?: Comment[];
}