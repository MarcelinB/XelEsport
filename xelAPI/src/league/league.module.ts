import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueController } from 'src/league/league.controller';
import { Game } from 'src/game/game.entity';
import { League } from 'src/league/league.entity';
import { LeagueService } from 'src/league/league.service';

@Module({
  imports: [TypeOrmModule.forFeature([League, Game])],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
