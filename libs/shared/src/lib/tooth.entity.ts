import { Column, Entity, OneToMany } from "typeorm";
import { Intervention } from "./intervention.entity";
import { Base } from "./_base.entity";

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

    @OneToMany(() => Intervention, intervention => intervention.tooth)
    public interventions: Intervention[];
}