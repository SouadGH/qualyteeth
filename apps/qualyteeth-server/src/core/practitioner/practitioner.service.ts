import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Practitioner } from './practitioner.entity';
import { Patient } from '../patient/patient.entity';


@Injectable()
export class PractitionerService {
    private readonly logger = new Logger(PractitionerService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Practitioner) private practitionerRepo: Repository<Practitioner>,
        @InjectRepository(Patient) private patientRepo: Repository<Patient>,
        ) {
    }

    /**
     *
     */
    async getById(id: string): Promise<Practitioner> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        qb = qb.where('t.id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Practitioner with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async save(data: Practitioner): Promise<Practitioner> {
        const newT = this.practitionerRepo.create({ ...data, });
        await this.practitionerRepo.save(newT);
        return newT;
    }

    /**
     *
     */
    async update(data: Practitioner): Promise<Practitioner> {
        const t: Practitioner = await this.getById(data.id);

        const newT = this.practitionerRepo.create({ ...t, ...data, });
        await this.practitionerRepo.save(newT);
        return newT;
    }

    /**
     *
     */
    async connect(practitionerId: string, patientId: string): Promise<void> {
        let qb = this.practitionerRepo.createQueryBuilder('pr');
        qb = qb.leftJoinAndSelect('pr.patients', 'p')
        qb = qb.where('pr.id = :practitionerId', { practitionerId: practitionerId });

        const pr: Practitioner = await qb.getOne();
        if (pr == null) {
            throw new HttpException('Practitioner with this id does not exist', HttpStatus.NOT_FOUND);
        }

        let pqb = this.patientRepo.createQueryBuilder('p');
        pqb = pqb.where('p.id = :patientId', { patientId: patientId });

        const p: Patient = await pqb.getOne();
        if (p == null) {
            throw new HttpException('Patient with this id does not exist', HttpStatus.NOT_FOUND);
        }
        
        pr.patients.push(p);

        await this.save(pr);
    }

    /**
     *
     */
    async findPractitioner(firstname: string, lastname: string, postalCode: number): Promise<Practitioner> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        qb = qb.where('u.firstname = :firstname', { firstname: firstname });
        qb = qb.andWhere('u.lastname = :lastname', { lastname: lastname });
        // qb = qb.andWhere('t.postalCode = :postalCode', { postalCode: postalCode });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Practitioner not found', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async findPatients(practitionerId: number): Promise<Array<Patient>> {

        let qb = this.patientRepo.createQueryBuilder('p');
        qb = qb.leftJoinAndSelect('p.user', 'u');
        qb = qb.leftJoin('p.practitioners', 'pr')
        qb = qb.where('pr.id = :practitionerId', { practitionerId: practitionerId });

        return await qb.getMany();
    }

    /**
     *
     */
     async findAll(): Promise<Array<Practitioner>> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        return await qb.getMany();
    }

    /**
     *
     */
    // async findTimetableForPractitioner(PractitionerId: number): Promise<Array<PractitionerTimetable>> {
        // try {
        //     // const query = `SELECT * FROM Practitioner_timetable WHERE Practitioner_id = $1`
        //     // let timetable = await this.dbService.db.manyOrNone(query, PractitionerId);

        //     // for (let i=1; i<=5; i++) {
        //     //     const idx = timetable.findIndex(tt => tt.day === i);
        //     //     if (idx === -1) {
        //     //         timetable.push({
        //     //             Practitioner_id: PractitionerId,
        //     //             day: i,
        //     //             from_hour: 8,
        //     //             from_minute: 0,
        //     //             to_hour: 18,
        //     //             to_minute: 0
        //     //         })
        //     //     }
        //     // }
        //     // return timetable
        //     const query = `SELECT * FROM Practitioner_timetable WHERE Practitioner_id = $1`
        //     return await this.dbService.db.manyOrNone(query, PractitionerId);
        // }
        // catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    // }

    /**
     *
     */
    // async updateTimetable(PractitionerId: number, timetables: Array<PractitionerTimetable>): Promise<void> {

        // return await this.dbService.db.tx('updatePractitionerTimetableTx', async tx => {
        //     // tx.ctx = transaction context object

        //     try {
        //         const dQuery = `
        //             DELETE FROM Practitioner_timetable
        //             WHERE Practitioner_id = $1
        //             `;
        //             await this.dbService.db.none(dQuery, PractitionerId);

        //         const cQuery = `
        //             INSERT INTO Practitioner_timetable (Practitioner_id, day, from_hour, to_hour, from_minute, to_minute) 
        //             VALUES ($1, $2, $3, $4, $5, $6)`;
        //         for (const t of timetables) {
        //             await this.dbService.db.none(cQuery, [PractitionerId, t.day, t.fromHour, t.toHour, t.fromMinute, t.toMinute]);
        //         }
        //     } catch (e) {
        //         this.logger.error(e.message, new Error(e).stack)
        //         throw e;
        //     }
        // });
    // }
}
