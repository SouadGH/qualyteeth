import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './core/auth/jwt-auth.guard';

@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('health')
  status() {
    return 'up';
  }
}