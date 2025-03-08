import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IpTrackingService } from './services/ip-tracking.service';
import { FirstTimeAccessGuard } from './guards/first-time-access.guard';

@Module({
  controllers: [SiteController],
  providers: [
    SiteService,
    JwtAuthGuard,
    IpTrackingService,
    FirstTimeAccessGuard,
  ],
})
export class SiteModule {}
