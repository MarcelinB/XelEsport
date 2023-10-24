import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PreferenceLeague } from 'src/entity/preferenceleague.entity';
import { PreferenceLeagueService } from 'src/services/preferenceleague.service';

@ApiTags('preference-leagues')
@Controller('preference-leagues')
export class PreferenceLeagueController {
  constructor(private readonly preferenceLeagueService: PreferenceLeagueService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieves all preferences' })
  getAllPreferences(): Promise<PreferenceLeague[]> {
    return this.preferenceLeagueService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieves a preference by ID' })
  getPreferenceById(@Param('id') id: number): Promise<PreferenceLeague> {
    return this.preferenceLeagueService.findById(id);
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Retrieves all preferences by user ID' })
  async findAllByUserId(@Param('userId') userId: number): Promise<PreferenceLeague[]> {
    return this.preferenceLeagueService.findAllByUserId(userId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new preference' })
  createPreference(@Body() preferenceLeague: PreferenceLeague): Promise<PreferenceLeague> {
    return this.preferenceLeagueService.create(preferenceLeague);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updates a preference' })
  updatePreference(
    @Param('id') id: number,
    @Body() preferenceLeague: PreferenceLeague
  ): Promise<PreferenceLeague> {
    return this.preferenceLeagueService.update(id, preferenceLeague);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deletes a preference' })
  deletePreference(@Param('id') id: number): Promise<void> {
    return this.preferenceLeagueService.delete(id);
  }
}
