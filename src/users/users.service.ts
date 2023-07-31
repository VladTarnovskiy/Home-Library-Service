import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStorage } from './storage/users.storage';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private storage: UserStorage) {}
  create(createUserDto: CreateUserDto): UserEntity {
    return this.storage.create(createUserDto);
  }

  findAll(): UserEntity[] {
    return this.storage.findAll();
  }

  findOne(id: string): UserEntity {
    return this.storage.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
