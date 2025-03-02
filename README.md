# Ice Cream Inventory Tracker MVP

A simple tool to track ice cream stock using Excel and manual inputs, with a visual dashboard.

## Dependencies

- **Node.js v18+**: Install from [nodejs.org](https://nodejs.org). Required to run the server.
- **Express v4.18.2**: Install with `npm install express@4.18.2`. Used for lightweight API routing.
- **xlsx v0.18.5**: Install with `npm install xlsx@0.18.5`. Parses Excel files for inventory data.

## Setup

1. Clone this repo and navigate to the folder: `cd ice-cream-tracker`.
2. Install dependencies: `npm install`.
3. Create an `inventory.xlsx` file with columns "flavor" and "quantity" (e.g., "Vanilla" | 100).
4. Start the server: `node src/modules/server.js`.
5. Open `index.html` in a browser or serve it via a static server.

This is only a practice run for parsing with xlxs documents.
