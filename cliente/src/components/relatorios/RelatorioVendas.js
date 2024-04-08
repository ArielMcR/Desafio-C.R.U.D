import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Form, FormGroup, Label, Input, Row, Col, Table, Button } from 'reactstrap';
import { IoSearch } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import vendasPdf from '../../PDF\'S/vendasPdf';


import axios from 'axios'
import { ToastContainer } from 'react-toastify'

function RelatorioVendas() {
    const host = 'http://localhost:3001'
    const [venda, setVenda] = useState([])
    const [produto, setProduto] = useState([])
    const [pessoas, setPessoas] = useState([])
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState({
        'dataInicio': '',
        'dataFinal': '',
        'produto_id': 0,
        'pessoa_id': 0

    })
    const fetchVendas = async () => {
        try {
            const res = await axios.post(`${host}/vendaItens/search`)
            let uniqueArray = res.data.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            setVenda(uniqueArray)
        } catch (err) {
            console.log('Erro ao buscar cidades:', err);
        }
    }
    console.log(venda)
    const fetchPessoas = async () => {
        try {
            const res = await axios.get(`${host}/pessoas`)
            setPessoas(res.data)
        } catch (error) {
            console.log("error")
        }
    }
    const fetchProdutos = async () => {
        try {
            const res = await axios.get(`${host}/produto`)
            setProduto(res.data)
        } catch (err) {
            console.log('Erro ao buscar produto:', err);
        }
    }

    useEffect(() => {
        fetchPessoas()
        fetchProdutos()
        fetchVendas()
    }, [])
    const HandleOnChange = (e) => {
        setSearch(prev => ({ ...prev, [e.target.name]: e.target.value }))

    };
    console.log(search)

    useEffect(() => {
        const total = venda.reduce((sum, item) => sum + item.vr_Total, 0);
        setTotal(total);
    }, [venda]);

    const HandleClickButton = async () => {
        const res = await axios.post(`${host}/vendaItens/search`, search)
        let uniqueArray = res.data.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
        setVenda(uniqueArray)
    }

    return (
        <>
            <Header />
            <ToastContainer autoClose={2000} />

            <h2 className='Title'>
                Relatório de Vendas
                <hr />
            </h2>
            <Form className="w-100 ps-5">
                <Row form>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="dataInicio">Data de Inicio: </Label>
                            <Input type="date" name="dataInicio" id="dataInicio" onChange={HandleOnChange} />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="dataFinal">Data Final: </Label>
                            <Input type="date" name="dataFinal" id="dataFinal" onChange={HandleOnChange} />
                        </FormGroup>
                    </Col>
                    <Col md={2} >
                        <FormGroup>
                            <Label for="produto_id">Produto:</Label>
                            <Input type="select" name="produto_id" id="produto" onChange={HandleOnChange}>
                                <option value='' select>Escolha a produto</option>
                                {produto.map((produto) => (
                                    <option key={produto.id_Produto} value={produto.id_Produto}>{produto.nome_Produto}</option>
                                ))}
                            </Input >
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <Label for="Pessoa">Pessoa</Label>
                            <Input type="select" name="pessoa_id" id="Pessoa" className="form-outline" onChange={HandleOnChange}>
                                <option value='' select>Escolha o Pessoa</option>
                                {pessoas.map((pessoa) => (
                                    <option key={pessoa.id_Pessoa} value={pessoa.id_Pessoa}>{pessoa.nome_Pessoa}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3} >

                        <Button color='success' style={{ marginTop: '1.8em', marginRight: '2em' }} onClick={HandleClickButton}>
                            <IoSearch size="1.3rem" />
                            Filtrar
                        </Button>


                        <Button color='primary' style={{ marginTop: '1.8em', }} onClick={(e) => vendasPdf(venda)}>
                            <FaFilePdf /> Gerar PDF
                        </Button>

                    </Col>
                </Row>

            </Form>
            {venda.length > 0 ? (
                <div style={{ display: 'contents', justifyContent: 'center' }}>
                    <Table className='tabela-dados text-center' hover striped>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome Completo</th>
                                <th>Valor total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {venda.map((venda) => (
                                <tr key={venda.id}>
                                    <td>{venda.id}</td>
                                    <td>{venda.nome_Pessoa}</td>
                                    <td>R$ {venda.vr_Total.toFixed(2)}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="text-right me-5">Total: R$ {total.toFixed(2)}</div>
                </div>

            ) : (
                <div className="text-center">
                    Nenhum dado cadastrado
                </div>
            )}



        </>
    )
}

export default RelatorioVendas