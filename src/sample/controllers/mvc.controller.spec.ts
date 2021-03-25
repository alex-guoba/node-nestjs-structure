import { Test, TestingModule } from '@nestjs/testing';
import { MvcController } from './mvc.controller';

describe('MvcController', () => {
  let controller: MvcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MvcController],
    }).compile();

    controller = module.get<MvcController>(MvcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
