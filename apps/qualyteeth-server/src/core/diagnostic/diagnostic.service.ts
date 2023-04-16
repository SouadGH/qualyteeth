import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
import { DiagnosticDefinition } from 'libs/shared/src/lib/diagnostic-definition.entity';
import { Subject } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosticService {
    private readonly logger = new Logger(DiagnosticService.name);

    public diagnosticSubject: Subject<Diagnostic & DiagnosticDefinition> = new Subject<Diagnostic & DiagnosticDefinition>();

    /**
     *
     */
    constructor(
        @InjectRepository(Diagnostic) private diagnosticRepo: Repository<Diagnostic>,
        @InjectRepository(DiagnosticDefinition) private definitionRepo: Repository<DiagnosticDefinition>,
        private dbService: DbService) { }

    /**
     *
     */
    async getDefinitionById(id: string): Promise<DiagnosticDefinition> {
        const def = await this.definitionRepo.findOne({ where: { id: id } });
        if (def) {
            return def;
        }
        throw new HttpException('Diagnostic definition with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async saveDefinition(def: DiagnosticDefinition): Promise<DiagnosticDefinition> {
        const newDef = this.definitionRepo.create({ ...def, });
        await this.definitionRepo.save(newDef);
        return newDef;
    }

    /**
     *
     */
    async updateDefinition(data: DiagnosticDefinition): Promise<DiagnosticDefinition> {
        const t: DiagnosticDefinition = await this.getDefinitionById(data.id);

        const newDef = this.definitionRepo.create({ ...t, ...data, });
        await this.definitionRepo.save(newDef);
        return newDef;
    }

    /**
     *
     */
    async getDefinition(id: number, language: string = 'fr'): Promise<DiagnosticDefinition> {
        try {
            let query = `
                SELECT * FROM diagnostic_definition d
                JOIN diagnostic_definition_name n on d.id = n.definition_id
                WHERE d.id = $1
                AND d.deleted = false
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
    // async getDefaultDefinitions(language: string = 'fr'): Promise<Array<DiagnosticDefinition>> {
    //     try {
    //         let query = `
    //             SELECT * FROM diagnostic_definition d
    //             JOIN diagnostic_definition_name n on d.id = n.definition_id
    //             WHERE d.dentist_id is NULL
    //             AND d.deleted = false
    //             AND n.language = $1
    //         `

    //         return await this.dbService.db.manyOrNone(query, [language]);
    //     }
    //     catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
     *
     */
    async getDefinitionsForDentist(dentistId: number, language: string = 'fr'): Promise<Array<DiagnosticDefinition>> {
        try {
            let query = `
                SELECT * FROM diagnostic_definition d
                JOIN diagnostic_definition_name n on d.id = n.definition_id
                WHERE d.created_by = $1
                AND d.deleted = false
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
    // async saveDefinition(d: DiagnosticDefinition, language: string = 'fr'): Promise<void> {

    //     await this.dbService.db.tx('saveDiagnosticDefinitionTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const query = `
    //                 INSERT INTO diagnostic_definition (created_by, created_on) 
    //                 VALUES ($1, $2)
    //                 RETURNING id
    //             `
    //             const tid = await this.dbService.db.one(query, [d.createdBy, new Date()]);

    //             const nQuery = `
    //                 INSERT INTO diagnostic_definition_name (definition_id, language, name) 
    //                 VALUES ($1, $2, $3)
    //             `
    //             await this.dbService.db.none(nQuery, [tid.id, language, d.name]);
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
    // async updateDefinition(d: DiagnosticDefinition): Promise<void> {

    //     await this.dbService.db.tx('updateDiagnosticDefinitionTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const query = `
    //                 UPDATE diagnostic_definition 
    //                 SET deleted = $1
    //                 WHERE id = $2
    //             `
    //             await this.dbService.db.none(query, [d.deleted, d.id]);

    //             const nQuery = `
    //                 UPDATE diagnostic_definition_name
    //                 SET name = $1
    //                 WHERE definition_id = $2
    //             `
    //             await this.dbService.db.none(nQuery, [d.name, d.id]);
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
    async getById(id: string): Promise<Diagnostic> {
        let qb = this.diagnosticRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.definition', 'd')
        qb = qb.where('t.id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Diagnostic with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async getForDentist(dentistId: string): Promise<Array<Diagnostic>> {
        let qb = this.diagnosticRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.definition', 'd')
        qb = qb.where('t.dentist.id = :dentistId', { dentistId: dentistId });

        return await qb.getMany()
    }

    /**
     *
     */
    async getForPatient(patientId: string): Promise<Array<Diagnostic>> {
        let qb = this.diagnosticRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.definition', 'd')
        qb = qb.where('t.patient.id = :patientId', { patientId: patientId });

        return await qb.getMany()
    }

    /**
     *
     */
    async getForPatientAndDentist(dentistId: string, patientId: string): Promise<Array<Diagnostic>> {
        let qb = this.diagnosticRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.definition', 'd')
        qb = qb.where('t.dentist.id = :dentistId', { dentistId: dentistId });
        qb = qb.andWhere('t.patient.id = :patientId', { patientId: patientId });

        return await qb.getMany()
    }

    /**
     *
     */
    async saveDiagnostic(def: Diagnostic): Promise<Diagnostic> {
        const newT = this.diagnosticRepo.create({ ...def, });
        await this.diagnosticRepo.save(newT);
        return newT;
    }

    /**
     *
     */
    async updateDiagnostic(data: Diagnostic): Promise<Diagnostic> {
        const t: Diagnostic = await this.getById(data.id);

        const newT = this.diagnosticRepo.create({ ...t, ...data, });
        await this.diagnosticRepo.save(newT);
        return newT;
    }

    // /**
    //  *
    //  */
    // async getById(id: number, language: string = 'fr'): Promise<Diagnostic> {
    //     try {
    //         let query = `
    //             SELECT d.id, d.patient_id, d.dentist_id, d.start_date, d.comment, d.created_on, n.name
    //             FROM diagnostic d
    //             JOIN diagnostic_definition f on d.definition_id = f.id
    //             JOIN diagnostic_definition_name n ON n.definition_id = f.id
    //             WHERE d.id = $1
    //             AND d.end_date IS NULL
    //         `

    //         return await this.dbService.db.oneOrNone(query, [id, language]);
    //     }
    //     catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    // /**
    //  *
    //  */
    // async getForDentist(dentistId: number): Promise<Array<Diagnostic>> {

    //     try {
    //         let query = `
    //             SELECT d.id, d.patient_id, d.dentist_id, d.start_date, d.comment, d.created_on, n.name
    //             FROM diagnostic d
    //             JOIN diagnostic_definition f on d.definition_id = f.id
    //             JOIN diagnostic_definition_name n ON n.definition_id = f.id
    //             WHERE d.dentist_id = $1
    //             AND d.end_date IS NULL
    //             ORDER BY d.created_on DESC
    //         `
    //         const diagnostics: Array<Diagnostic> = await this.dbService.db.manyOrNone(query, dentistId);

    //         for (const d of diagnostics) {
    //             query = `SELECT * FROM diagnostic_tooth_lnk WHERE diagnostic_id = $1`;
    //             d.teeth = await this.dbService.db.manyOrNone(query, d.id);
    //         }

    //         return diagnostics;
    //     } catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    // /**
    //  *
    //  */
    // async getForPatient(patientId: number): Promise<Array<Diagnostic>> {

    //     try {
    //         let query = `
    //             SELECT d.id, d.patient_id, d.dentist_id, d.start_date, d.comment, d.created_on, n.name
    //             FROM diagnostic d
    //             JOIN diagnostic_definition f on d.definition_id = f.id
    //             JOIN diagnostic_definition_name n ON n.definition_id = f.id
    //             WHERE d.patient_id = $1
    //             AND d.end_date IS NULL
    //             ORDER BY d.created_on DESC
    //         `
    //         const diagnostics: Array<Diagnostic> = await this.dbService.db.manyOrNone(query, patientId);

    //         for (const d of diagnostics) {
    //             query = `SELECT * FROM diagnostic_tooth_lnk WHERE diagnostic_id = $1`;
    //             d.teeth = await this.dbService.db.manyOrNone(query, d.id);
    //         }

    //         return diagnostics;
    //     } catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    // /**
    //  *
    //  */
    // async getForPatientAndDentist(patientId: number, dentistId: number): Promise<Array<Diagnostic>> {
    //     try {
    //         let query = `
    //             SELECT d.id, d.patient_id, d.dentist_id, d.start_date, d.comment, d.created_on, n.name
    //             FROM diagnostic d
    //             JOIN diagnostic_definition f on d.definition_id = f.id
    //             JOIN diagnostic_definition_name n ON n.definition_id = f.id
    //             WHERE d.patient_id = $1 
    //             AND d.dentist_id = $2
    //             AND d.end_date IS NULL
    //             ORDER BY d.created_on DESC
    //         `
    //         const diagnostics: Array<Diagnostic> = await this.dbService.db.manyOrNone(query, [patientId, dentistId]);

    //         for (const d of diagnostics) {
    //             // console.log(d.id)
    //             query = `SELECT * FROM diagnostic_tooth_lnk WHERE diagnostic_id = $1`;
    //             d.teeth = await this.dbService.db.manyOrNone(query, d.id);
    //         }

    //         // console.log(diagnostics)

    //         return diagnostics;
    //     } catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
     *
     */
    async getForPatientAndTooth(patientId: number, toothFdiNumber: number): Promise<Array<Diagnostic>> {

        try {
            let query = `
                SELECT d.id, d.patient_id, d.dentist_id, d.start_date, d.comment, d.created_on, n.name
                FROM diagnostic d
                JOIN diagnostic_definition f on d.definition_id = f.id
                JOIN diagnostic_definition_name n ON n.definition_id = f.id
                JOIN diagnostic_tooth_lnk l ON l.diagnostic_id = d.id
                WHERE d.patient_id = $1
                AND l.tooth_fdi_number = $2
                AND d.end_date IS NULL
                ORDER BY d.created_on DESC
            `
            const diagnostics: Array<Diagnostic> = await this.dbService.db.manyOrNone(query, [patientId, toothFdiNumber]);

            // for (const d of diagnostics) {
            //     // console.log(d.id)
            //     query = `
            //         SELECT * 
            //         FROM diagnostic_tooth_lnk 
            //         WHERE diagnostic_id = $1
            //         AND tooth_fdi_number = $2`;
            //     d.teeth = await this.dbService.db.manyOrNone(query, [d.id, toothFdiNumber]);
            // }

            // console.log(diagnostics)

            return diagnostics;
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    // async getForPatientAndTeeth(patientId: number, toothFdiNumbers: Array<number>): Promise<Array<Diagnostic>> {
    //     console.log(toothFdiNumbers)
    //     let result: Array<Diagnostic> = new Array<Diagnostic>();
    //     for (const toothFdiNumber of toothFdiNumbers) {
    //         const diagnostics: Array<Diagnostic> = await this.getForPatientAndTooth(patientId, toothFdiNumber);
    //         result = result.concat(diagnostics);
    //     }
    //     return result;
    // }

    /**
     *
     */
    // async saveDiagnostic(d: Diagnostic): Promise<number> {

    //     // this.logger.log(d)

    //     return await this.dbService.db.tx('addDiagnosticTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const query = `
    //                 INSERT INTO diagnostic (definition_id, patient_id, dentist_id, comment, start_date, created_on) 
    //                 VALUES ($1, $2, $3, $4, $5, $6)
    //                 RETURNING id`;

    //             const idObj = await this.dbService.db.one(query, [d.definitionId, d.patientId, d.dentistId, d.comment, d.startDate, new Date()]);
    //             d.id = idObj['id'];

    //             const hQuery = `
    //                 INSERT INTO diagnostic_tooth_lnk (diagnostic_id, tooth_fdi_number, tooth_parts) 
    //                 VALUES ($1, $2, $3)`;

    //             for (const td of d.teeth) {
    //                 await this.dbService.db.none(hQuery, [d.id, td.toothFdiNumber, td.toothParts]);
    //             }

    //             const def: DiagnosticDefinition = await this.getDefinition(d.definitionId);
    //             this.diagnosticSubject.next(Object.assign(d, def));

    //             return d.id;
    //         } catch (e) {
    //             this.logger.error(e.message, new Error(e).stack)
    //             throw e;
    //         }
    //     });
    // }

    /**
     *
     */
    async init(dentistid: number): Promise<void> {

        return await this.dbService.db.tx('initDiagnosticDataTx', async tx => {
            // tx.ctx = transaction context object

            const diagnostics = [
                'Carie', 'Carie initiale', 'Implant', 'Mobilité', 'Coloration', 'Courone', 'Obturation',
                'Reste radiculaire', 'Traitement de racine', 'Foyer', 'Pont', 'Prothèse amovible'
            ]

            try {
                for (const d of diagnostics) {
                    const query = `INSERT INTO diagnostic_definition (created_by, created_on) VALUES ($1, $2) RETURNING id`;

                    const idObj = await this.dbService.db.one(query, [dentistid, new Date()]);
                    const id = idObj['id'];
    
                    const hQuery = `INSERT INTO diagnostic_definition_name VALUES ($1, $2, $3)`;
                    await this.dbService.db.none(hQuery, [id, 'fr', d]);
                }

            } catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        });
    }
}
