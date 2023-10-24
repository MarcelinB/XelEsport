<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Connexion</h1>
    <form @submit="login" class="flex flex-col items-center">
      <input v-model="email" type="email" placeholder="Email" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded">
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded">
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Se connecter</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';
import { login } from '~/api/auth';
import { findAllGamesPreferencesByUserId, findAllLeaguePreferencesByUserId, findAllTeamPreferencesByUserId } from '~/api/preferences';
const jwt = require('jsonwebtoken');

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState(['userId']),
  },
  methods: {
    ...mapMutations(['setUserId', 'setUserPreferencesLeagues', 'setUserPreferencesTeams', 'addGameToPreferences', 'addLeagueToPreferences', 'addTeamToPreferences']),
    async login(event: Event) {
      event.preventDefault();

      try {
        const response = await login(this.email, this.password);

        // Si la connexion est réussie
        if (response) {
          const data = response;
          // Stockage du jeton dans le local storage ou les cookies
          // Assurez-vous d'ajuster cette partie selon vos besoins et votre API
          localStorage.setItem('token', data.access_token);
          const decodedToken = jwt.decode(data.access_token);
          // Stockage de l'identifiant utilisateur dans le store
          this.setUserId(decodedToken.sub);

          // Récupération des préférences de jeu de l'utilisateur
          await Promise.all([
            this.fetchPreferencesGames(data.access_token),
            this.fetchPreferencesLeagues(data.access_token),
            this.fetchPreferencesTeams(data.access_token)
          ]);

          // Redirection vers la page personnalisée
          this.$router.push('/profile');
        } else {
          // Gestion des erreurs d'authentification
          console.error('Erreur d\'authentification');
        }
      } catch (error) {
        console.error(error);
        // Gestion des erreurs de requête
      }
    },
    async fetchPreferencesGames(token: string) {
      try {
        const userId = this.userId;
        const preferencesGames = await findAllGamesPreferencesByUserId(userId, token);
        preferencesGames.forEach((preference: any) => {
          this.addGameToPreferences(preference.game)

        });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPreferencesLeagues(token: string) {
      try {
        const userId = this.userId;
        const preferencesLeagues = await findAllLeaguePreferencesByUserId(userId, token);
        //this.setUserPreferencesLeagues(preferencesLeagues);
        preferencesLeagues.forEach((preference: any) => {
          this.addLeagueToPreferences(preference.league);
        })
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPreferencesTeams(token: string) {
      try {
        const userId = this.userId;
        const preferencesTeams = await findAllTeamPreferencesByUserId(userId, token);
        //this.setUserPreferencesTeams(preferencesTeams);
        preferencesTeams.forEach((preference: any) => {
          this.addTeamToPreferences(preference.team);
        })
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici si nécessaire */
</style>
