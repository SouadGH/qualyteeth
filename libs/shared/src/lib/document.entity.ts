import { Column, Entity, ManyToOne } from "typeorm";
import { Patient } from "./patient.entity";
import { Practitioner } from "./practitioner.entity";
import { Base } from "./_base.entity";

@Entity()
export class Document extends Base {

    @Column({ nullable: true, type: 'bytea' })
    file: Blob;

    @Column({ nullable: true })
    filename: string;

    @ManyToOne(() => Practitioner, p => p.documents, { nullable: true })
    practitioner?: Practitioner;

    @ManyToOne(() => Patient, p => p.documents, { nullable: true })
    patient?: Patient;
}