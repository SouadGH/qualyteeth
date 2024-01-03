import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Act } from '../act/act.entity';
import { Category } from '../category/category.entity';
import { Intervention } from '../intervention/intervention.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
import { PredicamentPlan } from '../predicamentplan/predicament-plan.entity';
import { Base } from '../_base.entity';
import { PredicamentType } from '../../../../../libs/shared/src/lib/dto/predicament.dto';


@Entity()
export class Predicament extends Base {

    @ManyToOne(() => Practitioner, p => p.predicaments, { nullable: true })
    practitioner?: Practitioner;

    /*@ManyToOne(() => PredicamentPlan, p => p.predicaments, { nullable: true })
    plan?: PredicamentPlan;*/

    @Column({ type: 'enum', nullable: false, enum: PredicamentType, default: PredicamentType.DIAGNOSTIC })
    type?: PredicamentType;

    @Column({ nullable: false })
    name!: string;

   /* @ManyToMany(() => Category, c => c.predicaments, { nullable: true })
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => Act, a => a.predicaments, { nullable: true })
    acts: Act[];*/

    @OneToMany(() => Intervention, i => i.predicament, { nullable: true, cascade: true })
    interventions?: Intervention[]
}