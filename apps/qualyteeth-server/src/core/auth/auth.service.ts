import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from 'libs/shared/src/lib/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  /**
   *
   */
  constructor(
    private userSvc: UserService,
    private jwtSvc: JwtService
  ) { }

  /**
   *
   */
  async validate(email: string, pass: string): Promise<any> {
    try {
      const user: User = await this.userSvc.findByEmail(email);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  // /**
  //  *
  //  */
  // async login(account: Account, type: UserType) {
  //   try {
  //     let user = null;
  //     if (type === 'DENTIST') {
  //       user = await this.dentistSvc.findByAccountId(account.id);
  //     } else if (type === 'PATIENT') {
  //       user = await this.patientSvc.findByAccountId(account.id);
  //     } else {
  //       throw new Error('Cannot authenticate user');
  //     }

  //     if (user == null) {
  //       throw new Error(`user-not-found`);
  //     }

  //     const payload = { username: account.username, sub: user.id };
  //     // await this.userSvc.updateUserConnection(user);
  //     return {
  //       access_token: this.jwtSvc.sign(payload),
  //       userid: user.id
  //     };
  //   } catch (e) {
  //     this.logger.error(e.message, new Error(e).stack)
  //     throw e;
  //   }
  // }

  /**
   *
   */
  async login(email: string, type: UserType) {
    try {
      const user = await this.userSvc.findByEmail(email);

      // if (type === UserType.DENTIST) {
      //   user = await this.dentistSvc.findByAccountId(account.id);
      // } else if (type === UserType.PATIENT) {
      //   user = await this.patientSvc.findByAccountId(account.id);
      // } else {
      //   throw new Error('Cannot authenticate user');
      // }

      if (user == null) {
        throw new Error(`user-not-found`);
      }

      const payload = { email: email, sub: user.id };
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

  // /**
  //  *
  //  */
  // async signin(body: any): Promise<void> {

  //   try {
  //     const userExists: boolean = await this.exists(body['username']);
  //     if (userExists) {
  //       throw new HttpException('Account already exists', HttpStatus.CONFLICT);
  //     }

  //     const account: Account = await this.create(body);
  //     const user: User = await this.userSvc.create(body);

  //     const accountId = await this.save(account);

  //     user.accountId = accountId['id'];
  //     await this.userSvc.save(user);
  //   } catch (e) {
  //     this.logger.error(e.message, new Error(e).stack)
  //     throw e;
  //   }
  // }

  /**
   *
   */
  async signin(body: any): Promise<void> {

    try {
      const u: User = await this.userSvc.findByEmail(body['email'])
      if (u != null) {
        throw new HttpException('Account already exists', HttpStatus.CONFLICT);
      }

      const user: User = await this.userSvc.create(body);
      await this.userSvc.save(user);
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  // async save(account: Account): Promise<number> {
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

  // /**
  //  *
  //  */
  // async save(account: Account): Promise<number> {
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