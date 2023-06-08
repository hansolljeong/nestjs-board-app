import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository {
  #userRepository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.#userRepository = this.dataSource.getRepository(UserEntity);
  }

  createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    const user = this.#userRepository.create(authCredentialDto);

    return this.#userRepository.save(user);
  }
}
