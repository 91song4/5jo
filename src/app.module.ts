import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// camp
import { CampModule } from './camp/camp.module';

@Module({
  imports: [CampModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
