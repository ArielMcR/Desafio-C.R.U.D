import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Header from "../Header"
import { ToastContainer, toast } from 'react-toastify';
import InputMask from "react-input-mask";


function UpdatePessoa() {
    const host = 'http://localhost:3001'

    const navigation = useNavigate()
    const [cidade, setCidade] = useState([]);
    const [bairro, setBairro] = useState([]);
    const [formValues, setValues] = useState({
        nome_Pessoa: '',
        cep: '',
        endereco: '',
        numero: 0,
        complemento: '',
        email: '',
        telefone: 0,
        cidade_id: 0,
        bairro_id: 0,

    });

    const location = useLocation()
    const pessoa_id = location.pathname.split('/')[3]

    useEffect(() => {
        axios.get(`${host}/pessoas/` + pessoa_id)
            .then(res => {
                const pessoaData = res.data[0];
                setValues({
                    nome_Pessoa: pessoaData.nome_Pessoa,
                    cep: pessoaData.cep,
                    endereco: pessoaData.endereco,
                    numero: pessoaData.numero,
                    complemento: pessoaData.complemento,
                    email: pessoaData.email,
                    telefone: pessoaData.telefone,
                    cidade_id: pessoaData.cidade_id,
                    bairro_id: pessoaData.bairro_id,
                });

            })
            .catch(error => {
                console.log('Erro ao buscar dados:', error);
            });
    }, [pessoa_id]);

    const fetchCidade = async () => {
        try {
            const res = await axios.get(`${host}/cidade`)
            setCidade(res.data)
        } catch {
            console.log('Erro ao buscar dados:')
        }
    }
    const fetchBairro = async () => {
        try {
            const res = await axios.get(`${host}/bairro`)
            setBairro(res.data)
        } catch {
            console.log('Erro ao buscar dados:')
        }
    }
    useEffect(() => {
        fetchBairro()
        fetchCidade()
    }, [])


    const HandleClickButton = async (e) => {
        e.preventDefault()


        for (let campo in formValues) {
            if (formValues[campo] === '' || formValues[campo] === 0 || formValues[campo] === undefined) {
                toast.error('Preencha todos os campos!!!')
                return
            }
        }

        try {
            navigation('/listar/Pessoas')
            localStorage.setItem('notification', 'Dados atualizados com sucesso');
            await axios.put(`${host}/pessoas/` + pessoa_id, formValues)
        } catch (err) {
            toast.error("Erro ao atualizar!")

        }

    }
    const HandleClickButtonCancel = () => {
        toast.warning("Cancelado com sucesso! Redirecionando", {
            autoClose: 3000
        })
        setTimeout(() => {
            navigation('/listar/Pessoas');
        }, 3500);

    }
    const HandleOnChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <>
            <Header />
            <ToastContainer />

            <Container className='mt-5'>
                <h2 className='cad-pessoa'  >Atualizando cadastro Pessoas</h2>
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nome">Nome Completo</Label>
                                <Input type="text" name="nome_Pessoa" id="nome" placeholder="Nome" className="form-outline" value={formValues.nome_Pessoa} onChange={HandleOnChange} required />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" className="form-outline" value={formValues.email} onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="bairro">Bairro</Label>
                                <Input type="select" name="bairro_id" id="bairro" className="form-outline" value={formValues.bairro_id} onChange={HandleOnChange}>
                                    {bairro.map((bairro) => (
                                        <option key={bairro.id_bairro} value={bairro.id_bairro}>{bairro.nome_Bairro}</option>
                                    ))}
                                </Input>
                            </FormGroup>

                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="cidade">Cidade</Label>
                                <Input type="select" name="cidade_id" id="cidade_id" value={formValues.cidade_id} className="form-outline" onChange={HandleOnChange}>
                                    {cidade.map((cidade) => (
                                        <option key={cidade.id_Cidade} value={cidade.id_Cidade} select={cidade.id_Cidade === formValues.cidade_id ? cidade.nome_Cidade : 'Escolha uma opção'}>
                                            {cidade.nome_Cidade}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="cep">CEP</Label>
                                <InputMask mask="99999-999" onChange={HandleOnChange} value={formValues.cep}>
                                    <Input type="text" name="cep" id="cep" placeholder="CEP" className="form-outline" />
                                </InputMask>

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="endereco">Endereço</Label>
                                <Input type="text" name="endereco" id="endereco" placeholder="Endereço" className="form-outline" onChange={HandleOnChange} value={formValues.endereco} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="numero">Número</Label>
                                <Input type="text" name="numero" id="numero" placeholder="Número" className="form-outline" onChange={HandleOnChange} value={formValues.numero} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="complemento">Complemento</Label>
                                <Input type="text" name="complemento" id="complemento" placeholder="Complemento" className="form-outline" value={formValues.complemento} onChange={HandleOnChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="telefone">Telefone</Label>
                                <InputMask mask='(99) 9 9999-9999' value={formValues.telefone} onChange={HandleOnChange}>
                                    <Input type="text" name="telefone" id="telefone" placeholder="Telefone" className="form-outline" />
                                </InputMask>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button style={{ marginRight: 3 }} onClick={HandleClickButton} color="success">Enviar</Button>
                    <Button color="danger" onClick={HandleClickButtonCancel}>Cancelar</Button>
                </Form>
            </Container>
        </>
    )
}
export default UpdatePessoa