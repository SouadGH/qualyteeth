
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Act } from "./act.entity";
import { Dentist } from "./dentist.entity";
import { Intervention } from "./intervention.entity";
import { Base } from "./_base.entity";

@Entity()
export class Treatment extends Base {

    @Column({ nullable: false })
    name!: string;

    @ManyToOne(() => Dentist, dentist => dentist.treatments, { nullable: true })
    createdBy?: Dentist;

    @OneToMany(() => Act, act => act.treatments)
    public acts?: Act[];

    @OneToMany(() => Intervention, intervention => intervention.treatment)
    public interventions?: Intervention[];
}