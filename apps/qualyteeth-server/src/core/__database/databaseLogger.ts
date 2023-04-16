import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';
 
export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL');  
 
  /**
   *
   */
  logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.verbose(`${query} -- Parameters: ${this.stringifyParameters(parameters)}`);
  }

  /**
   *
   */
  logQueryError(error: string, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.error(`${query} -- Parameters: ${this.stringifyParameters(parameters)} -- ${error}`);
  }

  /**
   *
   */
  logQuerySlow(time: number, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.warn(`Time: ${time} -- Parameters: ${this.stringifyParameters(parameters)} -- ${query}`);
  }

  /**
   *
   */
  logMigration(message: string) {
    this.logger.verbose(message);
  }

  /**
   *
   */
  logSchemaBuild(message: string) {
    this.logger.verbose(message);
  }

  /**
   *
   */
  log(level: 'log' | 'info' | 'warn' | 'verbose', message: string, queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    if (level === 'log') {
      return this.logger.log(message);
    }
    if (level === 'info') {
      return this.logger.debug(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
    if (level === 'verbose') {
      return this.logger.verbose(message);
    }
  }

  /**
   *
   */
  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }

}