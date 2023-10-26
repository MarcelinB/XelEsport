import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { TestMatchesService } from './testmatchs.services';


@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService,
    private readonly testmatchsService: TestMatchesService) {}

 @Get(':userId')
  async getMatchesByUserPreference(@Param('userId') userId: number) {
      const matches = await this.matchService.getLolMatchesByUserPreference(userId);
    return matches;
  }

  @Get()
  async getMatches() {
      const matches = await this.testmatchsService.getTeamMatches('Team BDS');
      //console.log(matches);
    return matches;
  }
}