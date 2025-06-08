import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: DbService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<{ token: string }> {
    const existing = await this.userService.findByEmail(email);
    let hashedPassword: string;
    console.log('existing', existing);
    if (existing) {
      hashedPassword = existing.password;
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      await this.userService.createUser(email, hashedPassword);
    }
    const result = await this.login(email, hashedPassword); // Automatically log in after registration

    return { token: result.access_token };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials user');

    console.log(password);
    console.log(user.password);
    const isValid =
      password === user.password ||
      (await bcrypt.compare(password, user.password));
    if (!isValid)
      throw new UnauthorizedException('Invalid credentials isvalid');

    const payload = { sub: user['id'], email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
