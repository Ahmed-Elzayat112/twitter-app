import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  created_at: Date;

  @Column()
  expire_at: Date;

  @ManyToOne(() => User, (user) => user.verificationCodes)
  user: User;
}
