
import { Column, Entity, ManyToOne } from "typeorm";
import { Intervention } from "./intervention.entity";
import { Visit } from "./visit.entity";
import { Base } from "./_base.entity";

@Entity()
export class Comment extends Base {

    @Column({ nullable: false })
    text!: string;

    @ManyToOne(() => Intervention, intervention => intervention.comments, { nullable: true })
    intervention?: Intervention;
}