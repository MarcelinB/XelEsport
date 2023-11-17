import { Test, TestingModule } from '@nestjs/testing';
import { Game } from '../game/game.entity';
import { GameController } from '../game/game.controller';
import { GameService } from 'src/game/game.service';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();

    gameController = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      const games: Game[] = [
        { id: 1, name: 'League Of Legends', image: 'leagueoflegends.png' },
        { id: 2, name: 'Rocket League', image: 'rocketleague.png' },
        { id: 3, name: 'Counter Strike', image: 'counterstrike.png' },
      ];
      const result: Promise<Game[]> = Promise.resolve(games);
      jest.spyOn(gameService, 'findAll').mockImplementation(() => result);

      expect(await gameController.findAll()).toBe(games);
      expect(gameService.findAll).toHaveBeenCalled();
    });
  });
});
