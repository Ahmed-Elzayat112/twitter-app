import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/entities/session.entity';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  create(user: User) {
    const session = this.sessionRepository.create({
      user,
    });

    return this.sessionRepository.save(session);
  }

  async get(id: number) {
    const session = await this.sessionRepository.findOneBy({ id });
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  async delete(id: number) {
    const res = await this.sessionRepository.softDelete({ id });
    return res.affected > 0;
  }
}
