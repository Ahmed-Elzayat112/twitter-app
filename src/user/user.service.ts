import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { Role } from 'src/role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(
      createUserInput as DeepPartial<User>,
    );
    const user = await this.usersRepository.save(newUser);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findUsersByBatch(usersIds: number[]): Promise<(User | null)[]> {
    // console.debug(`Loading ids ${usersIds}`);

    // Query to find users by batch
    const users = await this.usersRepository.findBy({ id: In(usersIds) });
    console.log(users);

    // Map the results to maintain the order and handle missing users
    const mappedResults = usersIds.map(
      (id) => users.find((user) => user.id === id) || null,
    );

    console.log(mappedResults);

    return mappedResults;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserInput);
    const userUpdated = await this.usersRepository.save(user);
    console.log(userUpdated);
    return userUpdated;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return user;
  }
}
