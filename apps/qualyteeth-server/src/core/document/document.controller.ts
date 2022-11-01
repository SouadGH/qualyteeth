import { Controller, Get, Param, Post, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { DocumentService } from './document.service';
import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';

@Controller('document')
export class DocumentController {

    constructor(private documentSvc: DocumentService) { }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard)
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('document', {
    //     storage: diskStorage({
    //         destination: (req, file, cb) => {
    //             const dir = 'documents/' + req.user['userId'];
    //             if (!existsSync(dir)) {
    //                 mkdir(dir, (err) => {
    //                     if (err) { throw err; }
    //                 });
    //             }
    //             cb(null, dir);
    //         },
    //         filename: (req, file, cb) => {
    //             cb(null, file.originalname)
    //         }
    //     })
    // }))
    // async addDocument(@UploadedFile() file, @Request() req) {
    //     if (req.body['treatmentId'] != null) {
    //         return await this.documentSvc.saveDocument(req.body['patientId'], file, req.body['treatmentId']);
    //     } else {
    //         return await this.documentSvc.saveDocument(req.body['patientId'], file);
    //     }
    // }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('document'))
    async addDocument(@UploadedFile() file, @Request() req) {
        return await this.documentSvc.saveDocument(file, req.body);
        // if (req.body['treatmentId'] != null) {
        //     return await this.documentSvc.saveDocument(req.body['patientId'], file, req.body['treatmentId']);
        // } else {
        //     return await this.documentSvc.saveDocument(req.body['patientId'], file);
        // }
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':patientId/all')
    async getDocumentsForPatient(@Param() params) {
        return await this.documentSvc.getDocumentsForPatient(params.patientId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':patientId/treatment/:treatmentId')
    async getDocumentsForPatientAndTreatment(@Param() params) {
        return await this.documentSvc.getDocumentsForPatientAndTreatment(params.patientId, params.treatmentId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async downloadDocument(@Param() params, @Request() req: Request, @Res() res: Response) {
        const doc = await this.documentSvc.getDocument(params.id);
        // console.log(doc)

        // return writeFile(doc['filename'], doc['file_data'], 'binary', () => {});
        res.send(doc['file_data'])

        // const patientId = doc['account_id'];
        // const filename = doc['filename'];
        // if (doc == null) {
        //     throw new HttpException('File not found (id = ' + params.id + ')', HttpStatus.NOT_FOUND);
        // }
        // res.download(`./documents/${accountId}/${filename}`);
    }

}
