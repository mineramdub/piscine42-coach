# 🌊 Piscine42 Coach

Application web complète pour préparer les débutants à la Piscine 42.

## 🎯 Fonctionnalités

- ✅ **6 écrans principaux** : Aujourd'hui, Parcours, Survie, Terminal, Git, Profil
- ✅ **Validation code C** en temps réel (compilation + tests automatiques)
- ✅ **Simulateur terminal** interactif (30+ commandes)
- ✅ **Système de progression** gamifié (XP, niveaux, badges, streak)
- ✅ **15+ exercices** de base extensible à 100+
- ✅ **Mode "Je suis bloquée"** (aide contextuelle)

## 🛠️ Stack Technique

- **Frontend** : Next.js 16 + React 19 + TypeScript
- **Styling** : Tailwind CSS v4
- **Backend** : Next.js API Routes + Piston (Railway)
- **Database** : PostgreSQL (Neon) via Prisma
- **Auth** : NextAuth v5

## 🚀 Installation

\`\`\`bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env

# Setup Prisma
npx prisma generate
npx prisma db push

# Lancer le serveur
npm run dev
\`\`\`

Ouvrir [http://localhost:3000](http://localhost:3000)
