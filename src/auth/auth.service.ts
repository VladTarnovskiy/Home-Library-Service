import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import { RefreshAuthDto } from 'src/auth/dto/refresh-auth.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async signup(createUser: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUser);
      return plainToClass(UserEntity, user);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async login(createUser: CreateUserDto) {
    const user = await this.usersService.findOneByLogin(createUser.login);

    if (!user) {
      throw new ForbiddenException(`User with this login doesn't exist!`);
    }

    const isMatch = await bcrypt.compare(createUser.password, user.password);

    if (!isMatch) {
      throw new ForbiddenException('Password is wrong!');
    }

    const payload = { sub: user.id, username: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.config.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshAuthDto.refreshToken,
        {
          secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
        },
      );
      const { sub: id, username: login } = payload;

      const newPayload = { sub: id, username: login };

      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new ForbiddenException(`User with id ${id} doesn't exist`);
      }
      return {
        accessToken: await this.jwtService.signAsync(newPayload),
        refreshToken: await this.jwtService.signAsync(newPayload, {
          secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: this.config.get('TOKEN_REFRESH_EXPIRE_TIME'),
        }),
      };
    } catch {
      throw new ForbiddenException('Invalid refresh token!');
    }
  }
}
