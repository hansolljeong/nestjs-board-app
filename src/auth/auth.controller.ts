import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto, SignInResultDto } from './dto/auth-credential.dto';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<UserEntity> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<SignInResultDto> {
    return this.authService.signIn(authCredentialDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')
  authTest(@Req() req) {
    console.log(req);
  }
}
