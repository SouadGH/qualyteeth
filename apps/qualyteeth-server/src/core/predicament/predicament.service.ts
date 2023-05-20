import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from 'libs/shared/src/lib/act.entity';
import { Category } from 'libs/shared/src/lib/category.entity';
import { Intervention } from 'libs/shared/src/lib/intervention.entity';
import { Predicament } from 'libs/shared/src/lib/predicament.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PredicamentService {
    private readonly logger = new Logger(PredicamentService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Predicament) private predicamentRepo: Repository<Predicament>,
        @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(Act) private actRepo: Repository<Act>,
        // @InjectRepository(Practitioner) private practitionerRepo: Repository<Practitioner>,
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
        return newT;
    }

    /**
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
        let qb = this.categoryRepo.createQueryBuilder('c');
        qb = qb.leftJoin('c.predicaments', 'pr');
        qb = qb.where('pr.id = :predicamentId', { predicamentId: predicamentId });
        return await qb.getMany();
    }

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
    async findActs(predicamentId: string): Promise<Array<Act>> {
        let qb = this.actRepo.createQueryBuilder('a');
        qb = qb.leftJoin('a.predicaments', 'pr');
        qb = qb.where('pr.id = :predicamentId', { predicamentId: predicamentId });
        return await qb.getMany();
    }

}
