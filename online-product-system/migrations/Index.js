import pool from "../configs/database.config.js";

export const TABLE_SCHEMAS = `
    CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP WITH TIME ZONE
    );

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        count INTEGER DEFAULT 0,
        price MONEY,
        category_id INTEGER NOT NULL REFERENCES categories(id)
        ON DELETE CASCADE
    );
`;

async function migrateSchemas() {
  const client = await pool.connect();
  try {
    await client.query(TABLE_SCHEMAS);
    console.log("ALL TABLES MIGRATED✅");
  } catch (error) {
    console.log("TABLE MIGRATION ERROR❌", error);
  } finally {
    client.release();
  }
}

await migrateSchemas();
