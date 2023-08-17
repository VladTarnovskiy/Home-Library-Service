import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
// import { AlbumEntity } from 'src/albums/entities/album.entity';
// import { ArtistEntity } from 'src/artists/entities/artist.entity';
// import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoritesResponse } from './entities/favorite.entity';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  async addArtist(id: string) {
    try {
      await this.prismaService.artistOnFav.create({ data: { artistId: id } });
      return true;
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async addAlbum(id: string) {
    console.log(id);
    try {
      await this.prismaService.albumOnFav.create({ data: { albumId: id } });

      return true;
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async addTrack(id: string) {
    try {
      await this.prismaService.trackOnFav.create({ data: { trackId: id } });

      return true;
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async findAll(): Promise<FavoritesResponse> {
    const [albumFavs, artistFavs, trackFavs] = await Promise.all([
      this.prismaService.albumOnFav.findMany({ include: { album: true } }),
      this.prismaService.artistOnFav.findMany({ include: { artist: true } }),
      this.prismaService.trackOnFav.findMany({ include: { track: true } }),
    ]);

    const response = {
      albums: albumFavs.map((item) => item.album),
      artists: artistFavs.map((item) => item.artist),
      tracks: trackFavs.map((item) => item.track),
    };

    return response;
  }

  async removeArtist(id: string) {
    try {
      await this.prismaService.artistOnFav.delete({ where: { artistId: id } });
      return true;
    } catch {
      throw new NotFoundException();
    }
  }

  async removeAlbum(id: string) {
    try {
      await this.prismaService.albumOnFav.delete({ where: { albumId: id } });
      return true;
    } catch {
      throw new NotFoundException();
    }
  }

  async removeTrack(id: string) {
    try {
      await this.prismaService.trackOnFav.delete({ where: { trackId: id } });
      return true;
    } catch {
      throw new NotFoundException();
    }
  }
}
