use db_renner_1;

create table clientes(
	id bigint primary key auto_increment,
    nome varchar(60),
    documento varchar(30),
    telefone varchar(20)
);
insert into clientes(nome, documento, telefone) values 
	("Norton", "123.456.789-00", "11 99123-3456"),
    ("Machion", "13.198.302-1", "11 94717-3191"),
    ("Zé", "999.918.134-89", "13 92821-1031");
		
create table vendedores(
	id bigint primary key auto_increment,
    nome varchar(60),
    salario double(6,2),
    percComissao double(5,2) /*% de comissao sobre a venda*/
);
insert into vendedores(nome, salario, percComissao) values 
	("Rafael", 1500.00, 15.00),
    ("Jhonatan", 1800.00, 10.00),
    ("Pedro", 1750.00, 25.00);

create table vendas(
	id bigint primary key auto_increment,
    nroCupom int,
    dataVenda date,
    total double(7,2),
    clienteId bigint, foreign key (clienteId) references clientes(id),
    vendedorId bigint, foreign key (vendedorId) references vendedores(id)
);
insert into vendas(nroCupom, dataVenda, total, clienteId, vendedorId) values
	(5, '2024-06-30', 257.50, 1, 3),
    (7, '2024-07-17', 789.99, 2, 1),
    (8, '2024-07-05', 89.90, 3, 2);

create table entregas(
	id bigint primary key auto_increment,
    vendaId bigint, foreign key (vendaId) references vendas(id),
    endereco varchar(100),
    status varchar(30),
    dataEntrega date
);
insert into entregas(vendaId, endereco, status, dataEntrega) values
	(1, "Rua Serra do Logo Ali, 19", "Em rota", null),
    (3, "Rua Alto do Ipiranga, 76", "Entregue", '2024-06-28'),
    (2, "Avenida Acabou a Criatividade, 69", "Aguardando Pagamento", null);

select * from clientes;
select * from vendedores;
select * from vendas;
select * from entregas;