import { Module } from '@nestjs/common';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { UserService } from './user.service';

@Module({
  imports: [UtilsModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [],
})
export class UserModule { }