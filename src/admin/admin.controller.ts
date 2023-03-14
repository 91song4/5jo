import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/:userId')
  async isAdmin(@Param('userId') userId: number) {
    return await this.adminService.isAdmin(userId);
  }
}
