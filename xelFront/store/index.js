export const state = () => ({
  userId: null,
  preferencesGames: [],
  preferencesLeagues: [],
  preferencesTeams: [],
});

export const mutations = {
  setUserId(state, userId) {
    state.userId = userId;
  },
  setUserPreferencesGames(state, games) {
    state.preferencesGames = games;
  },
  setUserPreferencesLeagues(state, leagues) {
    state.preferencesLeagues = leagues;
  },
  setUserPreferencesTeams(state, teams) {
    state.preferencesTeams = teams;
  },
  addGameToPreferences(state, game) {
    state.preferencesGames.push(game);
  },
  addLeagueToPreferences(state, league) { // Définition de la mutation addLeagueToPreferences
    state.preferencesLeagues.push(league);
  },
  addTeamToPreferences(state, teamId) {
    state.preferencesTeams.push(teamId);
  },
  removeGameFromPreferences(state, gameId) {
    const index = state.preferencesGames.findIndex(game => game.id === gameId);
    if (index !== -1) {
      state.preferencesGames.splice(index, 1);
    }
  },
};


