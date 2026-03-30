CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

INSERT INTO categories (name) VALUES
("Phones"),
("Notebooks");

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    description TEXT,
    quantity INT,
    price MONEY,
    categories_id INT REFERENCES categories(id)
);

INSERT INTO products (name, description, quantity, price, categories_id) VALUES
('iPhone 15 Pro', 'Apple smartphone with Titanium body', 10, 999.00, 1),
('Samsung Galaxy S24', 'Flagship Android phone', 15, 850.00, 1),
('Google Pixel 8', 'Best camera on Android', 8, 699.00, 1),
('Xiaomi 14 Ultra', 'Leica optics smartphone', 12, 1100.00, 1),
('MacBook Air M3', 'Light and powerful laptop', 5, 1299.00, 2),
('ASUS ROG Zephyrus', 'Gaming laptop with RTX 4080', 3, 2499.00, 2),
('Dell XPS 13', 'Premium windows ultrabook', 7, 1150.00, 2),
('Lenovo ThinkPad X1', 'Business class laptop', 10, 1600.00, 2);