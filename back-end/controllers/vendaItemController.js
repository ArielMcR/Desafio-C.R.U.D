
import db from '../data/connection.js'
const vendaItemController = {
    getAll: (req, res) => {
        const q = "SELECT produto.nome_Produto, venda_Itens.vr_Venda, venda_Itens.qtade FROM venda_Itens INNER JOIN Produto ON venda_Itens.produto_id = Produto.id_Produto";
        db.query(q, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }
            return res.json(data);
        });
    },
    getById: (req, res) => {
        const venda_id = req.params.id;
        const q = "SELECT * FROM Venda WHERE id_VendaItens = ?";
        db.query(q, [venda_id], (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Erro ao buscar bairro.");
            } else {
                res.status(200).send(data);
            }
        });
    },
    update: (req, res) => {
        const venda_id = req.params.id;
        const q = "UPDATE venda_Item SET `venda_id` `produto_id` = ?, `vr_Venda`, `qtade` WHERE id_VendaItens = ?"
        const values = [
            req.body.produto_id,
            req.body.vr_Venda,
            req.body.qtade,
        ]
        db.query(q, [...values, venda_id], (err, data) => {
            if (err) {
                console.log("Erro ao atualizar a venda:", err);
                res.status(500).send("Erro ao excluir produto.");
            } else {
                console.log("Resultado da consulta:", data); // Log dos dados retornados pela consulta
                res.status(200).send("Venda atualizada com sucesso.");
            }
        })
    },
    create: (req, res) => {

        console.log("Recebendo requisição para criar novo item de venda...");

        const venda_id = req.body.venda_id;
        const produto_id = req.body.produto_id;
        const qtade = req.body.qtade;

        console.log("Valores recebidos:");
        console.log("venda_id:", venda_id);
        console.log("produto_id:", produto_id);
        console.log("qtade: ", qtade);

        const q = "INSERT INTO Venda_Itens (venda_id, produto_id, vr_Venda, qtade) VALUES (?)";
        const values = [req.body.venda_id, req.body.produto_id, req.body.vr_Venda, req.body.qtade];
        db.query(q, [values], (err, data) => {
            if (err) {
                console.error('Erro ao inserir novo produto:', err);
                return res.status(500).json({ error: 'Ocorreu um erro ao criar o produto' });
            }
            return res.json(data);
        });
    },
    delete: (req, res) => {
        const venda_id = req.params.id;
        const q = "DELETE FROM Venda WHERE id_VendaItens = ?";
        db.query(q, [venda_id], (err, data) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
    }
}
export default vendaItemController