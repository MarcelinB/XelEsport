import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { TestMatchesService } from './testmatchs.services';


@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService,
    private readonly testmatchsService: TestMatchesService) {}

 /*@Get(':userId')
  async getMatchesByUserPreference(@Param('userId') userId: number) {
    console.log('oui')
      const matches = await this.matchService.getMatchesByUserPreference(userId);
    return matches;
  }*/

  @Get()
  async getMatches() {
      const matches = await this.testmatchsService.getTeamMatches('G2 Esports');
      //console.log(matches);
    return matches;
  }
}