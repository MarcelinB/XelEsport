import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get(':userId')
  async getMatchesByUserPreference(@Param('userId') userId: number) {
      const matches = await this.matchService.getMatchesByUserPreference(userId);
    return matches;
  }
}