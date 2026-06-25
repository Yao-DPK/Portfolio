# 🚀 Yao Konan - Portfolio

Portfolio personnel de Yao Konan, développeur fullstack. Ce projet présente mon parcours, mes compétences, mes expériences et mes projets réalisés.

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Technologies](#-technologies)
- [Fonctionnalités](#-fonctionnalités)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Développement](#-développement)
- [Déploiement](#-déploiement)
- [Environnement](#-environnement)
- [Licence](#-licence)

---

## 🎯 Aperçu

Un portfolio moderne et responsive conçu pour présenter mon profil professionnel avec une expérience utilisateur fluide, un thème clair/sombre et une internationalisation complète (français/anglais).

**Live Demo** : [https://portfolio-pyke-27.vercel.app](https://portfolio-pyke-27.vercel.app)

---

## 🛠️ Technologies

### Frontend

| Technologie | Description |
|-------------|-------------|
| **Next.js 16** | Framework React avec App Router |
| **React 19** | Bibliothèque UI |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Framework CSS utilitaire |
| **Framer Motion** | Animations (à venir) |

### Internationalisation

| Technologie | Description |
|-------------|-------------|
| **react-i18next** | Gestion des traductions |
| **i18next** | Framework i18n |
| **JSON** | Fichiers de traduction |

### Design & UI

| Technologie | Description |
|-------------|-------------|
| **Canvas API** | Animation de fond (grille + points voyageurs) |
| **CSS Variables** | Système de thème clair/sombre |
| **Responsive Design** | Mobile-first |

### Outils

| Technologie | Description |
|-------------|-------------|
| **Turborepo** | Monorepo management |
| **Vercel** | Déploiement et hébergement |
| **Git** | Versionnement |

---

## ✨ Fonctionnalités

- ✅ **Thème clair/sombre** : Bascule automatique avec persistance locale
- ✅ **Internationalisation** : Support français et anglais
- ✅ **Animations** : Fond avec grille dynamique et points voyageurs
- ✅ **Responsive** : Compatible desktop, tablette et mobile
- ✅ **SEO** : Métadonnées optimisées
- ✅ **Accessibilité** : Contraste et navigation au clavier
- ✅ **Formulaire de contact** : Validation et envoi d'email
- ✅ **Compteur de visiteurs** : Statistiques en temps réel


## 💻 Développement

### Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run clean:dev` | Nettoie le cache `.next` et relance |

### Structure des pages

- `/` → Redirection vers `/fr` (via middleware)
- `/fr` → Version française
- `/en` → Version anglaise

### Ajouter une traduction

1. Créer un fichier `section.json` dans `locales/fr/` et `locales/en/`
2. Ajouter le namespace dans `src/utils/i18n/index.ts`
3. Utiliser `useTranslation('section')` dans le composant

### Ajouter une section

1. Créer le composant dans `components/sections/previews/`
2. Ajouter les traductions dans les fichiers JSON
3. Importer et ajouter dans `page.tsx`

---



## 🙏 Crédits

- **Icônes** : [Lucide](https://lucide.dev/), [FontAwesome](https://fontawesome.com/)
- **Polices** : [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Inspiration** : [Manju Madhav](https://manjumadhav.vercel.app/)

---

## 📬 Contact

- **Email** : yao.konan2709@gmail.com
- **LinkedIn** : [linkedin.com/in/yaokonan](https://linkedin.com/in/yaokonan)
- **GitHub** : [github.com/yaokonan](https://github.com/Yao-DPK)

---

**© 2025 Yao Konan. Tous droits réservés.**