import { Test, TestingModule } from '@nestjs/testing';
import { ServicingService } from './servicing.service';

describe('ServicingService', () => {
  let service: ServicingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicingService],
    }).compile();

    service = module.get<ServicingService>(ServicingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
