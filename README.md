# Lamma (لَمّة) - Smart Cardboard Micro-Aggregation Platform

> **SDG 11 Hackathon Final Submission (October 2026 Evidence-Based Release)**  
> *Optimizing commercial corridor waste collection in Egypt while protecting informal Zabbaleen collector livelihoods.*

---

## 📌 Executive Summary
**Lamma** is a profit-optimized routing and micro-aggregation web platform built for Egyptian commercial corridors (such as Abbas El-Akkad in Nasr City, Downtown Cairo, and Al-Darb Al-Ahmar). Small retail shops generate 3–10 kg of cardboard daily—quantities too small individually for a profitable collector trip. Lamma aggregates these requests into a Capacitated Vehicle Routing Problem with Time Windows (CVRPTW) round, doubling collector hourly net earnings (+97.8%) and reducing route distance by 76.5%.

---

## 🚀 Key Features & Architecture
1. **Capacitated Vehicle Routing (CVRPTW)**: Solves multi-stop micro-aggregation rounds respecting vehicle payloads ($Q$), ready time windows, and fuel efficiency (EGP 20.75/L petrol).
2. **Shopkeeper Corridor Pickup Form**: Intuitive weight slider with quick-preset weights (`5kg`, `10kg`, `20kg`, `35kg`, `50kg`), custom time window selection, and map geocoding.
3. **Interactive OpenStreetMap Routing**: Leaflet-powered visual map rendering numbered shop stops, live route polylines, and direct Google Maps navigation launchers.
4. **0% Collector Commission Model**: 100% free for informal collectors to protect their daily livelihoods.
5. **Bilingual Support (Arabic & English)**: Fully localized RTL/LTR layout with strict synchronization across all interface elements.

---
## 📦 Project Directory Structure
```text
lamma-egypt/
├── src/
│   ├── App.jsx          # Main application component & CVRPTW solver
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS styles & Leaflet overrides
├── index.html           # Main HTML entry point
├── package.json         # Project dependencies & Vite scripts
├── package-lock.json    # Exact dependency versions
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # Project documentation
---
 ```
## 🛠️ Local Development & Deployment
1. **Clone the repository**:
 ```bash
 git clone https://github.com/mazen-mohamed9/lamma-egypt.git
 cd lamma-egypt
 ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```
