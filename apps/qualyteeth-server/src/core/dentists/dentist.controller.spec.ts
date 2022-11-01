import { Test, TestingModule } from '@nestjs/testing';
import { DentistController } from './dentists.controller';

describe('DentistsController', () => {
  let controller: DentistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentistController],
    }).compile();

    controller = module.get<DentistController>(DentistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
