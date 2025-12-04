# **PlayVault — Game Hosting Website**

## **Project Overview**

PlayVault is a web-based game hosting platform where users can browse, search, and play games embedded from GameDistribution.com. The platform features interactive game cards, search, filtering, dark/light mode, and user interaction features like favorites and recently played games.

## **Features Implemented**

- **Game Browsing**: Displays all available games in a grid layout with thumbnails, titles, descriptions, and a play button.
- **Search Functionality**: Search for games by title in real-time with a message if no results are found.
- **Game Filtering**: Filter games by categories like Action, Puzzle, and Arcade, with the ability to select multiple categories.
- **Game Details**: View detailed information about a game, including its title, description, category, and embedded gameplay (via iframe).
- **Fullscreen Mode**: Support for fullscreen mode on game pages.
- **Dark/Light Mode Toggle**: Users can switch between dark and light themes, with preference saved to localStorage.
- **Favorites**: Users can mark games as favorites, which are stored in localStorage.
- **Recently Played Games**: Tracks games that users have played recently and stores them in localStorage.
- **Responsive Design**: The app adapts to both mobile and desktop screens, ensuring a good user experience on all devices.

## **Tech Stack**

- **Next.js** (Framework)
- **React.js** (Frontend)
- **TypeScript** (For type safety)
- **Tailwind CSS** (Styling)
- **Zustand** (State management)
- **Lucide-React** (Icons)
- **Next/Image** (For image optimization)

## **Installation and Setup**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/playvault.git
   cd playvault
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open the app**:
   - Visit `http://localhost:3000` in your browser.

## **Folder Structure**

```
playvault/
├── app/
│   ├── favorites/
│   ├── games/
│   ├── recently-played/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── providers.tsx
├── components/
│   ├── ui/
│   │   ├── category-filter.tsx
│   │   ├── footer.tsx
│   │   ├── game-card.tsx
│   │   ├── game-grid.tsx
│   │   ├── game-player.tsx
│   │   ├── header.tsx
│   │   ├── hero-section.tsx
│   │   ├── related-games.tsx
│   │   ├── search-bar.tsx
├── hooks/
│   ├── use-toast.ts
├── lib/
│   ├── game-store.ts (Manages game data and state)
│   ├── games.ts (Holds mock data for games)
│   ├── schema.ts
│   ├── theme-provider.tsx
│   ├── utils.ts
├── public/
│   └── assets/
├── styles/
│   └── globals.css
└── utils/
    └── theme.ts (Handles theme switching)
```

## **Known Limitations**

- **Storage**: The favorites and recently played games are stored in `localStorage` and are not synchronized across devices.
- **Missing Features**: Some advanced features, such as game ratings and reviews, were not implemented due to time constraints.

## **Bonus Features Implemented**

- **Dark Mode Toggle**
- **Favorite Games (Stored in localStorage)**
- **Recently Played Games (Stored in localStorage)**
- **Share Game Functionality**

## **Challenges Faced**

- I worked under a tight deadline, so while I implemented most core features, some bonus features like game ratings/reviews and smoother error handling could not be included.

## **What I'd Improve With More Time**

- **Optimizations**: I’d optimize iframe embedding and error handling.
- **Additional Features**: Implement game reviews and ratings, and integrate a sidebar for game categories.
- **Testing**: I would add unit tests and integration tests, especially for dynamic features like search and filtering.
- **Performance**: Implement lazy loading for images and possibly games, to reduce the initial loading time.
- **UI/UX**: Improve the overall user experience, especially for mobile views, and polish transitions and animations.

## **Live Demo**

- You can view a live demo at: https://play-vault-sepia.vercel.app/

## **Resources Used**

- **GameDistribution.com**: https://gamedistribution.com/
- Used iframe embedding for game integration.
