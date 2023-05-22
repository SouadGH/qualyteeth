
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'libs/shared/src/lib/document.entity';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService]
})
export class DocumentModule {}
