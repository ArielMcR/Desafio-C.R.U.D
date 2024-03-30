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
    getByFilters: (req, res) => {
        const { parteDoNome, cidade_id, bairro_id } = req.body


        let baseQuery = "SELECT id_Pessoa, nome_Pessoa, cidade.nome_Cidade, telefone FROM Pessoa INNER JOIN Cidade ON Pessoa.cidade_id = Cidade.id_Cidade INNER JOIN Bairro ON Pessoa.bairro_id = Bairro.id_bairro"
        let conditions = [];

        if (parteDoNome) {
            conditions.push(`nome_Pessoa LIKE '%${parteDoNome}%' `);
        }
        if (cidade_id) {
            conditions.push(`cidade_id = ${cidade_id}`);
        }
        if (bairro_id) {
            conditions.push(`bairro_id = ${bairro_id}`);
        }

        if (conditions.length) {
            baseQuery += " WHERE " + conditions.join(" AND ");
        }
        db.query(baseQuery, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send('Erro ao realizar a consulta');
            } else {
                res.json(results);
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
        const values = [req.body.nome_Pessoa,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.complemento,
        req.body.telefone,
        req.body.email,
        req.body.cidade_id,
        req.body.bairro_id,];

        const verificar_pessoa = "SELECT * FROM Pessoa WHERE nome_Pessoa = ?";

        db.query(verificar_pessoa, [req.body.nome_Pessoa], (err, result) => {
            if (err) {
                console.error('Erro ao verificar ao verificar a pessoa:', err);
                return res.status(500).json({ error: 'Ocorreu um erro r ao verificar a pessoa' });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'Pessoa já cadastrada' });
            } else {
                const q = "INSERT INTO Pessoa (nome_Pessoa, cep, endereco, numero, complemento,telefone, email, cidade_id, bairro_id) VALUES (?, ?,?,?,?,?,?,?,?)";
                db.query(q, values, (err, data) => {
                    if (err) {
                    } else {

                        return res.json(data);
                    }
                });
            }
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
