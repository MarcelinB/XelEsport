<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
    :class="{ 'is-preferred': isGamePreferred(game.id) }"
    @click="handleClick"
  >
    <div class="aspect-w-1 aspect-h-1">
    </div>
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">{{ game.name }}</h2>
      <p class="text-gray-600">{{ game.description }}</p>
      <template v-if="isGamePreferred(game.id)">
        <a href="#" class="text-red-500 underline mt-2" @click="confirmRemovePreference(game.id)">
          Ne plus suivre
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { deleteGamePreference } from '~/api';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['userId', 'preferencesGames']),
  },
  methods: {
    ...mapMutations(['addGameToPreferences', 'removeGameFromPreferences']),

    getGameImageUrl(image) {
      return `/images/${image}`;
    },
    handleClick() {
      if (!this.isGamePreferred(this.game.id)) {
        this.addGameToPreferences(this.game);
        this.$emit('game-click', this.game.id);
      } else {
        this.$emit('game-preference-click', this.game.id);
      }
    },
    isGamePreferred(gameId) {
      const preferencesGames = this.preferencesGames;
      //console.log(preferencesGames)
      return preferencesGames.some(preference => preference.id === gameId);
    },
     confirmRemovePreference(gameId) {
      const confirmation = confirm('Voulez-vous vraiment ne plus suivre ce jeu ?');
      if (confirmation) {
        this.removeGamePreference(gameId);
      }
    },
     removeGamePreference(gameId) {
      const userId = this.userId;
      const token = localStorage.getItem('token');

      // Effectuer la requête DELETE à votre API pour supprimer la préférence du jeu
      // Utilisez l'ID de l'utilisateur, l'ID du jeu et le token d'authentification
      deleteGamePreference(userId, gameId, token)
        .then(() => {
          // Supprimer le jeu des préférences dans le store
          this.removeGameFromPreferences(gameId);
          console.log('game delete dans le store')
        })
        .catch(error => {
          console.error('2 -Erreur lors de la suppression de la préférence du jeu :', error);
        });
    } ,
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
  cursor: pointer;
}
</style>
