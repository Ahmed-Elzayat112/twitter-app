import { Test, TestingModule } from '@nestjs/testing';
import { VerificationCodeResolver } from './verification-code.resolver';

describe('VerificationCodeResolver', () => {
  let resolver: VerificationCodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationCodeResolver],
    }).compile();

    resolver = module.get<VerificationCodeResolver>(VerificationCodeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
