import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Predicament } from './predicament.entity';
import { Base } from '../_base.entity';

@Entity()
export class PredicamentPlan extends Base {

    @ManyToOne(() => Patient, p => p.predicamentPlans, { nullable: true })
    patient?: Patient;

    @OneToMany(() => Predicament, p => p.plan)
    predicaments?: Predicament[];
}