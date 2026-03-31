import pool from "../configs/database.config.js";

export const getAllTransactions = async (req, res) => {
  const { rows: transactions } = await pool.query(
    `
        SELECT * FROM transactions
    `,
  );

  res.json({
    success: true,
    data: transactions,
  });
};

export const doTransaction = async (req, res) => {
  const { id: user_id } = req.params;
  const { tariff_id } = req.body;

  await pool.query(
    `
        BEGIN;

        SELECT balance FROM users WHERE user_id = ${user_id} FOR UPDATE;

        UPDATE users 
        SET balance = balance - (SELECT price FROM tariffs WHERE tariff_id = ${tariff_id})
        WHERE user_id = ${user_id} 
          AND balance >= (SELECT price FROM tariffs WHERE tariff_id = ${tariff_id});

        INSERT INTO tickets (user_id, tariff_id)
        VALUES (${user_id}, ${tariff_id});

        INSERT INTO transactions (from_user, to_tariff, amount)
        SELECT ${user_id}, ${tariff_id}, price 
        FROM tariffs 
        WHERE tariff_id = ${tariff_id};

        COMMIT;
    `,
  );

  res.status(204).send();
};
