import Header from "../Header"
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col, Button, Table } from 'reactstrap';
import axios from 'axios';
import { NumericFormat } from 'react-number-format'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

function UpdateVenda() {
    const location = useLocation();
    const venda_id = location.pathname.split('/')[3];
    const history = useNavigate()
    const [formValues, setValues] = useState({
        'venda_id': venda_id,
        'produto_id': 0,
        'qtade': 0,
        'vr_Venda': 0
    })
    const [venda, setVenda] = useState({
        'dt_Venda': '',
        'pessoa_id': 0,
        'vr_Total': 0,
    })
    const [cartItems, setCartItems] = useState([]);

    const nomeDoProdutoPorId = async (produto_id) => {
        try {
            const res = await axios.get('http://localhost:3001/produto/' + produto_id)
            return res.data.nome_Produto;
        } catch (error) {
            return 'Produto não encontrado'
        }

    }

    const addToCart = async () => {
        if (formValues.produto_id === 0 || formValues.qtade === 0 || formValues.vr_Venda === 0) {
            toast.error('Preencha todos os campos');
            return;
        }
        try {
            const productName = await nomeDoProdutoPorId(formValues.produto_id);
            setCartItems([...cartItems, { ...formValues, nome_Produto: productName }]);
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        }
    };
    const removeFromCart = async (index, venda_id) => {
        await axios.delete('http://localhost:3001/vendaItens/' + venda_id)
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        toast.play('Excluído com sucesso')
    };
    const HandleClickButton = async () => {
        if (!venda.dt_Venda || venda.pessoa_id === 0 || venda.vr_Total === 0) {
            toast.error('Preencha todos os campos');
            return;
        }
        try {
            await axios.put('http://localhost:3001/venda/' + venda_id, venda)
            history('/listar/Vendas')

        } catch (error) {
            console.error(error);

        }
    }
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((total, item) => total + (item.vr_Venda * item.qtade), 0);
        setTotal(total);
    }, [cartItems]);

    const HandleOnChange = (e) => {
        const { name, value } = e.target;
        let valorUnitario = 0;

        if (name === 'produto_id') {
            const produtoSelecionado = produto.find(produto => produto.id_Produto === parseInt(value));
            valorUnitario = produtoSelecionado ? produtoSelecionado.vr_Venda : 0;
            setValues(prevState => ({
                ...prevState,
                [name]: value,
                'vr_Venda': valorUnitario,
            }));
        } else if (name === 'qtade' || name === 'vr_Venda') {
            setValues(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else if (name in venda) {
            setVenda(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    useEffect(() => {
        setValues(prevState => ({
            ...prevState,
            'vr_Total': Math.round((prevState.vr_Venda * prevState.qtade) * Math.pow(10, 2)) / Math.pow(10, 2)
        }));
    }, [formValues.vr_Venda, formValues.qtade]);

    useEffect(() => {
        setVenda(prevState => ({
            ...prevState,
            'vr_Total': total
        }));
    }, [total]);

    const HandleClickButtonCancel = () => {
        toast.warning("Cancelado com sucesso! Redirecionando", {
            autoClose: 3000
        })
        setTimeout(() => {
            location('/listar/Vendas');
        }, 3500);

    }
    const [produto, setProdutos] = useState([])
    const [pessoa, setPessoa] = useState([])



    const fetchProdutos = async () => {
        try {
            const res = await axios.get('http://localhost:3001/produto')
            setProdutos(res.data)
        } catch (error) {

        }

    }
    const fetchPessoa = async () => {
        try {
            const res = await axios.get('http://localhost:3001/pessoas')
            setPessoa(res.data)
        } catch (error) {

        }

    }

    useEffect(() => {
        axios.get('http://localhost:3001/venda/' + venda_id)
            .then(res => {
                const vendaData = res.data[0];
                setVenda({
                    'dt_Venda': vendaData.dt_Venda,
                    'pessoa_id': vendaData.pessoa_id,
                    'vr_Total': vendaData.vr_Total,
                })
            })
            .catch(error => {
                console.log('Erro ao buscar dados:', error);
                toast.error('Algum erro aconteceu, redirecionando em 3 segundos');
                setTimeout(() => {
                    history('listar/Produto');
                }, 3000);
            });
        axios.get('http://localhost:3001/vendaItens/' + venda_id)
            .then(res => {
                res.data.forEach(vendaItemData => {
                    nomeDoProdutoPorId(vendaItemData.produto_Id).then(nomeProduto => {
                        setCartItems(prevCartItems => [...prevCartItems, {
                            'id_VendaItens': vendaItemData.id_VendaItens,
                            'venda_id': vendaItemData.venda_id,
                            'produto_id': vendaItemData.produto_Id,
                            'vr_Venda': vendaItemData.vr_Venda,
                            'qtade': vendaItemData.qtade,
                            'nome_Produto': nomeProduto,
                            'vr_Total': vendaItemData.vr_Venda * vendaItemData.qtade
                        }]);
                    });
                });
            })


    }, [venda_id, history]);


    useEffect(() => {
        fetchProdutos()
        fetchPessoa()
    }, [])


    console.log(cartItems)
    return (
        <>
            <Header />
            <ToastContainer />

            <Container className='mt-5'>
                <h2 className='cad-pessoa'  >Venda de Produtos</h2>
                <Form className="w-100 ps-3">
                    <Row form>

                        <Col md={6}>
                            <FormGroup>
                                <Label for="dataVenda">Data da Venda:</Label>
                                <Input type="date" name="dt_Venda" id="dataVenda" onChange={HandleOnChange} value={venda.dt_Venda.split('T')[0]} />
                            </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup>
                                <Label for="pessoa">Pessoa:</Label>
                                <Input type="select" name="pessoa_id" id="pessoa" onChange={HandleOnChange}>
                                    <option value="0">Escolha uma pessoa</option>
                                    {pessoa.map((pessoa) => (
                                        <option key={pessoa.id_Pessoa} value={pessoa.id_Pessoa} selected={pessoa.id_Pessoa === venda.pessoa_id}>{pessoa.nome_Pessoa}</option>
                                    ))}
                                </Input>
                            </FormGroup>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="Produto">Produto:</Label>
                                <Input type="select" name="produto_id" id="Produto" onChange={HandleOnChange}>
                                    <option select='true' value="0">Escolha uma opção</option>
                                    {produto.map((produto) => (
                                        <option key={produto.id_Produto} value={produto.id_Produto}>{produto.nome_Produto}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="vr_Total">Quantidade</Label>
                                <Input type="number" name="qtade" id="vr_Total" onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="vr_Total">Valor Unitário</Label>
                                <NumericFormat
                                    thousandSeparator={false}
                                    prefix={'R$ '}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    inputMode="numeric"
                                    name="vr_Venda"
                                    id="vr_Venda"
                                    placeholder="Valor do Produto"
                                    className="form-control"
                                    required
                                    value={formValues.vr_Venda}
                                    onChange={HandleOnChange}
                                    disabled
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>

                                <Label for="vr_Total">Valor Total:</Label>
                                <NumericFormat
                                    thousandSeparator={false}
                                    prefix={'R$ '}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    inputMode="numeric"
                                    name="vr_Venda"
                                    id="vr_Venda"
                                    placeholder="Valor do Produto"
                                    className="form-control"
                                    required
                                    value={formValues.vr_Total}
                                    onChange={HandleOnChange}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Button color='success' className="me-2 mt-4" onClick={addToCart}>
                                    <MdOutlineShoppingCart /> Carrinho
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Table className='tabela-dados text-center' hover striped>
                    <tr>

                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th>Sub Total</th>
                    </tr>

                    <tbody>
                        {cartItems.map((produto, index) => (
                            <tr key={index}>
                                <td>{produto.nome_Produto}</td>
                                <td>{produto.qtade}</td>
                                <td>R$ {produto.vr_Venda}</td>
                                <td>R$ {produto.vr_Total}</td>
                                <td>
                                    {/* Botão para remover item do carrinho */}
                                    <Button color='danger' onClick={() => removeFromCart(index, venda_id)}>
                                        Remover
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="text-right">Total: {total}</div>
                <div className="text-center">
                    <Button color='success' className="me-3" onClick={HandleClickButton}>
                        Enviar
                    </Button>
                    <Button color='warning ' onClick={HandleClickButtonCancel}>
                        Cancelar
                    </Button>
                </div>
            </Container>
        </>
    )


}
export default UpdateVenda