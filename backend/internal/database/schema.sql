-- schema.sql

-- Users table to store user information
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Saunas table to store sauna facility information
CREATE TABLE saunas (
    sauna_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    description TEXT,
    operating_hours TEXT,
    price_range VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table to store user reviews for saunas
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    sauna_id INTEGER REFERENCES saunas(sauna_id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sauna details table for specific features
CREATE TABLE sauna_features (
    sauna_id INTEGER REFERENCES saunas(sauna_id),
    temperature INTEGER,
    humidity INTEGER,
    capacity INTEGER,
    has_water_bath BOOLEAN,
    has_cold_bath BOOLEAN,
    has_rest_area BOOLEAN,
    FOREIGN KEY (sauna_id) REFERENCES saunas(sauna_id)
);