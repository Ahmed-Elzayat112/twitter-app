import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentResolver } from './attachment.resolver';

describe('AttachmentResolver', () => {
  let resolver: AttachmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachmentResolver],
    }).compile();

    resolver = module.get<AttachmentResolver>(AttachmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
