import { Test, TestingModule } from '@nestjs/testing';
import { MvcController } from './mvc.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '../../common';
import { configuration } from '../../config';
import { SampleModule } from '../sample.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('MvcController', () => {
  let controller: MvcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        CommonModule,
        SampleModule,
        /*
        TypeOrmModule.forRoot({
          ...(<ConnectionOptions>(await configuration()).db),
          entities: [],
        }),
        */
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => ({
            // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
            autoLoadEntities: true,
            ...config.get('db'),
          }),
          inject: [ConfigService],
        }),
      ],

      controllers: [MvcController],
    }).compile();

    controller = module.get<MvcController>(MvcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
