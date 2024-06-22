import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm';

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: number;

    @Column()
    recipientId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    sentAt: Date;

    @Column({ default: false })
    read: boolean;
}
