import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user.intesrface';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-user.dto';

@Injectable()
export class UserStorage {
  private users: IUser[];
  constructor(users: IUser[]) {
    this.users = users;
  }

  create(createUserDto: CreateUserDto): IUser {
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

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: string): IUser {
    const user = this.users.filter((user: IUser) => user.id === id)[0];
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
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
      this.users = this.users.filter((user: IUser) => user.id !== id);
    }
  }
}
