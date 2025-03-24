import { Injectable } from '@nestjs/common';

@Injectable()
export class SiteService {
  async evaluateSite(url: string): Promise<any> {

    return {
      url,
      evaluation: {
        status: 'completed',
        timestamp: new Date().toISOString(),
        metrics: {
          performance: {
            score: 85,
            details: {
              firstContentfulPaint: '1.2s',
              speedIndex: '2.1s',
              largestContentfulPaint: '2.4s',
              timeToInteractive: '3.1s',
            }
          },
          accessibility: {
            score: 92,
            issues: 2,
          },
          bestPractices: {
            score: 88,
            issues: 3,
          },
          seo: {
            score: 95,
            issues: 1,
          }
        }
      }
    };
  }
}
