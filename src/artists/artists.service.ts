import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/service/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ArtistsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = await this.prismaService.artist.create({
      data: createArtistDto,
    });

    return plainToClass(ArtistEntity, artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    const artists = await this.prismaService.artist.findMany();

    return artists.map((artist) => plainToClass(ArtistEntity, artist));
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    if (artist) {
      return plainToClass(ArtistEntity, artist);
    }
    throw new NotFoundException();
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await this.prismaService.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return plainToClass(ArtistEntity, updatedArtist);
  }

  async remove(id: string) {
    const artist = this.findOne(id);
    if (artist) {
      await this.prismaService.artist.delete({
        where: { id },
      });
      return true;
    }
    return false;
  }
}
