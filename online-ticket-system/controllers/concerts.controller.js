import pool from "../configs/database.config.js";

export const getAllConcerts = async (req, res) => {
  const {
    limit = 10,
    page = 1,
    search,
    sortField,
    sortOrder = "asc",
  } = req.query;

  const offset = (page - 1) * limit;
  let query = `SELECT * FROM concerts`;

    if (search) {
    query += `
      WHERE title ILIKE '%${search}%' 
      OR address ILIKE '%${search}%'
    `;
  }

  const SORTTABLE_FIELDS = ["concert_id", "title"];
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

  const { rows: concerts } = await pool.query(
    (query += ` LIMIT ${limit} OFFSET ${offset};`),
  );

  res.json({
    success: true,
    limit: Number(limit),
    page: Number(page),
    totalCount: Number(totalCount[0]?.count),
    data: concerts,
  });
};

export const createConcert = async (req, res) => {
  const { title, time, size, address } = req.body;
  const { rows: data } = await pool.query(
    `INSERT INTO concerts (title, time, size, address) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [title, time, size, address],
  );

  res.json({
    success: true,
    rows: data,
  });
};

export const updateConcert = async (req, res) => {
  const { concert_id } = req.params;
  const { title, time, size, address } = req.body;

  await pool.query(
    `UPDATE concerts SET title = $1, time = $2, size = $3, address = $4 WHERE concert_id = $5`,
    [title, time, size, address, concert_id],
  );

  res.status(204).send();
};

export const deleteConcert = async (req, res) => {
  const { concert_id } = req.params;

  await pool.query(`DELETE FROM concerts WHERE concert_id = $1`, [concert_id]);

  res.status(204).send();
};
