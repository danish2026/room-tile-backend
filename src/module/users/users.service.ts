
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

 async create(createUserDto: CreateUserDto) {
  const existingUser = await this.userRepository.findOneBy({
    email: createUserDto.email,
  });

  if (existingUser) {
    throw new ConflictException('Email already exists');
  }

  const savedUser = await this.userRepository.save(
    this.userRepository.create(createUserDto),
  );

  const accessToken = await this.jwtService.signAsync({
    sub: savedUser.id,
    email: savedUser.email,
  });

  return {
    message: 'User created successfully',
    user: savedUser,
    accessToken,
  };
}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOneBy({
        email: updateUserDto.email,
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return { message: 'User deleted successfully' };
  }
}
