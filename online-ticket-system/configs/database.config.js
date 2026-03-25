import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "ticket"
})

export default pool;