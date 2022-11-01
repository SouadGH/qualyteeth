import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log(req.user.userId, req.params.id)
    return parseInt(req.user.userId) === parseInt(req.params.id);
  }
}
