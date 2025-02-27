// Purpose: Parse Excel inventory data into a usable JSON format for the dashboard MVP.
// Goal: Flexibly handle client-specific table data from Google Sheets or manual Excel files.

const xlsx = require("xlsx");

async function loadInventory(filePath = "inventory.xlsx") {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: 0 });
    const inventory = {};
    data.forEach(row => {
      const flavorKey = Object.keys(row).find(k => k.toLowerCase() === "flavor");
      const qtyKey = Object.keys(row).find(k => k.toLowerCase() === "quantity" || k.toLowerCase() === "qty");
      if (flavorKey && qtyKey) {
        inventory[row[flavorKey]] = Number(row[qtyKey]) || 0;
      }
    });
    if (Object.keys(inventory).length === 0) {
      throw new Error("No valid 'flavor' and 'quantity' columns found in table");
    }
    console.log(`Parsed inventory from ${filePath} - Feb 27, 2025`);
    return inventory;
  } catch (error) {
    console.error("Error parsing Excel:", error.message);
    throw error;
  }
}

module.exports = { loadInventory };