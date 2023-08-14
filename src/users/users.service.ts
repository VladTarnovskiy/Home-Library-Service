import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
// import { v4 as uuidv4 } from 'uuid';
// import { DataBaseService } from 'src/DB/db.service';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: id,
    });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async update(id: string, updatePasswordDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user.password === updatePasswordDto.oldPassword) {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          version: user.version + 1,
          password: updatePasswordDto.newPassword,
          updatedAt: Date.now(),
        },
      });
      return updatedUser;
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
