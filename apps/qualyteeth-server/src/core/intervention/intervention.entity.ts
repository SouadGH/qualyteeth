import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Act } from "../act/act.entity";
import { Comment } from "../comment/comment.entity";
import { Material } from "../material/material.entity";
import { Predicament } from "../predicament/predicament.entity";
import { ToothPart } from "../tooth/tooth-part.entity";
import { Tooth } from "../tooth/tooth.entity";
import { Base } from "../_base.entity";

@Entity()
export class Intervention extends Base {

    @Column({ nullable: false, type: "timestamptz" })
    startDate: Date;

    @Column({ nullable: true, type: "timestamptz" })
    endDate: Date;

    @ManyToOne(() => Predicament, p => p.interventions, { nullable: true })
    predicament: Predicament;

    @ManyToMany(() => Act, a => a.interventions, { nullable: true })
    @JoinTable()
    acts: Act[];

    @ManyToMany(() => Tooth, tooth => tooth.interventions, { nullable: false })
    @JoinTable()
    tooth: Tooth[];

    @ManyToMany(() => ToothPart, parts => parts.interventions, { nullable: true })
    @JoinTable()
    parts: ToothPart[];

    @ManyToMany(() => Material, m => m.interventions, { nullable: true })
    materials: Material[];

    @OneToMany(() => Comment, comment => comment.intervention, { nullable: true })
    comments?: Comment[];
}