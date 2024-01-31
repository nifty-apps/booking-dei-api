import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancesResolver } from './maintenances.resolver';

describe('MaintenancesResolver', () => {
  let resolver: MaintenancesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenancesResolver],
    }).compile();

    resolver = module.get<MaintenancesResolver>(MaintenancesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
