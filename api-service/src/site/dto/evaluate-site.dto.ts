import { IsNotEmpty, IsUrl } from 'class-validator';

export class EvaluateSiteDto {
  @IsNotEmpty()
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
  }, { 
    message: 'URL must be a valid HTTP or HTTPS URL'
  })
  url: string;
}
