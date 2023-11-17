import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from 'src/game/game.controller';
import { Game } from 'src/game/game.entity';
import { GameService } from 'src/game/game.service';


@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
