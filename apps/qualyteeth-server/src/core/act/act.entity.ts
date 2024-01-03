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

<<<<<<< HEAD
   /* @ManyToMany(() => Predicament, p => p.acts)
    @JoinTable()
    predicaments: Predicament[];*/
=======
    @ManyToMany(() => Predicament, p => p.acts)
    @JoinTable()
    predicaments: Predicament[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    @ManyToMany(() => Category, c => c.acts)
    @JoinTable()
    categories: Category[];

<<<<<<< HEAD
    /*@ManyToMany(() => Intervention, i => i.acts)
    interventions: Intervention[];*/
=======
    @ManyToMany(() => Intervention, i => i.acts)
    interventions: Intervention[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}