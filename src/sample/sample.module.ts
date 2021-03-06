import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '@app/entity/sampledb1';
import { Sampletable2 } from '@app/entity/sampledb2';
import { FoobarModule } from '@app/shared/foobar';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ...Object.values(tables)
      Sampletable1,
      Sampletable2,
    ]),
    FoobarModule, // Shared Module
    HttpModule, // https://docs.nestjs.com/techniques/http-module
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class SampleModule {}
