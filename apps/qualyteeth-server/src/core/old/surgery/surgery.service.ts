// import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { Dentist } from 'libs/shared/src/lib/dentist.entity';
// import { Patient } from 'libs/shared/src/lib/patient.entity';
// import { Surgery } from 'libs/shared/src/lib/surgery.entity';
// import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
// import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.entity';

// @Injectable()
// export class SurgeryService {
//     private readonly logger = new Logger(SurgeryService.name);

//     /**
//      *
//      */
//     constructor(private dbService: DbService) { }

//     /**
//      *
//      */
//     async findById(id: number): Promise<Surgery> {
//         try {
//             const query = `SELECT * FROM surgery WHERE id = $1`
//             return await this.dbService.db.oneOrNone(query, id);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async findServices(id: number): Promise<Array<ServiceDefinition>> {
//         try {
//             const query = `
//                 SELECT s.* FROM service_definition s
//                 WHERE s.surgery_id = $1
//                 `
//             return await this.dbService.db.manyOrNone(query, id);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async findForDentistId(dentistId: number): Promise<Surgery> {
//         try {
//             const query = `
//                 SELECT s.* FROM surgery s
//                 JOIN dentist_surgery_lnk ds ON s.id = ds.surgery_id
//                 WHERE ds.dentist_id = $1
//                 AND ds.active = TRUE
//                 AND s.deleted = FALSE`
//             return await this.dbService.db.oneOrNone(query, dentistId);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async findSurgeriesForDentistId(dentistId: number): Promise<Array<Surgery>> {
//         try {
//             const query = `
//                 SELECT s.*, ds.active FROM surgery s
//                 JOIN dentist_surgery_lnk ds ON s.id = ds.surgery_id
//                 WHERE ds.dentist_id = $1
//                 AND s.deleted = FALSE`
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
//     async findAllForPatientId(patientId: number): Promise<Array<Surgery>> {
//         try {
//             const query = `
//                 SELECT s.* FROM surgery s
//                 JOIN patient_surgery_lnk ps ON ps.surgery_id = s.id
//                 WHERE ps.patient_id = $1
//                 AND s.deleted = FALSE`
//             return await this.dbService.db.manyOrNone(query, patientId);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async findDentists(id: number): Promise<Array<Dentist>> {
//         try {
//             const query = `
//                 SELECT d.* FROM dentist d 
//                 JOIN dentist_surgery_lnk ds ON d.id = ds.dentist_id
//                 WHERE ds.surgery_id = $1`
//             return await this.dbService.db.manyOrNone(query, id);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async findPatients(id: number): Promise<Array<Patient>> {
//         try {
//             const query = `
//                 SELECT p.* FROM patient p
//                 JOIN patient_surgery_lnk ps ON p.id = ps.patient_id
//                 WHERE ps.surgery_id = $1`
//             return await this.dbService.db.manyOrNone(query, id);
//         }
//         catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }

//     /**
//      *
//      */
//     async add(surgery: Surgery): Promise<number> {
//         // const surgery: Surgery = body.surgery;
//         // const dentistId: number = body.dentistId;

//         return await this.dbService.db.tx('addSurgeryTx', async tx => {
//             // tx.ctx = transaction context object

//             try {
//                 const query = `
//                     INSERT INTO surgery (name, address_line_1, address_line_2, address_line_3, address_line_4, city, region, postal_code, country, image, deleted, created_by, created_on)
//                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
//                     RETURNING id`;
//                 const r = await this.dbService.db.one(query,
//                     [surgery.name, surgery.addressLine1, surgery.addressLine2, surgery.addressLine3, surgery.addressLine4,
//                     surgery.city, surgery.region, surgery.postalCode, surgery.country, surgery.image, surgery.deleted, surgery.createdBy, new Date()]);

//                 // const lQuery = 'UPDATE dentist_surgery_lnk SET active = false WHERE dentist_id = $1';
//                 // await this.dbService.db.none(lQuery, [dentistId, r['id']]);

//                 // const cQuery = `
//                 //     INSERT INTO dentist_surgery_lnk (surgery_id, dentist_id, start_date, created_on, active) 
//                 //     VALUES ($1, $2, $3, $4, $5)`;
//                 // await this.dbService.db.none(cQuery, [r['id'], dentistId, new Date(), new Date(), true]);

//                 // const lQuery = 'UPDATE dentist_surgery_lnk SET active = false WHERE dentist_id = $1 AND surgery_id = $2';
//                 // await this.dbService.db.none(lQuery, [dentistId, r['id']]);

//                 return r['id'];
//             } catch (e) {
//                 this.logger.error(e.message, new Error(e).stack)
//                 throw e;
//             }
//         });
//     }

