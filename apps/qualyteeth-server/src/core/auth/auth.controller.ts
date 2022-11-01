import { Body, Controller, Get, Header, HttpException, Logger, MessageEvent, Param, Post, Request, Res, Sse, UseGuards } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'apps/qualyteeth-server/src/core/auth/auth.service';
import { LocalAuthGuard } from 'apps/qualyteeth-server/src/core/auth/local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    private channelSubject: Subject<any> = new Subject<any>();

    /**
     *
     */
    constructor(private authService: AuthService) { }

    /**
     *
     */
    // @Get('tmp-token')
    // async getTempToken(@Param() params) {
    //     return this.authService.getTempToken();
    // }

    /**
     *
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        try {
            return await this.authService.login(req.user, req.body['type']);
        } catch (e) {
            if (e.message === 'user-not-found') {
                throw new HttpException(`User ${req.user.username} does not exist`, 401);
            }
            else {
                throw e;
            }
        }
    }

    /**
     *
     */
    @Post('signin')
    async signin(@Request() req) {
        return await this.authService.signin(req.body);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('validate')
    async get(@Request() req): Promise<boolean> {
        const r = await this.authService.validate(req.body['username'], req.body['password']);
        return r != null;
    }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard)
    // @Post('update')
    // async updateUser(@Request() req) {
    //     // try {
    //     //     await this.authService.update(req.body.user);
    //     // } catch (e) {
    //     //     throw new HttpException('Cannot update user: ' + e, HttpStatus.INTERNAL_SERVER_ERROR);
    //     // }
    // }

    /**
     *
     */
    @Get('qr/channel')
    async channel(): Promise<any> {
        const channel = Math.random().toString(36).substring(2, 18);
        return { 'channel': channel }
    }

    /**
     *
     */
    // @Sse('qr/sse/:channel')
    // @Header('Content-Type', 'text/event-stream')
    // @Header('Cache-Control', 'no-cache')
    // @Header('Connection', 'keep-alive')
    // sseConnect(@Param() params): Observable<MessageEvent> {

    //     console.log('Connected channel', params['channel'])

    //     return new Observable(observer => {
    //         const s = this.channelSubject.subscribe(
    //             (d) => {
    //                 // console.log('Received connection request', d)
    //                 if (d['channel'] === params['channel']) {
    //                     console.log('Sending data to client', d)
    //                     observer.next({ data: d });
    //                     s.unsubscribe()
    //                     console.log('Channel disconnected', params['channel'])
    //                     observer.complete();
    //                 }
    //             },
    //             (e) => { console.error(e) },
    //             () => { }
    //         )
    //     });
    // }

    /**
     *
     */
    @Sse('qr/sse/:channel')
    @Header('Content-Type', 'text/event-stream')
    @Header('Cache-Control', 'no-cache')
    @Header('Connection', 'keep-alive')
    async sseConnect(@Request() req, @Res() res) {
        // console.log('Connected channel', req.params.channel)

        const s = this.channelSubject.subscribe(
            (d) => {
                // console.log('Received connection request', d)

                if (d['channel'] !== req.params.channel) {
                    return;
                }

                let data = 'event: channel\n';
                data = data + 'id: channel\n';
                data = data + 'retry: 1000\n';
                data = data + 'data: ' + JSON.stringify(d) + '\n\n';
                res.write(data)
                s.unsubscribe();
            }
        )
    }

    /**
      *
      */
    @Post('qr/connect')
    async sse(@Body() body): Promise<any> {
        this.channelSubject.next(body)
    }
}
