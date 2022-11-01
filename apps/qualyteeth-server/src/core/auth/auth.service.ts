import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from 'libs/shared/src/lib/user.interface';
import { Account } from 'libs/shared/src/lib/account.interface';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
import { PatientsService } from 'apps/qualyteeth-server/src/core/patients/patients.service';
import { DentistService } from 'apps/qualyteeth-server/src/core/dentists/dentist.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  /**
   *
   */
  constructor(
    private dbService: DbService,
    private userSvc: UserService,
    private patientSvc: PatientsService,
    private dentistSvc: DentistService,
    private jwtSvc: JwtService
  ) { }

  /**
   *
   */
  async create(body: any): Promise<Account> {
    const account: Account = {
      id: null,
      username: body['username'],
      password: body['password'],
      createOn: new Date()
    };

    return account;
  }

  /**
   *
   */
  async exists(username: string): Promise<boolean> {
    try {
      const r = await this.dbService.db.one('SELECT COUNT(1) FROM account WHERE username = $1', username);
      return r.count > 0;
    }
    catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  async findOne(username: string): Promise<Account | undefined> {
    try {
      return await this.dbService.db.oneOrNone(`SELECT * FROM account WHERE username = $1`, [username]);

      // if (a != null) {
      //   return this.utils.snakeCaseToCamelCase(a);
      // }
    }
    catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  async validate(username: string, pass: string): Promise<any> {
    try {
      const account = await this.findOne(username);
      if (account && account.password === pass) {
        const { password, ...result } = account;
        return result;
      }
      return null;
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  async login(account: Account, type: UserType) {
    try {
      let user = null;
      if (type === 'DENTIST') {
        user = await this.dentistSvc.findByAccountId(account.id);
      } else if (type === 'PATIENT') {
        user = await this.patientSvc.findByAccountId(account.id);
      } else {
        throw new Error('Cannot authenticate user');
      }

      if (user == null) {
        throw new Error(`user-not-found`);
      }

      const payload = { username: account.username, sub: user.id };
      // await this.userSvc.updateUserConnection(user);
      return {
        access_token: this.jwtSvc.sign(payload),
        userid: user.id
      };
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  async signin(body: any): Promise<void> {

    try {
      const userExists: boolean = await this.exists(body['username']);
      if (userExists) {
        throw new HttpException('Account already exists', HttpStatus.CONFLICT);
      }

      const account: Account = await this.create(body);
      const user: User = await this.userSvc.create(body);

      const accountId = await this.save(account);

      user.accountId = accountId['id'];
      await this.userSvc.save(user);
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  async save(account: Account): Promise<number> {
    try {
      const query = `
            INSERT INTO account (username, password, created_on) 
            VALUES ($1, $2, $3)
            RETURNING id
          `;

      return await this.dbService.db.one(query, [account.username, account.password, new Date()]);
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  // async update(account: Account): Promise<number> {
  //   try {

  //     const query = `
  //           INSERT INTO account (username, password, created_on) 
  //           VALUES ($1, $2, $3)
  //           RETURNING id
  //         `;

  //     return await this.dbService.db.one(query, [account.username, account.password, new Date()]);
  //   } catch (e) {
  //     this.logger.error(e.message, new Error(e).stack)
  //     throw e;
  //   }
  // }

  /**
   *
   */
  // async getTempToken() {
  //   try {
  //     const payload = { username: Math.random().toString(36), sub: Math.random() };
  //     return {
  //       access_token: this.jwtSvc.sign(payload),
  //     };
  //   } catch (e) {
  //     this.logger.error(e.message, new Error(e).stack)
  //     throw e;
  //   }
  // }

}