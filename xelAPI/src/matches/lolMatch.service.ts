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
  // Constant representing the ID of the League of Legends game
  private readonly GAME_LEAGUE_OF_LEGEND_ID = 1;

  /**
   * Constructor to inject required services.
   * @param preferenceGameService - Service for user preferences related to games.
   * @param preferenceLeagueService - Service for user preferences related to leagues.
   * @param preferenceTeamService - Service for user preferences related to teams.
   * @param dateService - Service for date-related operations.
   */
  constructor(
    private readonly preferenceGameService: PreferenceGameService,
    private readonly preferenceLeagueService: PreferenceLeagueService,
    private readonly preferenceTeamService: PreferenceTeamService,
    private readonly dateService: DateService,
  ) {}

  /**
   * Retrieves League of Legends matches based on user preferences.
   * @param user - The user for whom matches are retrieved.
   * @returns An array of League of Legends matches.
   */
  async getLolMatchesByUserPreference(user: User): Promise<any> {
    // Retrieving user preferences
    const { preferenceGames, preferenceLeagues, preferenceTeams } = await this.getUserPreferences(user);

    // Initializing an object to store all League of Legends matches we should display to the user
    const allLolMatches = {};

    // If the user has chosen to retrieve all matches from the game
    if (preferenceGames.find(preferenceGame => preferenceGame.getAllMatchesFromGame === true)) {
      // Retrieving all matches from the past three weeks
      const matches = await this.getAllLolmMatchesSinceThreeWeeks();
      // Adding matches to the object
      for (const match of matches) {
        allLolMatches[match.id] = match;
      }
      // Returning matches as an array
      return Object.values(allLolMatches);
    } else {
      // If the user has chosen to retrieve all matches from a league
      if (preferenceLeagues.find(preferenceLeague => preferenceLeague.getAllMatchesFromLeague === true)) {
        // Retrieving matches from the specified leagues
        const matches = await this.getLolLeaguesMatches(preferenceLeagues);
        // Adding matches to the object
        for (const match of matches) {
          if (!allLolMatches[match.id]) {
            allLolMatches[match.id] = match;
          }
        }
      }

      // Retrieving all preferred teams
      const allPreferredTeams = preferenceTeams.map(team => team.team.name);

      // Retrieving matches based on team names
      const matches = await this.getLolMatchesByTeamsNames(allPreferredTeams);
      // Adding matches to the object
      for (const match of matches) {
        if (!allLolMatches[match.id]) {
          allLolMatches[match.id] = match;
        }
      }

      // Returning matches as an array
      return Object.values(allLolMatches);
    }
  }

  /**
   * Queries matches from Cargo based on a given where clause.
   * @param whereClause - The WHERE clause for the query.
   * @returns An array of League of Legends matches.
   */
  private async queryMatchesFromCargo(whereClause: string): Promise<Match[]> {
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

    // Adding the League Of Legend gameId property to each match
    const matchesObj = matches.data;
    matchesObj.forEach(match => {
      match['gameId'] = this.GAME_LEAGUE_OF_LEGEND_ID;
    });
    // Creating Match objects from the retrieved data
    const lolMatches = matchesObj.map(matchData => new Match(matchData));
    return lolMatches;
  }

  /**
   * Retrieves League of Legends matches based on team names.
   * @param teamNames - An array of team names.
   * @returns An array of League of Legends matches.
   * @throws {Error} - If no matches are found for the specified teams.
   */
  async getLolMatchesByTeamsNames(teamNames: string[]): Promise<Match[]> {
    // If no team names are provided, return an empty array
    if (teamNames.length === 0) {
      return [];
    }

    // Constructing the where clause for the query
    const whereClause = `MatchSchedule.DateTime_UTC >= DATE("${this.dateService.getThreeWeeksAgoISO()}") AND (` +
      teamNames.map(teamName => `MatchSchedule.Team1="${teamName}" OR MatchSchedule.Team2="${teamName}"`).join(" OR ") +
      ")";

    // Querying matches from Cargo based on the constructed where clause
    const teamsMatches = await this.queryMatchesFromCargo(whereClause);

    // If matches are found, return them; otherwise, throw an error
    if (teamsMatches && teamsMatches.length > 0) {
      return teamsMatches;
    } else {
      throw new Error("No matches found for the specified teams");
    }
  }

  /**
   * Retrieves League of Legends matches based on league names.
   * @param preferenceLeagues - An array of league preferences.
   * @returns An array of League of Legends matches.
   * @throws {Error} - If no matches are found for the specified leagues.
   */
  async getLolLeaguesMatches(preferenceLeagues: any[]): Promise<Match[]> {
    // Extracting league names from the provided preferences
    const leaguesNames = preferenceLeagues.map(league => league.league.name);

    // If no league names are provided, return an empty array
    if (leaguesNames.length === 0) {
      return [];
    }

    // Constructing the where clause for the query
    const whereClause = `MatchSchedule.DateTime_UTC >= DATE("${this.dateService.getThreeWeeksAgoISO()}") AND (` +
    leaguesNames.map(leagueName => `MatchSchedule.ShownName LIKE "%${leagueName}%"`).join(" OR ") +
    ")";

    // Querying matches from Cargo based on the constructed where clause
    const leaguesMatches = await this.queryMatchesFromCargo(whereClause);

    // If matches are found, return them otherwise throw an error
    if (leaguesMatches && leaguesMatches.length > 0) {
      return leaguesMatches;
    } else {
      throw new Error("No matches found for the specified leagues");
    }
  }

  /**
   * Retrieves all League of Legends matches from the past three weeks.
   * @returns An array of League of Legends matches.
   */
  async getAllLolmMatchesSinceThreeWeeks(): Promise<Match[]> {
    // Querying matches from Cargo based on the date constraint
    return this.queryMatchesFromCargo(
      `MatchSchedule.DateTime_UTC >= DATE("${this.dateService.getThreeWeeksAgoISO()}")`
    );
  }

  /**
   * Retrieves user preferences for League of Legends matches.
   * @param user - The user for whom preferences are retrieved.
   * @returns An object containing user preferences.
   */
  async getUserPreferences(user: User): Promise<{ preferenceGames: any[], preferenceLeagues: any[], preferenceTeams: any[] }> {
    // Retrieving user preferences from different services
    const preferenceGames = await this.preferenceGameService.findAllByUserId(user.id);
    const preferenceLeagues = await this.preferenceLeagueService.findAllByUserId(user.id);
    const preferenceTeams = await this.preferenceTeamService.findAllByUserId(user.id);

    // Returning an object containing user preferences
    return {
      preferenceGames,
      preferenceLeagues,
      preferenceTeams
    };
  }
}
