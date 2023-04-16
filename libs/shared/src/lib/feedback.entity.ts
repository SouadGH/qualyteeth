import { Column, Entity } from "typeorm";
import { Base } from "./_base.entity";

@Entity()
export class Feedback extends Base {

    @Column({ nullable: true })
    stars: number;

    @Column({ nullable: true })
    comment: string;
}