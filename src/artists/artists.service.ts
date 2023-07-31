import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsStorage } from './storage/artists.storage';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private storage: ArtistsStorage) {}

  create(createUserDto: CreateArtistDto): ArtistEntity {
    return this.storage.create(createUserDto);
  }

  findAll(): ArtistEntity[] {
    return this.storage.findAll();
  }

  findOne(id: string): ArtistEntity {
    return this.storage.findOne(id);
  }

  update(id: string, updateUserDto: UpdateArtistDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
