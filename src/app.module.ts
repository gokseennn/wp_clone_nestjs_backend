import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/model/user_model';
import { MessagesModule } from './messages/messages.module';
import { Messages } from './messages/model/messages_model';
import { Chats } from './messages/model/conversations_model';

@Module({
  imports: [MessagesModule, AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'wp_clone',
    entities: [User, Messages, Chats],
    synchronize: true,


  })],
  controllers: [AppController],
  providers: [AppService],

})

export class AppModule { }
