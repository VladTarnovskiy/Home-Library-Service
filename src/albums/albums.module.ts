import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsStorage } from './storage/albums.storage';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsStorage],
})
export class AlbumsModule {}
