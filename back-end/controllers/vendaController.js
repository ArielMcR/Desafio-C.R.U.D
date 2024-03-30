import db from '../data/connection.js'

const vendasController = {
    getAll: (req, res) => {
        const q = "SELECT venda.id, venda.dt_Venda, pessoa.nome_Pessoa, venda.vr_Total FROM Venda INNER JOIN Pessoa ON Venda.pessoa_id = Pessoa.id_Pessoa";
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
        const q = "SELECT * FROM Venda WHERE id = ?";
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
        const q = "UPDATE Venda SET `dt_Venda` = ?, `pessoa_id` = ?,`vr_Total` = ? WHERE id = ?"
        const values = [
            req.body.dt_Venda,
            req.body.pessoa_id,
            req.body.vr_Total,
        ]
        console.log('Enviando requisição')
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


        const dt_Venda = req.body.dt_Venda;
        const pessoa_id = req.body.pessoa_id;
        const vr_Total = req.body.vr_Total;

        const q = "INSERT INTO Venda (dt_Venda, pessoa_id, vr_Total) VALUES (?, ?, ?)";
        const values = [dt_Venda, pessoa_id, vr_Total];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error('Erro ao inserir nova venda:', err);
                return res.status(500).json({ error: 'Ocorreu um erro ao criar a venda' });
            }
            console.log("Nova venda criada com sucesso!");
            return res.json({ 'id': data.insertId });
        });
    },
    delete: (req, res) => {
        const venda_id = req.params.id;
        const q = "DELETE FROM Venda WHERE id = ?";
        db.query(q, [venda_id], (err, data) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
    }
};

export default vendasController;
