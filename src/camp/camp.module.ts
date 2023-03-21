// Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// camp
import { CampController } from './camp.controller';
import { CampService } from './camp.service';
import { Camp } from './camp.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Repository<Camp>])],
  controllers: [CampController],
  providers: [CampService],
  exports: [CampService],
})
export class CampModule {}
