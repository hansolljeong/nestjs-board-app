import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  #userRepository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.#userRepository = this.dataSource.getRepository(UserEntity);
  }

  // @TODO: 비즈니스 로직 service로 분리하기
  async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.#userRepository.create({
      username,
      password: hashedPassword,
    });

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
