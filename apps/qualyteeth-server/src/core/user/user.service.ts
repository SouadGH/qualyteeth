import { Injectable, Logger } from '@nestjs/common';
import { User } from 'libs/shared/src/lib/user.interface';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  /**
   *
   */
  constructor(private dbService: DbService) { }

  /**
   *
   */
  async create(body: any): Promise<User> {

    const user: User = {
      id: null,
      accountId: body['accountId'],
      type: body['type'],
      firstname: body['firstname'],
      lastname: body['lastname'],
      email: body['email'],
      street: body['street'],
      streetNb: body['streetNb'],
      city: body['city'],
      postalCode: body['postalCode'],
      country: body['country'],
      phoneNumber: body['phoneNumber'],
      createdOn: new Date(),
    };

    return user;
  }

  /**
   *
   */
  // async find(accountId: number): Promise<User | undefined> {
  //   try {
  //     return await this.dbService.db.oneOrNone(`SELECT * FROM qt_user WHERE account_id = $1`, accountId);
  //     // if (u != null) {
  //     //   return this.utils.snakeCaseToCamelCase(u);
  //     // }
  //   }
  //   catch (e) {
  //     this.logger.error(e.message, new Error(e).stack)
  //     throw e;
  //   }
  // }

  /**
   *
   */
  async save(user: User): Promise<number> {
    try {
      const query = `
            INSERT INTO ${user.type} (account_id, created_on, firstname, lastname, email, street, street_nb, postal_code, city, country, phone_number) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id
          `;

      return await this.dbService.db.one(query, [user.accountId, user.createdOn, user.firstname, user.lastname, user.email, user.street, user.streetNb, user.postalCode, user.city, user.country, user.phoneNumber]);
    } catch (e) {
      this.logger.error(e.message, new Error(e).stack)
      throw e;
    }
  }

  /**
   *
   */
  // async getUserForAccountId(accountId: number) : Promise<Dentist | Patient> {
  //   let user: any;
  //   user = await this.patientSvc.findByAccountId(accountId);
  //   if (user == null) {
  //     user = await this.dentistSvc.findByAccountId(accountId);
  //   }
  //   return user;
  // }

  /**
   *
   */
  // public async updateUserConnection(user: User): Promise<void> {
  //   try {
  //     const query = `
  //       INSERT INTO user_connection (account_id, connection_time) 
  //       VALUES ($1, $2)`;
  //     await this.dbService.db.none(query, [user.id, new Date()]);
  //   } catch (e) {
  //     this.logger.error(e.message, new Error(e).stack)
  //     throw e;
  //   }
  // }
}