import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { ApiModule } from './api/api.module';

import { AWSModule } from './aws/aws.module';
import { BaseModule } from './base/base.module';
import { CommonModule, ExceptionsFilter, LoggerMiddleware } from './common';
import { configuration } from './config';
import { GQLModule } from './gql/gql.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        // glob paths are not supported by webpack. https://docs.nestjs.com/techniques/database#auto-load-entities 
        //entities: [`${__dirname}/entity/**/*.{js,ts}`, 'dist/server/entity/**/*.{js,ts}'],
        autoLoadEntities: true,

        // subscribers: [`${__dirname}/subscriber/**/*.{js,ts}`],
        // migrations: [`${__dirname}/migration/**/*.{js,ts}`],
        ...config.get('db'),
      }),
      inject: [ConfigService],
    }),

    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),

    // Module Router
    // https://github.com/nestjsx/nest-router
    RouterModule.forRoutes([
      {
        path: 'aws',
        module: AWSModule,
      },
      {
        path: 'test',
        module: SampleModule,
      },
      {
        path: 'api',
        module: ApiModule,
      }
    ]),
    
    // Service Modules
    CommonModule, // Global
    BaseModule,
    SampleModule,
    AWSModule,
    GQLModule,
    ApiModule
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
