import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user.intesrface';

@Injectable()
export class UserStorage {
  private users: IUser[];
  constructor(users) {
    this.users = users;
  }
  getAll() {}
}
