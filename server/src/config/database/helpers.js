import db from "./connectionPool.js";

export async function executeQuery(query, params = []) {
    try {
      const [results] = await db.execute(query, params);
      return results;
    } catch (error) {
      console.error('Database Error:', error);
      throw error;
    }
  }