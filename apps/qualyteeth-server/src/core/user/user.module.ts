
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { User } from 'apps/qualyteeth-server/src/core/user/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UtilsModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [],
})
export class UserModule { }