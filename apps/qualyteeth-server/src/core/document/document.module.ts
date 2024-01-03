
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Document } from './document.entity';
<<<<<<< HEAD
import { Patient } from '../patient/patient.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document,Patient,User]),
=======

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService]
})
export class DocumentModule {}
