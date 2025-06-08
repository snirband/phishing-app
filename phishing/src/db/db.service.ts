import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempt.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class DbService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createPhishingAttempt(
    email: string,
    status: string,
  ): Promise<PhishingAttempt> {
    const newAttempt = new this.phishingAttemptModel({
      email,
      status,
    });
    return newAttempt.save();
  }
  async updatePhishingStatus(email: string, status: string): Promise<void> {
    await this.phishingAttemptModel.updateOne({ email }, { status });
  }

  async findAll(): Promise<PhishingAttempt[]> {
    return this.phishingAttemptModel.find<PhishingAttempt>().exec();
  }

  async createUser(email: string, password: string): Promise<UserDocument> {
    const newUser = new this.userModel({ email, password });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne<User>({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById<User>(id).exec();
  }
}
