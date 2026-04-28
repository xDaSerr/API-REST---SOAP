CREATE DATABASE videojuegosdb;
USE videojuegosdb;

CREATE TABLE videojuego (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    plataforma VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL
);

INSERT INTO videojuego (titulo, genero, plataforma, precio) VALUES
('The Witcher 3', 'RPG', 'PC', 799.99),
('FIFA 24', 'Deportes', 'PS5', 1399.00),
('Minecraft', 'Sandbox', 'PC', 599.00);