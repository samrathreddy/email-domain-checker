import fs from 'fs/promises';
import path from 'path';

async function loadResultsFromJson(filename) {
  try {
    const data = await fs.readFile(filename, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File not found, return an empty object
      return {};
    }
    throw error; // Re-throw other errors
  }
}

async function saveResultsToJson(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 4));
  } catch (error) {
    console.error(`Error writing to file ${filename}:`, error);
    throw error;
  }
}

export { loadResultsFromJson, saveResultsToJson }; 