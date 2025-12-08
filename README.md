# LinkVault

LinkVault is a modern, single-page bookmark manager designed to help organize links and automatically detect broken or dead URLs. It operates entirely locally for data persistence while offering an optional proxy service for robust cross-origin link verification.

## Features

- **Bookmark Management**: Save URLs with custom tags for easy organization.
- **Dead Link Detection**: integrated engine checks the health of your saved links, identifying active (200 OK) and dead (404/Error) URLs.
- **Local Persistence**: All data is stored securely in your browser's LocalStorage; no external database is required.
- **Smart Filtering**: Search bookmarks by URL or filter by tags.
- **Export Capability**: Export your entire collection to a JSON file for backup.
- **Proxy Support**: Optional Node.js proxy server to bypass CORS restrictions for accurate status checking of major websites.

## Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/abhi3114-glitch/LinkVault.git
   cd LinkVault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Application

For full functionality (including reliable link checking), it is recommended to run both the frontend and the proxy server.

**1. Start the Proxy Server** (Optional but recommended for 404 detection):
```bash
node backend/server.js
```
The proxy will start on port 3001.

**2. Start the Frontend**:
In a new terminal window:
```bash
npm run dev
```
Open your browser and navigate to the local URL provided (usually http://localhost:5173).

### Using the App

- **Add Bookmark**: Enter a valid URL and optional tags (separated by spaces or commas) in the input fields and click "Add".
- **Check Status**: Click the "Check Status" button in the header to ping all bookmarks. 
    - Green dot: Active
    - Red dot: Dead
    - Grey/Yellow: Unknown or Pending
- **Export**: Click the download button to save your bookmarks as a JSON file.

## Technical Details

- **Frontend**: React (Vite), CSS Modules
- **State Management**: React Hooks + LocalStorage
- **Backend (Proxy)**: Node.js, Express (used only for CORS-free HTTP requests)
- **Icons**: Lucide React

## License

This project is open-source and available under the MIT License.
