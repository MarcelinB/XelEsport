import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PreferenceGame } from '../preferencegame/preferencegame.entity';
import { Role } from 'src/Role/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  pseudonym: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  roles: Role;

  @Column({ nullable: true })
  avatar: string;
}