import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
// import { FavoritesEntity } from 'src/favorites/entities/favs.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class DataBaseService {
  users: UserEntity[] = [];
  tracks: TrackEntity[] = [];
  artists: ArtistEntity[] = [];
  albums: AlbumEntity[] = [];
  // favs: FavoritesEntity = {
  //   artists: [],
  //   albums: [],
  //   tracks: [],
  // };
}
