import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Game } from './game.entity';

@Entity()
export class PreferenceGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  getAllMatchesFromGame: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Game, { nullable: false })
  @JoinColumn({ name: 'id_game' })
  game: Game;
}