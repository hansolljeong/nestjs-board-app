import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository {
  #userRepository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.#userRepository = this.dataSource.getRepository(UserEntity);
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    const user = this.#userRepository.create(authCredentialDto);

    try {
      return await this.#userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Exsisting username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
