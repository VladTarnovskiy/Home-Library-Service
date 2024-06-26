import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesResponse } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.addArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.addAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.addTrack(id);
  }

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return await this.favsService.findAll();
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.removeArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.removeAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favsService.removeTrack(id);
  }
}
