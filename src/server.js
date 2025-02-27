// Purpose: Lightweight API server to handle client-specific ice cream inventory data.
// Goal: Provide real-time inventory and updates for 50-100 clients.

const express = require("express");
const { loadInventory } = require("./excelParser");
const fs = require("fs").promises;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const PORT = 3000;

app.get("/inventory", async (req, res) => {
  try {
    const inventoryFile = "inventory.xlsx"; // Use the existing inventory.xlsx file
    const updatesFile = "updates.json"; // Use a single updates file for simplicity
    const inventory = await loadInventory(inventoryFile);
    let updates = {};
    try {
      updates = JSON.parse(await fs.readFile(updatesFile, "utf8"));
    } catch (e) {
      console.log("No updates yet, starting fresh");
    }
    const combined = { ...inventory, ...updates };
    console.log("Inventory fetched - Feb 27, 2025");
    res.json(combined);
  } catch (error) {
    console.error("Error fetching inventory:", error.message);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});

app.post("/update", async (req, res) => {
  try {
    const { flavor, qty } = req.body;
    if (!flavor || qty === undefined) throw new Error("Missing flavor or qty");
    const updatesFile = "updates.json"; // Use a single updates file
    let updates = {};
    try {
      updates = JSON.parse(await fs.readFile(updatesFile, "utf8"));
    } catch (e) {}
    updates[flavor] = parseInt(qty);
    await fs.writeFile(updatesFile, JSON.stringify(updates));
    console.log(`Updated ${flavor} to ${qty} - Feb 27, 2025`);
    res.json({ status: "updated" });
  } catch (error) {
    console.error("Error updating inventory:", error.message);
    res.status(500).json({ error: "Update failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} - Feb 27, 2025`));