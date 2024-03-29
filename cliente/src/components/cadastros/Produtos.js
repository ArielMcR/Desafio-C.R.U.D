import Header from "../Header"
import './Main.css'
import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";

function Produto() {
    const history = useNavigate()
    const navigation = useNavigate()

    const [formValues, setValues] = useState(
        {
            nome_Produto: '',
            vr_Venda: 0,

        }
    );

    const formatCurrencyToNumber = (value) => {
        const numberValue = value.replace('R$ ', '').replace(',', '.');

        const parsedValue = parseFloat(numberValue);

        return isNaN(parsedValue) ? 0 : parsedValue;
    }



    const HandleOnChange = (e) => {
        const { name, value } = e.target;

        const formattedValue = name === 'vr_Venda' ? formatCurrencyToNumber(value) : value;

        setValues(prev => ({ ...prev, [name]: formattedValue }));
    }
    console.log(formValues)
    const HandleClickButton = async (e) => {
        e.preventDefault()
        for (let field in formValues) {
            if (!formValues[field]) {
                toast.error("Por favor, preencha todos os campos.")
                return
            }
        }
        try {
            await axios.post('http://localhost:3001/produto', formValues)
            localStorage.setItem('notification', 'Produto criado com sucesso',);
            history('/listar/Produto')
        } catch (error) {
            toast.error('Ocorreu algum erro, tente novamente')
        }
    }

    const HandleClickButtonCancel = () => {
        toast.warning("Cancelado com sucesso! Redirecionando", {
            autoClose: 3000
        })
        setTimeout(() => {
            navigation('/listar/Produto');
        }, 3500);

    }
    return (
        <>
            <Header />
            <ToastContainer />

            <Container className='mt-5'>
                <h2 className='cad-pessoa'  >Cadastro Produto</h2>
                <Form className="w-100 ps-3">
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nome">Nome do Produto</Label>
                                <Input type="text" name="nome_Produto" id="nome" placeholder="Nome do produto" className="form-outline" onChange={HandleOnChange} />
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
                    <Button color='warning ' onClick={HandleClickButtonCancel}>
                        Cancelar
                    </Button>
                </div>
            </Container>
        </>
    );


}
export default Produto