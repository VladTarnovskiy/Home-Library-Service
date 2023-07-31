import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TracksStorage {
  private tracks: TrackEntity[] = [];

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const track = {
      ...createTrackDto,
      id: uuidv4(),
    };

    this.tracks.push(track);
    return track;
  }

  findAll(): TrackEntity[] {
    return this.tracks;
  }

  findOne(id: string): TrackEntity {
    const track = this.tracks.filter(
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
      this.tracks = this.tracks.filter((track: TrackEntity) => track.id !== id);

      //   const trackInFav = this.favs.tracks.includes(id);
      //   if (trackInFav) {
      //     this.db.favs.tracks = this.db.favs.tracks.filter(
      //       (trackId) => trackId !== id,
      //     );
      //   }
    }
  }
}
