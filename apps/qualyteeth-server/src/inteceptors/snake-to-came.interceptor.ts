import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from 'apps/qualyteeth-server/src/core/utils/utils.service';

@Injectable()
export class SnakeToCameInterceptor implements NestInterceptor {

  /**
   *
   */
  constructor(private utils: UtilsService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(d => {
      if (d == null) {
        return null;
      }
      if (d instanceof Array) {
        d.forEach(u => u = this.utils.snakeCaseToCamelCase(u));
      } else {
        d = this.utils.snakeCaseToCamelCase(d);
      }
      return d;
    }));
  }
}
