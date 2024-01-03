import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
import { PractitionerService } from '../practitioner/practitioner.service';
<<<<<<< HEAD
import { User } from '../user/user.entity';
import { any } from '@hapi/joi';
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Injectable()
export class PatientsService {
    private readonly logger = new Logger(PatientsService.name);

    /**
<<<<<<< HEAD
     *Constructor
=======
     *
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
     */
    constructor(
        @InjectRepository(Patient) private patientRepo: Repository<Patient>,
        @InjectRepository(Practitioner) private practitionerRepo: Repository<Practitioner>,
<<<<<<< HEAD
        @InjectRepository(User) private userRepo: Repository<User>,

    ) { }

    /**
    *Collects all patients in platforme
    */
    async findAll() {
        return this.patientRepo.find({ relations: ['practitioners', 'user', 'predicamentPlans', 'documents'] });
    }

    /**
    *Recovers a patient according to his Id
    */
    async getById(id: string) {
        const patient = await this.patientRepo.findOne({ where: { id }, relations: ['practitioners', 'user', 'predicamentPlans', 'documents'] });
        if (patient) {
            return patient;
        }
        throw new HttpException('Patient with this id does not exist', HttpStatus.NOT_FOUND);

    }
    /**
     *Recovers a practitioner according to his Id
     */
    async getByUserId(userId: string): Promise<Practitioner | null> {
        const practitioner = await this.practitionerRepo.findOne({ where: { id: userId } });
        if (practitioner) {
            return practitioner;
        }
        throw new HttpException('Practitioner with this user id does not exist', HttpStatus.NOT_FOUND);

    }

    /**
     *Updates a patient according to his Id
     */
    async update(id: string, data: Patient) {
        const newT = await this.patientRepo.update(id, data);        
        await this.userRepo.update(data.user.id,data.user);
        const updatedPost = await this.patientRepo.findOne({ where: { id }, relations: ['practitioners', 'user', 'predicamentPlans', 'documents'] });

        if (updatedPost) {

            return updatedPost
        }
        throw new HttpException('Patient with this id does not exist', HttpStatus.NOT_FOUND);

    }
    /**
     *find practitioner with him userId
     */
     async getPractitionerByUserId(id: string): Promise<Practitioner> {
        const practitioner =  (await this.userRepo.findOne({ where: { id: id },relations :['practitioners'] })).practitioners[0];
    if (practitioner) {
      return practitioner;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
     
    }
    /**
     *Create new patient and associate him to  practitioner(userId)
     */
    async save(data: any): Promise<Patient> {
   
        const patient: Patient = data['patient'];
        const practitioner: Practitioner = (await this.getPractitionerByUserId(data['userId']));
        
        patient.practitioners = patient.practitioners == null ? [] : patient.practitioners;
        patient.practitioners.push(practitioner);
       
        /*****créer newuser avant patient */
        const user :User= new User();
        user.firstname = patient.firstname;
        user.lastname = patient.lastname;
        user.email = patient.email;
        user.phoneNumber = patient.phoneNumber;
        user.password = "00000000";
       // user.gender = patient.user.gender;
        const newUser:User = await this.userRepo.save(user);        

       const newT = this.patientRepo.create({ ...patient, });        
        await this.patientRepo.save(newT);

        return newT;
    }
    /**
     *Delete patient according to his id: softdelete
     */
    async delete(id: string) {
        const patient = await this.getById(id);
        const deleteResponse = await this.patientRepo.softDelete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
        }

    }
    /**
     *Restore a deleted patient according to his id
     */
    async restore(id: string) {
        const restoreResponse = await this.patientRepo.restore(id);
        const patient = await this.getById(id);

        if (!restoreResponse.affected) {
            throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
        }
        else {
            return patient;
        }


    }
    /**
    * Find connected practitioners to the patient according to his id
    */
    async findConnectedPractitioners(patientId: string): Promise<Array<Practitioner>> {
        return (await this.getById(patientId)).practitioners;
    }
    /**************to be continued*********************** */

=======
    ) { }

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    // /**
    //  *
    //  */
    // async findByUserId(userId: number): Promise<Patient> {
    //     let qb = this.patientRepo.createQueryBuilder('p');
    //     qb = qb.leftJoin('p.user', 'u')
    //     qb = qb.where('u.id = :userId', { userId: userId });

    //     const t = await qb.getOne();
    //     if (t) {
    //         return t;
    //     }
    //     throw new HttpException('Patient for this user id does not exist', HttpStatus.NOT_FOUND);

    //     // try {
    //     //     const query = `SELECT * FROM patient WHERE account_id = $1`
    //     //     return await this.dbService.db.oneOrNone(query, userId);
    //     // }
    //     // catch (e) {
    //     //     this.logger.error(e.message, new Error(e).stack)
    //     //     throw e;
    //     // }
    // }

    /**
     *
     */
    // async add(body: any): Promise<void> {
    //     const patient: Patient = body.patient;
    //     const PractitionerId: number = body.PractitionerId;

    //     await this.dbService.db.tx('addPatientTx', async tx => {
    //         // tx.ctx = transaction context object

    //         try {
    //             const q1 = `
    //                 SELECT * 
    //                 FROM patient 
    //                 WHERE email = $1
    //             `
    //             const pr = await this.dbService.db.oneOrNone(q1, [patient.userData.email]);
    //             console.log(pr)
    //             if (pr != null) {
    //                 throw new HttpException('Patient already exists', 409);
    //             }

    //             const q2 = `
    //                 INSERT INTO patient (firstname, lastname, phone_number, email, created_on)
    //                 VALUES ($1, $2, $3, $4, $5)
    //                 RETURNING id`;
    //             const r = await this.dbService.db.one(q2, [patient.userData.firstname, patient.userData.lastname, patient.userData.phoneNumber, patient.userData.email, new Date()]);
    //             console.log(r)

    //             const q3 = `
    //                 INSERT INTO Practitioner_patient_lnk (Practitioner_id, patient_id, created_on) 
    //                 VALUES ($1, $2, $3)`;
    //             await this.dbService.db.none(q3, [PractitionerId, r['id'], new Date()]);
    //         } catch (e) {
    //             this.logger.error(e.message, new Error(e).stack)
    //             throw e;
    //         }
    //     });
    // }

    // /**
    //  *
    //  */
    // async update(patient: Patient): Promise<number> {
    //     try {
    //         const query = `
    //             UPDATE patient 
    //             SET 
    //                 firstname = $1, 
    //                 lastname = $2, 
    //                 phone_number = $3,
    //                 image = $4
    //             WHERE id = $5
    //             RETURNING id`;
    //         return await this.dbService.db.one(query, [patient.userData.firstname, patient.userData.lastname, patient.userData.phoneNumber, patient.userData.image, patient.id]);
    //     } catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
     *
     */
