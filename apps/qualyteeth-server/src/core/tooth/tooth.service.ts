import { Injectable, Logger } from '@nestjs/common';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';

@Injectable()
export class ToothService {
    private readonly logger = new Logger(ToothService.name);

    /**
     *
     */
    constructor(private dbService: DbService) { }

    /**
     *
     */
    async findByFdiNumber(fdiNumber: number, lang: string = 'fr'): Promise<Tooth> {
        try {
            const query = `
                SELECT t.fdi_number, t.svg, tn.name, tn.description FROM tooth t
                LEFT JOIN tooth_name tn ON t.fdi_number = tn.fdi_number AND tn.language = $2
                WHERE t.fdi_number = $1
            `
            return await this.dbService.db.oneOrNone(query, [fdiNumber, lang]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async findall(lang: string = 'fr'): Promise<Array<Tooth>> {
        try {
            const query = `
                SELECT t.fdi_number, t.svg, tn.name, tn.description FROM tooth t
                LEFT JOIN tooth_name tn ON t.fdi_number = tn.fdi_number AND tn.language = $1
            `
            return await this.dbService.db.many(query, [lang]);
        }
        catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }
}
