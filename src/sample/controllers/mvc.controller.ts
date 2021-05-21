import { Controller, Get, Req, Render } from '@nestjs/common';
import { Logger } from '@app/common';
// import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
// import { FoobarService } from '../../shared/foobar';

@Controller('mvc')
export class MvcController {
    constructor(
        private readonly logger: Logger,
        //private config: ConfigService,
        //private foobarService: FoobarService,
    ) {
        this.logger.setContext(MvcController.name);
    }

    @Get('show') // http://localhost:3000/test/mvc/show
    @Render('sample/show')
    public show(@Req() req: Request) {
        return {
            message: req.originalUrl,
        };
    }

}
