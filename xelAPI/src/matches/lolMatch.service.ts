import { PreferenceGameService } from "src/services/preferencegame.service";
import { Injectable } from "@nestjs/common";
import { PreferenceLeagueService } from "src/services/preferenceleague.service";
import { PreferenceTeamService } from "src/services/preferenceteam.service";
import { CargoClient } from "poro";
import { DateService } from "src/services/dates.services";
import { User } from "src/entity/user.entity";
import { Match } from "./match.entity";

@Injectable()
export class LeagueOfLegendMatchService {
  constructor(
    private preferenceGameService: PreferenceGameService,
    private preferenceLeagueService: PreferenceLeagueService,
    private preferenceTeamService: PreferenceTeamService,
    private dateService: DateService,
  ) {}

  GAME_LEAGUE_OF_LEGEND_ID = 1;

  async getLolMatchesByUserPreference(user: User): Promise<any> {
    const { preferenceGames, preferenceLeagues, preferenceTeams } = await this.getUserPreferences(user);
    const allLolMatches = {};

    if (preferenceGames.find(preferenceGame => preferenceGame.getAllMatchesFromGame === true)) {
      const matches = await this.getAllLolmMatchesSincesThreeWeeks();
      for (const match of matches) {
        allLolMatches[match.id] = match;
      }
      return Object.values(allLolMatches);
    } else {
      if (preferenceLeagues.find(preferenceLeague => preferenceLeague.getAllMatchesFromLeague === true)) {
        const matches = await this.getLolLeaguesMatches(preferenceLeagues);
        for (const match of matches) {
          if (!allLolMatches[match.id]) {
            allLolMatches[match.id] = match;
          }
        }
      } 

      const allPrefferedTeams = [];
      preferenceTeams.forEach(team => {
        allPrefferedTeams.push(team.team.name);
      });
      const matches = await this.getLolMatchesByTeamsNames(allPrefferedTeams);
      for (const match of matches) {
        if (!allLolMatches[match.id]) {
          allLolMatches[match.id] = match;
        }
      }

      return Object.values(allLolMatches);
    }
  }

  private async queryMatchesFromCargo(whereClause: string) {
    const cargo = new CargoClient();
    const matches = await cargo.query({
      tables: ['MatchSchedule'],
      fields: [
        'MatchSchedule.Team1',
        'MatchSchedule.Team2',
        'MatchSchedule.DateTime_UTC',
        'MatchSchedule.Winner',
        'MatchSchedule.Team1Score',
        'MatchSchedule.Team2Score',
        'MatchSchedule.BestOf',
        'MatchSchedule.ShownName',
        'MatchSchedule._ID',
      ],
      where: whereClause,
      orderBy: [
        {
          field: 'MatchSchedule.DateTime_UTC',
          desc: true,
        },
      ],
    });

    const matchesObj = matches.data;
    matchesObj.forEach(match => {
      match['gameId'] = this.GAME_LEAGUE_OF_LEGEND_ID;
    });
    const lolMatches = matchesObj.map(matchData => new Match(matchData));
    return lolMatches;
  }

  async getLolMatchesByTeamsNames(teamNames: string[]) {
    if (teamNames.length === 0) {
      return [];
    }

    const whereClause = `MatchSchedule.DateTime_UTC >= DATE("${this.dateService.getThreeWeeksAgoISO()}") AND (` +
      teamNames.map(teamName => `MatchSchedule.Team1="${teamName}" OR MatchSchedule.Team2="${teamName}"`).join(" OR ") +
      ")";

    const teamsMatches = await this.queryMatchesFromCargo(whereClause);
    if (teamsMatches && teamsMatches.length > 0) {
      return teamsMatches;
    } else {
      throw new Error("No matches found for the specified teams");
    }
  }

  async getLolLeaguesMatches(preferenceLeagues: any[]) {
    const leaguesNames = [];
    console.log(preferenceLeagues);
    preferenceLeagues.forEach(league => {
      leaguesNames.push(league.league.name);
    });

    if (leaguesNames.length === 0) {
      return [];
    }

    const whereClause = `MatchSchedule.DateTime_UTC >= DATE("${this.dateService.getThreeWeeksAgoISO()}") AND (` +
    leaguesNames.map(leagueName => `MatchSchedule.ShownName LIKE "%${leagueName}%"`).join(" OR ") +
    ")";
    const leaguesMatches = await this.queryMatchesFromCargo(whereClause);
    if (leaguesMatches && leaguesMatches.length > 0) {
      return leaguesMatches;
    } else {
      throw new Error("No matches found for the specified leagues");
    }
  }

  async getAllLolmMatchesSincesThreeWeeks() {
    return this.queryMatchesFromCargo(
      `MatchSchedule.DateTime_UTC >= DATE("${this.dateService.getThreeWeeksAgoISO()}")`
    );
  }

  async getUserPreferences(user: User){
    const preferenceGames = await this.preferenceGameService.findAllByUserId(user.id);
    const preferenceLeagues = await this.preferenceLeagueService.findAllByUserId(user.id);
    const preferenceTeams = await this.preferenceTeamService.findAllByUserId(user.id);

    return {
      preferenceGames,
      preferenceLeagues,
      preferenceTeams
    }
  }
}