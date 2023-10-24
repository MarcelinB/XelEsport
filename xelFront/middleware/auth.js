import { findAllGamesPreferencesByUserId, findAllLeaguePreferencesByUserId, findAllTeamPreferencesByUserId } from '~/api/preferences';
const jwt = require('jsonwebtoken');
import { setUserId, setUserPreferencesGames, setUserPreferencesLeagues, setUserPreferencesTeams, addGameToPreferences, addLeagueToPreferences, addTeamToPreferences, removeGameFromPreferences } from '~/store/index';

export default async function ({ store, route, redirect }) {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.sub;
  store.commit('setUserId', userId);

  if (route.path === '/profile' || route.path === '/calendar') {
    if (!token) {
      return redirect('/login');
    } else {
      // Récupération des préférences de jeu de l'utilisateur
      await Promise.all([
        fetchPreferencesGames(token, userId, store),
        fetchPreferencesLeagues(token, userId, store),
        fetchPreferencesTeams(token, userId, store)
      ]);
    }
  }
}

async function fetchPreferencesGames(token, userId, store) {
  try {
    const preferencesGames = await findAllGamesPreferencesByUserId(userId, token);
    preferencesGames.forEach((preference) => {
      store.commit('addGameToPreferences', preference.game);
    });
    console.log('Data from store:', store.state);
  } catch (error) {
    console.error(error);
  }
}

async function fetchPreferencesLeagues(token, userId, store) {
  try {
    const preferencesLeagues = await findAllLeaguePreferencesByUserId(userId, token);
    preferencesLeagues.forEach((preference) => {
      store.commit('addLeagueToPreferences', preference.league);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchPreferencesTeams(token, userId, store) {
  try {
    const preferencesTeams = await findAllTeamPreferencesByUserId(userId, token);
    preferencesTeams.forEach((preference) => {
      store.commit('addTeamToPreferences', preference.team);
    });
  } catch (error) {
    console.error(error);
  }
}
