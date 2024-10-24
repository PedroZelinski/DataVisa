DROP SCHEMA `pizzaria_db2`;
CREATE SCHEMA `pizzaria_db2`;
use pizzaria_db2;

CREATE TABLE clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    email VARCHAR(100)
);

INSERT INTO clientes (nome, telefone, endereco, email) VALUES
('João Silva', '11987654321', 'Rua A, 123', 'joao@gmail.com'),
('Maria Souza', '11998765432', 'Rua B, 456', 'maria@hotmail.com'),
('Carlos Pereira', '11987654322', 'Rua C, 789', 'carlos@yahoo.com'),
('Ana Lima', '11987654323', 'Rua D, 321', 'ana@outlook.com'),
('Paulo Oliveira', '11987654324', 'Rua E, 654', 'paulo@gmail.com'),
('Fernanda Santos', '11987654325', 'Rua F, 987', 'fernanda@icloud.com'),
('Roberto Mendes', '11987654326', 'Rua G, 111', 'roberto@gmail.com'),
('Carla Souza', '11987654327', 'Rua H, 222', 'carla@outlook.com'),
('Renato Lima', '11987654328', 'Rua I, 333', 'renato@gmail.com'),
('Juliana Costa', '11987654329', 'Rua J, 444', 'juliana@gmail.com');

CREATE TABLE funcionarios (
    funcionario_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    funcao VARCHAR(50) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL
);

INSERT INTO funcionarios (nome, funcao, salario) VALUES
('José Ferreira', 'Entregador', 2000.00),
('Cláudia Oliveira', 'Pizzaiolo', 2500.00),
('Marcos Silva', 'Gerente', 3500.00),
('Patrícia Santos', 'Caixa', 1800.00),
('Lucas Souza', 'Entregador', 2000.00),
('Adriana Lopes', 'Pizzaiolo', 2400.00),
('Rafael Mendes', 'Caixa', 1850.00),
('Felipe Correia', 'Entregador', 2100.00),
('Luciana Costa', 'Pizzaiolo', 2550.00),
('Fernanda Almeida', 'Gerente', 3600.00);

CREATE TABLE ingredientes (
    ingrediente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estoque INT NOT NULL
);

INSERT INTO ingredientes (nome, estoque) VALUES
('Queijo', 100),
('Tomate', 150),
('Calabresa', 80),
('Azeitona', 60),
('Frango', 50),
('Catupiry', 70),
('Cebola', 90),
('Orégano', 200),
('Milho', 120),
('Bacon', 110);

CREATE TABLE pizzas (
    pizza_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(6, 2) NOT NULL,
    tamanho VARCHAR(50) NOT NULL,
    margem_lucro DECIMAL(5, 2) NOT NULL
);

INSERT INTO pizzas (nome, preco, tamanho, margem_lucro) VALUES
('Margarita', 30.00, 'Média', 15.00),
('Calabresa', 32.00, 'Grande', 20.00),
('Frango com Catupiry', 35.00, 'Grande', 18.50),
('Quatro Queijos', 33.00, 'Média', 17.00),
('Portuguesa', 34.00, 'Grande', 19.00),
('Napolitana', 28.00, 'Pequena', 12.50),
('Pepperoni', 36.00, 'Grande', 22.00),
('Vegetariana', 29.00, 'Pequena', 14.00),
('Bacon e Milho', 38.00, 'Média', 21.50),
('Toscana', 40.00, 'Grande', 23.00);

CREATE TABLE pizza_ingredientes (
    pizza_id INT,
    ingrediente_id INT,
    PRIMARY KEY (pizza_id, ingrediente_id),
    FOREIGN KEY (pizza_id) REFERENCES pizzas(pizza_id),
    FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(ingrediente_id)
);

