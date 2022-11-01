import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Dentist } from 'libs/shared/src/lib/dentist.interface';
import { Patient } from 'libs/shared/src/lib/patient.interface';
import { Surgery } from 'libs/shared/src/lib/surgery.interface';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';

@Injectable()
export class PatientsService {
    private readonly logger = new Logger(PatientsService.name);

    /**
     *
     */
    constructor(private dbService: DbService) { }

    /**
     *
     */
    async findById(id: number): Promise<Dentist> {
        try {
            const query = `SELECT * FROM patient WHERE id = $1`
            return await this.dbService.db.oneOrNone(query, id);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async findByAccountId(accountId: number): Promise<Dentist> {
        try {
            const query = `SELECT * FROM patient WHERE account_id = $1`
            return await this.dbService.db.oneOrNone(query, accountId);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async add(body: any): Promise<void> {
        const patient: Patient = body.patient;
        const dentistId: number = body.dentistId;

        await this.dbService.db.tx('addPatientTx', async tx => {
            // tx.ctx = transaction context object

            try {
                const q1 = `
                    SELECT * 
                    FROM patient 
                    WHERE email = $1
                `
                const pr = await this.dbService.db.oneOrNone(q1, [patient.email]);
                console.log(pr)
                if (pr != null) {
                    throw new HttpException('Patient already exists', 409);
                }

                const q2 = `
                    INSERT INTO patient (firstname, lastname, phone_number, email, created_on)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id`;
                const r = await this.dbService.db.one(q2, [patient.firstname, patient.lastname, patient.phoneNumber, patient.email, new Date()]);
                console.log(r)

                const q3 = `
                    INSERT INTO dentist_patient_lnk (dentist_id, patient_id, created_on) 
                    VALUES ($1, $2, $3)`;
                await this.dbService.db.none(q3, [dentistId, r['id'], new Date()]);
            } catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        });
    }

    /**
     *
     */
    async update(patient: Patient): Promise<number> {
        try {
            const query = `
                UPDATE patient 
                SET 
                    firstname = $1, 
                    lastname = $2, 
                    phone_number = $3,
                    image = $4
                WHERE id = $5
                RETURNING id`;
            return await this.dbService.db.one(query, [patient.firstname, patient.lastname, patient.phoneNumber, patient.image, patient.id]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async findConnectedDentists(patientId: number): Promise<Array<Dentist>> {
        try {
            const query = `
                SELECT d.* FROM dentist d
                INNER JOIN dentist_patient_lnk dp ON dp.dentist_id = d.id
                WHERE dp.patient_id = $1
            `
            const r = await this.dbService.db.manyOrNone(query, [patientId]);
            // r.forEach(u => u = this.utils.snakeCaseToCamelCase(u));
            return r;
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getConnectedSurgeries(patientId: number): Promise<Array<Surgery>> {
        try {
            const query = `
                SELECT s.* FROM surgery s
                INNER JOIN patient_surgery_lnk ps ON ps.surgery_id = d.id
                WHERE dp.patient_id = $1
            `
            const r = await this.dbService.db.manyOrNone(query, [patientId]);
            return r;
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
    *
    */
    async insertImage(patient: Patient): Promise<void> {
        try {
            const query = `INSERT INTO account_img VALUES ($1, $2, $3)`;
            await this.dbService.db.none(query, [patient.accountId, patient.image.imgData, new Date()]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }
}
