import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { DataBaseService } from 'src/DB/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DataBaseService) {}
  create(createUserDto: CreateUserDto): UserEntity {
    const user = {
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: uuidv4(),
    };

    this.db.users.push(user);
    return user;
  }

  findAll(): UserEntity[] {
    return this.db.users;
  }

  findOne(id: string): UserEntity {
    const user = this.db.users.filter((user: UserEntity) => user.id === id)[0];
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
      this.db.users = this.db.users.filter(
        (user: UserEntity) => user.id !== id,
      );
    }
  }
}
