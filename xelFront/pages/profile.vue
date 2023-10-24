<template>
  <div>
    <Header />
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-4">Available Games</h1>
    <div>
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm mb-4">
        <span
          class="cursor-pointer hover:underline"
          @click="handleBreadcrumbClick('game')"
        >
          Game
        </span>
        <span v-if="currentStep !== 'game' && showLeagues">
          &nbsp;>&nbsp;
          <span
            class="cursor-pointer hover:underline"
            @click="handleBreadcrumbClick('league')"
          >
            League
          </span>
        </span>
        <span v-if="currentStep === 'team'">
          &nbsp;>&nbsp;
          <span>Team</span>
        </span>
      </div>

      <div v-if="!showLeagues" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <!-- Game Cards -->
        <GameCard
          v-for="game in games"
          :key="game.id"
          :game="game"
          @game-click="handleGameClick"
          @game-preference-click="handleGamePreferenceClick"
        />
      </div>
      <div v-if="showLeagues" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-if="!showTeams">
          <!-- League Cards -->
          <LeagueCard
            v-for="league in leagues"
            :key="league.id"
            :league="league"
            @league-click="handleLeagueClick"
            @league-preference-click="handleLeaguePreferenceClick"
          />
        </div>
        <div v-else>
          <!-- Team Cards -->
          <TeamCard
            v-for="team in teams"
            :key="team.id"
            :team="team"
            @team-click="handleTeamClick"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Header from '~/components/headerComponent.vue';
import GameCard from '~/components/GameCardComponent.vue';
import LeagueCard from '~/components/LeagueCardComponent.vue';
import TeamCard from '~/components/TeamCardComponent.vue';
import { mapState } from 'vuex';
import { fetchGames, fetchLeaguesByGameId, fetchTeamsByLeagueId, saveGamePreference, saveLeaguePreference, saveTeamPreference } from '~/api';

export default {
  components: {
    Header,
    GameCard,
    LeagueCard,
    TeamCard,
  },
  computed: {
    ...mapState(['userId', 'preferencesLeagues']),
  },
  data() {
    return {
      games: [],
      showLeagues: false,
      leagues: [],
      showTeams: false,
      teams: [],
      steps: ['game', 'league', 'team'], // Array of available steps
      currentStep: 'game', // Current step (initialized with 'game')
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    this.fetchGames(token);
  },
  methods: {
    async fetchGames(token) {
      try {
        const data = await fetchGames(token);
        this.games = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLeagues(gameId) {
      const token = localStorage.getItem('token');
      try {
        const data = await fetchLeaguesByGameId(gameId, token);
        this.leagues = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTeams(leagueId) {
      const token = localStorage.getItem('token');
      try {
        const data = await fetchTeamsByLeagueId(leagueId, token);
        this.teams = data;
      } catch (error) {
        console.error(error);
      }
    },
    async handleGameClick(gameId) {
      const userId = this.userId;
      const token = localStorage.getItem('token');

      try {
        const responseData = await saveGamePreference(userId, gameId, token);
        console.log('POST request successful:', responseData);
        this.showLeagues = true;
        this.currentStep = 'league'; // Update current step to 'league'
        this.fetchLeagues(gameId);
      } catch (error) {
        console.error('Error during POST request:', error);
      }
    },
    async handleGamePreferenceClick(gameId) {
      const userId = this.userId;
      this.showLeagues = true;
      this.currentStep = 'league'; // Update current step to 'league'
      this.fetchLeagues(gameId);
    },
    async handleLeaguePreferenceClick(leagueId) {
      const userId = this.userId;
      this.showTeams = true;
      this.currentStep = 'team'; // Update current step to 'team'
      this.fetchTeams(leagueId);
    },
    async handleLeagueClick(leagueId) {
      const userId = this.userId;
      const token = localStorage.getItem('token');

      try {
        const responseData = await saveLeaguePreference(userId, leagueId, token);
        console.log('POST request successful:', responseData);
        this.showTeams = true;
        this.currentStep = 'team'; // Update current step to 'team'
        this.fetchTeams(leagueId);
      } catch (error) {
        console.error('Error during POST request:', error);
      }
    },
    async handleTeamClick(teamId) {
      const userId = this.userId;
      const token = localStorage.getItem('token');

      try {
        const responseData = await saveTeamPreference(userId, teamId, token);
        console.log('POST request successful:', responseData);
      } catch (error) {
        console.error('Error during POST request:', error);
      }
    },
    handleBreadcrumbClick(step) {
      const stepIndex = this.steps.indexOf(step);
      if (stepIndex !== -1) {
        this.currentStep = step;
        // Update visibility of leagues and teams based on the current step
        if (step === 'game') {
          this.showLeagues = false;
          this.showTeams = false;
        } else if (step === 'league') {
          this.showLeagues = true;
          this.showTeams = false;
        } else if (step === 'team') {
          this.showLeagues = true;
          this.showTeams = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 1rem;
}
</style>
