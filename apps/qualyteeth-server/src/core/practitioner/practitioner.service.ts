import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Practitioner } from 'libs/shared/src/lib/practitioner.entity';
import { Repository } from 'typeorm';


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
    // async findById(id: number): Promise<Practitioner> {
    //     try {
    //         const query = `SELECT * FROM Practitioner WHERE id = $1`;
    //         return await this.dbService.db.oneOrNone(query, id);
    //     }
    //     catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    // /**
    //  *
    //  */
    // async findByAccountId(accountId: number): Promise<Practitioner> {
    //     try {
    //         const query = `SELECT * FROM Practitioner WHERE account_id = $1`
    //         return await this.dbService.db.oneOrNone(query, accountId);
    //     }
    //     catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
     *
     */
    async getById(id: string): Promise<Practitioner> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
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

    // /**
    //  *
    //  */
    // async update(Practitioner: Practitioner): Promise<number> {
    //     try {
    //         const query = `
    //             UPDATE Practitioner 
    //             SET 
    //                 firstname = $1, 
    //                 lastname = $2, 
    //                 phone_number = $3,
    //                 image = $4,
    //                 color = $5
    //             WHERE id = $6
    //             RETURNING id`;
    //         return await this.dbService.db.one(query, [Practitioner.userData.firstname, Practitioner.userData.lastname, Practitioner.userData.phoneNumber, Practitioner.userData.image, Practitioner.color, Practitioner.id]);
    //     } catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
     *
     */
    // async connect(PractitionerId: number, patientId: number): Promise<void> {
    //     try {
    //         const query = `
    //             INSERT INTO Practitioner_patient_lnk (Practitioner_id, patient_id, created_on) 
    //             VALUES ($1, $2, $3)`;
    //         await this.dbService.db.none(query, [PractitionerId, patientId, new Date()]);
    //     } catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
     *
     */
    async findPractitioner(firstname: string, lastname: string, postalCode: number): Promise<Practitioner> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.where('t.firstname = :firstname', { firstname: firstname });
        qb = qb.andWhere('t.lastname = :lastname', { lastname: lastname });
        qb = qb.andWhere('t.postalCode = :postalCode', { postalCode: postalCode });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Practitioner with this id does not exist', HttpStatus.NOT_FOUND);


        // try {
        //     const query = `
        //         SELECT * FROM Practitioner
        //         WHERE firstname = $1
        //         AND lastname = $2
        //         AND postal_code = $3
        //     `;
        //     let d = await this.dbService.db.oneOrNone(query, [firstname, lastname, postalCode]);
        //     if (d == null) {
        //         throw new HttpException('Practitioner does not exists', HttpStatus.NOT_FOUND);
        //     }
        //     // d = this.utils.snakeCaseToCamelCase(d);
        //     return d;
        // } catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    }

    /**
     *
     */
    async findPatientsForPractitioner(practitionerId: number): Promise<Array<Patient>> {

        let qb = this.patientRepo.createQueryBuilder('p');
        qb = qb.leftJoin('p.predicamentPlans', 'pls')
        qb = qb.leftJoin('pls.predicaments', 'pr')
        qb = qb.leftJoin('pr.practitioner', 'pract')
        qb = qb.where('pract.id = :practitionerId', { practitionerId: practitionerId });

        return await qb.getMany();

        // let qb = this.practitionerRepo.createQueryBuilder('t');
        // qb = qb.leftJoin('t.predicaments', 'pr')
        // qb = qb.leftJoin('pr.plan', 'plan')
        // qb = qb.leftJoinAndSelect('pr.patient', 'p')
        // qb = qb.where('t.id = :practitionerId', { practitionerId: practitionerId });
        

        // try {
        //     const query = `
        //         SELECT p.* FROM patient p
        //         INNER JOIN Practitioner_patient_lnk dp ON dp.patient_id = p.id
        //         WHERE dp.Practitioner_id = $1
        //     `
        //     return await this.dbService.db.manyOrNone(query, [PractitionerId]);
        // }
        // catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    }

    /**
     *
     */
     async findAll(): Promise<Array<Practitioner>> {
        const qb = this.practitionerRepo.createQueryBuilder('t');
        return await qb.getMany();

        // try {
        //     const query = `
        //         SELECT * FROM Practitioner
        //     `
        //     return await this.dbService.db.manyOrNone(query);
        // }
        // catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
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
