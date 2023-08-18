import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/service/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = await this.prismaService.album.create({
      data: createAlbumDto,
    });

    return plainToClass(AlbumEntity, album);
  }

  async findAll(): Promise<AlbumEntity[]> {
    const albums = await this.prismaService.album.findMany();

    return albums.map((album) => plainToClass(AlbumEntity, album));
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.prismaService.album.findUnique({ where: { id } });
    if (album) {
      return album;
    }
    throw new NotFoundException();
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.prismaService.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    return plainToClass(AlbumEntity, updatedAlbum);
  }

  async remove(id: string) {
    const album = this.findOne(id);
    if (album) {
      await this.prismaService.album.delete({ where: { id } });

      return true;
    }
    return false;
  }
}
