// import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
// import { DentistTimetable } from './dentist-timetable.entity';
// import { Diagnostic } from './diagnostic.entity';
// import { Intervention } from './intervention.entity';
// import { Patient } from './patient.entity';
// import { ServiceCategory } from './service-category.entity';
// import { ServiceDefinition } from './service-definition.entity';
// import { Service } from './service.entity';
// import { Predicament } from './treatment.entity';
// import { User } from './user.entity';
// import { Base } from './_base.entity';

// @Entity()
// export class Dentist extends Base {

//     @ManyToOne(() => User, user => user.dentists, { nullable: true })
//     user?: User;

//     @Column({ nullable: true })
//     color: string;

//     @ManyToMany(() => Patient, patient => patient.dentists, { nullable: true })
//     patients?: Patient[];

//     @OneToOne(() => DentistTimetable, timetable => timetable.dentist, { nullable: true })
//     timetable?: DentistTimetable;

//     @ManyToMany(() => Service, service => service.dentists, { nullable: true })
//     services?: Service[]

//     @OneToMany(() => Intervention, intervention => intervention.dentist, { nullable: true })
//     interventions?: Intervention[];

//     @OneToMany(() => Diagnostic, diagnostic => diagnostic.createdBy)
//     diagnostics?: Diagnostic[];

//     @OneToMany(() => Treatment, treatment => treatment.createdBy)
//     treatments?: Treatment[];

//     @OneToMany(() => ServiceCategory, serviceCategory => serviceCategory.createdBy)
//     serviceCategories?: ServiceCategory[];

//     @OneToMany(() => ServiceDefinition, serviceDefinition => serviceDefinition.createdBy)
//     serviceDefinitions?: ServiceDefinition[];
// }