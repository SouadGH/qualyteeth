import { Column, Entity, ManyToMany } from 'typeorm';
import { Act } from '../act/act.entity';
import { Predicament } from '../predicament/predicament.entity';
import { Base } from '../_base.entity';

@Entity()
export class Category extends Base {

    @Column({ nullable: false })
    name!: string;

<<<<<<< HEAD
    /*@ManyToMany(() => Predicament, p => p.categories, { nullable: true })
    predicaments: Predicament[];*/
=======
    @ManyToMany(() => Predicament, p => p.categories, { nullable: true })
    predicaments: Predicament[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    @ManyToMany(() => Act, a => a.categories, { nullable: true })
    acts: Act[];
}