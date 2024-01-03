
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'apps/qualyteeth-server/src/core/user/user.entity';
import { PatientsService } from '../patient/patients.service';
import { PractitionerService } from '../practitioner/practitioner.service';
import { UserService } from '../user/user.service';
import { UserType } from 'libs/shared/src/lib/dto/user.dto';
import { Practitioner } from '../practitioner/practitioner.entity';
import { Patient } from '../patient/patient.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  /**
   *
   */
  constructor(
    private userSvc: UserService,
    private jwtSvc: JwtService,
    private readonly configSvc: ConfigService,
    private practitionerSvc: PractitionerService,
    private patientSvc: PatientsService
  ) { }

  /**
   *
   */
  async validate(email: string, pass: string): Promise<any> {
    try {
      const user: User = await this.userSvc.getByEmail(email);
      if (user != null && bcrypt.compare(user.password, pass)) {
        return user;
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
  async login(user: User) {
<<<<<<< HEAD

    try {
      const payload = { email: user.email, sub: user.id };
      
      return {
        access_token: this.jwtSvc.sign(payload, { secret: this.configSvc.get('JWT_ACCESS_TOKEN_SECRET'), }),
        userid: user.id
        
=======
    try {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtSvc.sign(payload, { secret: this.configSvc.get('JWT_ACCESS_TOKEN_SECRET'), }),
        userid: user.id
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
      };
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
    // try {
    //   const user = await this.userSvc.getByEmail(email);

    //   // if (type === UserType.DENTIST) {
    //   //   user = await this.dentistSvc.findByAccountId(account.id);
    //   // } else if (type === UserType.PATIENT) {
    //   //   user = await this.patientSvc.findByAccountId(account.id);
    //   // } else {
    //   //   throw new Error('Cannot authenticate user');
    //   // }

    //   if (user == null) {
    //     throw new Error(`user-not-found`);
    //   }

    //   const payload = { email: email, sub: user.id };
    //   // await this.userSvc.updateUserConnection(user);
    //   return {
    //     access_token: this.jwtSvc.sign(payload),
    //     userid: user.id
    //   };
    // } catch (e) {
    //   this.logger.error(e.message, new Error(e).stack)
    //   throw e;
    // }
  }
<<<<<<< HEAD
  public getCookieWithJwtAccessToken(userId: string ) {
    //const payload: TokenPayload = { userId,isSecondFactorAuthenticated };
    const payload = { userid: userId };
    const token = this.jwtSvc.sign(payload, {
        secret: this.configSvc.get('JWT_ACCESS_TOKEN_SECRET')
        
        
        //expiresIn: `${this.configSvc.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    },);


    return {
      access_token: this.jwtSvc.sign(payload, { secret: this.configSvc.get('JWT_ACCESS_TOKEN_SECRET'), }),
      userid: userId
      
    };
   
}
=======

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  /**
  *
  */
  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userSvc.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   *
   */
  private async verifyPassword(plainTextPassword: string, hashedPassword?: string) {
    if (hashedPassword) {
      const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
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
  async signin(data: User): Promise<void> {
    try {
      const u: User = await this.userSvc.getByEmail(data['email'])
      if (u != null) {
        throw new HttpException('Account already exists', HttpStatus.CONFLICT);
      }
    } catch (e) {
      if (e.status === 404) {
        let user: User = await this.userSvc.create(data);
        user = await this.userSvc.save(user);

        if (user.type == UserType.PRACTITIONER) {
          const practitioner: Practitioner = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            user: user
          };
          await this.practitionerSvc.save(practitioner);
        }
        else {
          const patient: Patient = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            user: user
          }
          await this.patientSvc.save(patient);
        }
      }
      else {
        this.logger.error(e.status, e.message, new Error(e).stack)
        throw e;
      }
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