import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto, SignInResultDto } from './dto/auth-credential.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<SignInResultDto> {
    const { username, password } = authCredentialDto;

    const user = await this.userRepository.findOneByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      // @TODO: payload interface 정의
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
