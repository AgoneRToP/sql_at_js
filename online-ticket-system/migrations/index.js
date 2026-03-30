import pool from "../configs/database.config.js";

export const TABLE_SCHEMAS = `
  CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      age SMALLINT,
      birthdate DATE,
      phone VARCHAR(15),
      balance MONEY
  );

  CREATE TABLE IF NOT EXISTS concerts (
      concert_id SERIAL PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      time TIME,
      size SMALLINT,
      address VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS tariffs (
      tariff_id SERIAL PRIMARY KEY,
      price MONEY,
      position VARCHAR(100),
      date TIMESTAMP DEFAULT NOW(),
      concert_id INTEGER REFERENCES concerts(concert_id)
  );

  CREATE TABLE IF NOT EXISTS tickets (
      ticket_id SERIAL PRIMARY KEY,
      payment_time TIMESTAMP DEFAULT NOW(),
      user_id INT REFERENCES users (user_id)
      ON DELETE SET NULL -- CASCADE
      ON UPDATE NO ACTION,
      tariff_id INT REFERENCES tariffs (tariff_id)
      ON DELETE SET NULL -- CASCADE
      ON UPDATE NO ACTION
  );

  CREATE TABLE IF NOT EXISTS transactions(
      transaction_id SERIAL PRIMARY KEY,
      from_user INT REFERENCES users(user_id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION,
      to_tariff INT REFERENCES tariffs(tariff_id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION,
      amount MONEY NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