INSERT INTO pizza_ingredientes (pizza_id, ingrediente_id) VALUES
(1, 1), (1, 2), (1, 8),  -- Margarita: Queijo, Tomate, Orégano
(2, 3), (2, 7),          -- Calabresa: Calabresa, Cebola
(3, 5), (3, 6), (3, 1),  -- Frango com Catupiry: Frango, Catupiry, Queijo
(4, 1), (4, 4), (4, 8),  -- Quatro Queijos: Queijo, Azeitona, Orégano
(5, 1), (5, 3), (5, 7),  -- Portuguesa: Queijo, Calabresa, Cebola
(6, 1), (6, 2), (6, 8),  -- Napolitana: Queijo, Tomate, Orégano
(7, 1), (7, 9),          -- Pepperoni: Queijo, Milho
(8, 1), (8, 2), (8, 8),  -- Vegetariana: Queijo, Tomate, Orégano
(9, 1), (9, 9), (9, 10), -- Bacon e Milho: Queijo, Milho, Bacon
(10, 3), (10, 10);       -- Toscana: Calabresa, Bacon

CREATE TABLE pedidos (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    funcionario_id INT,
    data_pedido DATETIME NOT NULL,
    status ENUM('Preparação', 'Entregue', 'Cancelado') NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(funcionario_id)
);

INSERT INTO pedidos (cliente_id, funcionario_id, data_pedido, status, valor_total) VALUES
(1, 1, '2024-10-01 19:30:00', 'Preparação', 60.00),
(2, 2, '2024-10-02 20:15:00', 'Entregue', 35.00),
(3, 3, '2024-10-03 21:00:00', 'Cancelado', 0.00),
(4, 4, '2024-10-04 19:45:00', 'Preparação', 70.00),
(5, 5, '2024-10-05 18:30:00', 'Entregue', 40.00),
(6, 6, '2024-10-06 20:20:00', 'Preparação', 50.00),
(7, 7, '2024-10-07 19:10:00', 'Entregue', 80.00),
(8, 8, '2024-10-08 22:00:00', 'Preparação', 35.00),
(9, 9, '2024-10-09 19:50:00', 'Entregue', 45.00),
(10, 10, '2024-10-10 20:40:00', 'Preparação', 55.00);

CREATE TABLE pedido_pizzas (
    pedido_id INT,
    pizza_id INT,
    quantidade INT NOT NULL,
    PRIMARY KEY (pedido_id, pizza_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id),
    FOREIGN KEY (pizza_id) REFERENCES pizzas(pizza_id)
);

INSERT INTO pedido_pizzas (pedido_id, pizza_id, quantidade) VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 1), (1, 5, 2),
(2, 1, 2), (2, 4, 1),  
(3, 6, 1), 
(4, 1, 1), (4, 9, 1), (4, 10, 1), (4, 8, 2), 
(5, 2, 2), (5, 3, 1), 
(6, 5, 1), (6, 6, 1), (6, 7, 1), (5, 4, 2), 
(7, 8, 2), (7, 3, 1), (7, 4, 1), 
(8, 1, 1), (8, 2, 1), (8, 3, 2),  (8, 9, 1), (8, 10, 1), (8, 6, 1), (8, 4, 1), (8, 5, 2), (8, 7, 1), 
(9, 4, 1), (9, 5, 2), 
(10, 7, 1),(10, 5, 2);

CREATE TABLE entregas (
    entrega_id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    funcionario_id INT,
    data_entrega DATETIME,
    status_entrega ENUM('Pendente', 'Entregue', 'Falha') NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id),
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(funcionario_id)
);

INSERT INTO entregas (pedido_id, funcionario_id, data_entrega, status_entrega) VALUES
(1, 5, '2024-10-01 20:30:00', 'Entregue'),
(2, 1, '2024-10-02 21:00:00', 'Entregue'),
(3, 6, '2024-10-03 22:00:00', 'Falha'),
(4, 7, '2024-10-04 21:00:00', 'Entregue'),
(5, 1, '2024-10-05 19:00:00', 'Entregue'),
(6, 8, '2024-10-06 22:30:00', 'Entregue'),
(7, 2, '2024-10-07 20:00:00', 'Entregue'),
(8, 9, '2024-10-08 23:00:00', 'Pendente'),
(9, 3, '2024-10-09 20:30:00', 'Entregue'),
(10, 4, '2024-10-10 21:15:00', 'Pendente');