
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
<<<<<<< HEAD
import { Patient } from '../patient/patient.entity';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';
import { User } from '../user/user.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Injectable()
export class DocumentService {
    private readonly logger = new Logger(DocumentService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Document) private docRepo: Repository<Document>,
<<<<<<< HEAD
        @InjectRepository(Patient) private patientRepo: Repository<Patient>,
        @InjectRepository(User) private userRepo: Repository<User>,
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    ) { }


    /**
     *
     */
    async getById(id: string): Promise<Document> {
        let qb = this.docRepo.createQueryBuilder('t');
        qb = qb.where('t.id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Document with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async saveDocument(file: any, body: any): Promise<Document> {
        const data: Document = {
            file: file,
            filename: file.originalname
        }
<<<<<<< HEAD
        //collecte the patient 
        const patient :Patient = await this.patientRepo.findOne({where :{id: body['patientId']}});
        data.patient = patient;
        //Collecte the practitioner
        const practitioner :Practitioner =  (await this.userRepo.findOne({ where: { id:body['userId'] },relations :['practitioners'] })).practitioners[0];
        data.practitioner = practitioner;
=======

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
        const newT = this.docRepo.create({ ...data, });
        return await this.docRepo.save(newT);

        // try {
        //     // console.log(body)

        //     const query = `
        //             INSERT INTO document (patient_id, dentist_id, treatment_id, filename, file_data, created_on) 
        //             VALUES ($1, $2, $3, $4, $5, $6)
        //             RETURNING id
        //         `
        //     return await this.dbService.db.one(query, [body['patientId'], body['dentistId'], body['treatmentId'], file.originalname, `\\x${file.buffer.toString('hex')}`, new Date()]);
        // }
        // catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    }

    /**
     *
     */
    async getDocumentsForPatient(patientId: number): Promise<Array<any>> {
        let qb = this.docRepo.createQueryBuilder('t');
        qb = qb.leftJoin('t.patient', 'p')
        qb = qb.where('p.id = :patientId', { patientId: patientId });

        return await qb.getMany();


        // try {
        //     const query = `SELECT id, treatment_id, filename, created_on FROM document WHERE patient_id = $1`
        //     return await this.dbService.db.manyOrNone(query, patientId);
        // } catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    }

    /**
     *
     */
    async getDocumentsForPatientAndTreatment(patientId: number, treatmentId: number): Promise<Array<any>> {
        return []
        // try {
        //     const query = `SELECT id, treatment_id, filename, created_on FROM document WHERE patient_id = $1 and treatment_id = $2`
        //     return await this.dbService.db.manyOrNone(query, [patientId, treatmentId]);
        // } catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    }

}
