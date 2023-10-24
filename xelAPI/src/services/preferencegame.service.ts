import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreferenceGame } from 'src/entity/preferencegame.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class PreferenceGameService {
  constructor(
    @InjectRepository(PreferenceGame)
    private preferenceGameRepository: Repository<PreferenceGame>,
  ) {}

  async findAll(): Promise<PreferenceGame[]> {
    return this.preferenceGameRepository.find();
  }

  async findById(id: number): Promise<PreferenceGame> {
    const option: FindOneOptions<PreferenceGame> = {
        where: { id } };
    return this.preferenceGameRepository.findOne(option);
  }

  async findAllByUserId(userId: number): Promise<PreferenceGame[]> {
    return this.preferenceGameRepository
      .createQueryBuilder('preferenceGame')
      .leftJoinAndSelect('preferenceGame.game', 'game')
      .where('preferenceGame.user.id = :userId', { userId })
      .getMany();
  }

  async create(preferenceGame: PreferenceGame): Promise<PreferenceGame> {
    console.log(preferenceGame)
    return this.preferenceGameRepository.save(preferenceGame);
  }

  async update(id: number, preferenceGame: PreferenceGame): Promise<PreferenceGame> {
    const option: FindOneOptions<PreferenceGame> = {
        where: { id } };
    const existingPreferenceGame = await this.preferenceGameRepository.findOne(option);
    if (!existingPreferenceGame) {
      throw new Error('PreferenceGame not found');
    }
    Object.assign(existingPreferenceGame, preferenceGame);
    return this.preferenceGameRepository.save(existingPreferenceGame);
  }

  async delete(id: number): Promise<void> {
    await this.preferenceGameRepository.delete(id);
  }

  async deletePreferenceGame(userId: number, gameId: number): Promise<void> {
    console.log('user : ' + userId + ' game : ' + gameId)
    // Recherche de la préférence de jeu à supprimer en fonction de l'ID de l'utilisateur et de l'ID du jeu
    const preferenceGame = await this.preferenceGameRepository.findOne({
      where: {
        user: { id: userId },
        game: { id: gameId },
      },
    });

    if (preferenceGame) {
      // Suppression de la préférence de jeu
      await this.preferenceGameRepository.remove(preferenceGame);
    } else {
      throw new Error('Preference game not found');
    }
  }
}
