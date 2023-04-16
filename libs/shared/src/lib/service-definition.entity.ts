import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Dentist } from "./dentist.entity";
import { ServiceCategory } from "./service-category.entity";
import { Service } from "./service.entity";
import { Base } from "./_base.entity";

@Entity()
export class ServiceDefinition extends Base {

    @Column({ nullable: false })
    name!: string;

    @ManyToOne(() => ServiceCategory, category => category.services)
    public category: ServiceCategory;

    @ManyToOne(() => Dentist, dentist => dentist.serviceDefinitions, { nullable: true })
    createdBy?: Dentist;

    @OneToMany(() => Service, service => service.definition, {nullable: true})
    services?: Service[]
}