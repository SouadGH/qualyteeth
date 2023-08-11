// import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { Dentist } from 'libs/shared/src/lib/dentist.entity';
// import { PractitionerTimetable } from 'libs/shared/src/lib/dentist-timetable.entity';
// import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service'
// import { Patient } from 'libs/shared/src/lib/patient.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';


// @Injectable()
// export class PractitionerService {
//     private readonly logger = new Logger(PractitionerService.name);

//     /**
//      *
//      */
//     constructor(
//         @InjectRepository(Dentist) private dentistRepo: Repository<Dentist>,
//         private dbService: DbService) {
//     }

//     /**
//      *
//      */
//     // async findById(id: number): Promise<Dentist> {
//     //     try {
//     //         const query = `SELECT * FROM dentist WHERE id = $1`;
//     //         return await this.dbService.db.oneOrNone(query, id);
//     //     }
//     //     catch (e) {
//     //         this.logger.error(e.message, new Error(e).stack)
//     //         throw e;
//     //     }
//     // }

//     // /**
//     //  *
//     //  */
//     // async findByAccountId(accountId: number): Promise<Dentist> {
//     //     try {
//     //         const query = `SELECT * FROM dentist WHERE account_id = $1`
//     //         return await this.dbService.db.oneOrNone(query, accountId);
//     //     }
//     //     catch (e) {
//     //         this.logger.error(e.message, new Error(e).stack)
//     //         throw e;
//     //     }
//     // }

//     /**
//      *
//      */
//     async getById(id: string): Promise<Dentist> {
//         let qb = this.dentistRepo.createQueryBuilder('t');
//         qb = qb.where('t.id = :id', { id: id });

//         const t = await qb.getOne();
//         if (t) {
//             return t;
//         }
//         throw new HttpException('Dentist with this id does not exist', HttpStatus.NOT_FOUND);
//     }

//     /**
//      *
//      */
//     async save(data: Dentist): Promise<Dentist> {
//         const newT = this.dentistRepo.create({ ...data, });
//         await this.dentistRepo.save(newT);
//         return newT;
//     }

//     /**
//      *
//      */
//     async update(data: Dentist): Promise<Dentist> {
//         const t: Dentist = await this.getById(data.id);

//         const newT = this.dentistRepo.create({ ...t, ...data, });
//         await this.dentistRepo.save(newT);
//         return newT;
//     }

//     // /**
//     //  *
//     //  */
//     // async update(dentist: Dentist): Promise<number> {
//     //     try {
//     //         const query = `
//     //             UPDATE dentist 
//     //             SET 
//     //                 firstname = $1, 
//     //                 lastname = $2, 
//     //                 phone_number = $3,
//     //                 image = $4,
//     //                 color = $5
//     //             WHERE id = $6
//     //             RETURNING id`;
//     //         return await this.dbService.db.one(query, [dentist.userData.firstname, dentist.userData.lastname, dentist.userData.phoneNumber, dentist.userData.image, dentist.color, dentist.id]);
//     //     } catch (e) {
//     //         this.logger.error(e.message, new Error(e).stack)
//     //         throw e;
//     //     }
//     // }

//     /**
//      *
//      */
//     // async connect(dentistId: number, patientId: number): Promise<void> {
//     //     try {
//     //         const query = `
//     //             INSERT INTO dentist_patient_lnk (dentist_id, patient_id, created_on) 
//     //             VALUES ($1, $2, $3)`;
//     //         await this.dbService.db.none(query, [dentistId, patientId, new Date()]);
//     //     } catch (e) {
//     //         this.logger.error(e.message, new Error(e).stack)
//     //         throw e;
//     //     }
//     // }

//     /**
//      *
//      */
//     async findDentist(firstname: string, lastname: string, postalCode: number): Promise<Dentist> {
//         try {
//             const query = `
//                 SELECT * FROM dentist
//                 WHERE firstname = $1
//                 AND lastname = $2
//                 AND postal_code = $3
//             `;
//             let d = await this.dbService.db.oneOrNone(query, [firstname, lastname, postalCode]);
//             if (d == null) {
//                 throw new HttpException('Dentist does not exists', HttpStatus.NOT_FOUND);
//             }
//             // d = this.utils.snakeCaseToCamelCase(d);
//             return d;
//         } catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async findPatientsForDentist(dentistId: number): Promise<Array<Patient>> {
//         try {
//             const query = `
//                 SELECT p.* FROM patient p
//                 INNER JOIN dentist_patient_lnk dp ON dp.patient_id = p.id
//                 WHERE dp.dentist_id = $1
//             `
//             return await this.dbService.db.manyOrNone(query, [dentistId]);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//      async findAll(): Promise<Array<Dentist>> {
//         try {
//             const query = `
//                 SELECT * FROM dentist
//             `
//             return await this.dbService.db.manyOrNone(query);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async findTimetableForDentist(dentistId: number): Promise<Array<PractitionerTimetable>> {
//         try {
//             // const query = `SELECT * FROM dentist_timetable WHERE dentist_id = $1`
//             // let timetable = await this.dbService.db.manyOrNone(query, dentistId);

//             // for (let i=1; i<=5; i++) {
//             //     const idx = timetable.findIndex(tt => tt.day === i);
//             //     if (idx === -1) {
//             //         timetable.push({
//             //             dentist_id: dentistId,
//             //             day: i,
//             //             from_hour: 8,
//             //             from_minute: 0,
//             //             to_hour: 18,
//             //             to_minute: 0
//             //         })
//             //     }
//             // }
//             // return timetable
//             const query = `SELECT * FROM dentist_timetable WHERE dentist_id = $1`
//             return await this.dbService.db.manyOrNone(query, dentistId);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async updateTimetable(dentistId: number, timetables: Array<PractitionerTimetable>): Promise<void> {

//         return await this.dbService.db.tx('updateDentistTimetableTx', async tx => {
//             // tx.ctx = transaction context object

//             try {
//                 const dQuery = `
//                     DELETE FROM dentist_timetable
//                     WHERE dentist_id = $1
//                     `;
//                     await this.dbService.db.none(dQuery, dentistId);

//                 const cQuery = `
//                     INSERT INTO dentist_timetable (dentist_id, day, from_hour, to_hour, from_minute, to_minute) 
//                     VALUES ($1, $2, $3, $4, $5, $6)`;
//                 for (const t of timetables) {
//                     await this.dbService.db.none(cQuery, [dentistId, t.day, t.fromHour, t.toHour, t.fromMinute, t.toMinute]);
//                 }
//             } catch (e) {
//                 this.logger.error(e.message, new Error(e).stack)
//                 throw e;
//             }
//         });
//     }
// }
