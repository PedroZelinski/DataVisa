use dataVisa;

create table usuarios (
	id bigint primary key auto_increment,	
    nome varchar(60),
    email varchar(60),
    senha varchar(60),
    departamento varchar(60),
    editaModelo int,
    editaConexao int,
    nivelAcesso int
);

insert into usuarios(nome, email, senha, departamento, 
	editaModelo, nivelAcesso, editaConexao) values
    ("Pedro", "pedro@fatec.com","1234","DataVisa",1,1,1),
    ("Analista de Dados", "analista@datavisa.com","qwerty","TI",0,1,1),
    ("Administrador", "admin@datavisa.com","123456789","Administração",1,1,0),
    ("Gestor", "gestor@datavisa.com", "1q2w3e4r5t", "Gestão",0,1,0);

create table empresas(
	id bigint primary key auto_increment,	
    nome varchar(60),
	empresa varchar(60),
	cnpj varchar(60)
);

INSERT INTO empresas (nome, empresa, cnpj) VALUES
('Lojas Renner', 'Renner S/A', '00.000.000/0001-01'),
('Magazine Luiza', 'Magazine Luiza S/A', '11.111.111/0001-11'),
('Lojas Americanas', 'Americanas S/A', '22.222.222/0001-22'),
('Casas Bahia', 'Casas Bahia Ltda', '33.333.333/0001-33'),
('Riachuelo', 'Riachuelo S/A', '44.444.444/0001-44');

create table conexoes(
	id bigint primary key auto_increment,
    nomeConexao varchar(60) unique,
    tipoDb varchar(20),
    nomeDb varchar(60),
    usuarioDb varchar(60),
    senhaDb varchar(30),
    portDb int,
    caminhoDb varchar(60),
    empresaId bigint,
    FOREIGN KEY (empresaId) REFERENCES empresas(id)
);

INSERT INTO conexoes (nomeConexao, tipoDb, nomeDb, usuarioDb, senhaDb, portDb, caminhoDb, empresaId) VALUES
('Renner_Conexao1', 'MySQL', 'db_renner_1', 'user_renner', 'senha123', 3306, '/caminho/para/db1', 1),
('Magalu_Conexao1', 'MySQL', 'db_magalu_1', 'user_magalu', 'senha123', 3306, '/caminho/para/db1', 2),
('Americanas_Conexao1', 'MySQL', 'db_americanas_1', 'user_americanas', 'senha123', 3306, '/caminho/para/db1', 3),
('CasasBahia_Conexao1', 'MySQL', 'db_casasbahia_1', 'user_casasbahia', 'senha123', 3306, '/caminho/para/db1', 4),
('Riachuelo_Conexao1', 'MySQL', 'db_riachuelo_1', 'user_riachuelo', 'senha123', 3306, '/caminho/para/db1', 5);

CREATE TABLE Renner_Conexao1 (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    campos VARCHAR(100),
    conexaoId BIGINT,     
    permissaoAcesso INT,
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

CREATE TABLE Magalu_Conexao1 (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    campos VARCHAR(100),
    conexaoId BIGINT,     
    permissaoAcesso INT,
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

CREATE TABLE Americanas_Conexao1 (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    campos VARCHAR(100),
    conexaoId BIGINT,     
    permissaoAcesso INT,
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

CREATE TABLE CasasBahia_Conexao1 (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    campos VARCHAR(100),
    conexaoId BIGINT,     
    permissaoAcesso INT, 
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

CREATE TABLE Riachuelo_Conexao1 (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    campos VARCHAR(100),
    conexaoId BIGINT,     
    permissaoAcesso INT, 
    FOREIGN KEY (conexaoId) REFERENCES conexoes(id) 
);

INSERT INTO Renner_Conexao1 (nome, campos, conexaoId, permissaoAcesso, permissaoAlteracao) VALUES
('contratos', 'id<BIGINT>, nome<VARCHAR>, valor<DECIMAL>, vencimento<DATE>', 1, 2),
('vendedor', 'id<BIGINT>, nome<VARCHAR>, salario<DOUBLE>, percComissao<DOUBLE>', 1, 3),
('clientes', 'id<BIGINT>, nome<VARCHAR>, documento<VARCHAR>, telefone<VARCHAR>', 1, 3),
('vendas', 'id<BIGINT>, nroCupom<int>, dataVenda<DATETIME>, total<DOUBLE>, clienteId<BIGINT>,vendedorId<BIGINT>', 1, 3),
('entregas', 'id<BIGINT>, vendaId<BIGINT>, endereco<VARCHAR>, status<VARCHAR>, dataEntrega<DATE>', 1, 3);


INSERT INTO Magalu_Conexao1 (nome, campos, conexaoId, permissaoAcesso, permissaoAlteracao) VALUES
('Produtos_Magalu', 'id<BIGINT>, nome<VARCHAR>, preco<DECIMAL>, estoque<INT>', 2, 3),
('Clientes_Magalu', 'id<BIGINT>, nome<VARCHAR>, email<VARCHAR>, telefone<VARCHAR>', 2, 3),
('Vendas_Magalu', 'id<BIGINT>, data<DATETIME>, clienteId<BIGINT>, total<DECIMAL>', 2, 3);

INSERT INTO Americanas_Conexao1 (nome, campos, conexaoId, permissaoAcesso, permissaoAlteracao) VALUES
('Produtos_Americanas', 'id<BIGINT>, nome<VARCHAR>, preco<DECIMAL>, estoque<INT>', 3, 3),
('Clientes_Americanas', 'id<BIGINT>, nome<VARCHAR>, email<VARCHAR>, telefone<VARCHAR>', 3, 3),
('Vendas_Americanas', 'id<BIGINT>, data<DATETIME>, clienteId<BIGINT>, total<DECIMAL>', 3, 3);


INSERT INTO CasasBahia_Conexao1 (nome, campos, conexaoId, permissaoAcesso, permissaoAlteracao) VALUES
('Produtos_CasasBahia', 'id<BIGINT>, nome<VARCHAR>, preco<DECIMAL>, estoque<INT>', 4, 3),
('Clientes_CasasBahia', 'id<BIGINT>, nome<VARCHAR>, email<VARCHAR>, telefone<VARCHAR>', 4, 3),
('Vendas_CasasBahia', 'id<BIGINT>, data<DATETIME>, clienteId<BIGINT>, total<DECIMAL>', 4, 3);


INSERT INTO Riachuelo_Conexao1 (nome, campos, conexaoId, permissaoAcesso, permissaoAlteracao) VALUES
('Produtos_Riachuelo', 'id<BIGINT>, nome<VARCHAR>, preco<DECIMAL>, estoque<INT>', 5, 3),
('Clientes_Riachuelo', 'id<BIGINT>, nome<VARCHAR>, email<VARCHAR>, telefone<VARCHAR>', 5, 3),
('Vendas_Riachuelo', 'id<BIGINT>, data<DATETIME>, clienteId<BIGINT>, total<DECIMAL>', 5, 3);



