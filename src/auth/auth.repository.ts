import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  #userRepository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.#userRepository = this.dataSource.getRepository(UserEntity);
  }
}
