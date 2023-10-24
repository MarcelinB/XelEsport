import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { BeforeInsert, FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } };
    return this.userRepository.findOne(options);
  }

  async findByPseudonym(pseudonym: string): Promise<User> {
    const options: FindOneOptions<User> = { where: { pseudonym } };
    return this.userRepository.findOne(options);
  }

  async findByEmail(email: string): Promise<User> {
    const options: FindOneOptions<User> = { where: { email } };
    return this.userRepository.findOne(options);
  }

  async create(user: User): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  /*async update(id: number, user: User): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } };
    await this.userRepository.update(options, user);
    return this.userRepository.findOne(options);
  }*/

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }


}
