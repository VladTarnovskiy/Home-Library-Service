import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/service/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TracksService {
  constructor(private prismaService: PrismaService) {}
  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const track = await this.prismaService.track.create({
      data: createTrackDto,
    });

    return plainToClass(TrackEntity, track);
  }

  async findAll(): Promise<TrackEntity[]> {
    const tracks = await this.prismaService.track.findMany();

    return tracks.map((track) => plainToClass(TrackEntity, track));
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (track) {
      return plainToClass(TrackEntity, track);
    }
    throw new NotFoundException();
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.prismaService.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return plainToClass(TrackEntity, updatedTrack);
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (track) {
      await this.prismaService.track.delete({ where: { id } });

      return true;
    }
    return false;
  }
}
