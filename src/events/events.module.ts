import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ReserveGateway } from './reserve.gateway';

@Module({
  providers: [ChatGateway, ReserveGateway],
})
export class EventsModule {}
