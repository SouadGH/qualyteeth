
import { Entity, OneToMany } from "typeorm";
import { Comment } from "./comment.entity";
import { Intervention } from "./intervention.entity";
import { Base } from "./_base.entity";

@Entity()
export class Visit extends Base {

    // @OneToMany(() => Treatment, treatment => treatment.visit, { nullable: true })
    // treatments?: Treatment[];

    // @OneToMany(() => Diagnostic, diagnostic => diagnostic.visit, { nullable: true })
    // diagnostics?: Diagnostic;

    @OneToMany(() => Intervention, intervention => intervention.visit)
    public interventions?: Intervention[];
}