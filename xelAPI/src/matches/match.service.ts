import { GameService } from "src/services/game.service";
import { LeagueService } from "src/services/league.service";
import { TeamService } from "src/services/team.service";
import { Match } from "./match.entity";
import { PreferenceGameService } from "src/services/preferencegame.service";
import { Injectable } from "@nestjs/common";
import { PreferenceLeagueService } from "src/services/preferenceleague.service";
import { PreferenceTeamService } from "src/services/preferenceteam.service";

@Injectable()
export class MatchService {
    constructor(
        private gameService: GameService,
        private leagueService: LeagueService,
        private teamService: TeamService,
        private preferenceGameService: PreferenceGameService,
        private preferenceLeagueService: PreferenceLeagueService,
        private preferenceTeamService: PreferenceTeamService,
    ){}
    async createMatches() {
        const matches = [];
        const match1 = {
            id: 1,
            date: '2023-07-21',
            time: '20:00',
            game: await this.gameService.findById(1),
            league: await this.leagueService.findById(1),
            team1: await this.teamService.findById(1),
            team2: await this.teamService.findById(2),
            result: null,
        };
        matches.push(match1);
        const match2 = {
            id: 2,
            date: '2023-07-21',
            time: '21:00',
            game: await this.gameService.findById(1),
            league: await this.leagueService.findById(2),
            team1: await this.teamService.findById(9),
            team2: await this.teamService.findById(10),
            result: null,
        };
        matches.push(match2);
        const match3 = {
            id: 3,
            date: '2023-07-21',
            time: '21:00',
            game: await this.gameService.findById(3),
            league: await this.leagueService.findById(7),
            team1: await this.teamService.findById(18),
            team2: await this.teamService.findById(19),
            result: null,
        };
        matches.push(match3);
        const match4 = {
            id: 1,
            date: '2023-07-22',
            time: '20:00',
            game: await this.gameService.findById(1),
            league: await this.leagueService.findById(1),
            team1: await this.teamService.findById(1),
            team2: await this.teamService.findById(3),
            result: null,
        };
        matches.push(match4);
        return matches;
    }

    async getMatchesByUserPreference(userId: number): Promise<any> {
        const preferenceGames = await this.preferenceGameService.findAllByUserId(userId);
        const preferenceLeagues = await this.preferenceLeagueService.findAllByUserId(userId);
        const preferenceTeams = await this.preferenceTeamService.findAllByUserId(userId);
      
        const matches = await this.createMatches();
      
        const filteredMatches = matches.filter((match) => {
          return (
            preferenceGames.some((preference) => preference.game.id === match.game.id) &&
            preferenceLeagues.some((preference) => preference.league.id === match.league.id) &&
            (preferenceTeams.some((preference) => preference.team.id === match.team1.id) ||
              preferenceTeams.some((preference) => preference.team.id === match.team2.id))
          );
        });
      
        return filteredMatches;
      }
      

}