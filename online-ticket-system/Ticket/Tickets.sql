CREATE TABLE IF NOT EXISTS tickets (
    ticket_id SERIAL PRIMARY KEY,
    payment_time TIMESTAMP DEFAULT  NOW(),
    user_id INT REFERENCES users (user_id)
    ON DELETE SET NULL -- CASCADE
    ON UPDATE NO ACTION,
    tariff_id INT REFERENCES tariffs (tariff_id)
    ON DELETE SET NULL -- CASCADE
    ON UPDATE NO ACTION
);

INSERT INTO tickets (payment_time, user_id, tariff_id) VALUES
    ('2024-05-01 10:30:00', 1, 1), -- Алексей купил VIP на Рок-фестиваль
    ('2024-05-01 12:15:00', 2, 2), -- Мария купила Танцпол
    ('2024-05-02 09:00:00', 3, 3), -- Дмитрий идет на Джаз
    ('2024-05-03 15:45:00', 4, 4), -- Анна в собор
    ('2024-05-05 20:20:00', 5, 5), -- Игорь взял Backstage на Рейв
    ('2024-05-06 11:10:00', 6, 6), -- Елена в арт-кафе
    ('2024-05-07 14:00:00', 7, 7), -- Сергей на Симфоническое шоу
    ('2024-05-08 16:30:00', 8, 8), -- Ольга на Хип-хоп
    ('2024-05-09 19:00:00', 9, 9), -- Виктор на Орган
    (NOW(), 10, 10);                -- Наталья только что купила столик

SELECT * FROM tickets;

--  ticket_id |        payment_time        | user_id | tariff_id
-- -----------+----------------------------+---------+-----------
--          1 | 2024-05-01 10:30:00        |       1 |         1
--          2 | 2024-05-01 12:15:00        |       2 |         2
--          3 | 2024-05-02 09:00:00        |       3 |         3
--          4 | 2024-05-03 15:45:00        |       4 |         4
--          5 | 2024-05-05 20:20:00        |       5 |         5
--          6 | 2024-05-06 11:10:00        |       6 |         6
--          7 | 2024-05-07 14:00:00        |       7 |         7
--          8 | 2024-05-08 16:30:00        |       8 |         8
--          9 | 2024-05-09 19:00:00        |       9 |         9
--         10 | 2026-03-16 11:39:34.252911 |      10 |        10

SELECT
    u.name,
    c.title,
    ti.payment_time,
    ta.position
FROM
    tickets ti
INNER JOIN
    users u ON u.user_id = ti.user_id
INNER JOIN
    tariffs ta ON ta.tariff_id = ti.tariff_id
FULL JOIN
    concerts c ON c.concert_id = ta.concert_id;

