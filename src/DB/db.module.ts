import { Global, Module } from '@nestjs/common';
import { DataBaseService } from './db.service';

@Global()
@Module({
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class Database {}
