import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PreferenceGameService } from './preferencegame.service';
import { PreferenceGame } from 'src/preferencegame/preferencegame.entity';

@ApiTags('preferencegames')
@Controller('preferencegames')
export class PreferenceGameController {
  constructor(private readonly preferenceGameService: PreferenceGameService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieves all preferences' })
  async findAll(): Promise<PreferenceGame[]> {
    return this.preferenceGameService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieves a preference by ID' })
  async findById(@Param('id') id: number): Promise<PreferenceGame> {
    return this.preferenceGameService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new preference' })
  async create(@Body() preferenceGame: PreferenceGame): Promise<PreferenceGame> {
    return this.preferenceGameService.create(preferenceGame);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updates a preference' })
  async update(
    @Param('id') id: number,
    @Body() preferenceGame: PreferenceGame,
  ): Promise<PreferenceGame> {
    return this.preferenceGameService.update(id, preferenceGame);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deletes a preference' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.preferenceGameService.delete(id);
  }

  @Delete('user/:userId/game/:gameId')
  @ApiResponse({ status: 204, description: 'Deletes a preference game by user and game ID' })
  deletePreferenceGame(
    @Param('userId') userId: number,
    @Param('gameId') gameId: number
  ): Promise<void> {
    return this.preferenceGameService.deletePreferenceGame(userId, gameId);
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Retrieves all preferences by user ID' })
  async findAllByUserId(@Param('userId') userId: number): Promise<PreferenceGame[]> {
    return this.preferenceGameService.findAllByUserId(userId);
  }
}
