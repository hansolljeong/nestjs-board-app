import { Injectable } from '@nestjs/common';
import { UserRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) ()
}
