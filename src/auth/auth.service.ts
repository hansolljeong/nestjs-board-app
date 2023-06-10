import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;

    const user = await this.userRepository.findOneByUsername(username);
    const validatePassword = await bcrypt.compare(password, user.password);

    if (user && validatePassword) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
