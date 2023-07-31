import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksStorage } from './storage/tracks.storage';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private storage: TracksStorage) {}
  create(createUserDto: CreateTrackDto): TrackEntity {
    return this.storage.create(createUserDto);
  }

  findAll(): TrackEntity[] {
    return this.storage.findAll();
  }

  findOne(id: string): TrackEntity {
    return this.storage.findOne(id);
  }

  update(id: string, updateUserDto: UpdateTrackDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
