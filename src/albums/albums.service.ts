import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { DataBaseService } from 'src/DB/db.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private db: DataBaseService) {}
  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const album = {
      ...createAlbumDto,
      id: uuidv4(),
    };

    this.db.albums.push(album);
    return album;
  }

  findAll(): AlbumEntity[] {
    return this.db.albums;
  }

  findOne(id: string): AlbumEntity {
    const album = this.db.albums.filter(
      (album: AlbumEntity) => album.id === id,
    )[0];
    if (album) {
      return album;
    }
    throw new NotFoundException();
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  remove(id: string) {
    const album = this.findOne(id);
    if (album) {
      this.db.albums = this.db.albums.filter(
        (album: AlbumEntity) => album.id !== id,
      );
    }
  }
}
