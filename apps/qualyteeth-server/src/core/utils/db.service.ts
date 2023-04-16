import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pgPromise from 'pg-promise';

@Injectable()
export class DbService {

    public db: pgPromise.IDatabase<any>;

    /**
     *
     */
    constructor(private configService: ConfigService) {

        // const dbHost = this.configService.get<string>('DATABASE_HOST');
        // const dbName = this.configService.get<string>('DATABASE_NAME');
        // const dbPort = this.configService.get<string>('DATABASE_PORT') || 5432;
        // const dbUser = this.configService.get<string>('DATABASE_USER');
        // const dbPwd = this.configService.get<string>('DATABASE_PASSWORD');

        // if (dbHost == null) {
        //     throw Error('No DATABASE_HOST defined in environment');
        // }
        // if (dbName == null) {
        //     throw Error('No DATABASE_NAME defined in environment');
        // }
        // if (dbUser == null) {
        //     throw Error('No DATABASE_USER defined in environment');
        // }
        // if (dbPwd == null) {
        //     throw Error('No DATABASE_PASSWORD defined in environment');
        // }

        // const pgp = pgPromise();
        // const dbUrl = `postgres://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbName}`
        // console.log(`Connecting to DB: ${dbUrl}...`)
        // this.db = pgp(dbUrl);
        // // console.trace()
    }
}
