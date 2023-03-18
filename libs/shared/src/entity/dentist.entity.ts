import { User } from './user.entity';

export interface Dentist extends User {
    id: number;
    color: string;
}

export interface DentistTimetable {
    day: number,
    fromHour: number,
    toHour: number,
    fromMinute: number,
    toMinute: number
}