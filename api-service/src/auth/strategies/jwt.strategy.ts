import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Find the user based on the payload's userId
    const user = await this.usersService.findOne(payload.sub);
    
    // If user is not found or not active, throw unauthorized
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User is not authorized');
    }
    
    // Return user object without sensitive data
    const { password, ...result } = user;
    return result;
  }
}
