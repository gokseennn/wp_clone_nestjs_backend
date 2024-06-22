import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';

@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })

    lastMessageId: number;

    @Column({ nullable: true })
    lastMessageAt: Date;
}
