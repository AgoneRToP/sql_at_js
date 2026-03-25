import pool from "../configs/database.config.js";

export const getAllProducts = async (req, res) => {
  const {
    limit = 10,
    page = 1,
    search,
    sortField,
    sortOrder = "asc",
  } = req.query;

  const offset = (page - 1) * limit;
  let query = `SELECT * FROM products`;

  if (search) {
    query += `
      WHERE title ILIKE '%${search}%'
      OR description ILIKE '%${search}%'
      OR category_id ILIKE '%${search}%'
    `;
  }

  const SORTTABLE_FIELDS = ["id", "title"];
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

  const { rows: products } = await pool.query(
    (query += ` LIMIT ${limit} OFFSET ${offset};`),
  );

  res.json({
    success: true,
    limit: Number(limit),
    page: Number(page),
    totalCount: Number(totalCount[0]?.count),
    data: products,
  });
};