import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { IJwtPayload, IVerifiedRequest } from 'src/interfaces';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IVerifiedRequest = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeaders(request);
    if (!token) throw new BadRequestException('Token not found');

    try {
      const payload: IJwtPayload = await this.jwtService.verifyAsync(token);

      request.user = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        await this.userRepo.delete({ access_token: token });
        throw new UnauthorizedException('Token expired');
      }

      throw new BadRequestException('Unknown', error);
    }

    return true;
  }

  private extractTokenFromHeaders(request: Request): string {
    const [type, token] = request.headers.authorization
      ? request.headers.authorization.split(' ')
      : [];

    return type === 'Bearer' ? token : '';
  }
}
