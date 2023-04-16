export interface ServiceLink {
    definitionId: number,
    dentistId: number,
    timing: number,
}

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { Dentist } from "./dentist.entity";
import { ServiceDefinition } from "./service-definition.entity";
import { User } from "./user.entity";
import { Base } from "./_base.entity"

@Entity()
export class Service extends Base {

    @ManyToOne(() => ServiceDefinition, definition => definition.services, { nullable: true })
    public definition: ServiceDefinition;

    @ManyToMany(() => Dentist, dentist => dentist.services)
    @JoinTable()
    public dentists: Dentist[];

    @Column({nullable: true})
    public timing?: number;
}