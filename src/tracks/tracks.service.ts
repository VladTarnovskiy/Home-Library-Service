import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { DataBaseService } from 'src/DB/db.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  constructor(private db: DataBaseService) {}
  create(createTrackDto: CreateTrackDto): TrackEntity {
    const track = {
      ...createTrackDto,
      id: uuidv4(),
    };

    this.db.tracks.push(track);
    return track;
  }

  findAll(): TrackEntity[] {
    return this.db.tracks;
  }

  findOne(id: string): TrackEntity {
    const track = this.db.tracks.filter(
      (track: TrackEntity) => track.id === id,
    )[0];
    if (track) {
      return track;
    }
    throw new NotFoundException();
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  remove(id: string) {
    const track = this.findOne(id);
    if (track) {
      this.db.tracks = this.db.tracks.filter(
        (track: TrackEntity) => track.id !== id,
      );

      const trackInFav = this.db.favorites.tracks.includes(id);
      if (trackInFav) {
        this.db.favorites.tracks = this.db.favorites.tracks.filter(
          (trackId) => trackId !== id,
        );
      }
    }
  }
}
