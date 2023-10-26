import { Controller, Get, Param } from '@nestjs/common';
import { LeagueOfLegendMatchService } from './lolMatch.service';



@Controller('matches')
export class MatchController {
  constructor(private readonly leagueOfLegendMatchService: LeagueOfLegendMatchService) {}

 @Get(':userId')
  async getMatchesByUserPreference(@Param('userId') userId: number) {
      const matches = await this.leagueOfLegendMatchService.getLolMatchesByUserPreference(userId);
    return matches;
  }


}