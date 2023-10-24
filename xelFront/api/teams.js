export async function fetchTeamsByLeagueId(leagueId, token) {
    try {
      const response = await fetch(`http://localhost:4000/teams/league/${leagueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  