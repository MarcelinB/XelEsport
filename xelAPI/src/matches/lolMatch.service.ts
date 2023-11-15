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

  /**
   * Retrieve League of Legends matches based on user preferences.
   *
   * @param user -A user object.
   * @returns An array of League of Legends matches based on user preferences.
   */
  async getLolMatchesByUserPreference(user: User): Promise<any> {
    //Get all the user preferences
    const { preferenceGames, preferenceLeagues, preferenceTeams } = await this.getUserPreferences(user);
    const allLolMatches = {};
    
    // Check if the user wants to see all matches from the game.
    if (preferenceGames.find(preferenceGame => preferenceGame.getAllMatchesFromGame === true)) {
      const matches = await this.getAllLolmMatchesSincesThreeWeeks();
      for (const match of matches) {
        allLolMatches[match.id] = match;
      }
      return Object.values(allLolMatches);
    } else {
      // Check if the user wants to see all matches from a specific league.
      if (preferenceLeagues.find(preferenceLeague => preferenceLeague.getAllMatchesFromLeague === true)) {
        const allPrefferedLeagues = [];
        preferenceLeagues.forEach(league => {
          allPrefferedLeagues.push(league.league.name);
        });
        const matches = await this.getLolLeaguesMatches(allPrefferedLeagues);
        for (const match of matches) {
          if (!allLolMatches[match.id]) {
            allLolMatches[match.id] = match;
          }
        }
      } 
  
      // Get matches based on the user's team preferences.
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
  /**
   * Query League of Legends matches from Cargo based on a WHERE clause.
   *
   * @param whereClause - The WHERE clause for querying matches.
   * @returns An array of League of Legends matches that match the WHERE clause.
   */
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

  /**
 * Retrieve League of Legends matches for specific teams within the last three weeks.
 *
 * @param teamNames - An array of team names for which to retrieve matches.
 * @returns An array of League of Legends matches for the specified teams.
 */
  async getLolMatchesByTeamsNames(teamNames: string[]) {
    if (teamNames.length === 0) {
      // If the array is empty, return an empty result.
      return [];
    }

    // Construct the WHERE clause for all specified team names.
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

   /**
 * Retrieve League of Legends matches for specific leagues within the last three weeks.
 *
 * @param leaguesNames - An array of team leagues for which to retrieve matches.
 * @returns An array of League of Legends matches for the specified leagues.
 */
   async getLolLeaguesMatches(leaguesNames: string[]) {
    if (leaguesNames.length === 0) {
      // If the array is empty, return an empty result.
      return [];
    }

    // Construct the WHERE clause for all specified leagues names.
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


  /**
   * Retrieve all League of Legends matches within the last three weeks.
   *
   * @returns An array of all League of Legends matches within the last three weeks.
   */
  async getAllLolmMatchesSincesThreeWeeks() {
    return this.queryMatchesFromCargo(
      `MatchSchedule.DateTime_UTC >= DATE("${this.dateService.getThreeWeeksAgoISO()}")`
    );
  }

    /**
   * Retrieve preferences for a user.
   * 
   * @param user A user object.
   * @returns All the preferences as preferences objects.
   */
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
