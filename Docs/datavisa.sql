DROP SCHEMA  datavisa;
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
('Sem_empresa', 'sem_empresa', '0'),
('Renner', 'Renner S/A', '00.000.000/0001-01'),
('Magazine Luiza', 'Magazine Luiza S/A', '11.111.111/0001-11'),
('Lojas Americanas', 'Americanas S/A', '22.222.222/0001-22'),
('Casas Bahia', 'Casas Bahia Ltda', '33.333.333/0001-33'),
('Riachuelo', 'Riachuelo S/A', '44.444.444/0001-44'),
('Pizzaria', 'Pizzaria LTDA', '31.455.862/0001-24');

create table DataVisa_permissoes(
	permissao_tabela int primary key,	
    nome varchar(60),
    empresaId bigint,
	FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

INSERT INTO DataVisa_permissoes (permissao_tabela, nome, empresaId) VALUES
(0, 'Admin DataVisa', 1);

create table Sem_empresa_permissoes(
	permissao_tabela int primary key,	
    nome varchar(60),
    empresaId bigint,
	FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

INSERT INTO Sem_empresa_permissoes (permissao_tabela, nome, empresaId) VALUES
(100, 'Sem_empresa', 2);

create table usuarios (
    email varchar(60) primary key,
    senha varchar(60) not null,
    nome varchar(60) not null,
    empresaId bigint,
    matricula varchar(60),
    permissaoTabela int not null default 0,
    nivelAcesso int not null default 0,
    templates json default ('[]'),
    FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

insert into usuarios(nome, email, senha, empresaId, matricula, permissaoTabela, nivelAcesso) values
    ("Pedro", "pedro@fatec.sp.gov.br", "1234", 1, "123", 0, 0),
    ("Rebeca", "rebeca@pizzaria.com", "1234", 8, "123", 2, 3),
    ("Luiz", "luiz@renner.com", "1234", 3, "123", 3, 1),
    ("Cido", "cido@visitante.com", "1234", 2, "123", 0, 2),
    ("Jorge", "analista@pizzaria.com", "1234", 8, "123", 0, 2),
    ("Lorena", "administracao@pizzaria.com", "1234", 8, "123", 2, 1),
    ("William", "gestor@pizzaria.com", "1q2w3e4r5t", 8, "123", 1, 1),
    ("Ana", "ana@fatec.sp.gov.br", "1234", 6, "123", 2, 2);
    
CREATE TABLE usuarios_pendentes (
    email VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    empresaId BIGINT,
    data_solicitacao DATE NOT NULL,
    FOREIGN KEY (email) REFERENCES usuarios(email),
    FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

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
    isActive TINYINT(1) DEFAULT 1,
    empresaId bigint,
    FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

INSERT INTO conexoes (nomeConexao, tipoDb, nomeDb, usuarioDb, senhaDb, hostName , portDb, caminhoDb, isActive, empresaId) VALUES
/*('Pizzaria_Conexao1', 'MySQL', 'Pizzaria_db', 'root', '1234', 'localhost', 3306, '/pizzaria_db',1, 8),*/
('Renner_Conexao1', 'MySQL', 'db_renner_1', 'root', '1234', 'localhost', 3306, '/db_renner_1',1, 3),
('Pizzaria_Conexao2', 'MySQL', 'Pizzaria_db2', 'root', '1234', 'localhost', 3306, '/pizzaria_db',0, 8);

create table Renner_permissoes(
	permissao_tabela int primary key,	
    nome varchar(60),
    empresaId bigint,
	FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

INSERT INTO Renner_permissoes (permissao_tabela, nome, empresaId) VALUES
(0, 'Administrador', 3),
(1, 'Gestor', 3),
(2, 'Gerente', 3),
(3, 'Atendente', 3);

CREATE TABLE tabelas_db_renner_1 (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    conexaoId BIGINT,     
    permissaoAcesso INT,
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

INSERT INTO tabelas_db_renner_1 (nome, conexaoId, permissaoAcesso) VALUES
('clientes', 2, 3),
('vendedores', 2, 2),
('vendas',  2, 3),
('entregas', 2, 3);

create table Pizzaria_permissoes(
	permissao_tabela int primary key,	
    nome varchar(60),
    empresaId bigint,
	FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

INSERT INTO Pizzaria_permissoes (permissao_tabela, nome, empresaId) VALUES
(0, 'Administrador', 8),
(1, 'Gerente', 8),
(2, 'Atendente', 8);

/*
CREATE TABLE tabelas_Pizzaria_db (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    conexaoId BIGINT,     
    permissaoAcesso INT, 
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

INSERT INTO tabelas_Pizzaria_db (nome, conexaoId, permissaoAcesso) VALUES
('Colaboradores', 1, 2),
('Clientes', 1, 2),
('Produtos', 1, 2),
('Fornecedores', 1, 2),
('NotasFiscais', 1, 1),
('Vendas', 1, 2),
('Financeiro', 1, 0);
*/

CREATE TABLE templates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    corpo varchar(255),
    empresaId bigint,
	FOREIGN KEY (empresaId) REFERENCES empresas(id)
);
