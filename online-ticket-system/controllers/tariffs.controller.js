import pool from "../configs/database.config.js";

export const getAllTariffs = async (req, res) => {
  const {
    limit = 10,
    page = 1,
    search,
    sortField,
    sortOrder = "asc",
  } = req.query;

  const offset = (page - 1) * limit;
  let query = `SELECT * FROM tariffs`;

  if (search) {
    query += `
      WHERE position ILIKE '%${search}%'
      OR concert_id::text ILIKE '%${search}%'
    `;
  }

  const SORTTABLE_FIELDS = ["tariff_id", "concert_id"];
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

  const { rows: tariffs } = await pool.query(
    (query += ` LIMIT ${limit} OFFSET ${offset};`),
  );

  res.json({
    success: true,
    limit: Number(limit),
    page: Number(page),
    totalCount: Number(totalCount[0]?.count),
    data: tariffs,
  });
};

export const createTariff = async (req, res) => {
  const { price, position, date, concert_id } = req.body;
  const { rows: data } = await pool.query(
    `INSERT INTO tariffs (price, position, date, concert_id) VALUES ($1, $2, $3) RETURNING *;`,
    [price, position, date, concert_id],
  );

  res.json({
    success: true,
    data,
  });
};

export const updateTariff = async (req, res) => {
  const { tariff_id } = req.params;
  const { price, position, date, concert_id } = req.body;

  await pool.query(
    `UPDATE tariffs SET price = $1, position  date,= $2, concert_id = $3 WHERE tariff_id = $4`,
    [price, position, date, concert_id, tariff_id],
  );

  res.status(204).send();
};

export const deleteTariff = async (req, res) => {
  const { tariff_id } = req.params;

  await pool.query(`DELETE FROM tariffs WHERE tariff_id = $1`, [tariff_id]);

  res.status(204).send();
};
