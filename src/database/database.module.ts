import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

ConfigModule.forRoot();

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@testing-cluster.6sd2v.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    ),
  ],
})
export class DatabaseModule {}
