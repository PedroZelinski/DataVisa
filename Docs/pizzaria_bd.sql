CREATE SCHEMA `pizzaria_db` ;
use pizzaria_db;

CREATE TABLE Colaboradores (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel_acesso INT NOT NULL CHECK (nivel_acesso BETWEEN 1 AND 5),
    data_criacao DATE NOT NULL,
    status ENUM('Ativo', 'Inativo') NOT NULL
);

INSERT INTO Colaboradores (nome, email, senha, nivel_acesso, data_criacao, status)
VALUES
('Ana Silva', 'ana.silva@example.com', 'senha_criptografada1', 1, '2024-08-01', 'Ativo'),
('Carlos Sousa', 'carlos.sousa@example.com', 'senha_criptografada2', 2, '2024-08-05', 'Ativo'),
('Fernanda Lima', 'fernanda.lima@example.com', 'senha_criptografada3', 3, '2024-08-10', 'Ativo'),
('João Oliveira', 'joao.oliveira@example.com', 'senha_criptografada4', 4, '2024-08-12', 'Ativo'),
('Mariana Pereira', 'mariana.pereira@example.com', 'senha_criptografada5', 5, '2024-08-15', 'Ativo');

CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    data_criacao DATE NOT NULL,
    status ENUM('Ativo', 'Inativo') NOT NULL
);

INSERT INTO Clientes (nome, telefone, email, endereco, data_criacao, status)
VALUES
('Lucas Gomes', '11987654321', 'lucas.gomes@example.com', 'Rua A, 123, São Paulo, SP', '2024-08-01', 'Ativo'),
('Maria Costa', '11976543210', 'maria.costa@example.com', 'Rua B, 456, São Paulo, SP', '2024-08-03', 'Ativo'),
('Pedro Santos', '11965432109', 'pedro.santos@example.com', 'Rua C, 789, São Paulo, SP', '2024-08-05', 'Ativo'),
('Juliana Almeida', '11954321098', 'juliana.almeida@example.com', 'Rua D, 321, São Paulo, SP', '2024-08-07', 'Ativo'),
('Renata Souza', '11943210987', 'renata.souza@example.com', 'Rua E, 654, São Paulo, SP', '2024-08-09', 'Ativo');

CREATE TABLE Produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    status ENUM('Disponível', 'Indisponível') NOT NULL
);

INSERT INTO Produtos (nome_produto, descricao, preco, estoque, categoria, status)
VALUES
('Pizza Margherita', 'Pizza tradicional com molho de tomate, queijo e manjericão', 30.00, 50, 'Pratos Principais', 'Disponível'),
('Coca-Cola 2L', 'Refrigerante Coca-Cola 2 litros', 10.00, 100, 'Bebidas', 'Disponível'),
('Lasanha Bolonhesa', 'Lasanha com molho bolonhesa e queijo', 35.00, 20, 'Pratos Principais', 'Disponível'),
('Suco de Laranja', 'Suco natural de laranja', 8.00, 50, 'Bebidas', 'Disponível'),
('Sobremesa Pudim', 'Pudim de leite condensado', 12.00, 30, 'Sobremesas', 'Disponível');

CREATE TABLE Fornecedores (
    id_fornecedor INT PRIMARY KEY AUTO_INCREMENT,
    nome_fornecedor VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    data_criacao DATE NOT NULL,
    status ENUM('Ativo', 'Inativo') NOT NULL
);

INSERT INTO Fornecedores (nome_fornecedor, telefone, email, endereco, data_criacao, status)
VALUES
('Fornecedor de Alimentos A', '1122334455', 'contato@fornecedora.com', 'Rua F, 123, São Paulo, SP', '2024-08-01', 'Ativo'),
('Fornecedor de Bebidas B', '2233445566', 'contato@fornecedorb.com', 'Rua G, 456, São Paulo, SP', '2024-08-03', 'Ativo'),
('Fornecedor de Utensílios C', '3344556677', 'contato@fornecedorc.com', 'Rua H, 789, São Paulo, SP', '2024-08-05', 'Ativo'),
('Fornecedor de Limpeza D', '4455667788', 'contato@fornecedord.com', 'Rua I, 321, São Paulo, SP', '2024-08-07', 'Ativo'),
('Fornecedor de Embalagens E', '5566778899', 'contato@fornecedore.com', 'Rua J, 654, São Paulo, SP', '2024-08-09', 'Ativo');


CREATE TABLE NotasFiscais (
    id_nota INT PRIMARY KEY AUTO_INCREMENT,
    tipo_nota ENUM('Entrada', 'Saída') NOT NULL,
    data_emissao DATE NOT NULL,
    id_fornecedor INT,
    valor_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_fornecedor) REFERENCES Fornecedores(id_fornecedor)
);

INSERT INTO NotasFiscais (tipo_nota, data_emissao, id_fornecedor, valor_total)
VALUES
('Entrada', '2024-08-01', 1, 1500.00),
('Entrada', '2024-08-03', 2, 500.00),
('Entrada', '2024-08-05', 3, 300.00),
('Entrada', '2024-08-07', 4, 800.00),
('Entrada', '2024-08-09', 5, 200.00);

CREATE TABLE Vendas (
    id_venda INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_produto INT,
    quantidade INT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    data_venda DATETIME NOT NULL,
    status_venda ENUM('Pendente', 'Concluído', 'Cancelado') NOT NULL,
    metodo_pagamento ENUM('Cartão', 'Dinheiro', 'Online') NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto)
);


INSERT INTO Vendas (id_cliente, id_produto, quantidade, valor_total, data_venda, status_venda, metodo_pagamento)
VALUES
(1, 1, 2, 60.00, '2024-08-10 12:00:00', 'Concluído', 'Cartão'),
(2, 2, 1, 10.00, '2024-08-11 14:30:00', 'Concluído', 'Dinheiro'),
(3, 3, 3, 105.00, '2024-08-12 18:45:00', 'Pendente', 'Online'),
(4, 4, 1, 8.00, '2024-08-13 11:20:00', 'Cancelado', 'Cartão'),
(5, 5, 2, 24.00, '2024-08-14 16:10:00', 'Concluído', 'Online');


CREATE TABLE Financeiro (
    id_financeiro INT PRIMARY KEY AUTO_INCREMENT,
    tipo_transacao ENUM('Recebimento', 'Pagamento') NOT NULL,
    id_venda INT,
    id_nota INT,
    valor_transacao DECIMAL(10, 2) NOT NULL,
    data_transacao DATE NOT NULL,
    descricao TEXT,
    FOREIGN KEY (id_venda) REFERENCES Vendas(id_venda),
    FOREIGN KEY (id_nota) REFERENCES NotasFiscais(id_nota)
);

INSERT INTO Financeiro (tipo_transacao, id_venda, id_nota, valor_transacao, data_transacao, descricao)
VALUES
('Recebimento', 1, NULL, 60.00, '2024-08-10', 'Pagamento recebido por venda.'),
('Pagamento', NULL, 1, 1500.00, '2024-08-01', 'Pagamento ao fornecedor A.'),
('Recebimento', 2, NULL, 10.00, '2024-08-11', 'Pagamento recebido por venda.'),
('Pagamento', NULL, 2, 500.00, '2024-08-03', 'Pagamento ao fornecedor B.'),
('Recebimento', 3, NULL, 105.00, '2024-08-12', 'Pagamento recebido por venda.');