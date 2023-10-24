<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
       :class="{ 'is-preferred': isTeamPreferred(team.id) }"
       @click="handleClick">
    <div class="w-full h-0 aspect-w-1 aspect-h-1">
      
    </div>
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">{{ team.name }}</h2>
      <p class="text-gray-600">{{ team.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['userId', 'preferencesTeams']),
  },

  methods: {
    ...mapMutations(['addTeamToPreferences']),
    getTeamImageUrl(image) {
      return `/images/${image}`;
    },
    handleClick() {
      if (!this.isTeamPreferred(this.team.id)) {
        this.addTeamToPreferences(this.team);
        this.$emit('team-click', this.team.id);
      }
    },
    isTeamPreferred(teamId) {
      const preferencesTeams = this.preferencesTeams;
      // Vérifier si l'équipe est préférée en recherchant son ID dans le tableau des équipes de préférence
      return preferencesTeams.some(preference => preference.id === teamId);
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