//     /**
//      *
//      */
//     async update(surgery: Surgery): Promise<void> {
//         // const surgery: Surgery = body.surgery;

//         return await this.dbService.db.tx('updateSurgeryTx', async tx => {
//             // tx.ctx = transaction context object

//             try {
//                 const query = `
//                     UPDATE surgery SET 
//                         name = $1, 
//                         address_line_1 = $2, 
//                         address_line_2 = $3, 
//                         address_line_3 = $4, 
//                         address_line_4 = $5, 
//                         city = $6, 
//                         region = $7, 
//                         postal_code = $8, 
//                         country = $9, 
//                         image = $10,
//                         deleted = $11
//                     WHERE id = $12`;
//                 await this.dbService.db.none(query,
//                     [surgery.name, surgery.addressLine1, surgery.addressLine2, surgery.addressLine3, surgery.addressLine4,
//                     surgery.city, surgery.region, surgery.postalCode, surgery.country, surgery.image, surgery.deleted, surgery.id]);
//             } catch (e) {
//                 this.logger.error(e.message, new Error(e).stack)
//                 throw e;
//             }
//         });
//     }

//     /**
//      *
//      */
//     async activate(body: any): Promise<void> {
//         const surgeryId: Surgery = body.surgeryId;
//         const dentistId: number = body.dentistId;

//         await this.dbService.db.tx('activateSurgeryTx', async tx => {
//             try {
//                 const lQuery = 'UPDATE dentist_surgery_lnk SET active = false WHERE dentist_id = $1';
//                 await this.dbService.db.none(lQuery, dentistId);

//                 const uQuery = `UPDATE dentist_surgery_lnk SET active = true WHERE dentist_id = $1 and surgery_id = $2`;
//                 await this.dbService.db.none(uQuery, [dentistId, surgeryId]);
//             } catch (e) {
//                 this.logger.error(e.message, new Error(e).stack)
//                 throw e;
//             }
//         });
//     }

//     /**
//      *
//      */
//      async deactivate(body: any): Promise<void> {
//         const surgeryId: Surgery = body.surgeryId;
//         const dentistId: number = body.dentistId;

//         await this.dbService.db.tx('deactivateSurgeryTx', async tx => {
//             try {
//                 const lQuery = 'UPDATE dentist_surgery_lnk SET active = false WHERE dentist_id = $1 and surgery_id = $2';
//                 await this.dbService.db.none(lQuery, [dentistId, surgeryId]);
//             } catch (e) {
//                 this.logger.error(e.message, new Error(e).stack)
//                 throw e;
//             }
//         });
//     }

//     /**
//      *
//      */
//     async linkDentist(body: any): Promise<void> {
//         const surgeryId: number = body.surgeryId;
//         const dentistId: number = body.dentistId;

//         await this.dbService.db.tx('linkDentistSurgeryTx', async tx => {
//             // tx.ctx = transaction context object

//             try {
//                 const query = `INSERT INTO dentist_surgery_lnk (dentist_id, surgery_id, created_on) VALUES ($1, $2, $3)`;
//                 await this.dbService.db.none(query, [dentistId, surgeryId, new Date()]);
//             } catch (e) {
//                 this.logger.error(e.message, new Error(e).stack)
//                 throw e;
//             }
//         });
//     }

//     /**
//      *
//      */
//     // async linkPatient(body: any): Promise<void> {
//     //     const surgeryId: number = body.surgeryId;
//     //     const patientId: number = body.patientId;

//     //     try {
//     //         const query = `INSERT INTO patient_surgery_lnk (patient_id, surgery_id, start_date, created_on) VALUES ($1, $2, $3, $4)`;
//     //         await this.dbService.db.none(query, [patientId, surgeryId, new Date(), new Date()]);
//     //     } catch (e) {
//     //         this.logger.error(e.message, new Error(e).stack)
//     //         throw e;
//     //     }
//     // }

//     /**
//      *
//      */
//     async search(body: any): Promise<Dentist> {
//         const name: string = body.name;
//         const postalCode: number = body.postalCode;

//         try {
//             const query = `
//                 SELECT * FROM surgery
//                 WHERE name = $1
//                 AND postal_code = $2
//             `;
//             let d = await this.dbService.db.oneOrNone(query, [name, postalCode]);
//             if (d == null) {
//                 throw new HttpException('Surgery does not exists', HttpStatus.NOT_FOUND);
//             }
//             return d;
//         } catch (e) {
//             this.logger.error(e.message, new Error(e).stack)
//             throw e;
//         }
//     }
// }
