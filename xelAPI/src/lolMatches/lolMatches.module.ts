import { Module } from '@nestjs/common';
import { MatchController } from './lolMatches.controller';
import { PreferenceGameService } from 'src/preferencegame/preferencegame.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceGame } from 'src/preferencegame/preferencegame.entity';
import { Game } from 'src/game/game.entity';
import { GameService } from 'src/game/game.service';
import { Match } from './lolMatches.entity';
import { PreferenceGameModule } from 'src/preferencegame/preferencegame.module';
import { LeagueService } from 'src/league/league.service';
import { TeamService } from 'src/team/team.service';
import { League } from 'src/league/league.entity';
import { Team } from 'src/team/team.entity';
import { PreferenceLeagueService } from 'src/preferenceleague/preferenceleague.service';
import { PreferenceTeamService } from 'src/preferenceteam/preferenceteam.service';
import { PreferenceLeague } from 'src/preferenceleague/preferenceleague.entity';
import { PreferenceTeam } from 'src/preferenceteam/preferenceteam.entity';
import { LeagueOfLegendMatchService } from './lolMatches.service';
import { DateService } from 'src/services/dates.services';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, PreferenceGame, PreferenceLeague, PreferenceTeam, Game, League, Team, User]), PreferenceGameModule],
  providers: [LeagueOfLegendMatchService, DateService, PreferenceGameService, PreferenceLeagueService, PreferenceTeamService,
    GameService, LeagueService, TeamService, UserService],
  controllers: [MatchController],
})
export class MatchModule {}