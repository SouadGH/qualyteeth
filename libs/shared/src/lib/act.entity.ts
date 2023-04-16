import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Treatment } from "./treatment.entity";
import { Base } from "./_base.entity";

@Entity()
export class Act extends Base {

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true, type: 'json' })
    points?: {};

    @Column({ nullable: true })
    vat?: number;

    @ManyToMany(() => Treatment, treatment => treatment.acts)
    @JoinTable()
    treatments: Treatment[];
}