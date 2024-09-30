import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ParseJsonBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.data) {
      try {
        request.body = {
          ...request.body,
          data: JSON.parse(request.body.data),
        };
      } catch (error) {
        throw new Error('Invalid JSON format in body.data');
      }
    }

    return next.handle().pipe(map((data) => data));
  }
}
