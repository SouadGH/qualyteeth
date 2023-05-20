import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Act } from "./act.entity";
import { Comment } from "./comment.entity";
import { Material } from "./material.entity";
import { Predicament } from "./predicament.entity";
import { ToothPart } from "./tooth-part.entity";
import { Tooth } from "./tooth.entity";
import { Base } from "./_base.entity";

@Entity()
export class Intervention extends Base {

    @Column({ nullable: false, type: "timestamptz" })
    startDate: Date;

    @Column({ nullable: true, type: "timestamptz" })
    endDate: Date;

    // @ManyToOne(() => Patient, patient => patient.interventions)
    // patient: Patient;

    // @ManyToOne(() => Dentist, dentist => dentist.interventions)
    // dentist: Dentist;

    @ManyToOne(() => Predicament, p => p.interventions, { nullable: true })
    predicament: Predicament;

    @ManyToMany(() => Act, a => a.interventions, { nullable: true })
    @JoinTable()
    acts: Act[];

    @ManyToMany(() => Tooth, tooth => tooth.interventions, { nullable: false })
    @JoinTable()
    tooth: Tooth[];

    @ManyToMany(() => ToothPart, parts => parts.intervention, { nullable: true })
    @JoinTable()
    parts: ToothPart[];

    @ManyToMany(() => Material, m => m.interventions, { nullable: true })
    materials: Material[];

    // @ManyToOne(() => Diagnostic, diagnostic => diagnostic.interventions, { nullable: true })
    // diagnostic?: Diagnostic;

    // @ManyToOne(() => Treatment, treatment => treatment.interventions, { nullable: true })
    // treatment?: Treatment;

    // @ManyToOne(() => TreatmentPlan, treatmentPlan => treatmentPlan.interventions, { nullable: true })
    // treatmentPlan?: TreatmentPlan;

    // @ManyToOne(() => Visit, visit => visit.interventions, { nullable: true })
    // visit?: Visit;

    @OneToMany(() => Comment, comment => comment.intervention, { nullable: true })
    comments?: Comment[];
}