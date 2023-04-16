import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ServiceLink } from 'libs/shared/src/lib/service.entity';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.entity';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicingService {
    private readonly logger = new Logger(ServicingService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(ServiceDefinition) private definitionRepo: Repository<ServiceDefinition>,
        private dbService: DbService) { }

    /**
     *
     */
    async getDefinitionById(id: string): Promise<ServiceDefinition> {
        const def = await this.definitionRepo.findOne({ where: { id: id } });
        if (def) {
            return def;
        }
        throw new HttpException('Service definition with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async saveDefinition(def: ServiceDefinition): Promise<ServiceDefinition> {
        const newDef = this.definitionRepo.create({ ...def, });
        await this.definitionRepo.save(newDef);
        return newDef;
    }

    /**
     *
     */
    async updateDefinition(data: ServiceDefinition): Promise<ServiceDefinition> {
        const t: ServiceDefinition = await this.getDefinitionById(data.id);

        const newDef = this.definitionRepo.create({ ...t, ...data, });
        await this.definitionRepo.save(newDef);
        return newDef;
    }

    /**
     *
     */
    async getDefinition(id: number, language: string = 'fr'): Promise<ServiceDefinition> {
        try {
            const query = `
                SELECT s.id, s.created_by, s.created_on, s.deleted, n.category, n.name
                FROM service_definition s
                JOIN service_definition_name n on s.id = n.definition_id
                WHERE s.id = $1 
                AND s.deleted = false
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
    async getDefinitionsForDentist(dentistId: number, language: string = 'fr'): Promise<Array<ServiceDefinition>> {
        try {
            const query = `
                SELECT s.id, s.created_by, s.created_on, n.category, n.name
                FROM service_definition s
                JOIN service_definition_name n on s.id = n.definition_id
                WHERE s.created_by = $1 
                AND s.deleted = false
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
    async getDefinitionsForSurgery(surgeryId: number, language: string = 'fr'): Promise<Array<ServiceDefinition>> {
        try {
            const query = `
                SELECT s.id, s.created_by, s.created_on, n.category, n.name
                FROM service_definition s
                JOIN service_definition_name n on s.id = n.definition_id
                JOIN dentist_surgery_lnk ss on s.created_by = ss.dentist_id
                WHERE ss.surgery_id = $1
                AND s.deleted = false
                AND ss.deleted = false
                AND n.language = $2`
            return await this.dbService.db.manyOrNone(query, [surgeryId, language]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async findDentists(surgeryId: number): Promise<Array<any>> {
        try {
            const query = `
                SELECT d.*, ds.timing FROM dentist d
                JOIN dentist_service_lnk ds ON d.id = ds.dentist_id
                WHERE ds.definition_id = $1`
            return await this.dbService.db.manyOrNone(query, surgeryId);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    // async saveDefinition(s: ServiceDefinition, links: Array<ServiceLink>, language: string = 'fr'): Promise<any> {

    //     await this.dbService.db.tx('saveServiceTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const query = `
    //                 INSERT INTO service_definition (created_by, created_on) 
    //                 VALUES ($1, $2)
    //                 RETURNING id
    //             `
    //             const sid = await this.dbService.db.one(query, [s.createdBy, new Date()]);

    //             const nQuery = `
    //                 INSERT INTO service_definition_name (definition_id, language, category, name) 
    //                 VALUES ($1, $2, $3, $4)
    //             `
    //             await this.dbService.db.none(nQuery, [sid.id, language, s.category, s.name]);

    //             const linkQuery = `
    //                 INSERT INTO dentist_service_lnk (definition_id, dentist_id, timing)
    //                 VALUES ($1, $2, 3)
    //             `

    //             if (links == null) {
    //                 links = [];
    //             }
    //             links.forEach(async (l: ServiceLink) => {
    //                 await this.dbService.db.none(linkQuery, [l.definitionId, l.dentistId, l.timing]);
    //             });

    //             return sid.id;
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
    // async updateDefinition(s: ServiceDefinition, links?: Array<ServiceLink>): Promise<void> {

    //     await this.dbService.db.tx('updateServiceTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const query = `
    //                 UPDATE service_definition 
    //                 SET deleted = $1
    //                 WHERE id = $2
    //             `
    //             await this.dbService.db.none(query, [s.deleted, s.id]);

    //             const nQuery = `
    //                 UPDATE service_definition_name
    //                 SET name = $1, category = $2
    //                 WHERE definition_id = $3
    //             `
    //             await this.dbService.db.none(nQuery, [s.name, s.category, s.id]);

    //             const aQuery = `
    //                 DELETE FROM dentist_service_lnk
    //                 WHERE definition_id = $1
    //             `
    //             await this.dbService.db.none(aQuery, [s.id]);

    //             const linkQuery = `
    //                 INSERT INTO dentist_service_lnk (definition_id, dentist_id, timing)
    //                 VALUES ($1, $2, $3)
    //             `

    //             if (links == null) {
    //                 links = [];
    //             }
    //             links.forEach(async (l: ServiceLink) => {
    //                 await this.dbService.db.none(linkQuery, [l.definitionId, l.dentistId, l.timing]);
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
    async getLinks(definitionId: number): Promise<Array<ServiceLink>> {
        try {
            const query = `
                SELECT ds.dentist_id, ds.definition_id, ds.timing
                FROM dentist_service_lnk ds
                WHERE ds.definition_id = $1
            `;
            return await this.dbService.db.manyOrNone(query, [definitionId]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getLinksForDentist(dentistId: number, language: string = 'fr'): Promise<Array<any>> {
        try {
            const query = `
                SELECT ds.dentist_id, ds.definition_id, ds.timing, n.category, n.name
                FROM dentist_service_lnk ds
                JOIN service_definition d on d.id = ds.definition_id
                JOIN service_definition_name n on d.id = n.definition_id
                WHERE ds.dentist_id = $1
                AND d.deleted = false
                AND n.language = $2
            `;
            return await this.dbService.db.manyOrNone(query, [dentistId, language]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async linkDentist(service: ServiceLink): Promise<void> {
        try {
            const query = `
                INSERT INTO dentist_service_lnk (dentist_id, definition_id, timing) 
                VALUES ($1, $2, $3)
            `;
            await this.dbService.db.none(query, [service.dentistId, service.definitionId, service.timing]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async unlinkDentist(service: ServiceLink): Promise<void> {
        try {
            const query = `
                DELETE FROM dentist_service_lnk 
                WHERE dentist_id = $1
                AND definition_id = $2
            `;
            await this.dbService.db.none(query, [service.dentistId, service.definitionId]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getServicesForPatient(patientId: number, language: string = 'fr'): Promise<Array<any>> {
        try {
            const query = `
                SELECT s.id, s.created_by, s.created_on, n.category, n.name, l.timing
                FROM service_definition s
                JOIN service_definition_name n on s.id = n.definition_id
                JOIN dentist_service_lnk l on l.definition_id = s.id
                JOIN dentist_patient_lnk p on p.dentist_id = s.created_by
                WHERE p.patient_id = $1
                AND s.deleted = false
                AND n.language = $2
            `;
            return await this.dbService.db.manyOrNone(query, [patientId, language]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }
}
