import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { League } from 'src/league/league.entity';
import { LeagueService } from 'src/league/league.service';

@ApiTags('leagues')
@Controller('leagues')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieves all leagues' })
  async findAll(): Promise<League[]> {
    return this.leagueService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieves a league by ID' })
  async findById(@Param('id') id: number): Promise<League> {
    return this.leagueService.findById(id);
  }

  @Get('game/:gameId')
  @ApiResponse({ status: 200, description: 'Retrieves leagues by game ID' })
  getLeaguesByGame(@Param('gameId') gameId: number) {
    return this.leagueService.getLeaguesByGame(gameId);
  }
}
