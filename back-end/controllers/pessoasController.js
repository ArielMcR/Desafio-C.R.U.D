import db from '../data/connection.js'

const pessoasController = {
    getAll: (req, res) => {
        const q = "SELECT id_Pessoa,nome_Pessoa, cep, endereco, numero, complemento, telefone,email, Cidade.nome_Cidade, Bairro.nome_Bairro FROM Pessoa INNER JOIN Cidade ON Pessoa.cidade_id = Cidade.id_Cidade INNER JOIN Bairro ON Pessoa.bairro_id = Bairro.id_bairro";
        db.query(q, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }
            return res.json(data);
        });
    },
    getById: (req, res) => {
        const pessoas_id = req.params.id;
        const q = "SELECT * FROM Pessoa INNER JOIN Cidade ON Pessoa.cidade_id = Cidade.id_Cidade INNER JOIN Bairro ON Pessoa.bairro_id = Bairro.id_bairro WHERE id_Pessoa = ?";
        db.query(q, [pessoas_id], (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Erro ao buscar a pessoa.");
            } else {
                res.status(200).send(data);
            }
        });
    },
    update: (req, res) => {
        const city_id = req.params.id;
        const q = "UPDATE Pessoa SET `nome_Pessoa` = ?,`cep`=?, `endereco`= ?,`numero`= ?,`complemento`= ?,`telefone`= ?,`email`= ?,`cidade_id`= ?, `bairro_id`= ? WHERE id_Pessoa = ?"
        const values = [
            req.body.nome_Pessoa,
            req.body.cep,
            req.body.endereco,
            req.body.numero,
            req.body.complemento,
            req.body.telefone,
            req.body.email,
            req.body.cidade_id,
            req.body.bairro_id,
        ]
        db.query(q, [...values, city_id], (err, data) => {
            if (err) {

            } else {

            }
        })
    },
    create: (req, res) => {
        const q = "INSERT INTO Pessoa (nome_Pessoa, cep, endereco, numero, complemento,telefone, email, cidade_id, bairro_id) VALUES (?, ?,?,?,?,?,?,?,?)";
        const values = [req.body.nome_Pessoa,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.complemento,
        req.body.telefone,
        req.body.email,
        req.body.cidade_id,
        req.body.bairro_id,];
        db.query(q, values, (err, data) => {
            if (err) {
                console.error(err);
            }
            return res.json(data);
        });
    },
    delete: (req, res) => {
        const city_id = req.params.id;
        const q = "DELETE FROM Pessoa WHERE id_Pessoa = ?";
        db.query(q, [city_id], (err, data) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
    }
};

export default pessoasController;
