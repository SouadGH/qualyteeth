import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Base } from "../_base.entity";

@Entity()
export class Feedback extends Base {

    @Column({ nullable: true })
    stars: number;

    @Column({ nullable: true })
    comment: string;

    @ManyToOne(() => User, u => u.feedbacks, { nullable: true })
    user?: User;
}