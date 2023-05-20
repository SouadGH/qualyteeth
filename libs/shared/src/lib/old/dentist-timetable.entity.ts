// import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
// import { Practitioner } from './practitioner.entity';
// // import { Dentist } from './dentist.entity';
// import { Base } from './_base.entity';

// @Entity()
// export class PractitionerTimetable extends Base {
//     @OneToOne(() => Practitioner, dentist => dentist.timetable, { nullable: true })
//     @JoinColumn()
//     public dentist: Practitioner;

//     @Column({ nullable: true })
//     day: number;

//     @Column({ nullable: true })
//     fromHour: number;

//     @Column({ nullable: true })
//     toHour: number;

//     @Column({ nullable: true })
//     fromMinute: number;

//     @Column({ nullable: true })
//     toMinute: number
// }