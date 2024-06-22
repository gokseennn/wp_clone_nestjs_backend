import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './model/messages_model';
import { Chats } from './model/conversations_model';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, Chats])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [TypeOrmModule],

})
export class MessagesModule { }
