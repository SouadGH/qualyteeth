import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Intervention } from "../intervention/intervention.entity";
import { Base } from "../_base.entity";

@Entity()
export class ToothPart extends Base {

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Intervention, intervention => intervention.parts, { nullable: true })
    interventions?: Intervention[];
}