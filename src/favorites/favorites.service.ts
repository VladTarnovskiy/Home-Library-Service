import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { DataBaseService } from 'src/DB/db.service';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoritesResponse } from './entities/favorite.entity';

@Injectable()
export class FavsService {
  constructor(private db: DataBaseService) {}

  addArtist(id: string) {
    const artist = this.db.artists.filter(
      (artist: ArtistEntity) => artist.id === id,
    )[0];
    if (artist) {
      this.db.favorites.artists.push(id);
      return artist;
    }
    throw new UnprocessableEntityException();
  }

  addAlbum(id: string) {
    const album = this.db.albums.filter(
      (album: AlbumEntity) => album.id === id,
    )[0];
    if (album) {
      this.db.favorites.albums.push(id);
      return album;
    }
    throw new UnprocessableEntityException();
  }
  addTrack(id: string) {
    const track = this.db.tracks.filter(
      (track: TrackEntity) => track.id === id,
    )[0];
    if (track) {
      this.db.favorites.tracks.push(id);
      return track;
    }
    throw new UnprocessableEntityException();
  }

  findAll(): FavoritesResponse {
    const arrOfArtists = this.db.favorites.artists.map(
      (artistId) =>
        this.db.artists.filter(
          (artist: ArtistEntity) => artist.id === artistId,
        )[0],
    );
    const arrOfAlbums = this.db.favorites.albums.map(
      (albumId) =>
        this.db.albums.filter((album: AlbumEntity) => album.id === albumId)[0],
    );
    const arrOfTracks = this.db.favorites.tracks.map(
      (trackId) =>
        this.db.tracks.filter((track: TrackEntity) => track.id === trackId)[0],
    );
    return {
      artists: arrOfArtists,
      albums: arrOfAlbums,
      tracks: arrOfTracks,
    };
  }

  removeArtist(id: string) {
    const artistInFav = this.db.favorites.artists.includes(id);
    if (artistInFav) {
      this.db.favorites.artists = this.db.favorites.artists.filter(
        (artistId) => artistId !== id,
      );
    } else {
      throw new NotFoundException();
    }
  }

  removeAlbum(id: string) {
    const albumInFav = this.db.favorites.albums.includes(id);
    if (albumInFav) {
      this.db.favorites.albums = this.db.favorites.albums.filter(
        (albumId) => albumId !== id,
      );
    } else {
      throw new NotFoundException();
    }
  }

  removeTrack(id: string) {
    const trackInFav = this.db.favorites.tracks.includes(id);
    if (trackInFav) {
      this.db.favorites.tracks = this.db.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );
    } else {
      throw new NotFoundException();
    }
  }
}
