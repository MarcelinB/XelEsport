export async function fetchGames(token) {
    try {
      const response = await fetch('http://localhost:4000/games', {
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
  