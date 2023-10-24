<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Créer un compte</h1>
      <form @submit="register" class="flex flex-col items-center">
        <input v-model="firstName" type="text" placeholder="Prénom" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded">
        <input v-model="lastName" type="text" placeholder="Nom" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded">
        <input v-model="pseudonym" type="text" placeholder="Pseudonyme" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded">
        <input v-model="email" type="email" placeholder="Email" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded">
        <input v-model="password" type="password" placeholder="Mot de passe" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded">
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Créer un compte</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        firstName: '',
        lastName: '',
        pseudonym: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async register(event: Event) {
        event.preventDefault();
  
        try {
          // Appel à votre API pour l'inscription
          // Utilisez fetch, axios ou toute autre bibliothèque de requêtes HTTP
  
          // Exemple avec fetch
          const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              first_name: this.firstName,
              last_name: this.lastName,
              pseudonym: this.pseudonym,
              email: this.email,
              password: this.password,
              roles: ['user'],
            }),
          });
  
          if (response.ok) {
            // Traitement de la réponse après l'inscription réussie
            console.log('Inscription réussie');
            this.$router.push('/login');
          } else {
            // Gestion des erreurs d'inscription
            console.error('Erreur lors de l\'inscription');
          }
        } catch (error) {
          console.error(error);
          // Gestion des erreurs de requête
        }
      },
    },
  });
  </script>
  
  <style scoped>
  /* Ajoutez vos styles personnalisés ici si nécessaire */
  </style>
  