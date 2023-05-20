import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Act } from './act.entity';
import { Category } from './category.entity';
import { Intervention } from './intervention.entity';
import { Practitioner } from './practitioner.entity';
import { PredicamentPlan } from './predicament-plan.entity';
import { Base } from './_base.entity';

@Entity()
export class Predicament extends Base {

    @ManyToOne(() => Practitioner, p => p.predicaments, { nullable: true })
    practitioner?: Practitioner;

    @ManyToOne(() => PredicamentPlan, p => p.predicaments, { nullable: true })
    plan?: PredicamentPlan;

    @Column({ nullable: false, default: true })
    isTreatment: boolean;

    @ManyToMany(() => Category, c => c.predicaments, { nullable: true })
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => Act, a => a.predicaments, { nullable: true })
    acts: Act[];

    @OneToMany(() => Intervention, i => i.predicament, { nullable: true })
    interventions: Intervention[]
}