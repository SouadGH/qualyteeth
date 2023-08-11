import { Column, Entity, ManyToMany } from 'typeorm';
import { Act } from '../act/act.entity';
import { Predicament } from '../predicament/predicament.entity';
import { Base } from '../_base.entity';

@Entity()
export class Category extends Base {

    @Column({ nullable: false })
    name!: string;

    @ManyToMany(() => Predicament, p => p.categories, { nullable: true })
    predicaments: Predicament[];

    @ManyToMany(() => Act, a => a.categories, { nullable: true })
    acts: Act[];
}