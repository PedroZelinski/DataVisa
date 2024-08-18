CREATE SCHEMA `dataVisa`;
use dataVisa;

create table empresas(
	id bigint primary key auto_increment,	
    nome varchar(60),
	empresa varchar(60) unique,
	cnpj varchar(60)
);

INSERT INTO empresas (nome, empresa, cnpj) VALUES
('DataVisa', 'DataVisa', '1'),
('none', 'none', '0'),
('Lojas Renner', 'Renner S/A', '00.000.000/0001-01'),
('Magazine Luiza', 'Magazine Luiza S/A', '11.111.111/0001-11'),
('Lojas Americanas', 'Americanas S/A', '22.222.222/0001-22'),
('Casas Bahia', 'Casas Bahia Ltda', '33.333.333/0001-33'),
('Riachuelo', 'Riachuelo S/A', '44.444.444/0001-44'),
('Pizzaria', 'Pizzaria LTDA', '31.455.862/0001-24');

create table usuarios (
    email varchar(60) primary key,
    senha varchar(60),
    nome varchar(60),
    empresaId bigint,
    permissaoTabela int not null default 0,
    editaModelo int not null default 0,
    editaConexao int not null default 0,
    nivelAcesso int not null default 0,
    FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

insert into usuarios(nome, email, senha, empresaId, permissaoTabela, 
	editaModelo, editaConexao, nivelAcesso) values
    ("Pedro", "pedro@fatec.sp.gov.br","1234", 1, 0, 1, 1, 0),
    ("Rebeca", "rebeca@pizzaria.com", "1234", 8, 3, 0, 1, 1),
    ("Cido", "cido@visitante.com", "1234", 2, 0, 0, 0, 2),
    ("Jorge", "analista@pizzaria.com", "qwerty", 8, 0, 0, 1, 1),
    ("Lorena", "administracao@pizzaria.com","123456789",8,2, 1, 1, 0),
    ("William", "gestor@pizzaria.com", "1q2w3e4r5t", 8, 1, 0, 1, 1),
    ("Luiz", "luiz@renner.com", "1234", 3, 2, 1, 1, 1),
    ("Ana", "ana@fatec.sp.gov.br","1234", 6, 2, 0, 0, 2);

create table conexoes(
	id bigint primary key auto_increment,
    nomeConexao varchar(60) unique,
    tipoDb varchar(20),
    nomeDb varchar(60),
    usuarioDb varchar(60),
    senhaDb varchar(30),
    hostName varchar(60),
    portDb int,
    caminhoDb varchar(60),
    empresaId bigint,
    FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

INSERT INTO conexoes (nomeConexao, tipoDb, nomeDb, usuarioDb, senhaDb, hostName , portDb, caminhoDb, empresaId) VALUES
('Renner_Conexao1', 'MySQL', 'db_renner_1', 'root', '1234', 'localhost', 3306, '/db_renner_1', 3),
('Magalu_Conexao1', 'MySQL', 'db_magalu_1', 'root', '1234', 'localhost', 3306, '/caminho/para/db1', 4),
('Americanas_Conexao1', 'MySQL', 'db_americanas_1', 'root', '1234', 'localhost', 3306, '/caminho/para/db1', 5),
('CasasBahia_Conexao1', 'MySQL', 'db_casasbahia_1', 'root', '1234', 'localhost', 3306, '/caminho/para/db1', 6),
('Riachuelo_Conexao1', 'MySQL', 'db_riachuelo_1', 'root', '1234', 'localhost', 3306, '/caminho/para/db1', 7),
('Pizzaria_Conexao1', 'MySQL', 'Pizzaria_bd', 'root', '1234', 'localhost', 3306, '/pizzaria_db', 8);

CREATE TABLE tabelas_db_renner_1 (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    conexaoId BIGINT,     
    permissaoAcesso INT,
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

INSERT INTO tabelas_db_renner_1 (nome, conexaoId, permissaoAcesso) VALUES
('clientes', 1, 3),
('vendedores', 1, 2),
('vendas',  1, 3),
('entregas', 1, 3);

CREATE TABLE tabelas_Pizzaria_bd (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    conexaoId BIGINT,     
    permissaoAcesso INT, 
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

INSERT INTO tabelas_Pizzaria_bd (nome, conexaoId, permissaoAcesso) VALUES
('Colaboradores', 6, 3),
('Clientes', 6, 3),
('Produtos', 6, 3),
('Fornecedores', 6, 3),
('NotasFiscais', 6, 2),
('Vendas', 6, 3),
('Financeiro', 6, 1);
