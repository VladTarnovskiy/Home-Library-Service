import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(this.usersService.create(createUserDto));
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    const users = this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(this.usersService.findOne(id));
  }

  @Put(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(this.usersService.update(id, updateUserDto));
  }

  @Delete(':userId')
  @HttpCode(204)
  async remove(@Param('userId', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
