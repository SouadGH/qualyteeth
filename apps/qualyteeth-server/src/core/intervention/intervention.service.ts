import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from './intervention.entity';
import { Patient } from '../patient/patient.entity';
import { User } from '../user/user.entity';
import { Practitioner } from '../practitioner/practitioner.entity';


@Injectable()
export class InterventionService {
    private readonly logger = new Logger(InterventionService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
       // @InjectRepository(Patient) private patientRepo: Repository<Patient>,
       // @InjectRepository(User) private userRepo: Repository<User>,
    ) {
    }
    async getAllInterventions() {
        return this.interventionRepo.find({ relations: ['predicament','plan','tooth','materials','comments'] });
    }
    /**
     *Collecte an intervention according to his ID
     */
    async getById(id: string) {

        const intervention = await this.interventionRepo.findOne({ where: { id }, relations: ['predicament','plan','tooth','materials','comments'] });
        if (intervention) {
            return intervention;
        }

        //throw new PostNotFoundException(id);
       /* let qb = this.interventionRepo.createQueryBuilder('t');
        qb = qb.where('t.id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Intervention with this id does not exist', HttpStatus.NOT_FOUND);*/
    }

    /**
    *Collecte all interventions according to the id of predicamentPlan
    */
     async findInterventionsForPredicamentPlanID(predicamentPlanId: string) {
         const interventions = this.interventionRepo.find({ where: { plan :{id: predicamentPlanId} }, relations: ['predicament','plan','tooth','materials','comments'] });
          if (interventions) {
             return interventions;
         }
         throw new HttpException('Predicament Plan  with this id has not interventions.', HttpStatus.NOT_FOUND);
     }

    /**
     *
     */
    async save(data: Intervention): Promise<Intervention> {
         //collecte the patient 
        // const patient :Patient = await this.patientRepo.findOne({where :{id: data['patientId']}});
      /*   data.pati.patient = patient;
         //Collecte the practitioner
         const practitioner :Practitioner =  (await this.userRepo.findOne({ where: { id: data['userId'] },relations :['practitioners'] })).practitioners[0];
         data.practitioner = practitioner;
        data.*/

        const newT = this.interventionRepo.create({ ...data, });
       
        await this.interventionRepo.save(newT);
        return newT;
    }

    /**
     *
     */
    async update(data: Intervention): Promise<Intervention> {
        const t: Intervention = await this.getById(data.id);

        const newT = this.interventionRepo.create({ ...t, ...data, });
        await this.interventionRepo.save(newT);
        return newT;
    }

     /**
     *Delete intervention according to his id: softdelete
     */
     async delete(id: string) {
      
        const deleteintervention = await this.interventionRepo.softDelete(id);
        if (!deleteintervention.affected) {
            throw new HttpException('Intervention not found', HttpStatus.NOT_FOUND);
        }
    }
      /**
     *Restore a deleted intervention according to his id
     */
     async restore(id: string) {
        const restoreintervention = await this.interventionRepo.restore(id);
        const intervention = await this.getById(id);

        if (!restoreintervention.affected) {
            throw new HttpException('Intervention not found', HttpStatus.NOT_FOUND);
        }
        else {
            return intervention;
        }
    }

}
