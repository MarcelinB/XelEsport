import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceGameService } from '../services/preferencegame.service';
import { PreferenceGameController } from '../controllers/preferencegame.controller';
import { PreferenceGame } from 'src/entity/preferencegame.entity';
import { UserService } from 'src/services/user.service';
import { GameService } from 'src/services/game.service';
import { User } from 'src/entity/user.entity';
import { Game } from 'src/entity/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreferenceGame, User, Game])],
  providers: [PreferenceGameService, UserService, GameService],
  controllers: [PreferenceGameController],
})
export class PreferenceGameModule {}