<<<<<<< HEAD
=======
    async getById(id: string): Promise<Patient> {
        let qb = this.patientRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        qb = qb.where('t.id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Patient with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async save(data: any): Promise<Patient> {
        const patient: Patient = data['patient'];

        const practitioner: Practitioner = await this.getByUserId(data['userId'])

        patient.practitioners = patient.practitioners == null ? [] : patient.practitioners;
        patient.practitioners.push(practitioner)

        const newT = this.patientRepo.create({ ...patient, });
        await this.patientRepo.save(newT);

        return newT;
    }

    /**
     *
     */
    async getByUserId(userId: string): Promise<Practitioner | null> {
        let qb = this.practitionerRepo.createQueryBuilder('t');
        qb = qb.leftJoinAndSelect('t.user', 'u');
        qb = qb.where('u.id = :id', { id: userId });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Practitioner with this user id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async update(data: Patient): Promise<Patient> {
        const t: Patient = await this.getById(data.id);

        const newT = this.patientRepo.create({ ...t, ...data, });
        await this.patientRepo.save(newT);
        return newT;
    }

    /**
     *
     */
    async findConnectedPractitioners(patientId: number): Promise<Array<Practitioner>> {
        // let qb = this.practitionerRepo.createQueryBuilder('pr');
        // qb = qb.leftJoin('pr.predicaments', 'pred')
        // qb = qb.leftJoin('pred.plan', 'plan')
        // qb = qb.leftJoin('plan.patient', 'p')
        // qb = qb.where('p.id = :patientId', { patientId: patientId });

        let qb = this.practitionerRepo.createQueryBuilder('pr');
        qb = qb.leftJoinAndSelect('pr.user', 'u');
        qb = qb.leftJoin('pr.patients', 'p')
        qb = qb.where('p.id = :patientId', { patientId: patientId });

        return await qb.getMany();
    }

    /**
     *
     */
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    // async getConnectedSurgeries(patientId: number): Promise<Array<Surgery>> {
    //     try {
    //         const query = `
    //             SELECT s.* FROM surgery s
    //             INNER JOIN patient_surgery_lnk ps ON ps.surgery_id = d.id
    //             WHERE dp.patient_id = $1
    //         `
    //         const r = await this.dbService.db.manyOrNone(query, [patientId]);
    //         return r;
    //     }
    //     catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }

    /**
    *
    */
    // async insertImage(patient: Patient): Promise<void> {
    //     try {
    //         const query = `INSERT INTO account_img VALUES ($1, $2, $3)`;
    //         await this.dbService.db.none(query, [patient.id, patient.userData.image, new Date()]);
    //     } catch (e) {
    //         this.logger.error(e.message, new Error(e).stack)
    //         throw e;
    //     }
    // }
}
