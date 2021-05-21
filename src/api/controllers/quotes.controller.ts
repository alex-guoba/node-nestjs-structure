import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Observable } from 'rxjs';

import { InfQuote } from '../interface/quotes.interface';
import { QuotesService } from '../services/quotes.service';
// import { AxiosResponse } from 'axios'

@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quoteService: QuotesService,
  ) {
  }

  @Get('random/:count')
  public random(@Param('count', ParseIntPipe) count: number): Observable<InfQuote> {
    return this.quoteService.getQuotes(count);
  }

  @Get('parallel')
  public parallel(): Observable<unknown> {
    return this.quoteService.parallel(1, 'anyone');
  }

  @Get('sequential')
  public sequential(): Observable<unknown> {
    return this.quoteService.sequential();
  }
}
