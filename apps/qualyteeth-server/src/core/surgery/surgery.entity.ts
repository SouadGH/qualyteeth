import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Base } from "../_base.entity";
import { Practitioner } from "../practitioner/practitioner.entity";

@Entity()
export class Surgery  extends Base{

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true }) 
    addressLine1?: string;

    @Column({ nullable: true })
    addressLine2?: string;

    @Column({ nullable: true })
    addressLine3?: string;

    @Column({ nullable: true })
    addressLine4?: string;

    @Column({ nullable: true })
    city?: string;

    @Column({ nullable: true })
    postalCode?: string;

    @Column({ nullable: true })
    region?: string;

    @Column({ nullable: true })
    country?: string;

    //createdBy: number;

    @Column({ nullable: true })   
    image?: string;

    @Column({ nullable: true })
    active?: boolean;

    
    @ManyToMany(() => Practitioner, practitioner => practitioner.surgerys, { nullable: true})
    @JoinTable()
    practitioners?: Practitioner[];
   
}