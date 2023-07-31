import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { AlbumsStorage } from './storage/albums.storage';

@Injectable()
export class AlbumsService {
  constructor(private storage: AlbumsStorage) {}
  create(createUserDto: CreateAlbumDto): AlbumEntity {
    return this.storage.create(createUserDto);
  }

  findAll(): AlbumEntity[] {
    return this.storage.findAll();
  }

  findOne(id: string): AlbumEntity {
    return this.storage.findOne(id);
  }

  update(id: string, updateUserDto: UpdateAlbumDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
