import { LoggerService } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { writeLogs } from 'src/utils/helpers';

dotenv.config();

export enum LOGGING_LEVELS {
  LOG,
  ERROR,
  WARN,
  DEBUG,
  VERBOSE,
}

export class LoggingService implements LoggerService {
  private loggingLevel: number;

  constructor() {
    this.loggingLevel = Number(process.env.LOGGING_LEVEL ?? 2);
  }

  async log(message: string) {
    if (this.loggingLevel >= LOGGING_LEVELS.LOG) {
      console.log('MSG: ', message);
      await writeLogs('logs', message);
    }
  }

  async error(message: string) {
    if (this.loggingLevel >= LOGGING_LEVELS.ERROR) {
      console.error('ERR: ', message);
      await writeLogs('errors', message);
    }
  }

  async warn(message: string) {
    if (this.loggingLevel >= LOGGING_LEVELS.WARN) {
      console.warn(message);
      await writeLogs('worn', message);
    }
  }

  async debug?(message: string) {
    if (this.loggingLevel >= LOGGING_LEVELS.DEBUG) {
      console.debug(message);
      await writeLogs('debug', message);
    }
  }

  async verbose?(message: string) {
    if (this.loggingLevel >= LOGGING_LEVELS.VERBOSE) {
      console.info(message);
      await writeLogs('verbose', message);
    }
  }
}
