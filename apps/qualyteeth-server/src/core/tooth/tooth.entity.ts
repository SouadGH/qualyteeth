import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Intervention } from "../intervention/intervention.entity";
import { Base } from "../_base.entity";

@Entity()
export class Tooth extends Base {

    @Column({ nullable: false })
    fdiNumber!: number;

    @Column({ nullable: true })
    svg?: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Intervention, intervention => intervention.tooth)
    interventions: Intervention[];
}