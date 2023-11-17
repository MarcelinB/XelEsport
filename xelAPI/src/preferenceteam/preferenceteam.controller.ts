import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PreferenceTeam } from 'src/preferenceteam/preferenceteam.entity';
import { PreferenceTeamService } from 'src/preferenceteam/preferenceteam.service';

@ApiTags('preference-teams')
@Controller('preference-teams')
export class PreferenceTeamController {
  constructor(private readonly preferenceTeamService: PreferenceTeamService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieves all preferences' })
  getAllPreferences(): Promise<PreferenceTeam[]> {
    return this.preferenceTeamService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieves a preference by ID' })
  getPreferenceById(@Param('id') id: number): Promise<PreferenceTeam> {
    return this.preferenceTeamService.findById(id);
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Retrieves all preferences by user ID' })
  async findAllByUserId(@Param('userId') userId: number): Promise<PreferenceTeam[]> {
    return this.preferenceTeamService.findAllByUserId(userId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new preference' })
  createPreference(@Body() preferenceTeam: PreferenceTeam): Promise<PreferenceTeam> {
    return this.preferenceTeamService.create(preferenceTeam);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updates a preference' })
  updatePreference(
    @Param('id') id: number,
    @Body() preferenceTeam: PreferenceTeam
  ): Promise<PreferenceTeam> {
    return this.preferenceTeamService.update(id, preferenceTeam);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deletes a preference' })
  deletePreference(@Param('id') id: number): Promise<void> {
    return this.preferenceTeamService.delete(id);
  }
}
