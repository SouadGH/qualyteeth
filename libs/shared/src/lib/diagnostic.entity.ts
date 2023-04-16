import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Dentist } from "./dentist.entity";
import { Intervention } from "./intervention.entity";
import { Base } from "./_base.entity";

@Entity()
export class Diagnostic extends Base {

    @Column({ nullable: false })
    name!: string;

    @ManyToOne(() => Dentist, dentist => dentist.diagnostics, { nullable: true })
    createdBy?: Dentist;

    @ManyToMany(() => Intervention, intervention => intervention.diagnostic)
    public interventions?: Intervention[];
}