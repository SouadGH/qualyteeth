import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Dentist } from './dentist.entity';
import { Base } from './_base.entity';

@Entity()
export class DentistTimetable extends Base {
    @OneToOne(() => Dentist, dentist => dentist.timetable, { nullable: true })
    @JoinColumn()
    public dentist: Dentist;

    @Column({ nullable: true })
    day: number;

    @Column({ nullable: true })
    fromHour: number;

    @Column({ nullable: true })
    toHour: number;

    @Column({ nullable: true })
    fromMinute: number;

    @Column({ nullable: true })
    toMinute: number
}