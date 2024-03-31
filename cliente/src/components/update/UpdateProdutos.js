import Header from "../Header";
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

function UpdateProdutos() {
    const host = 'http://localhost:3001'


    const [value, setValue] = useState({});
    const [formValues, setValues] = useState({
        nome_Produto: '',
        vr_Venda: 0
    });
    const navigation = useNavigate();
    const location = useLocation();
    const produto_id = location.pathname.split('/')[3];

    useEffect(() => {
        axios.get(`${host}/produto/` + produto_id)
            .then(res => {
                const produtoData = res.data;
                setValue({
                    'nome_Produto': produtoData.nome_Produto,
                    'vr_Venda': produtoData.vr_Venda,
                });
                setValues({
                    'nome_Produto': produtoData.nome_Produto,
                    'vr_Venda': produtoData.vr_Venda,
                });
            })

            .catch(error => {
                console.log('Erro ao buscar dados:', error);
                toast.error('Algum erro aconteceu, redirecionando em 3 segundos');
                setTimeout(() => {
                    navigation('/listar/Produto');
                }, 3000);
            });
    }, [produto_id, navigation]);

    const HandleOnChange = (e) => {

        const { name, value } = e.target;

        const formattedValue = name === 'vr_Venda' ? formatCurrencyToNumber(value) : value;

        setValues(prev => ({ ...prev, [name]: formattedValue }));
        setValue(prev => ({ ...prev, [name]: formattedValue }));
    };
    console.log(formValues)





    const formatCurrencyToNumber = (value) => {
        const numberValue = value.replace('R$ ', '').replace(',', '.');

        const parsedValue = parseFloat(numberValue);

        return isNaN(parsedValue) ? 0 : parsedValue;
    }

    const HandleClickButton = async (e) => {
        e.preventDefault();

        for (let campo in value) {
            if (value[campo] === '' || value[campo] === 0 || value[campo] === undefined) {
                toast.error('Preencha todos os campos!!!');
                return;
            }
        }

        try {
            navigation('/listar/Produto');
            localStorage.setItem('notification', 'Dados atualizados com sucesso');
            await axios.put(`${host}/produto/` + produto_id, formValues);
        } catch (err) {
            toast.error("Erro ao atualizar!");
        }
    };

    const HandleClickButtonCancel = () => {
        toast.warning("Cancelado com sucesso! Redirecionando", {
            autoClose: 3000
        });
        setTimeout(() => {
            navigation('/listar/Produto');
        }, 3500);
    };

    return (
        <>
            <Header />
            <ToastContainer />

            <Container className='mt-5'>
                <h2 className='cad-pessoa'>Atualizar Produto</h2>
                <Form className="w-100 ps-3">
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nome">Nome do Produto</Label>
                                <Input type="text" name="nome_Produto" id="nome" placeholder="Nome do produto" className="form-outline" value={value.nome_Produto} onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="valor">Valor do Produto</Label>
                                <NumericFormat
                                    thousandSeparator={false}
                                    prefix={'R$ '}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    inputMode="numeric"
                                    name="vr_Venda"
                                    id="vr_Venda"
                                    value={value.vr_Venda}
                                    placeholder="Valor do Produto"
                                    className="form-control"
                                    required
                                    onChange={HandleOnChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <div className="text-center">
                    <Button color='success' className="me-3" onClick={HandleClickButton}>
                        Enviar
                    </Button>
                    <Button color='warning' onClick={HandleClickButtonCancel}>
                        Cancelar
                    </Button>
                </div>
            </Container>
        </>
    );
}

export default UpdateProdutos;
