CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128)
);

INSERT INTO customers (name) VALUES
('Michal'),
('Franklin'),
('Trevor'),
('Lamar'),
('Marry'),
('Yuri');