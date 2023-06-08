import { Injectable } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
