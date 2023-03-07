// Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// camp
import { CampController } from './camp.controller';
import { CampService } from './camp.service';
import { Camp } from './camp.entity';
import { CampRepository } from './camp.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CampRepository])],
  controllers: [CampController],
  providers: [CampService, CampRepository],
  exports: [CampService],
})
export class CampModule {}
