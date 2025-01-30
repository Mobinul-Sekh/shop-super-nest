import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseInterface } from '../error-handler/interfaces';
import { SignupDTO } from './dtos/signup.dto';
import { JwtAuthGuard } from './strategies/jwt.strategy';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(
    @Body() body: SignupDTO
  ): Promise<AuthResponseInterface> {
    try {
      return {
        success: true,
        message: `signup successful`,
        token: await this.authService.userSignup(body)
      }
    } catch(err) {
      return err;
    }
  }

  @Post('login')
  async login(
    @Body() body: LoginDTO
  ): Promise<AuthResponseInterface> {
    try {
      return {
        success: true,
        message: `login successful`,
        token: await this.authService.userLogin(body)
      }
    } catch(err) {
      return err;
    }
  }
}
