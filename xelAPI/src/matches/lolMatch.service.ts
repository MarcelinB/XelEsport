import { PreferenceGameService } from "src/services/preferencegame.service";
import { Injectable } from "@nestjs/common";
import { PreferenceLeagueService } from "src/services/preferenceleague.service";
import { PreferenceTeamService } from "src/services/preferenceteam.service";
import { CargoClient } from "poro";

@Injectable()
export class LeagueOfLegendMatchService {
  constructor(
    private preferenceGameService: PreferenceGameService,
    private preferenceLeagueService: PreferenceLeagueService,
    private preferenceTeamService: PreferenceTeamService,
  ) {}

  /**
   * Retrieve League of Legends matches based on user preferences.
   *
   * @param userId - The ID of the user for whom to retrieve matches.
   * @returns An array of League of Legends matches based on user preferences.
   */
  async getLolMatchesByUserPreference(userId: number): Promise<any> {
    const preferenceGames = await this.preferenceGameService.findAllByUserId(userId);
    const preferenceLeagues = await this.preferenceLeagueService.findAllByUserId(userId);
    const preferenceTeams = await this.preferenceTeamService.findAllByUserId(userId);
    const allLolMatches = [];
    const addedMatchIds = new Set();

    // Check if the user wants to see all matches from all games.
  if (preferenceGames.find(preferenceGame => preferenceGame.getAllMatchesFromGame === true)) {
    const matches = await this.getAllLolmMatches();
    for (const match of matches) {
      if (!addedMatchIds.has(match._ID)) { // Vérifiez si le match n'a pas déjà été ajouté.
        allLolMatches.push(match);
        addedMatchIds.add(match._ID); // Ajoutez l'ID du match à l'ensemble.
      }
    }
  } 
  // Check if the user wants to see all matches from a specific league.
  else if (preferenceLeagues.find(preferenceLeague => preferenceLeague.getAllMatchesFromLeague === true)) {
    const allPrefferedLeagues = [];
    preferenceLeagues.forEach(league => {
      allPrefferedLeagues.push(league.league.name);
    });
    const matches = await this.getLolLeaguesMatches(allPrefferedLeagues);
    for (const match of matches) {
      if (!addedMatchIds.has(match._ID)) { // Vérifiez si le match n'a pas déjà été ajouté.
        allLolMatches.push(match);
        addedMatchIds.add(match._ID); // Ajoutez l'ID du match à l'ensemble.
      }
    }
  } 
  // Get matches based on the user's team preferences.
  const allPrefferedTeams = [];
  preferenceTeams.forEach(team => {
    allPrefferedTeams.push(team.team.name);
  });
  const matches = await this.getLolTeamsMatches(allPrefferedTeams);
  for (const match of matches) {
    if (!addedMatchIds.has(match._ID)) { // Vérifiez si le match n'a pas déjà été ajouté.
      allLolMatches.push(match);
      addedMatchIds.add(match._ID); // Ajoutez l'ID du match à l'ensemble.
    }
  }

  return allLolMatches;
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
      match['gameId'] = 1;
    });

    return matchesObj;
  }

  /**
 * Retrieve League of Legends matches for specific teams within the last three weeks.
 *
 * @param teamNames - An array of team names for which to retrieve matches.
 * @returns An array of League of Legends matches for the specified teams.
 */
  async getLolTeamsMatches(teamNames: string[]) {
    if (teamNames.length === 0) {
      // If the array is empty, return an empty result.
      return [];
    }

    // Construct the WHERE clause for all specified team names.
    const whereClause = `MatchSchedule.DateTime_UTC >= DATE("${this.getThreeWeeksAgoISO()}") AND (` +
      teamNames.map(teamName => `MatchSchedule.Team1="${teamName}" OR MatchSchedule.Team2="${teamName}"`).join(" OR ") +
      ")";

    const teamsMatches = await this.queryMatchesFromCargo(whereClause);
    console.log(teamsMatches)
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
    const whereClause = `MatchSchedule.DateTime_UTC >= DATE("${this.getThreeWeeksAgoISO()}") AND (` +
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
  async getAllLolmMatches() {
    return this.queryMatchesFromCargo(
      `MatchSchedule.DateTime_UTC >= DATE("${this.getThreeWeeksAgoISO()}")`
    );
  }

  /**
   * Get the ISO representation of the date three weeks ago from the current date.
   *
   * @returns An ISO date string for three weeks ago from the current date.
   */
  private getThreeWeeksAgoISO() {
    const currentDate = new Date();
    const threeWeeksBefore = new Date(currentDate);
    threeWeeksBefore.setDate(currentDate.getDate() - 21);
    return threeWeeksBefore.toISOString();
  }
}
