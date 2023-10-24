<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
       :class="{ 'is-preferred': isLeaguePreferred(league.id) }"
       @click="handleClick">
    <div class="w-full h-0 aspect-w-1 aspect-h-1">
      
    </div>
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">{{ league.name }}</h2>
      <p class="text-gray-600">{{ league.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    league: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['userId', 'preferencesLeagues']),
  },

  methods: {
    ...mapMutations(['addLeagueToPreferences']),

    getLeagueImageUrl(image) {
      return `/images/${image}`;
    },
    handleClick() {
      if (!this.isLeaguePreferred(this.league.id)) {
        this.addLeagueToPreferences(this.league);
        this.$emit('league-click', this.league.id);
      } else {
        this.$emit('league-preference-click', this.league.id);
      }
    },
  isLeaguePreferred(leagueId) {
  const preferencesLeagues = this.preferencesLeagues;
  //console.log(preferencesLeagues[0].league.id);
  // Vérifier si la ligue est préférée en recherchant son ID dans le tableau des ligues de préférence
  return preferencesLeagues.some(preference => preference.id === leagueId);
},

  },
};
</script>

<style scoped>
.container {
  padding: 1rem;
}

.card {
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

.card img {
  transition: opacity 0.3s;
}

.card:hover img {
  opacity: 0.8;
}

.card h2 {
  line-height: 1.3;
}

.card p {
  margin-top: 1rem;
}

.is-preferred {
  background-color: yellow;
}
</style>
