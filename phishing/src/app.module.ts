import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { PhishingModule } from './phishing/phishing.module';

@Module({
  imports: [DbModule, AuthModule, PhishingModule],
})
export class AppModule {}
