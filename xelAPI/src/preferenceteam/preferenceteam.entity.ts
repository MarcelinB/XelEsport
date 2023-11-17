import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Team } from '../team/team.entity';

@Entity()
export class PreferenceTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  getAllMatchesFromTeam: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'id_team' })
  team: Team;
}
