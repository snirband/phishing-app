import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './schemas/phishing-attempt.schema';
import { User, UserSchema } from './schemas/user.schema';
import { DbService } from './db.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:secret@localhost:27017'), // replace with your MongoDB URI
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [],
  providers: [DbService],
  exports: [DbService], // Export DbService to be used in other modules
})
export class DbModule {}
