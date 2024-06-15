import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/model/user_model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([User])],
  controllers: [AuthController, AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule]
})
export class AuthModule { }
