import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Order } from 'src/order/order.entity';
import { Admin } from 'src/admin/admin.entity';

@Module({
  // 매우 중요: 서비스에서 사용할 리포지토리 사용을 imports에 명시!
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService],
})
export class UsersModule {}
