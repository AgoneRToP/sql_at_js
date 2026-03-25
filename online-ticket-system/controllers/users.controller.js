import pool from "../configs/database.config.js";

export const getAllUsers = async (req, res) => {
  const {
    limit = 10,
    page = 1,
    search,
    sortField,
    sortOrder = "asc",
  } = req.query;

  const offset = (page - 1) * limit;
  let query = `SELECT * FROM users`;

  if (search) {
    query += `
      WHERE name ILIKE '%${search}%' 
      OR phone ILIKE '%${search}%' 
      OR age::text ILIKE '%${search}%' 
      OR balance::text ILIKE '%${search}%'
    `;
  }

  const SORTTABLE_FIELDS = ["user_id", "name"];
  if (sortField) {
    if (!SORTTABLE_FIELDS.includes(sortField)) {
      return res.status(400).send({
        success: false,
        message: `Faqat ushbu ${SORTTABLE_FIELDS.join(", ")} ustunlar bo'yicha tartiblash mumkin`,
      });
    }
    query += ` GROUP BY ${sortField} ORDER BY ${sortField} ${sortOrder.toUpperCase()}`;
  }

  const { rows: totalCount } = await pool.query(query.replace("*", "COUNT(*)"));

  const { rows: users } = await pool.query(
    (query += ` LIMIT ${limit} OFFSET ${offset};`),
  );

  res.json({
    success: true,
    limit: Number(limit),
    page: Number(page),
    totalCount: Number(totalCount[0]?.count),
    data: users,
  });
};

export const createUser = async (req, res) => {
  const { name, age, birthdate, phone, balance } = req.body;
  const { rows: data } = await pool.query(
    `INSERT INTO users (name, age, birthdate, phone, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [name, age, birthdate, phone, balance],
  );

  res.json({
    success: true,
    data,
  });
};

export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { name, age, birthdate, phone, balance } = req.body;

  await pool.query(
    `UPDATE users SET name = $1, age = $2, birthdate = $3, phone = $4, balance = $5 WHERE user_id = $6`,
    [name, age, birthdate, phone, balance, user_id],
  );

  res.status(204).send();
};

export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  await pool.query(`DELETE FROM users WHERE user_id = $1`, [user_id]);

  res.status(204).send();
};
