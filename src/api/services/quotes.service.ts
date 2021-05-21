import { Injectable, HttpService, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';

import { InfQuote, InfAge, InfQuoteAge } from '../interface/quotes.interface';

@Injectable()
export class QuotesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(QuotesService.name);
  }

  public getQuotes(count: number): Observable<InfQuote> {
    const url = queryString.stringifyUrl({
      url: 'https://goquotes-api.herokuapp.com/api/v1/random',
      // url: 'https://oquotes-api.herokuapp.com/api/v1/random',
      query: {
        count,
      },
    });

    const response = this.httpService.get(url);

    // this.logger.log(url);

    return response.pipe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      map((ares: AxiosResponse) => ares.data),

      // eslint-disable-next-line @typescript-eslint/typedef
      catchError((error) => {
        this.logger.error('quote server excpetion, return with default value', error);
        // return throwError('Inner errror');
        return of({
          status: 100,
          message: 'Remote server error',
          count: 0,
          quotes: [],
        });
      }),

      finalize(() => {
        // TODO: add some report/stat function if necessery
        this.logger.log('finalize');
      }),
    );

    // return data;
  }

  public getAge(name: string | undefined): Observable<InfAge> {
    if (name === undefined) {
      // eslint-disable-next-line no-param-reassign
      name = 'default';
    }
    const url = queryString.stringifyUrl({
      url: 'https://api.agify.io',
      query: {
        name,
      },
    });

    const response = this.httpService.get(url);

    return response.pipe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      map((ares: AxiosResponse) => ares.data),

      // eslint-disable-next-line @typescript-eslint/typedef
      catchError((error) => {
        this.logger.error('agify server excpetion, return with default value', error);
        // return throwError('Inner errror');
        return of({
          name: '',
          age: 0,
          count: 0,
        });
      }),

      finalize(() => {
        // TODO: add some report/stat function if necessery
        this.logger.log('finalize');
      }),
    );

    // return data;
  }

  // parallel request by for forkJoin
  public parallel(count: number, name: string): Observable<InfQuoteAge> {
    const quote: Observable<InfQuote> = this.getQuotes(count);
    const age: Observable<InfAge> = this.getAge(name);

    return forkJoin({ quote, age }).pipe(
      // eslint-disable-next-line @typescript-eslint/typedef
      map((val) => {
        const ret: InfQuoteAge = {};
        if (val.quote.status === 200) {
          ret.quote = val.quote;
        } else {
          this.logger.error(val.quote);
        }
        if (val.age.age !== 0) {
          ret.age = val.age;
        }
        return ret;
      }),
    );
  }

  // https://medium.com/@snorredanielsen/rxjs-accessing-a-previous-value-further-down-the-pipe-chain-b881026701c1
  // sequential request by mergeMap
  public sequential(): Observable<InfQuoteAge> {
    const quote: Observable<InfQuote> = this.getQuotes(1);

    return quote.pipe(
      mergeMap((iq: InfQuote) => {
        // this.logger.log('next age request');
        if (iq.quotes.length > 0) {
          const name = iq.quotes[0].author;
          return this.getAge(name).pipe(
            map((ag: InfAge) => ({ iq, ag })),
          );
        }
        return of({ iq, ag: undefined });
      }),

      // eslint-disable-next-line @typescript-eslint/typedef
      map(({ iq, ag }) => {
        const ret: InfQuoteAge = {};
        if (quote) {
          ret.quote = iq;
        }
        if (ag) {
          ret.age = ag;
        }
        return ret;
      }),
    );
  }

  // sequentail + parallel
  // https://egghead.io/lessons/rxjs-load-data-from-an-array-of-ids-with-observable-forkjoin-in-rxjs
  // public paraseq(): Observable<unknown> {
  //   const quote: Observable<InfQuote> = this.getQuotes(1);

  //   interface AgeIndex {
  //     age: InfAge,
  //     index: Number,
  //   };

  //   const ages: Observable<AgeIndex[]> = quote.pipe(
  //     mergeMap((infq: InfQuote) => {
  //       const ages: Observable<AgeIndex>[] = [];
  //       infq.quotes.forEach((qo: Quote, idx: number) => {
  //         ages.push(this.getAge(qo.author).pipe(
  //           map((ag: InfAge) => {
  //             const ai: AgeIndex = {
  //               age: ag,
  //               index: idx
  //             }
  //             return ai;
  //           }),
  //         ));
  //       });
  //       return forkJoin(ages);
  //     })
  //   );

  //   return combineLatest([quote, ages]).pipe(
  //     map(({infq: [InfQuote, AgeIndex[]], idx: number}) => {
  //     }
  //     );
  //   }

  // // eslint-disable-next-line @typescript-eslint/typedef
  // map(({ qo, ag, idx }) => {
  //   const ret: InfQuote = {};
  //   if (quote) {
  //     ret.quote = iq;
  //   }
  //   if (ag) {
  //     ret.age = ag;
  //   }
  //   return ret;
  // }),
  // }
}
