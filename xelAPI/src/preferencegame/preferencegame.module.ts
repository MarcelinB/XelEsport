import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceGameService } from './preferencegame.service';
import { PreferenceGameController } from './preferencegame.controller';
import { PreferenceGame } from 'src/preferencegame/preferencegame.entity';
import { UserService } from 'src/user/user.service';
import { GameService } from 'src/game/game.service';
import { User } from 'src/user/user.entity';
import { Game } from 'src/game/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreferenceGame, User, Game])],
  providers: [PreferenceGameService, UserService, GameService],
  controllers: [PreferenceGameController],
})
export class PreferenceGameModule {}
