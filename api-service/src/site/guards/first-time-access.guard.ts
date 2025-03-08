import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IpTrackingService } from '../services/ip-tracking.service';
import { Observable } from 'rxjs';

@Injectable()
export class FirstTimeAccessGuard implements CanActivate {
  constructor(
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly ipTrackingService: IpTrackingService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;

    // If this IP has already used the free access
    if (this.ipTrackingService.hasUsedFreeAccess(ip)) {
      // Delegate to JWT auth guard for authenticated access
      return this.jwtAuthGuard.canActivate(context);
    }

    // First time access - mark as used and allow
    this.ipTrackingService.markFreeAccessUsed(ip);
    return true;
  }
}
