import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Act } from '../act/act.entity';
import { Category } from '../category/category.entity';
import { Intervention } from '../intervention/intervention.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
<<<<<<< HEAD
import { PredicamentPlan } from '../predicamentplan/predicament-plan.entity';
=======
import { PredicamentPlan } from './predicament-plan.entity';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
import { Base } from '../_base.entity';
import { PredicamentType } from '../../../../../libs/shared/src/lib/dto/predicament.dto';


@Entity()
export class Predicament extends Base {

    @ManyToOne(() => Practitioner, p => p.predicaments, { nullable: true })
    practitioner?: Practitioner;

<<<<<<< HEAD
    /*@ManyToOne(() => PredicamentPlan, p => p.predicaments, { nullable: true })
    plan?: PredicamentPlan;*/

    @Column({ type: 'enum', nullable: false, enum: PredicamentType, default: PredicamentType.DIAGNOSTIC })
    type?: PredicamentType;
=======
    @ManyToOne(() => PredicamentPlan, p => p.predicaments, { nullable: true })
    plan?: PredicamentPlan;

    @Column({ type: 'enum', nullable: false, enum: PredicamentType, default: PredicamentType.DIAGNOSTIC })
    type!: PredicamentType;
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    @Column({ nullable: false })
    name!: string;

<<<<<<< HEAD
   /* @ManyToMany(() => Category, c => c.predicaments, { nullable: true })
=======
    @ManyToMany(() => Category, c => c.predicaments, { nullable: true })
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => Act, a => a.predicaments, { nullable: true })
<<<<<<< HEAD
    acts: Act[];*/

    @OneToMany(() => Intervention, i => i.predicament, { nullable: true, cascade: true })
    interventions?: Intervention[]
=======
    acts: Act[];

    @OneToMany(() => Intervention, i => i.predicament, { nullable: true })
    interventions: Intervention[]
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}