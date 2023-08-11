import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Category } from "../category/category.entity";
import { Intervention } from "../intervention/intervention.entity";
import { Predicament } from "../predicament/predicament.entity";
import { Base } from "../_base.entity";

@Entity()
export class Act extends Base {

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true, type: 'json' })
    points?: {};

    @Column({ nullable: true })
    vat?: number;

    @ManyToMany(() => Predicament, p => p.acts)
    @JoinTable()
    predicaments: Predicament[];

    @ManyToMany(() => Category, c => c.acts)
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => Intervention, i => i.acts)
    interventions: Intervention[];
}