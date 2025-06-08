import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() body: { email: string; password: string },
  ): Promise<{ token: string }> {
    return this.authService.register(body.email, body.password);
  }
}
