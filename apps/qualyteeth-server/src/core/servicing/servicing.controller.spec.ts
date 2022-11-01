import { Test, TestingModule } from '@nestjs/testing';
import { ServicingController } from './servicing.controller';

describe('ServicingController', () => {
  let controller: ServicingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicingController],
    }).compile();

    controller = module.get<ServicingController>(ServicingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
