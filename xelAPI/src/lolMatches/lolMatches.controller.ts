import { Controller, Get, Param } from '@nestjs/common';
import { LeagueOfLegendMatchService } from './lolMatches.service';
import { UserService } from 'src/user/user.service';



@Controller('matches')
export class MatchController {
  constructor(
    private readonly leagueOfLegendMatchService: LeagueOfLegendMatchService,
    private readonly userService: UserService,
    ) {}

 @Get(':userId')
  async getMatchesByUserPreference(@Param('userId') userId: number) {
      const user = await this.userService.findById(userId);
      const matches = await this.leagueOfLegendMatchService.getLolMatchesByUserPreference(user);
    return matches;
  }


}