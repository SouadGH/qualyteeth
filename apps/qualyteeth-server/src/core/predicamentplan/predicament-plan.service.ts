import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from 'apps/qualyteeth-server/src/core/act/act.entity';
import { Category } from 'apps/qualyteeth-server/src/core/category/category.entity';
import { IsNull, Repository, TreeRepository } from 'typeorm';
import { Predicament } from  '../predicament/predicament.entity';
import { Intervention } from '../intervention/intervention.entity';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
import { Practitioner } from '../practitioner/practitioner.entity';
import { UserType } from 'libs/shared/src/lib/dto/user.dto';
import { User } from '../user/user.entity';
import { PredicamentPlan } from './predicament-plan.entity';
import { Patient } from '../patient/patient.entity';


@Injectable()
export class PredicamentPlanService {

    private readonly logger = new Logger(PredicamentPlanService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(PredicamentPlan) private predicamentPlanRepo: Repository<PredicamentPlan>,
        @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Practitioner) private practitionerRepo: Repository<Practitioner>,
        //@InjectRepository(Category) private categoryRepo: Repository<Category>,
       // @InjectRepository(Act) private actRepo: Repository<Act>,
         @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    ) {
    }
    async getAllPredicamentPlans() {
        return this.predicamentPlanRepo.find({relations: ['practitioner', 'patient', 'interventions']});
    }
    /**
     *
     */
    async getById(id: string) {
        const predicament = await this.predicamentPlanRepo.findOne({ where: { id }, relations: ['practitioner', 'patient', 'interventions'] });
        if (predicament) {
            return predicament;
        }
        throw new HttpException('predicament with this id does not exist', HttpStatus.NOT_FOUND);

    }
    /**
    *Recovers a practitioner according to his Id
    */
    async getByUserId(userId: string): Promise<Practitioner | null> {
        const practitioner = await this.practitionerRepo.findOne({ where: { id: userId }, relations: ['predicaments'] });
        if (practitioner) {
            return practitioner;
        }
        throw new HttpException('Practitioner with this user id does not exist', HttpStatus.NOT_FOUND);
    }
    /**
   *find a practitioner according to his userId
   */
    async getPractitionerByUserId(id: string): Promise<Practitioner> {
        const practitioner = (await this.userRepo.findOne({ where: { id: id }, relations: ['practitioners'] })).practitioners[0];

        console.log("practitioner :" + JSON.stringify(practitioner));
        if (practitioner) {
            return practitioner;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);

    }
    /**
     *Create a new predicamentPlan with or not the id of practitioner
     */
    async save(data: PredicamentPlan): Promise<PredicamentPlan> {

        const predicamentPlan: PredicamentPlan = data['predicamentPlan'];        

        //collecte the patient 
        const patient :Patient = await this.patientRepo.findOne({where :{id: data['patientId']}});
        predicamentPlan.patient = patient;
        //Collecte the practitioner
        const practitioner :Practitioner =  (await this.userRepo.findOne({ where: { id:data['userId'] },relations :['practitioners'] })).practitioners[0];
        predicamentPlan.practitioner = practitioner;
        const newP = await this.predicamentPlanRepo.create({ ...predicamentPlan, });
        await this.predicamentPlanRepo.save(newP);

        return newP;
    }

    /**
     *Updates a patient according to his Id
     */
    async update(id: string, data: Predicament) {

        //this.repository = connectionSource.getRepository(EntityName);

/*const entityName = await this.getById(id);

Object.assign(entityName, data);

await this.predicamentRepo.save(entityName);*/
        
        //const updatePredicament = await this.getById(id);
        //console.log("updatePredicament is :"+JSON.stringify(updatePredicament));
        //Object.assign(updatePredicament, data);
        const newPredicament = await this.predicamentPlanRepo.save(data);
        //await this.userRepo.update(data.user.id,data.user);
        

        if (newPredicament) {

            return newPredicament
        }
        throw new HttpException('Predicament with this id does not exist', HttpStatus.NOT_FOUND);

    }
    /**
     *Delete predicament according to his id: softdelete
     */
    async delete(id: string) {
        //const patient = await this.getById(id);
        const deletepredicament = await this.predicamentPlanRepo.softDelete(id);
        if (!deletepredicament.affected) {
            throw new HttpException('Predicament not found', HttpStatus.NOT_FOUND);
        }
    }
    /**
     *Restore a deleted patient according to his id
     */
    async restore(id: string) {
        const restorepredicament = await this.predicamentPlanRepo.restore(id);
        const Predicament = await this.getById(id);

        if (!restorepredicament.affected) {
            throw new HttpException('Predicament not found', HttpStatus.NOT_FOUND);
        }
        else {
            return Predicament;
        }
    }

    /**
    * Find connected predicaments to the practitioner according to his id
    */
    async findPredicamentsByPractitionerId(patientId: string): Promise<Array<PredicamentPlan>> {
       //const predicamentsPlan = (await this.patientRepo.findOne({ where: { id: patientId }, relations: ['predicamentPlans'] })).predicamentPlans;
        const predicamentsPlan = this.predicamentPlanRepo.find({ where: { patient :{id: patientId} }, relations: ['practitioner', 'patient', 'interventions']});
        //const practitionerID = (await this.getPractitionerByUserId(userId)).id;
       // const predicaments = (await this.getByUserId(practitionerID)).predicaments;
        if (predicamentsPlan) {
            return predicamentsPlan;
        }
        throw new HttpException('Practitioner with this id has not predicaments.', HttpStatus.NOT_FOUND);
    }

    /**
    * Find connected predicaments to the practitioner according to his id
    */
    async findPredicamentsByType(type: PredicamentType): Promise<Array<Predicament>> {
       /* const predicaments = await this.predicamentRepo.find({ where: { type: type } });
        if (predicaments) {
            return predicaments;
        }
        throw new HttpException('Predicaments with this Type does not exist.', HttpStatus.NOT_FOUND);*/
    return []
    }
    /**
    * Find connected predicaments per his type to the practitioner according to his id
    */
   /* async findPredicamentsByTypeForPractitionerID(type: PredicamentType, data: string) {

        if (data['userId'] != null) {
              const practitioner = (await this.getPractitionerByUserId(data['userId']));
            const predicaments = (await this.predicamentRepo.find(
                {
                    where: [{
                        type: type,
                        practitioner: IsNull()
                    },
                    {
                        type: type,
                        practitioner: { id: practitioner.id }
                    }
                    ],
                    relations: ['practitioner']
                }));
            return predicaments;
        } 

        throw new Error('Method not implemented.');
    }*/
    /**
     *
     */
   /* async findCategories(predicamentId: string): Promise<Array<Category>> {
       let qb = this.categoryRepo.createQueryBuilder('c');
        qb = qb.leftJoin('c.predicaments', 'pr');
        qb = qb.where('pr.id = :predicamentId', { predicamentId: predicamentId });
        return await qb.getMany();
    }*/

    /**
     *
     */
    async findInterventions(predicamentId: string): Promise<Array<Intervention>> {
        let qb = this.interventionRepo.createQueryBuilder('i');
        qb = qb.leftJoin('i.predicament', 'pr');
        qb = qb.where('pr.id = :predicamentId', { predicamentId: predicamentId });
        return await qb.getMany();
    }

    /**
     *
     */
   /* async findActs(predicamentId: string): Promise<Array<Act>> {
        let qb = this.actRepo.createQueryBuilder('a');
        qb = qb.leftJoin('a.predicaments', 'pr');
        qb = qb.where('pr.id = :predicamentId', { predicamentId: predicamentId });
        return await qb.getMany();
    }*/

}
