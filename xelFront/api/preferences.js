export async function saveGamePreference(userId, gameId, token) {
    const data = {
      getAllMatchesFromGame: false,
      user: userId,
      game: gameId,
    };
  
    try {
      const response = await fetch('http://localhost:4000/preferencegames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  }
  
  export async function saveLeaguePreference(userId, leagueId, token) {
    const data = {
      getAllMatchesFromLeague: false,
      user: userId,
      league: leagueId,
    };
  
    try {
      const response = await fetch('http://localhost:4000/preference-leagues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  }
  
  export async function saveTeamPreference(userId, teamId, token) {
    const data = {
      getAllMatchesFromTeam: false,
      user: userId,
      team: teamId,
    };
  
    try {
      const response = await fetch('http://localhost:4000/preference-teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  }

  export async function findAllGamesPreferencesByUserId(userId, token) {
    try {
      const response = await fetch(`http://localhost:4000/preferencegames/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const preferencesGames = await response.json();
        return preferencesGames;
      } else {
        throw new Error('Erreur lors de la récupération des préférences de jeu');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des préférences de jeu', error);
      throw error;
    }
  }

  // api/preferences.js
export async function findAllLeaguePreferencesByUserId(userId, token) {
  try {
    const response = await fetch(`http://localhost:4000/preference-leagues/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Erreur lors de la récupération des préférences de ligue');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function findAllTeamPreferencesByUserId(userId, token) {
  try {
    const response = await fetch(`http://localhost:4000/preference-teams/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Erreur lors de la récupération des préférences d\'équipe');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}

export async function deleteGamePreference(userId, gameId, token) {
  try {
    const response = await fetch(`http://localhost:4000/preferencegames/user/${userId}/game/${gameId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return {}; // Retourner un objet vide ou un message de confirmation si la suppression réussit
    } else {
      throw new Error('Erreur lors de la suppression de la préférence de jeu');
    }
  } catch (error) {
    console.error('!!!!Erreur lors de la suppression de la préférence de jeu', error);
    throw error;
  }
}

  