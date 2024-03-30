import db from '../data/connection.js'

const produtoController = {
    getAll: (req, res) => {
        const q = "SELECT * FROM Produto";
        db.query(q, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }
            return res.json(data);
        });
    },
    getById: (req, res) => {
        const produto_Id = req.params.id;
        const q = "SELECT * FROM Produto WHERE id_Produto = ?";
        db.query(q, [produto_Id], (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Erro ao buscar bairro.");
            } else {
                res.status(200).send(data[0]);
            }
        });
    },
    update: (req, res) => {
        const produto_Id = req.params.id;
        const q = "UPDATE Produto SET `nome_Produto` = ?, `vr_Venda` = ?  WHERE id_Produto = ?"
        const values = [
            req.body.nome_Produto,
            req.body.vr_Venda,
        ]
        db.query(q, [...values, produto_Id], (err, data) => {
            if (err) {
                console.log("Erro ao atualizar o produto:", err);
                res.status(500).send("Erro ao excluir produto.");
            } else {
                console.log("Resultado da consulta:", data); // Log dos dados retornados pela consulta
                res.status(200).send("produto atualizada com sucesso.");
            }
        })
    },
    create: (req, res) => {
        const values = [req.body.nome_Produto, req.body.vr_Venda];
        const verificar_produto = "SELECT * FROM Produto WHERE nome_Produto = ?";

        db.query(verificar_produto, [req.body.nome_Produto], (err, result) => {
            if (err) {
                console.error('Erro ao verificar o produto:', err);
                return res.status(500).json({ error: 'Ocorreu um erro ao verificar o produto' });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'Produto já está cadastrado' });
            } else {
                const q = "INSERT INTO Produto (nome_Produto, vr_Venda) VALUES (?)";
                db.query(q, [values], (err, data) => {
                    if (err) {
                        console.error('Erro ao inserir novo produto:', err);
                        return res.status(500).json({ error: 'Ocorreu um erro ao criar o produto' });
                    }
                    return res.json(data);
                });
            }
        });
    },

    delete: (req, res) => {
        const produto_Id = req.params.id;
        const q = "DELETE FROM Produto WHERE id_Produto = ?";
        db.query(q, [produto_Id], (err, data) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
    }
};

export default produtoController;
