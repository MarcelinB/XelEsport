// services/authService.js
import jwt from 'jsonwebtoken';
import { login } from '~/api/auth';
import {
  findAllGamesPreferencesByUserId,
  findAllLeaguePreferencesByUserId,
  findAllTeamPreferencesByUserId
} from '~/api/preferences';

export async function handleSuccessfulLogin(email, password, $store, $router) {
  try {
    const response = await login(email, password);

    // Si la connexion est réussie
    if (response) {
      const data = response;
      // Stockage du jeton dans le local storage ou les cookies
      // Assurez-vous d'ajuster cette partie selon vos besoins et votre API
      localStorage.setItem('token', data.access_token);
      const decodedToken = jwt.decode(data.access_token);
      // Stockage de l'identifiant utilisateur dans le store
      $store.commit('setUserId', decodedToken.sub);

      // Récupération des préférences de jeu de l'utilisateur
      await Promise.all([
        fetchPreferencesGames($store, data.access_token),
        fetchPreferencesLeagues($store, data.access_token),
        fetchPreferencesTeams($store, data.access_token)
      ]);

      // Redirection vers la page personnalisée
      $router.push('/profile');
    } else {
      // Gestion des erreurs d'authentification
      console.error('Erreur d\'authentification');
    }
  } catch (error) {
    console.error(error);
    // Gestion des erreurs de requête
  }
}

export async function handleSuccessfullReconnexion($store){
    const decodedToken = jwt.decode(data.access_token);
    $store.commit('setUserId', decodedToken.sub);
    await Promise.all([
        fetchPreferencesGames($store, data.access_token),
        fetchPreferencesLeagues($store, data.access_token),
        fetchPreferencesTeams($store, data.access_token)
      ]);
}

async function fetchPreferencesGames($store, token) {
  try {
    const userId = $store.state.userId;
    const preferencesGames = await findAllGamesPreferencesByUserId(userId, token);
    preferencesGames.forEach((preference) => {
      $store.commit('addGameToPreferences', preference.game);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchPreferencesLeagues($store, token) {
  try {
    const userId = $store.state.userId;
    const preferencesLeagues = await findAllLeaguePreferencesByUserId(userId, token);
    preferencesLeagues.forEach((preference) => {
      $store.commit('addLeagueToPreferences', preference.league);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchPreferencesTeams($store, token) {
  try {
    const userId = $store.state.userId;
    const preferencesTeams = await findAllTeamPreferencesByUserId(userId, token);
    preferencesTeams.forEach((preference) => {
      $store.commit('addTeamToPreferences', preference.team);
    });
  } catch (error) {
    console.error(error);
  }
}
