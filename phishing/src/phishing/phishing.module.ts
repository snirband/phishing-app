import { Module } from '@nestjs/common';
import { PhishingController } from './phishing.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PhishingController],
})
export class PhishingModule {}
