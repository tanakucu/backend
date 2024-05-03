import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Get Entities
import entities from './entities';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'dfghjk',
      database: 'postgres',
      extra: {
        charset: 'utf8',
      },
      entities,
      synchronize: false,
    }),
    UserModule,
  ],
  controllers : [],
  providers : []
})
export class AppModule {}
