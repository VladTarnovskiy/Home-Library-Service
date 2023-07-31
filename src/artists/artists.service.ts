import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { DataBaseService } from 'src/DB/db.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { TrackEntity } from 'src/tracks/entities/track.entity';

@Injectable()
export class ArtistsService {
  constructor(private db: DataBaseService) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const artist = {
      ...createArtistDto,
      id: uuidv4(),
    };

    this.db.artists.push(artist);
    return artist;
  }

  findAll(): ArtistEntity[] {
    return this.db.artists;
  }

  findOne(id: string): ArtistEntity {
    const artist = this.db.artists.filter(
      (artist: ArtistEntity) => artist.id === id,
    )[0];
    if (artist) {
      return artist;
    }
    throw new NotFoundException();
  }

  update(id: string, updateArtistdDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    artist.name = updateArtistdDto.name;
    artist.grammy = updateArtistdDto.grammy;
    return artist;
  }

  remove(id: string) {
    const artist = this.findOne(id);
    if (artist) {
      this.db.artists = this.db.artists.filter(
        (artist: ArtistEntity) => artist.id !== id,
      );
      const track = this.db.tracks.filter(
        (track: TrackEntity) => track.artistId === id,
      )[0];
      if (track) {
        track.artistId = null;
      }

      const artistInFav = this.db.favorites.artists.includes(id);
      if (artistInFav) {
        this.db.favorites.artists = this.db.favorites.artists.filter(
          (artistId) => artistId !== id,
        );
      }
    }
  }
}
