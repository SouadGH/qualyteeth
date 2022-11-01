import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private moduleRef: ModuleRef) {
        super({ passReqToCallback: true });
    }

    async validate(request: Request, email: string, password: string,): Promise<any> {
        const contextId = ContextIdFactory.getByRequest(request);

        // "AuthService" is a request-scoped provider
        const authService = await this.moduleRef.resolve(AuthService, contextId);
        const user = await authService.validate(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}