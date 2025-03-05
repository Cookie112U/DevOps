-- Создание таблицы для карт
CREATE TABLE IF NOT EXISTS maps (
    map_id SERIAL PRIMARY KEY,
    width INT NOT NULL,
    height INT NOT NULL,
    map_data TEXT NOT NULL
);

-- Создание таблицы для героев
CREATE TABLE IF NOT EXISTS heroes (
    hero_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    race VARCHAR(255) NOT NULL,
    special_abilities TEXT
);

-- Создание таблицы для позиций героев
CREATE TABLE IF NOT EXISTS hero_positions (
    position_id SERIAL PRIMARY KEY,
    hero_id INT REFERENCES heroes(hero_id) ON DELETE CASCADE,
    map_id INT REFERENCES maps(map_id) ON DELETE CASCADE,
    x_pos INT NOT NULL,
    y_pos INT NOT NULL
);

-- Создание таблицы для маршрутов
CREATE TABLE IF NOT EXISTS routes (
    route_id SERIAL PRIMARY KEY,
    map_id INT REFERENCES maps(map_id) ON DELETE CASCADE,
    route_data TEXT NOT NULL,
    route_time FLOAT NOT NULL
);
