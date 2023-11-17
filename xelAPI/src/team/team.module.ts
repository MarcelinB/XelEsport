import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from 'src/team/team.controller';
import { Team } from 'src/team/team.entity';
import { TeamService } from 'src/team/team.service';


@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
