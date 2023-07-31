import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { AlbumEntity } from '../entities/album.entity';

@Injectable()
export class AlbumsStorage {
  private albums: AlbumEntity[] = [];

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const album = {
      ...createAlbumDto,
      id: uuidv4(),
    };

    this.albums.push(album);
    return album;
  }

  findAll(): AlbumEntity[] {
    return this.albums;
  }

  findOne(id: string): AlbumEntity {
    const album = this.albums.filter(
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
      this.albums = this.albums.filter((album: AlbumEntity) => album.id !== id);
      //   const track = this.db.tracks.filter(
      //     (track: TrackEntity) => track.albumId === id,
      //   )[0];
      //   if (track) {
      //     track.albumId = null;
      //   }

      //   const albumInFav = this.db.favs.albums.includes(id);
      //   if (albumInFav) {
      //     this.db.favs.albums = this.db.favs.albums.filter(
      //       (albumId) => albumId !== id,
      //     );
      //   }
    }
  }
}
