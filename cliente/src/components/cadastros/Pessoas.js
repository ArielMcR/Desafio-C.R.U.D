import Header from "../Header"
import './Main.css'
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";

function Pessoas() {
    const history = useNavigate()
    const [cidade, setCidade] = useState([])
    const [bairro, setBairro] = useState([])

    const [formValues, setValues] = useState(
        {
            nome_Pessoa: '',
            cep: '',
            endereco: '',
            numero: 0,
            complemento: '',
            email: '',
            telefone: 0,
            cidade_id: 0,
            bairro_id: 0,

        }
    );
    const fetchBairro = async () => {
        try {
            const res = await axios.get('http://localhost:3001/bairro')
            setBairro(res.data)
        } catch (error) {
            console.log("error")
        }
    }

    useEffect(() => {
        fetchBairro()
    }, [])


    const fetchCidades = async () => {
        try {
            const res = await axios.get('http://localhost:3001/cidade')
            setCidade(res.data)
        } catch (err) {
            console.log('Erro ao buscar cidades:', err);
        }
    }

    useEffect(() => {
        fetchCidades()
    }, [])

    const HandleClickButton = async (e) => {
        e.preventDefault()
        for (let field in formValues) {
            if (!formValues[field]) {
                toast.error("Por favor, preencha todos os campos.")
                return
            }
        }
        console.log(formValues)
        try {
            await axios.post('http://localhost:3001/pessoas', formValues)
            localStorage.setItem('notification', 'Pessoa criada com sucesso',);
            history('/listar/Pessoas')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Esta pessoa já está cadastrada')

            }
            else {
                toast.error("Algum erro aconteceu, tente novamente")
            }
        }
    }

    const HandleOnChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <>
            <Header />
            <ToastContainer />

            <Container className='mt-5'>
                <h2 className='cad-pessoa'  >Cadastro Pessoas</h2>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nome">Nome Completo</Label>
                                <Input type="text" name="nome_Pessoa" id="nome" placeholder="Nome" className="form-outline" onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" className="form-outline" onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="bairro">Bairro</Label>
                                <Input type="select" name="bairro_id" id="bairro" className="form-outline" onChange={HandleOnChange}>
                                    <option value='0' select>Escolha o Bairro</option>
                                    {bairro.map((bairro) => (
                                        <option key={bairro.id_Bairro} value={bairro.id_Bairro}>{bairro.nome_Bairro}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="cidade">Cidade</Label>
                                <Input type="select" name="cidade_id" id="cidade_id" className="form-outline" onChange={HandleOnChange}>
                                    <option value='0' select>Escolha o Bairro</option>
                                    {cidade.map((cidade) => (
                                        <option key={cidade.id_Cidade} value={cidade.id_Cidade}>{cidade.nome_Cidade}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="cep">CEP</Label>
                                <InputMask mask="99999-999" onChange={HandleOnChange}>
                                    <Input type="text" name="cep" id="cep" placeholder="CEP" className="form-outline" />
                                </InputMask>

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="endereco">Endereço</Label>
                                <Input type="text" name="endereco" id="endereco" placeholder="Endereço" className="form-outline" onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="numero">Número</Label>
                                <Input type="text" name="numero" id="numero" placeholder="Número" className="form-outline" onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="complemento">Complemento</Label>
                                <Input type="text" name="complemento" id="complemento" placeholder="Complemento" className="form-outline" onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="telefone">Telefone</Label>
                                <InputMask mask='(99) 9 9999-9999' onChange={HandleOnChange}>
                                    <Input type="text" name="telefone" id="telefone" placeholder="Telefone" className="form-outline" onChange={HandleOnChange} />
                                </InputMask>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button style={{ marginRight: 3 }} onClick={HandleClickButton} color="success">Enviar</Button>
                    <Button color="danger">Cancelar</Button>
                </Form>
            </Container>
        </>
    );


}
export default Pessoas