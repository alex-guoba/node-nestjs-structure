import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuotesService } from '../services/quotes.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'

@Controller('quotes')
export class QuotesController {
    constructor(
        private readonly quoteService: QuotesService,
        ) {
        }

    @Get('random/:count')
    public random(@Param('count', ParseIntPipe) count: number): Observable<AxiosResponse<any>>{
        return this.quoteService.getQuotes(count);
    }
}
