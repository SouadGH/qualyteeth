import { Column } from "typeorm";
import { Base } from "./_base.entity";

export abstract class Actor extends Base {

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    firstname?: string;

    @Column({ nullable: true })
    lastname?: string;

    @Column({ nullable: true })
    phoneNumber?: string;
}