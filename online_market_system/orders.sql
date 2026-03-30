CREATE TABLE IF NOT EXISTS recurring_plans (
    id SERIAL PRIMARY KEY,
    month SMALLINT NOT NULL,
    percantage SMALLINT NOT NULL
);

INSERT INTO recurring_plans (month, percantage) VALUES
(5, 26),
(10, 41),
(15, 52);

CREATE TYPE payment_types AS ENUM ('one_time', 'recurring');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    customer_id INT REFERENCES customers(id),
    amount INT NOT NULL,
    quantity SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_type payment_types DEFAULT 'one_time',
    recurring_plan_id INT REFERENCES recurring_plans(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    customer_id INT REFERENCES customers(id),
    amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);