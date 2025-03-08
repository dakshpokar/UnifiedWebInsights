import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { EvaluateSiteDto } from './dto/evaluate-site.dto';
import { FirstTimeAccessGuard } from './guards/first-time-access.guard';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post('evaluate')
  @UseGuards(FirstTimeAccessGuard)
  evaluateSite(@Body() evaluateSiteDto: EvaluateSiteDto) {
    return this.siteService.evaluateSite(evaluateSiteDto.url);
  }
}
