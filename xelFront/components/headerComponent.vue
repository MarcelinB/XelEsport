<template>
    <header class="bg-gray-800 text-white py-4">
      <nav class="container mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-lg font-bold">XEL</h1>
        </div>
        <div class="flex items-center space-x-4">
          <ul class="hidden md:flex space-x-4">
            <li>
              <nuxt-link to="/" class="hover:text-gray-300">Accueil</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/profile" class="hover:text-gray-300">Profil</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/settings" class="hover:text-gray-300">Paramètres</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/calendar" class="hover:text-gray-300">Calendrier</nuxt-link>
            </li>
            <li>
              <button @click="logout" class="hover:text-gray-300">Déconnexion</button>
            </li>
          </ul>
          <div class="md:hidden">
            <button @click="toggleMenu" class="text-gray-300 hover:text-white focus:outline-none">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="!showMenu" fill-rule="evenodd" clip-rule="evenodd" d="M3 4.5A1.5 1.5 0 014.5 3h11A1.5 1.5 0 0117 4.5v1a1.5 1.5 0 11-3 0V4.5h-1A1.5 1.5 0 0111 3h-1.5A1.5 1.5 0 018 4.5v1A1.5 1.5 0 019.5 7H11v1.5a1.5 1.5 0 11-3 0V7H6.5A1.5 1.5 0 015 5.5v-1zm6 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm1.5 3h1.5a1.5 1.5 0 000-3H10a1.5 1.5 0 100 3zM7 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5-1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path v-if="showMenu" fill-rule="evenodd" clip-rule="evenodd" d="M3 4.5A1.5 1.5 0 014.5 3h11A1.5 1.5 0 0117 4.5v1a1.5 1.5 0 11-3 0V4.5h-1A1.5 1.5 0 0111 3h-1.5A1.5 1.5 0 018 4.5v1A1.5 1.5 0 019.5 7H11v1.5a1.5 1.5 0 11-3 0V7H6.5A1.5 1.5 0 015 5.5v-1zm6 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm1.5 3h1.5a1.5 1.5 0 000-3H10a1.5 1.5 0 100 3zM7 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5-1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </button>
          </div>
        </div>
        <ul v-show="showMenu" class="md:hidden space-y-2 mt-2">
          <li>
            <nuxt-link to="/" class="block hover:text-gray-300">Accueil</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile" class="block hover:text-gray-300">Profil</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/settings" class="block hover:text-gray-300">Paramètres</nuxt-link>
          </li>
          <li>
            <button @click="logout" class="block hover:text-gray-300">Déconnexion</button>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showMenu: false,
      };
    },
    methods: {
      logout() {
        // Ajoutez ici votre logique de déconnexion
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles personnalisés ici si nécessaire */
  </style>
  