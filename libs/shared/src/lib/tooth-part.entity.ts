import { Column, Entity, ManyToOne } from "typeorm";
import { Intervention } from "./intervention.entity";
import { Base } from "./_base.entity";

@Entity()
export class ToothPart extends Base {

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => Intervention, intervention => intervention.parts, { nullable: true })
    public intervention?: Intervention;
}