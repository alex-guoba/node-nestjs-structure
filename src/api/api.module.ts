import { Module, HttpModule } from '@nestjs/common';

import { QuotesController } from './controllers/quotes.controller';
import { QuotesService } from './services/quotes.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [QuotesService],
  controllers: [QuotesController],
})
export class ApiModule {}
