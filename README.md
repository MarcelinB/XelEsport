# 🎮 XelEsport

**XelEsport** est un agenda qui permet de suivre l'esport en fonction de ses préférences
---

## 📦 Structure du projet

```
XelEsport/
├── xelAPI     # Back-end (NestJS)
└── xelFront   # Front-end (Nuxt)
```

---

## 🚀 Stack technique

### Back-end : `xelAPI`
- **Node.js** avec **NestJS**
- Architecture modulaire
- REST API
- Intégration avec une base de données SQL (via .env)

### Front-end : `xelFront`
- **Nuxt** 
- **Tailwind CSS** 
- Architecture par composants

### Outils & DevOps
- **Docker** 
- **ESLint**, **Prettier** pour la qualité de code
- **Postman** (`collectionpostman.json`) pour tester les endpoints API

---

## ⚙️ Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/MarcelinB/XelEsport.git
cd XelEsport
```

### 2. Configurer l’environnement pour l’API

Créer un fichier `.env` dans `xelAPI/` avec les variables suivantes :

```
DB_HOST=...
DB_USERNAME=...
DB_PASSWORD=...
DB_NAME=...
```

➡️ Contacte l’auteur pour avoir accès à la base de données (IP à whitelister).

---

## ▶️ Lancer le projet

```bash
npm run start:dev
```

Cela démarre à la fois le front et l’API en mode développement.

---

## 🧪 Test de l'API

Utilise `collectionpostman.json` dans Postman pour tester les différents endpoints.

---


## 📄 Licence

Ce projet est sous licence MIT.
