import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './model/messages_model';
import { Chats } from './model/conversations_model';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Chats) private chatRepository: Repository<Chats>,
        @InjectRepository(Messages) private messageRepository: Repository<Messages>
    ) { }


}
