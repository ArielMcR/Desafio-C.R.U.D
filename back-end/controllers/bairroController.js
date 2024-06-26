import db from '../data/connection.js'

const bairroController = {
    getAll: (req, res) => {
        const q = "SELECT * FROM Bairro";
        db.query(q, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }
            return res.json(data);
        });
    },
    getById: (req, res) => {
        const bairro_id = req.params.id;
        const q = "SELECT * FROM Bairro WHERE id_Bairro = ?";
        db.query(q, [bairro_id], (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Erro ao buscar bairro.");
            } else {
                res.status(200).send(data);
            }
        });
    },
    update: (req, res) => {
        const bairro_id = req.params.id;
        const q = "UPDATE Bairro SET `nome_Bairro` = ? WHERE id_Bairro = ?"
        const values = [
            req.body.nome_Bairro,
        ]
        db.query(q, [...values, bairro_id], (err, data) => {
            if (err) {
                console.log("Erro ao atualizar bairro:", err);
                res.status(500).send("Erro ao excluir bairro.");
            } else {
                console.log("Resultado da consulta:", data);
                res.status(200).send("bairro atualizada com sucesso.");
            }
        })
    },
    create: (req, res) => {
        const values = [req.body.nome_Bairro];
        const verificar_bairro = "SELECT * FROM Bairro WHERE nome_Bairro = ?";

        db.query(verificar_bairro, [req.body.nome_Bairro], (err, result) => {
            if (err) {
                console.error('Erro ao verificar o Bairro:', err);
                return res.status(500).json({ error: 'Ocorreu um erro ao verificar o Bairro' });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'Bairro já está cadastrado' });
            } else {
                const q = "INSERT INTO Bairro (nome_Bairro) VALUES (?)";
                db.query(q, values, (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'An error occurred' });
                    }
                    return res.json(data);
                });
            }
        });

    },
    delete: (req, res) => {
        const bairro_id = req.params.id;
        const q = "DELETE FROM Bairro WHERE id_Bairro = ?";
        db.query(q, [bairro_id], (err, data) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
    }
};

export default bairroController;
