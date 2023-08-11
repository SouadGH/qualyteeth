import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from './intervention.entity';


@Injectable()
export class InterventionService {
    private readonly logger = new Logger(InterventionService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
    ) {
    }

    /**
     *
     */
    async getById(id: string): Promise<Intervention> {
        let qb = this.interventionRepo.createQueryBuilder('t');
        qb = qb.where('t.id = :id', { id: id });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Intervention with this id does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async save(data: Intervention): Promise<Intervention> {
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

}
