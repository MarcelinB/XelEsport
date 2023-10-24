// api/auth.js

const API_URL = 'http://localhost:4000';

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erreur d\'authentification');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(user) {
  try {
    const response = await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log('Inscription réussie');
    } else {
      throw new Error('Erreur lors de l\'inscription');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Ajoutez d'autres fonctions d'appel à l'API liées à l'authentification si nécessaire
