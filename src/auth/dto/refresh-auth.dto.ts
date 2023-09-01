import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
