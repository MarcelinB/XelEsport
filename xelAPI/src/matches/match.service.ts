import { GameService } from "src/services/game.service";
import { LeagueService } from "src/services/league.service";
import { TeamService } from "src/services/team.service";

import { PreferenceGameService } from "src/services/preferencegame.service";
import { Injectable } from "@nestjs/common";
import { PreferenceLeagueService } from "src/services/preferenceleague.service";
import { PreferenceTeamService } from "src/services/preferenceteam.service";
import { CargoClient } from "poro";

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

 // Retrieve matches for a given LeagueOfLegends team within the last three weeks.
 async getLolTeamMatches(teamName: string) {
    // Create an instance of the CargoClient.
    const cargo = new CargoClient();

    // Query the 'Teams' table to find the team by name.
    const team = await cargo.query({
      tables: ['Teams'],
      where: `Teams.Name="${teamName}"`,
    });

    // Check if the team exists in the 'Teams' table.
    if (team.data && team.data.length > 0) {
      // Get the current date.
      const currentDate = new Date();

      // Calculate the date three weeks before the current date.
      const threeWeeksBefore = new Date(currentDate);
      threeWeeksBefore.setDate(currentDate.getDate() - 21);

      // Convert the three weeks before date to ISO format.
      const threeWeeksBeforeISO = threeWeeksBefore.toISOString();

      // Query the 'MatchSchedule' table to find matches for the specified team
      // within the last three weeks.
      const matches = await cargo.query({
        tables: ['MatchSchedule'],
        fields: ['MatchSchedule.Team1', 'MatchSchedule.Team2', 'MatchSchedule.DateTime_UTC',
        'MatchSchedule.Winner', 'MatchSchedule.Team1Score', 'MatchSchedule.Team2Score',
        'MatchSchedule.BestOf', 'MatchSchedule.ShownName', 'MatchSchedule._ID'],
        where: `MatchSchedule.DateTime_UTC >= DATE("${threeWeeksBeforeISO}") 
        AND (MatchSchedule.Team1="${teamName}" OR MatchSchedule.Team2="${teamName}")`,
        orderBy: [
          {
            field: 'MatchSchedule.DateTime_UTC',
            desc: true,
          },
        ],
      });
      const matchesObj = matches.data;
      // Add Lol ID to the matches.
      matchesObj.forEach(match => {
        match['gameId'] = 1;
      });
      // Return the data for the matches found.
      return matchesObj;
    } else {
      // Throw an error if the team is not found.
      throw Error("Team not found");
    }
  }
    async getMatchesByUserPreference(userId: number): Promise<any> {
        const preferenceGames = await this.preferenceGameService.findAllByUserId(userId);
        const preferenceLeagues = await this.preferenceLeagueService.findAllByUserId(userId);
        const preferenceTeams = await this.preferenceTeamService.findAllByUserId(userId);
        
        // For the moment we only have LeagueOfLegends
        const allMatches = [];
        for (const preferenceTeam of preferenceTeams) {
            const teamName = preferenceTeam.team.name;
            const match = await this.getLolTeamMatches(teamName);
            
            allMatches.push(...match);
        }
        return allMatches;

      }
}