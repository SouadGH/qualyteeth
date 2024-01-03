// import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
// import { Patient } from "./patient.entity";
// import { Intervention } from "./intervention.entity";
// import { Base } from "./_base.entity";

// @Entity()
// export class TreatmentPlan extends Base {

//     @ManyToOne(() => Patient, patient => patient.treatmentPlans)
//     patient: Patient;

//     @OneToMany(() => Intervention, intervention => intervention.treatmentPlan, { nullable: true })
//     interventions?: Intervention[];

//     @Column({ nullable: true })
//     svg?: string;

//     @Column({ nullable: false })
//     name!: string;

//     @Column({ nullable: true })
//     description?: string;
// }