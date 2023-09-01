import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { PrismaService } from 'src/service/prisma.service';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt = Number(this.config.get('CRYPT_SALT'));
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.prismaService.user.create({
      data: { login: createUserDto.login, password: hashPassword },
    });
    return plainToClass(UserEntity, user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => plainToClass(UserEntity, user));
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (user) {
      return plainToClass(UserEntity, user);
    }
    throw new NotFoundException();
  }

  async findOneByLogin(login: string) {
    return await this.prismaService.user.findUnique({
      where: { login: login },
    });
  }

  async update(id: string, updatePasswordDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const salt = Number(this.config.get('CRYPT_SALT'));
    const hashPassword = await bcrypt.hash(updatePasswordDto.newPassword, salt);
    const isPasswordMatches = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (isPasswordMatches) {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          version: user.version + 1,
          password: hashPassword,
        },
      });
      return plainToClass(UserEntity, updatedUser);
    }
    throw new ForbiddenException();
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      await this.prismaService.user.delete({ where: { id } });
      return true;
    }
  }
}
