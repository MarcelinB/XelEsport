import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Team } from 'src/team/team.entity';
import { TeamService } from 'src/team/team.service';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieves all teams' })
  getAllTeams(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieves a team by ID' })
  getTeamById(@Param('id') id: number): Promise<Team> {
    return this.teamService.findById(id);
  }

  @Get('league/:leagueId')
  @ApiResponse({ status: 200, description: 'Retrieves teams by league ID' })
  async findByLeague(@Param('leagueId') leagueId: number): Promise<Team[]> {
    return this.teamService.findByLeague(leagueId);
  }
}
