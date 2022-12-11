import { Injectable, Logger } from '@nestjs/common';
import { Treatment, TreatmentTooth } from 'libs/shared/src/lib/treatment.interface';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
import { TreatmentDefinition } from 'libs/shared/src/lib/treatment-definition.interface';
import { Act } from 'libs/shared/src/lib/act.interface';
import { Subject } from 'rxjs';

@Injectable()
export class TreatmentService {
    private readonly logger = new Logger(TreatmentService.name);

    public treatmentSubject: Subject<Treatment & TreatmentDefinition> = new Subject<Treatment & TreatmentDefinition>();

    /**
     *
     */
    constructor(private dbService: DbService) { }

    /**
     *
     */
    async getDefinition(id: number, language: string = 'fr'): Promise<TreatmentDefinition> {
        try {
            let query = `
                SELECT t.id, t.deleted, t.created_by, t.created_on, n.name, n.language
                FROM treatment_definition t
                JOIN treatment_definition_name n on t.id = n.definition_id
                WHERE t.id = $1
                AND t.deleted = false
                AND n.language = $2
            `

            return await this.dbService.db.oneOrNone(query, [id, language]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getActsForDefinition(definitionId: number): Promise<Array<Act>> {
        try {
            let query = `
                SELECT a.id, a.start_date, a.end_date, a.vat, an.name, al.position
                FROM treatment_definition t
                JOIN treatment_definition_name n on t.id = n.definition_id
                JOIN treatment_definition_act_lnk al on t.id = al.definition_id
                JOIN act a on a.id = al.act_id
                JOIN act_name an on a.id = an.act_id AND an.language = n.language
                WHERE t.id = $1
                AND a.start_date <= NOW() AND (a.end_date >= NOW() or a.end_date IS NULL) 
                ORDER BY al.position
            `

            return await this.dbService.db.manyOrNone(query, [definitionId]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    // async getDefaultDefinitions(): Promise<Array<TreatmentDefinition>> {
    //     try {
    //         let query = `
    //             SELECT * FROM treatment_definition t
    //             JOIN treatment_definition_name n on t.id = n.definition_id
    //             WHERE t.dentist_id is NULL
    //             AND t.deleted = false
    //         `

    //         return await this.dbService.db.manyOrNone(query);
    //     }
    //     catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
     *
     */
    async getDefinitionsForDentist(dentistId: number, language: string = 'fr'): Promise<Array<TreatmentDefinition>> {
        try {
            let query = `
                SELECT * FROM treatment_definition t
                JOIN treatment_definition_name n on t.id = n.definition_id
                WHERE t.created_by = $1
                AND t.deleted = false
                AND n.language = $2
            `

            return await this.dbService.db.manyOrNone(query, [dentistId, language]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async saveTreatmentDefinition(t: TreatmentDefinition, language: string = 'fr'): Promise<void> {

        await this.dbService.db.tx('saveTreatmentDefinitionTx', async tx => {
            // tx.ctx = transaction context object

            try {
                const query = `
                    INSERT INTO treatment_definition (created_by, created_on) 
                    VALUES ($1, $2)
                    RETURNING id
                `
                const tid = await this.dbService.db.one(query, [t.createdBy, new Date()]);

                const nQuery = `
                    INSERT INTO treatment_definition_name (definition_id, language, name) 
                    VALUES ($1, $2, $3)
                `
                await this.dbService.db.none(nQuery, [tid.id, language, t.name]);

                if (t.acts == null) {
                    t.acts = [];
                }

                t.acts.forEach(async (a: Act) => {
                    const query = `
                            INSERT INTO treatment_definition_act_lnk (definition_id, act_id, position) 
                            VALUES ($1, $2, $3)
                        `
                    await this.dbService.db.none(query, [tid.id, a.id, (t.acts.indexOf(a) + 1)]);
                });
            }
            catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        })
    }

    /**
     *
     */
    async updateTreatmentDefinition(t: TreatmentDefinition): Promise<void> {

        await this.dbService.db.tx('updateTreatmentDefinitionTx', async tx => {
            // tx.ctx = transaction context object

            try {
                const query = `
                    UPDATE treatment_definition 
                    SET deleted = $1
                    WHERE id = $2
                `
                await this.dbService.db.none(query, [t.deleted, t.id]);

                const nQuery = `
                    UPDATE treatment_definition_name
                    SET name = $1
                    WHERE definition_id = $2
                `
                await this.dbService.db.none(nQuery, [t.name, t.id]);

                const aQuery = `
                    DELETE FROM treatment_definition_act_lnk
                    WHERE definition_id = $1
                `
                await this.dbService.db.none(aQuery, [t.id]);

                if (t.acts == null) {
                    t.acts = [];
                }

                t.acts.forEach(async (a: Act) => {
                    const query = `
                            INSERT INTO treatment_definition_act_lnk (definition_id, act_id, position) 
                            VALUES ($1, $2, $3)
                        `
                    await this.dbService.db.none(query, [t.id, a.id, (t.acts.indexOf(a) + 1)]);
                });
            }
            catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        })
    }

    /**
     *
     */
    //  async deleteTreatmentDefinition(tId: number): Promise<void> {

    //     await this.dbService.db.tx('deleteTreatmentDefinitionTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const aQuery = `
    //                 DELETE FROM treatment_definition_act_lnk
    //                 WHERE definition_id = $1
    //             `
    //             await this.dbService.db.none(aQuery, [tId]);

    //             const nQuery = `
    //                 DELETE FROM treatment_definition_name
    //                 WHERE definition_id = $1
    //             `
    //             await this.dbService.db.none(nQuery, [tId]);

    //             const query = `
    //                 DELETE FROM treatment_definition 
    //                 WHERE id = $1
    //             `
    //             await this.dbService.db.none(query, [tId]);
    //         }
    //         catch (e) {
    //             this.logger.error(e.message, new Error(e).stack)
    //             throw e;
    //         }
    //     })
    // }



    /**
     *
     */
    async getForDentist(dentistId: number): Promise<Array<Treatment>> {
        try {
            let query = `
                SELECT t.id, t.patient_id, t.dentist_id, t.start_date, t.comment, t.created_on, n.name
                FROM treatment t
                JOIN treatment_definition f on t.definition_id = f.id
                JOIN treatment_definition_name n ON n.definition_id = f.id
                WHERE t.dentist_id = $1
                AND t.end_date IS NULL
            `

            const treatments: Array<Treatment> = await this.dbService.db.manyOrNone(query, dentistId);

            for (const t of treatments) {
                query = `SELECT * FROM treatment_tooth_lnk WHERE treatment_id = $1`;
                t.teeth = await this.dbService.db.manyOrNone(query, t.id);
            }

            return treatments;
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }


    /**
     *
     */
    async getForPatient(patientId: number): Promise<Array<Treatment>> {
        try {
            let query = `
                SELECT t.id, t.patient_id, t.dentist_id, t.start_date, t.comment, t.created_on, n.name
                FROM treatment t
                JOIN treatment_definition f on t.definition_id = f.id
                JOIN treatment_definition_name n ON n.definition_id = f.id
                WHERE t.patient_id = $1
                AND t.end_date IS NULL
            `

            const treatments: Array<Treatment> = await this.dbService.db.manyOrNone(query, patientId);

            for (const t of treatments) {
                query = `SELECT * FROM treatment_tooth_lnk WHERE treatment_id = $1`;
                t.teeth = await this.dbService.db.manyOrNone(query, t.id);
            }

            return treatments;
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getForPatientAndDentist(patientId: number, dentistId?: number): Promise<Array<Treatment>> {
        try {
            let query = `
                SELECT t.id, t.patient_id, t.dentist_id, t.start_date, t.comment, t.created_on, n.name
                FROM treatment t
                JOIN treatment_definition f on t.definition_id = f.id
                JOIN treatment_definition_name n ON n.definition_id = f.id
                WHERE t.patient_id = $1
                AND t.dentist_id = $2
                AND t.end_date IS NULL
            `

            const treatments: Array<Treatment> = await this.dbService.db.manyOrNone(query, [patientId, dentistId]);

            for (const t of treatments) {
                query = `SELECT * FROM treatment_tooth_lnk WHERE treatment_id = $1`;
                t.teeth = await this.dbService.db.manyOrNone(query, t.id);
            }

            return treatments;
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getForPatientAndDentistAndTooth(patientId: number, dentistId: number, toothFdiNumber: number): Promise<Array<Treatment>> {
        try {
            let query = `
                SELECT t.id, t.patient_id, t.dentist_id, t.start_date, t.comment, t.created_on, n.name
                FROM treatment t
                JOIN treatment_definition f on t.definition_id = f.id
                JOIN treatment_definition_name n ON n.definition_id = f.id
                JOIN treatment_tooth_lnk l ON l.treatment_id = t.id
                WHERE t.patient_id = $1
                AND t.dentist_id = $2
                AND l.tooth_fdi_number = $3
                AND t.end_date IS NULL
            `

            return await this.dbService.db.manyOrNone(query, [patientId, dentistId, toothFdiNumber]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getForPatientAndTooth(patientId: number, toothFdiNumber: number): Promise<Array<Treatment>> {
        try {
            // let query = `
            //     SELECT t.id, t.patient_id, t.dentist_id, t.start_date, t.comment, t.created_on, n.name
            //     FROM treatment t
            //     JOIN treatment_definition f on t.definition_id = f.id
            //     JOIN treatment_definition_name n ON n.definition_id = f.id
            //     WHERE t.patient_id = $1
            //     AND t.end_date IS NULL
            // `
            let query = `
                SELECT t.id, t.patient_id, t.dentist_id, t.start_date, t.comment, t.created_on, n.name
                FROM treatment t
                JOIN treatment_definition f on t.definition_id = f.id
                JOIN treatment_definition_name n ON n.definition_id = f.id
                JOIN treatment_tooth_lnk l ON l.treatment_id = t.id
                WHERE t.patient_id = $1
                AND l.tooth_fdi_number = $2
                AND t.end_date IS NULL
                ORDER BY t.created_on DESC
            `
            const treatments: Array<Treatment> = await this.dbService.db.manyOrNone(query, [patientId, toothFdiNumber]);

            for (const t of treatments) {
                query = `
                    SELECT * 
                    FROM treatment_tooth_lnk 
                    WHERE treatment_id = $1
                    AND tooth_fdi_number = $2`;
                t.teeth = await this.dbService.db.manyOrNone(query, [t.id, toothFdiNumber]);
            }

            return treatments;
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    // private async feedToothStatus(treatments: Array<Treatment>): Promise<void> {
    //     const query = `
    //                 SELECT treatment_id, status FROM treatment_tooth
    //                 WHERE treatment_id = $1
    //             `

    //     for (const t of treatments) {
    //         t.toothTreatments = await this.dbService.db.manyOrNone(query, t.id);
    //     }
    // }

    // /**
    //  *
    //  */
    // async saveTreatment(t: Treatment): Promise<void> {

    //     await this.dbService.db.tx('saveTreatmentTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const query = `
    //                 INSERT INTO treatment (definition_id, dentist_id, patient_id, comment, start_date, created_on) 
    //                 VALUES ($1, $2, $3, $4, $5, $6)
    //                 RETURNING id
    //             `
    //             const tid = await this.dbService.db.one(query, [t.definitionId, t.dentistId, t.patientId, t.comment, t.startDate, new Date()]);

    //             t.teeth.forEach(async (tt: TreatmentTooth) => {
    //                 const query = `
    //                         INSERT INTO treatment_tooth_lnk (treatment_id, tooth_fdi_number, tooth_parts) 
    //                         VALUES ($1, $2, $3)
    //                     `
    //                 await this.dbService.db.none(query, [tid.id, tt.toothFdiNumber, tt.toothParts]);
    //             });
    //         }
    //         catch (e) {
    //             this.logger.error(e.message, new Error(e).stack)
    //             throw e;
    //         }
    //     })
    // }

    /**
     *
     */
     async saveTreatment(t: Treatment): Promise<number> {

        // this.logger.log(d)

        return await this.dbService.db.tx('addTreatmentTx', async tx => {
            // tx.ctx = transaction context object

            try {
                const query = `
                    INSERT INTO treatment (definition_id, patient_id, dentist_id, comment, start_date, created_on)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id`;

                const idObj = await this.dbService.db.one(query, [t.definitionId, t.patientId, t.dentistId, t.comment, t.startDate, new Date()]);
                t.id = idObj['id'];

                const hQuery = `
                    INSERT INTO treatment_tooth_lnk (treatment_id, tooth_fdi_number, tooth_parts) 
                    VALUES ($1, $2, $3)`;

                for (const td of t.teeth) {
                    await this.dbService.db.none(hQuery, [t.id, td.toothFdiNumber, td.toothParts]);
                }

                const def: TreatmentDefinition = await this.getDefinition(t.definitionId);
                this.treatmentSubject.next(Object.assign(t, def));

                return t.id;
            } catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        });
    }


    /**
     *
     */
     async getActs(language: string = 'fr'): Promise<Array<Act>> {
        try {
            let query = `
                SELECT a.id, a.vat, n.name from Act a
                JOIN act_name n on a.id = n.act_id
                WHERE n.language = $1
            `
            return await this.dbService.db.manyOrNone(query, [language]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
     async init(dentistid: number): Promise<void> {

        return await this.dbService.db.tx('initTreatmentDataTx', async tx => {
            // tx.ctx = transaction context object

            const treatments = [
                
            ]

            try {
                for (const d of treatments) {
                    const query = `INSERT INTO treatment_definition (created_by, created_on) VALUES ($1, $2) RETURNING id`;

                    const idObj = await this.dbService.db.one(query, [dentistid, new Date()]);
                    const id = idObj['id'];
    
                    const hQuery = `INSERT INTO treatment_definition_name VALUES ($1, $2, $3)`;
                    await this.dbService.db.none(hQuery, [id, 'fr', d]);
                }

            } catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        });
    }
}
