import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Form, FormGroup, Label, Input, Row, Col, Table, Button } from 'reactstrap';
import { IoSearch } from "react-icons/io5";

import axios from 'axios'
import { ToastContainer } from 'react-toastify'
function Pessoas() {
    const host = 'http://localhost:3001'

    const [pessoas, setPessoas] = useState([])
    const [cidade, setCidade] = useState([])
    const [bairro, setBairro] = useState([])
    const [search, setSearch] = useState({
        'parteDoNome': '',
        'cidade_id': 0,
        'bairro_id': 0

    })
    const fetchPessoas = async () => {
        try {
            const res = await axios.post(`${host}/pessoas/search`)
            setPessoas(res.data)
        } catch (err) {
            console.log('Erro ao buscar cidades:', err);
        }
    }
    const fetchBairro = async () => {
        try {
            const res = await axios.get(`${host}/bairro`)
            setBairro(res.data)
        } catch (error) {
            console.log("error")
        }
    }
    const fetchCidades = async () => {
        try {
            const res = await axios.get(`${host}/cidade`)
            setCidade(res.data)
        } catch (err) {
            console.log('Erro ao buscar cidades:', err);
        }
    }

    useEffect(() => {
        fetchBairro()
        fetchCidades()
        fetchPessoas()
    }, [])
    const HandleOnChange = (e) => {
        setSearch(prev => ({ ...prev, [e.target.name]: e.target.value }))

    };

    const HandleClickButton = async () => {
        const res = await axios.post(`${host}/pessoas/search`, search)
        setPessoas(res.data)
    }

    return (
        <>
            <Header />
            <ToastContainer autoClose={2000} />

            <h2 className='Title'>
                Relatório de Pessoas
                <hr />
            </h2>
            <Form className="w-100 ps-5">
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="parteDoNome">Parte do nome: </Label>
                            <Input type="text" name="parteDoNome" id="nome_Pessoa" onChange={HandleOnChange} />
                        </FormGroup>
                    </Col>
                    <Col md={4} >
                        <FormGroup>
                            <Label for="cidade">Cidade:</Label>
                            <Input type="select" name="cidade_id" id="cidade" onChange={HandleOnChange}>
                                <option value='' select>Escolha a cidade</option>
                                {cidade.map((cidade) => (
                                    <option key={cidade.id_Cidade} value={cidade.id_Cidade}>{cidade.nome_Cidade}</option>
                                ))}
                            </Input >
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <FormGroup>
                            <Label for="bairro">Bairro</Label>
                            <Input type="select" name="bairro_id" id="bairro" className="form-outline" onChange={HandleOnChange}>
                                <option value='' select>Escolha o Bairro</option>
                                {bairro.map((bairro) => (
                                    <option key={bairro.id_Bairro} value={bairro.id_Bairro}>{bairro.nome_Bairro}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2} >

                        <Button color='success' style={{ marginTop: '1.8em' }} onClick={HandleClickButton}>
                            <IoSearch size="1.4rem" />
                            Filtrar
                        </Button>
                    </Col>
                </Row>

            </Form>
            {pessoas.length > 0 ? (
                <div style={{ display: 'contents', justifyContent: 'center' }}>
                    <Table className='tabela-dados text-center' hover striped>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome Completo</th>
                                <th>Cidade</th>
                                <th>Telefone</th>

                            </tr>
                        </thead>
                        <tbody>
                            {pessoas.map((pessoa) => (
                                <tr key={pessoa.id_Pessoa}>
                                    <td>{pessoa.id_Pessoa}</td>
                                    <td>{pessoa.nome_Pessoa}</td>
                                    <td>{pessoa.nome_Cidade}</td>
                                    <td>{pessoa.telefone}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center">
                    Nenhum dado cadastrado
                </div>
            )}



        </>
    )
}

export default Pessoas