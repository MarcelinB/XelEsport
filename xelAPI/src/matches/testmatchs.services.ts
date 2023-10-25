import { Injectable } from '@nestjs/common';
import { CargoClient } from 'poro';

@Injectable()
export class TestMatchesService {
  constructor() {}

  // Retrieve matches for a given team within the last three weeks.
  async getTeamMatches(teamName: string) {
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

      // Return the data for the matches found.
      return matches.data;
    } else {
      // Throw an error if the team is not found.
      throw Error("Team not found");
    }
  }
}
