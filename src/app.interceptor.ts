import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: HttpStatus.OK,
        data,
      })),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const status = HttpStatus.INTERNAL_SERVER_ERROR; // TODO: resolve status code 200

        response.status(status).json({
          status,
          error: error.message || 'Internal server error',
        });

        return throwError(() => error);
      }),
    );
  }
}
