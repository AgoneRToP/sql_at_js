import pool from "../configs/database.config.js";

export const getAllTickets = async (req, res) => {
  const {
    limit = 10,
    page = 1,
    search,
    sortField,
    sortOrder = "asc",
  } = req.query;

  const offset = (page - 1) * limit;
  let query = `SELECT * FROM tickets`;

  if (search) {
    query += `
      WHERE user_id::text ILIKE '%${search}%' 
      OR tariff_id::text ILIKE '%${search}%'
    `;
  }

  const SORTTABLE_FIELDS = ["ticket_id", "user_id", "tariff_id"];
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

  const { rows: tickets } = await pool.query(
    (query += ` LIMIT ${limit} OFFSET ${offset};`),
  );

  res.json({
    success: true,
    limit: Number(limit),
    page: Number(page),
    totalCount: Number(totalCount[0]?.count),
    data: tickets,
  });
};

export const createTicket = async (req, res) => {
  const { user_id, tarrif_id, payment_time } = req.body;
  const { rows: data } = await pool.query(
    `INSERT INTO tickets (user_id, tarrif_id, payment_time) VALUES ($1, $2, $3) RETURNING *;`,
    [user_id, tarrif_id, payment_time],
  );

  res.json({
    success: true,
    data,
  });
};