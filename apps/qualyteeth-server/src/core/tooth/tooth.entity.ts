import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Intervention } from "../intervention/intervention.entity";
import { Base } from "../_base.entity";
<<<<<<< HEAD
import { ToothGroupe, ToothPosition } from "libs/shared/src/lib/dto/tooth.dto";
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Entity()
export class Tooth extends Base {

<<<<<<< HEAD
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
=======
    @Column({ nullable: false })
    fdiNumber!: number;

    @Column({ nullable: true })
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    svg?: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Intervention, intervention => intervention.tooth)
<<<<<<< HEAD
    interventions?: Intervention[];
=======
    interventions: Intervention[];
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}