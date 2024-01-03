import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tooth } from './tooth.entity';

@Injectable()
export class ToothService {
    private readonly logger = new Logger(ToothService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Tooth) private toothRepo: Repository<Tooth>,
    ) { }

    /**
     *
     */
    async findByFdiNumber(fdiNumber: number, lang = 'fr'): Promise<Tooth> {
        let qb = this.toothRepo.createQueryBuilder('t');
        qb = qb.where('t.fdiNumber = :fdiNumber', { fdiNumber: fdiNumber });

        const t = await qb.getOne();
        if (t) {
            return t;
        }
        throw new HttpException('Tooth with this FDI number does not exist', HttpStatus.NOT_FOUND);
    }

    /**
     *
     */
    async findall(lang = 'fr'): Promise<Array<Tooth>> {
        const qb = this.toothRepo.createQueryBuilder('t');
        return await qb.getMany();
        // try {
        //     const query = `
        //         SELECT t.fdi_number, t.svg, tn.name, tn.description FROM tooth t
        //         LEFT JOIN tooth_name tn ON t.fdi_number = tn.fdi_number AND tn.language = $1
        //     `
        //     return await this.dbService.db.many(query, [lang]);
        // }
        // catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    }
}
