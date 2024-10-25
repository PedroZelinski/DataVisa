use pizzaria_db2;

SELECT pp.pedido_id as numero_do_pedido, 
       SUM(p.preco * (p.margem_lucro / 100) * pp.quantidade) AS total_lucro,
       SUM(pp.quantidade * p.preco) AS total_venda,
       (SUM(p.preco * (p.margem_lucro / 100) * pp.quantidade) / SUM(pp.quantidade * p.preco)) * 100 AS percentual_lucro
FROM pedido_pizzas as pp
JOIN pizzas p ON pp.pizza_id = p.pizza_id
GROUP BY pp.pedido_id
ORDER BY percentual_lucro DESC;

SELECT pp.pedido_id as numero_pedido, 
       SUM(p.preco * pp.quantidade) AS valor
FROM pedido_pizzas pp
JOIN pizzas p ON pp.pizza_id = p.pizza_id
GROUP BY pp.pedido_id
ORDER BY valor DESC
LIMIT 3;