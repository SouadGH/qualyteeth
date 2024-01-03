import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Intervention } from "../intervention/intervention.entity";
import { Base } from "../_base.entity";
import { ToothGroupe, ToothPosition } from "libs/shared/src/lib/dto/tooth.dto";

@Entity()
export class Tooth extends Base {

    @Column({ nullable: true })
    fdiNumber!: number;

    @Column({ nullable: true })
    palmerNumber!: number;

    @Column({ nullable: true })
    universalNumber!: number;

    @Column({ type: 'enum', nullable: true, enum: ToothGroupe, default: ToothGroupe.INCISIVES })
    group?: ToothGroupe;  
    
    @Column({ type: 'enum', nullable: true, enum: ToothPosition, default: ToothPosition.MAXILAR })
    position?: ToothPosition; 

    @Column({ nullable: true })
    svg?: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Intervention, intervention => intervention.tooth)
    interventions?: Intervention[];
}