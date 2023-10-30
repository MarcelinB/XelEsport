import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { PreferenceGameService } from 'src/services/preferencegame.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceGame } from 'src/entity/preferencegame.entity';
import { Game } from 'src/entity/game.entity';
import { GameService } from 'src/services/game.service';
import { Match } from './match.entity';
import { PreferenceGameModule } from 'src/module/preferencegame.module';
import { LeagueService } from 'src/services/league.service';
import { TeamService } from 'src/services/team.service';
import { League } from 'src/entity/league.entity';
import { Team } from 'src/entity/team.entity';
import { PreferenceLeagueService } from 'src/services/preferenceleague.service';
import { PreferenceTeamService } from 'src/services/preferenceteam.service';
import { PreferenceLeague } from 'src/entity/preferenceleague.entity';
import { PreferenceTeam } from 'src/entity/preferenceteam.entity';
import { LeagueOfLegendMatchService } from './lolMatch.service';
import { DateService } from 'src/services/dates.services';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, PreferenceGame, PreferenceLeague, PreferenceTeam, Game, League, Team, User]), PreferenceGameModule],
  providers: [LeagueOfLegendMatchService, DateService, PreferenceGameService, PreferenceLeagueService, PreferenceTeamService,
    GameService, LeagueService, TeamService, UserService],
  controllers: [MatchController],
})
export class MatchModule {}