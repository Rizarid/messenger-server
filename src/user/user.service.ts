import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async registration(mobile_number: string, password: string) {
    const checkUser = await this.userRepository.findOne({
      where: { mobile_number },
    });

    if (checkUser) {
      return {
        __typename: 'Error',
        message: `User with this phone number was exist`,
      };
    }

    const hashedPassword = createHash('SHA256')
      .update(String(password))
      .digest('hex');

    const user = await this.userRepository.save({
      mobile_number,
      password: hashedPassword,
      tag_name: null,
    });

    return {
      __typename: 'User',
      ...user,
    };
  }

  async authenticate(mobile_number: string, password: string) {
    const foundUser = await this.userRepository.findOne({
      where: { mobile_number },
    });

    const hashedPassword = createHash('SHA256')
      .update(String(password))
      .digest('hex');

    if (!foundUser) {
      return {
        __typename: 'Error',
        message: `User with this phone number wasn't exist`,
      };
    }

    if (foundUser.password !== hashedPassword) {
      return {
        __typename: 'Error',
        message: `Password isn't correct`,
      };
    }

    return {
      __typename: 'User',
      ...foundUser,
    };
  }
}
