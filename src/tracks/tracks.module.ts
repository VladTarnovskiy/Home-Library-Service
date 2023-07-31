import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksStorage } from './storage/tracks.storage';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksStorage],
})
export class TracksModule {}
