import { Test, TestingModule } from '@nestjs/testing';
import { DataloaderResolver } from './dataloader.resolver';

describe('DataloaderResolver', () => {
  let resolver: DataloaderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataloaderResolver],
    }).compile();

    resolver = module.get<DataloaderResolver>(DataloaderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
