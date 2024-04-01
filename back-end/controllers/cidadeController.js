import db from '../data/connection.js'

const cidadeController = {
    getAll: (req, res) => {
        const q = "SELECT * FROM Cidade";
        db.query(q, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }
            return res.json(data);
        });
    },
    getById: (req, res) => {
        const city_id = req.params.id;
        const q = "SELECT * FROM Cidade WHERE id_Cidade = ?";
        db.query(q, [city_id], (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Erro ao buscar cidade.");
            } else {
                res.status(200).send(data);
            }
        });
    },
    update: (req, res) => {
        const city_id = req.params.id;
        const q = "UPDATE Cidade SET `nome_Cidade` = ?,`sigla_Uf`=? WHERE id_Cidade = ?"
        const values = [
            req.body.nome_Cidade,
            req.body.sigla_Uf
        ]
        db.query(q, [...values, city_id], (err, data) => {
            if (err) {

            } else {

            }
        })
    },
    create: (req, res) => {
        const values = [req.body.nome_Cidade, req.body.sigla_Uf];

        const verificar_cidade = "SELECT * FROM cidade WHERE nome_Cidade = ?";

        db.query(verificar_cidade, [req.body.nome_Cidade], (err, result) => {
            if (err) {
                console.error('Erro ao verificar a cidade:', err);
                return res.status(500).json({ error: 'Ocorreu um erro ao verificar a cidade' });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'Cidade já está cadastrada' });
            } else {
                const q = "INSERT INTO Cidade (nome_Cidade, sigla_Uf) VALUES (?, ?)";
                db.query(q, values, (err, data) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log('Cidade cadastrada com sucesso')
                        return res.json(data);
                    }
                });
            }
        });

    },
    delete: (req, res) => {
        const city_id = req.params.id;
        const q = "DELETE FROM Cidade WHERE id_Cidade = ?";
        db.query(q, [city_id], (err, data) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
    }
};

export default cidadeController;
