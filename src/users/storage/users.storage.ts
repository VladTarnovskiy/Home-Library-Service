import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserStorage {
  private users: UserEntity[] = [];

  create(createUserDto: CreateUserDto): UserEntity {
    const user = {
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: uuidv4(),
    };

    this.users.push(user);
    return user;
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity {
    const user = this.users.filter((user: UserEntity) => user.id === id)[0];
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  update(id: string, updatePasswordDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (user.password === updatePasswordDto.oldPassword) {
      user.password = updatePasswordDto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      return user;
    }
    throw new ForbiddenException();
  }

  remove(id: string) {
    const user = this.findOne(id);
    if (user) {
      this.users = this.users.filter((user: UserEntity) => user.id !== id);
    }
  }
}
