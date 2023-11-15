export class Match {
  team1: string;
  team2: string;
  dateTimeUTC: string;
  winner: string;
  team1Score: number;
  team2Score: number;
  bestOf: number;
  shownName: string;
  id: string;
  gameId: number;

  constructor(matchData: any) {
    this.team1 = matchData['Team1'];
    this.team2 = matchData['Team2'];
    this.dateTimeUTC = matchData['DateTime_UTC'];
    this.winner = matchData['Winner'];
    this.team1Score = matchData['Team1Score'];
    this.team2Score = matchData['Team2Score'];
    this.bestOf = matchData['BestOf'];
    this.shownName = matchData['ShownName'];
    this.id = matchData['_ID'];
    this.gameId = matchData['gameId'];
  }
}