# TennisLens Analytics 🎾

![Version](https://img.shields.io/badge/version-1.0.0-indigo)
![Tech](https://img.shields.io/badge/react-typescript-blue)
![Style](https://img.shields.io/badge/tailwind-css-38bdf8)

**TennisLens Analytics** is a next-generation dashboard designed to visualize professional-grade tennis match statistics. Built with a "Neo-Sport" aesthetic, it transforms raw computer vision data into actionable insights, helping players and coaches understand performance through motion tracking, shot classification, and AI-driven training recommendations.

---

## 🚀 Features

### 📊 Match Analytics Dashboard
- **Broadcast-Style UI:** High-fidelity visualizations mimicking TV sports overlays.
- **Shot Breakdown:** Detailed pie and bar charts analyzing Forehands, Backhands, Serves, and Volleys.
- **Momentum Tracking:** Area charts visualizing match intensity and dominance over time.
- **Key Metrics:** Real-time display of average ball speed, win rates, and active play duration.

### 🧠 AI Processing Simulation
- **Visual Pipeline:** A gamified, step-by-step visualization of the computer vision pipeline (Tracking -> Physics -> Actions).
- **Live Logs:** Terminal-style feedback showing the internal logic of the analysis engine.

### 🎯 Smart Training (Drills)
- **Personalized Recommendations:** AI-curated drills based on match performance weak points.
- **Categorized Workouts:** Filter by Strength, Cardio, or Technical skill focuses.

### 🎨 "Neo-Sport" Design System
- **Dynamic Theming:** High-energy Indigo and Electric Lime color palette.
- **Modern UX:** Glassmorphism, soft shadows, and fluid animations.
- **Responsive:** Fully optimized for desktop and tablet coaching sessions.

---

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript
- **Styling:** Tailwind CSS
- **Visualization:** Recharts
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts)

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── Dashboard.tsx       # Main analytics view with charts & stats
│   ├── DrillsView.tsx      # AI training recommendations
│   ├── Header.tsx          # Navigation and user profile
│   ├── HistoryView.tsx     # Match archive (Database state)
│   ├── ProcessingView.tsx  # Simulation of the backend pipeline
│   └── UploadSection.tsx   # Drag-and-drop video upload hero
├── App.tsx                 # Main routing and state management
├── types.ts                # TypeScript interfaces and shared types
└── index.tsx               # Entry point
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tennislens-analytics.git
   cd tennislens-analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

---

## 🔮 Roadmap & Future Integration

This frontend is designed to sit on top of a robust Python Computer Vision backend.

- [ ] **Backend Integration:** Connect to YOLOv8 + OCSORT Python pipeline.
- [ ] **Database:** Implement PostgreSQL/Supabase for storing match history.
- [ ] **Auth:** User authentication for coaches and players.
- [ ] **Video Player:** Interactive video player with bounding box overlays.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Designed with ❤️ for the tennis community.</p>
</div>
