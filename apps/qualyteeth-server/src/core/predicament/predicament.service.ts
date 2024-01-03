import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from 'apps/qualyteeth-server/src/core/act/act.entity';
import { Category } from 'apps/qualyteeth-server/src/core/category/category.entity';
<<<<<<< HEAD
import { IsNull, Repository, TreeRepository } from 'typeorm';
import { Predicament } from './predicament.entity';
import { Intervention } from '../intervention/intervention.entity';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
import { Practitioner } from '../practitioner/practitioner.entity';
import { UserType } from 'libs/shared/src/lib/dto/user.dto';
import { User } from '../user/user.entity';
=======
import { Repository } from 'typeorm';
import { Predicament } from './predicament.entity';
import { Intervention } from '../intervention/intervention.entity';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617


@Injectable()
export class PredicamentService {
<<<<<<< HEAD

=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    private readonly logger = new Logger(PredicamentService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Predicament) private predicamentRepo: Repository<Predicament>,
        @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
<<<<<<< HEAD
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Practitioner) private practitionerRepo: Repository<Practitioner>,
        //@InjectRepository(Category) private categoryRepo: Repository<Category>,
       // @InjectRepository(Act) private actRepo: Repository<Act>,
        // @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    ) {
    }
    async getAllPredicaments() {
        return this.predicamentRepo.find({ relations: ['practitioner', 'interventions'] });
    }
    /**
     *
     */
    async getById(id: string) {
        const predicament = await this.predicamentRepo.findOne({ where: { id }, relations: ['practitioner',  'interventions'] });
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
     *Create a new predicament with or not the id of practitioner
     */
    async save(data: Predicament): Promise<Predicament> {

        const predicament: Predicament = data['predicament'];
        if (data['userId'] != null) {
            const practitioner: Practitioner = await this.getPractitionerByUserId(data['userId']);
            predicament.practitioner = practitioner;
        } /*else {
            predicament.practitioner = null;
        }*/

        const newT = this.predicamentRepo.create({ ...predicament, });
        await this.predicamentRepo.save(newT);

=======
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(Act) private actRepo: Repository<Act>,
        // @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    ) {
    }

    /**
     *
     */
    async getById(id: string): Promise<Predicament> {
        let qb = this.predicamentRepo.createQueryBuilder('t');
        qb = qb.where('t.id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Predicament with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async save(data: Predicament): Promise<Predicament> {
        const newT = this.predicamentRepo.create({ ...data, });
        await this.predicamentRepo.save(newT);
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
        return newT;
    }

    /**
<<<<<<< HEAD
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
        const newPredicament = await this.predicamentRepo.save(data);
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
        const deletepredicament = await this.predicamentRepo.softDelete(id);
        if (!deletepredicament.affected) {
            throw new HttpException('Predicament not found', HttpStatus.NOT_FOUND);
        }
    }
    /**
     *Restore a deleted patient according to his id
     */
    async restore(id: string) {
        const restorepredicament = await this.predicamentRepo.restore(id);
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
    async findPredicamentsByPractitionerId(userId: string): Promise<Array<Predicament>> {

        const practitionerID = (await this.getPractitionerByUserId(userId)).id;
        const predicaments = (await this.getByUserId(practitionerID)).predicaments;
        if (predicaments) {
            return predicaments;
        }
        throw new HttpException('Practitioner with this id has not predicaments.', HttpStatus.NOT_FOUND);
    }

    /**
    * Find connected predicaments to the practitioner according to his id
    */
    async findPredicamentsByType(type: PredicamentType): Promise<Array<Predicament>> {
        const predicaments = await this.predicamentRepo.find({ where: { type: type } });
        if (predicaments) {
            return predicaments;
        }
        throw new HttpException('Predicaments with this Type does not exist.', HttpStatus.NOT_FOUND);
    }
    /**
    * Find connected predicaments per his type to the practitioner according to his id
    */
    async findPredicamentsByTypeForPractitionerID(type: PredicamentType, data: string) {

        if (data['userId'] != null) {
            //const practitioner: Practitioner = await this.getByUserId(data['userId']);
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
    }
    /**
     *
     */
    /*async findCategories(predicamentId: string): Promise<Array<Category>> {
=======
     *
     */
    async update(data: Predicament): Promise<Predicament> {
        const t: Predicament = await this.getById(data.id);

        const newT = this.predicamentRepo.create({ ...t, ...data, });
        await this.predicamentRepo.save(newT);
        return newT;
    }

    /**
     *
     */
    async findCategories(predicamentId: string): Promise<Array<Category>> {
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
        let qb = this.categoryRepo.createQueryBuilder('c');
        qb = qb.leftJoin('c.predicaments', 'pr');
        qb = qb.where('pr.id = :predicamentId', { predicamentId: predicamentId });
        return await qb.getMany();
<<<<<<< HEAD
    }*/
=======
    }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

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
<<<<<<< HEAD
   /* async findActs(predicamentId: string): Promise<Array<Act>> {
=======
    async findActs(predicamentId: string): Promise<Array<Act>> {
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
        let qb = this.actRepo.createQueryBuilder('a');
        qb = qb.leftJoin('a.predicaments', 'pr');
        qb = qb.where('pr.id = :predicamentId', { predicamentId: predicamentId });
        return await qb.getMany();
<<<<<<< HEAD
    }*/
=======
    }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

}
