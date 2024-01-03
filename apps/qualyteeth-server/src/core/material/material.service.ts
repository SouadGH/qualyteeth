import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from 'apps/qualyteeth-server/src/core/act/act.entity';
import { Category } from 'apps/qualyteeth-server/src/core/category/category.entity';
import { IsNull, Repository } from 'typeorm';
import { Intervention } from '../intervention/intervention.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
import { UserType } from 'libs/shared/src/lib/dto/user.dto';
import { User } from '../user/user.entity';
import { Material } from './material.entity';


@Injectable()
export class MaterialService {

    private readonly logger = new Logger(MaterialService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Material) private materialRepo: Repository<Material>,
        @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
       
    ) {
    }
    async getAllMaterials() {
        return this.materialRepo.find({ relations: ['interventions'] });
    }
     /**
     *Collecte a comment according to his id
     */
     async getById(id: string) {
        const comment = await this.materialRepo.findOne({ where: { id }, relations: ['intervention'] });
        if (comment) {
            return comment;
        }
        throw new HttpException('comment with this id does not exist', HttpStatus.NOT_FOUND);

    }
     /**
     *Create a new comment with id of intervention
     */
     async save(data: Material): Promise<Material> {

        const material: Material = data['material'];    

        const newMaterial = this.materialRepo.create({ ...material, });
        await this.materialRepo.save(newMaterial);

        return newMaterial;
    }
     /**
   *find an intervention according to his Id
   */
   async getInterventionById(id: string): Promise<Intervention> {
    const intervention = (await this.interventionRepo.findOne({ where: { id: id } }));

    console.log("practitioner :" + JSON.stringify(intervention));
    if (intervention) {
        return intervention;
    }
    throw new HttpException('intervention with this id does not exist', HttpStatus.NOT_FOUND);

}

 
}
