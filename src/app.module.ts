import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), BoardsModule],
})
export class AppModule {}
