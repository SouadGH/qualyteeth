import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Act } from '../act/act.entity';
import { Intervention } from '../intervention/intervention.entity';
import { Predicament } from '../predicament/predicament.entity';
import { Base } from '../_base.entity';

@Entity()
export class Material extends Base {

    @Column({ nullable: false })
    name!: string;

    @ManyToMany(() => Intervention, i => i.materials, { nullable: true })
    @JoinTable()
    interventions: Intervention[];

<<<<<<< HEAD
   /* @ManyToMany(() => Act, a => a.categories, { nullable: true })
    acts: Act[];*/
=======
    @ManyToMany(() => Act, a => a.categories, { nullable: true })
    acts: Act[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}