
import { Injectable, Logger } from '@nestjs/common';
import { PatientsService } from 'apps/qualyteeth-server/src/core/patient/patients.service';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';

@Injectable()
export class DocumentService {
    private readonly logger = new Logger(DocumentService.name);

    /**
     *
     */
    constructor(
        private dbService: DbService,
        private patientSvc: PatientsService) { }

    /**
     *
     */
    async saveDocument(file: any, body: any): Promise<number> {

        try {
            // console.log(body)

            const query = `
                    INSERT INTO document (patient_id, dentist_id, treatment_id, filename, file_data, created_on) 
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id
                `
            return await this.dbService.db.one(query, [body['patientId'], body['dentistId'], body['treatmentId'], file.originalname, `\\x${file.buffer.toString('hex')}`, new Date()]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getDocumentsForPatient(patientId: number): Promise<Array<any>> {

        try {
            const query = `SELECT id, treatment_id, filename, created_on FROM document WHERE patient_id = $1`
            return await this.dbService.db.manyOrNone(query, patientId);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getDocumentsForPatientAndTreatment(patientId: number, treatmentId: number): Promise<Array<any>> {
        try {
            const query = `SELECT id, treatment_id, filename, created_on FROM document WHERE patient_id = $1 and treatment_id = $2`
            return await this.dbService.db.manyOrNone(query, [patientId, treatmentId]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getDocument(id: number): Promise<any> {
        try {
            const query = `SELECT * FROM document WHERE id = $1`
            return await this.dbService.db.oneOrNone(query, id);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

}
