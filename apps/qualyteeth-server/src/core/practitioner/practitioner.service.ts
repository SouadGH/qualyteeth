import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Practitioner } from './practitioner.entity';
import { Patient } from '../patient/patient.entity';

<<<<<<< HEAD
//import { PractitionerTimetable } from './timetable.entity';

=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Injectable()
export class PractitionerService {
    private readonly logger = new Logger(PractitionerService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Practitioner) private practitionerRepo: Repository<Practitioner>,
        @InjectRepository(Patient) private patientRepo: Repository<Patient>,
<<<<<<< HEAD
        
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
        ) {
    }

    /**
     *
     */
<<<<<<< HEAD
    async getByIdOld(id: string): Promise<Practitioner> {
       
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        qb = qb.where('t.user_id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {            
            return t;
        }
        throw new HttpException('Practitioner with this id does not exist', HttpStatus.NOT_FOUND);
    }
    async getById(id: string): Promise<Practitioner> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        qb = qb.where('t.user_id = :id', { id: id });
=======
    async getById(id: string): Promise<Practitioner> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.where('t.id = :id', { id: id });
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

        const t = await qb.getOne();
        if (t) {
            return t;
        }
<<<<<<< HEAD
        throw new HttpException('practitioner with this id does not exist', HttpStatus.NOT_FOUND);
    }
=======
        throw new HttpException('Practitioner with this id does not exist', HttpStatus.NOT_FOUND);
    }

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    /**
     *
     */
    async getByUserId(userId: string): Promise<Practitioner | null> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        qb = qb.where('u.id = :id', { id: userId });
<<<<<<< HEAD
=======

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Practitioner with this user id does not exist', HttpStatus.NOT_FOUND);
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
<<<<<<< HEAD
        const t: Practitioner = await this.getById(data.user.id);
=======
        const t: Practitioner = await this.getById(data.id);
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

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
    async findPatients(userId: string): Promise<Array<Patient>> {

        let qb = this.patientRepo.createQueryBuilder('p');
        qb = qb.leftJoin('p.practitioners', 'pr')
        qb = qb.leftJoinAndSelect('pr.user', 'u');
        qb = qb.where('u.id = :userId', { userId: userId });

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
<<<<<<< HEAD
     /*async updateTimetable(PractitionerId: number, timetables: Array<PractitionerTimetable>): Promise<void> {

        await this.practitionerRepo.update(PractitionerId, timetables);
      
        
     }*/
=======
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
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}
