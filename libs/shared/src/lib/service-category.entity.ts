import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Dentist } from "./dentist.entity";
import { ServiceDefinition } from "./service-definition.entity";
import { Base } from "./_base.entity";

@Entity()
export class ServiceCategory extends Base {

    @Column({ nullable: false })
    name!: string;

    @OneToMany(() => ServiceDefinition, service => service.category)
    public services: ServiceDefinition[];

    @ManyToOne(() => Dentist, dentist => dentist.serviceCategories, { nullable: true })
    createdBy?: Dentist;
}