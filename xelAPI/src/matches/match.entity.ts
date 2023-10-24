import { Game } from "src/entity/game.entity";
import { League } from "src/entity/league.entity";
import { Team } from "src/entity/team.entity";


export class Match {
    id: number;
    date: string;
    time: string;
    game: Game;
    league: League;
    team1: Team;
    team2: Team;
    result: string | null;
  
    constructor(
      id: number,
      date: string,
      time: string,
      game: Game,
      league: League,
      team1: Team,
      team2: Team,
      result: string | null,
    ) {
      this.id = id;
      this.date = date;
      this.time = time;
      this.game = game;
      this.league = league;
      this.team1 = team1;
      this.team2 = team2;
      this.result = result;
    }
  }