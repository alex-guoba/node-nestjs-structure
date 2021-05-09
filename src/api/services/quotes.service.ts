import { Injectable, HttpService, Logger } from '@nestjs/common';
import queryString from 'query-string';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
// import { map } from 'rxjs/operators';

@Injectable()
export class QuotesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger
    ) {
      this.logger.setContext(QuotesService.name);
  }

  public getQuotes(count: number): Observable<AxiosResponse<any>> {
    const url = queryString.stringifyUrl({
      url: 'https://goquotes-api.herokuapp.com/api/v1/random',
      query: {
        count: count,
      },
    });
    this.logger.log(url);
    
    return this.httpService.get(url);
    // .pipe(
    //     map(response => response.data)
    // );       
  }

  // findAll(): Observable<AxiosResponse<Cat[]>> {
  //     return this.httpService.get('http://localhost:3000/cats');
  // }
}

