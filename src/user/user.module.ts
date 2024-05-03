import { Module } from '@nestjs/common';
import { UsersEntity } from 'src/entities/user';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from 'src/entities/table';
import { HistoryLog } from 'src/entities/history-logs';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TableEntity, HistoryLog])
  ],
  controllers : [UserController],
  providers : [UserService],
  exports : [UserService]
})
export class UserModule {}
