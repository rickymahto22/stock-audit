# Store Stock Audit & Compliance App

A modern, frontend-only web application built to streamline the process of auditing store inventory, calculating compliance scores, and automatically generating corrective actions.

## 🚀 Problem Statement

Store managers and auditors often struggle with manual, paper-based inventory reconciliation. This application provides a digital solution to compare system stock with physical stock, identify discrepancies (shortages, excess, damaged, or expired items), automatically calculate an audit score, and track the necessary corrective actions to resolve issues.

## ✨ Features

- **Secure Authentication:** Protected routes with a mock login system.
- **Dashboard Analytics:** High-level overview of average audit scores, total catalog items, and open corrective actions.
- **Item Catalog Management:** Add, view, and manage the master inventory system.
- **Dynamic Audit Form:** Easily input physical counts, damaged units, and expired units. The app automatically calculates discrepancies and prevents illogical inputs (e.g., more damaged units than physical units).
- **Automated Scoring:** Audits start at a perfect score of 100 and deduct points based on discrepancies, damages, and expiries.
- **Corrective Actions Tracker:** Automatically generates actionable tasks for items with issues, capturing exact metrics (System Qty, Physical Qty, Diff, etc.) and allowing status tracking (Open ➡️ In Progress ➡️ Resolved).
- **Data Persistence:** Uses React Context API combined with browser Local Storage so your data is never lost on refresh.

## 🛠️ Tech Stack

- **Framework:** React 18 (Initialized with Vite for lightning-fast HMR)
- **Routing:** React Router v6
- **State Management:** React Context API
- **Data Storage:** Browser Local Storage
- **Styling:** Vanilla CSS with a premium Dark Mode Glassmorphism design system.

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone or download the repository.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd "Stock Audit"
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` (or the port provided in your terminal).

### 🔐 Default Credentials
To access the application, use the following mock credentials on the login screen:
- **Username:** `admin`
- **Password:** `admin`

## 📂 Project Structure

```text
Stock Audit/
├── src/
│   ├── components/         # Reusable UI components (Layout, Sidebar)
│   ├── context/            # React Context providers (Auth, Audit, Inventory)
│   ├── pages/              # Main route components (Dashboard, Catalog, etc.)
│   ├── utils/              # Helper functions (localStorage.js)
│   ├── App.jsx             # Main router configuration
│   ├── index.css           # Global styles and CSS variables
│   └── main.jsx            # Application entry point
├── index.html              
├── package.json
└── vite.config.js
```

## 📝 Usage Guide
1. **Login** using the default credentials.
2. Go to the **Item Catalog** and add a few items to your inventory.
3. Navigate to **New Audit** and perform a count by entering physical quantities, damaged, and expired units.
4. Submit the audit to see your new compliance score on the **Dashboard**.
5. Navigate to **Corrective Actions** to view and resolve any automatically generated tasks resulting from your audit.
