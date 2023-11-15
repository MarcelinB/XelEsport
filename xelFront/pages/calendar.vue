<template>
  <div>
    <Header />
    <div class="flex flex-col items-center">
      <div class="w-full max-w-screen-lg">
        <div class="flex justify-between mb-4">
          <button @click="goToPreviousDay" class="text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="text-lg font-bold">{{ getCurrentDate() }}</div>
          <button @click="goToNextDay" class="text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div v-for="match in filteredMatches" :key="match.id" class="flex w-full mb-4">
          <div class="w-full bg-white rounded-lg shadow-md p-4">
            <div class="text-lg font-bold mb-2">{{ match.dateTimeUTC }}</div>
            <div class="text-gray-600 mb-4">
              <div>{{ match.dateTimeUTC }}</div>
              <div>{{ match.gameId }}</div>
              <div>{{ match.shownName }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-blue-500">{{ match.team1 }}</div>
              <div class="text-red-500">{{ match.team2 }}</div>
            </div>
            <div class="mt-4 text-center text-gray-600">
              Résultat: {{ match.team1Score + "-" + match.team2Score}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '~/components/headerComponent.vue';

export default {
  components: {
    Header,
  },
  computed: {
    ...mapState(['userId']),
    filteredMatches() {
      const today = this.currentDateObj;
      const filteredMatches = this.matchs.filter((match) => {
        const matchDate = new Date(match.dateTimeUTC);
        return matchDate.toDateString() === today.toDateString();
      });
      return filteredMatches;
    },
  },
  data() {
    return {
      matchs: [],
      currentDateObj: new Date(),
    };
  },
  mounted() {
    const userId = this.userId;
    const token = localStorage.getItem('token');
    this.fetchMatches(userId, token);
  },
  methods: {
    async fetchMatches(userId, token) {
      try {
        const response = await fetch(`http://localhost:4000/matches/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.matchs = data;
        } else {
          console.error("Une erreur s'est produite lors de la récupération des matchs.");
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la requête API.", error);
      }
    },
    goToPreviousDay() {
      const newDate = new Date(this.currentDateObj);
      newDate.setDate(newDate.getDate() - 1);
      this.currentDateObj = newDate;
    },
    goToNextDay() {
      const newDate = new Date(this.currentDateObj);
      newDate.setDate(newDate.getDate() + 1);
      this.currentDateObj = newDate;
    },
    getFormattedDate(date) {
      return date.toLocaleDateString();
    },
    getCurrentDate() {
      return this.getFormattedDate(this.currentDateObj);
    },
  },
};
</script>

<style>

</style>
