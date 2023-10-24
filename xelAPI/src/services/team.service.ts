import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/entity/team.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TeamService {
constructor(
@InjectRepository(Team)
private readonly teamRepository: Repository<Team>,
) {}

async findAll(): Promise<Team[]> {
return this.teamRepository.find();
}

async findById(id: number): Promise<Team> {
const option: FindOneOptions<Team> = {
where: { id },
relations: ['leagues'], // Ajoutez cette ligne pour inclure la relation "leagues" lors de la recherche
};
return this.teamRepository.findOne(option);
}

async findByLeague(leagueId: number): Promise<Team[]> {
return this.teamRepository
.createQueryBuilder('team')
.leftJoinAndSelect('team.leagues', 'league') // Utilisez "leftJoinAndSelect" pour inclure la relation "leagues"
.where('league.id = :leagueId', { leagueId })
.getMany();
}

// Ajoutez les autres méthodes de votre choix pour la gestion des équipes
}