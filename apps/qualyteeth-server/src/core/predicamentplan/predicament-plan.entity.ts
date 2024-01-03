import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Base } from '../_base.entity';
import { Intervention } from '../intervention/intervention.entity';
import { Practitioner } from '../practitioner/practitioner.entity';

@Entity()
export class PredicamentPlan extends Base {

    @Column({ nullable: true })
    name: string;

    @ManyToOne(() => Patient, p => p.predicamentPlans, { nullable: true })
    patient?: Patient;

    @ManyToOne(() => Practitioner, p => p.predicamentPlans, { nullable: true })
    practitioner: Practitioner;

    /*@OneToMany(() => Predicament, p => p.plan)
    predicaments?: Predicament[];*/

    @OneToMany(() => Intervention, p => p.plan)
    interventions?: Intervention[];
    
}