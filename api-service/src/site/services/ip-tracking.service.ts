import { Injectable } from '@nestjs/common';

@Injectable()
export class IpTrackingService {
  private readonly ipAccessMap: Map<string, boolean> = new Map();

  hasUsedFreeAccess(ip: string): boolean {
    return this.ipAccessMap.get(ip) === true;
  }

  markFreeAccessUsed(ip: string): void {
    this.ipAccessMap.set(ip, true);
  }
}
