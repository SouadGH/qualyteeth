import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'libs/shared/src/lib/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  /**
   *
   */
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  /**
   *
   */
  async create(body: any): Promise<User> {

    const user: User = {
      type: body['type'],
      firstname: body['firstname'],
      lastname: body['lastname'],
      email: body['email'],
      password: body['password'],
      street: body['street'],
      streetNb: body['streetNb'],
      city: body['city'],
      postalCode: body['postalCode'],
      country: body['country'],
      phoneNumber: body['phoneNumber'],
    };

    if (user.password) {
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
    }

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

  // /**
  //  *
  //  */
  // async save(user: User): Promise<number> {
  //   try {
  //     const query = `
  //           INSERT INTO ${user.type} (account_id, created_on, firstname, lastname, email, street, street_nb, postal_code, city, country, phone_number) 
  //           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  //           RETURNING id
  //         `;

  //     return await this.dbService.db.one(query, [user.accountId, user.createdOn, user.firstname, user.lastname, user.email, user.street, user.streetNb, user.postalCode, user.city, user.country, user.phoneNumber]);
  //   } catch (e) {
  //     this.logger.error(e.message, new Error(e).stack)
  //     throw e;
  //   }
  // }

  /**
   *
   */
  async save(user: User): Promise<User> {
    const newUser = this.userRepo.create({ ...user, });
    await this.userRepo.save(newUser);
    return newUser;
  }

  /**
   *
   */
  async update(user: User): Promise<User> {
    const u: User = await this.getById(user.id);
    if (u.password) {
      u.password = await bcrypt.hash(u.password, await bcrypt.genSalt());
    }

    const newUser = this.userRepo.create({ ...u, ...user, });
    await this.userRepo.save(newUser);
    return newUser;
  }

  /**
   *
   */
  async getById(id: string): Promise<User> {
    // const user = await this.userRepository.findOne({ id });
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  /**
   *
   */
  async getByEmail(email: string) {
    let qb = this.userRepo.createQueryBuilder('t');
    qb = qb.where('t.email = :email', { email: email });

    const t = await qb.getOne();
    if (t) {
        return t;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
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