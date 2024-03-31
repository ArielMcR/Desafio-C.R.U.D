import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Input, Button } from "reactstrap"
import Header from "../Header"
import { ToastContainer, toast } from 'react-toastify';

function UpdateCidade() {
    const host = 'http://localhost:3001'

    const [value, setValue] = useState({});
    const [formValues, setValues] = useState({
        nome_Cidade: '',
        sigla_Uf: 0
    });
    const navigation = useNavigate();
    const location = useLocation();
    const cidade_Id = location.pathname.split('/')[3];

    useEffect(() => {
        axios.get(`${host}/cidade/` + cidade_Id)
            .then(res => {
                const cidadeData = res.data[0];
                setValue({
                    nome_Cidade: cidadeData.nome_Cidade,
                    sigla_Uf: cidadeData.sigla_Uf,
                });
                setValues({
                    nome_Cidade: cidadeData.nome_Cidade,
                    sigla_Uf: cidadeData.sigla_Uf,
                });
            })

            .catch(error => {
                console.log('Erro ao buscar dados:', error);
                toast.error('Algum erro aconteceu, redirecionando em 3 segundos');
                setTimeout(() => {
                    navigation('listar/Cidade');
                }, 3000);
            });
    }, [cidade_Id, navigation]);

    const HandleOnChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setValue(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };
    console.log(formValues)

    const HandleClickButton = async (e) => {
        e.preventDefault();

        for (let campo in value) {
            if (value[campo] === '' || value[campo] === 0 || value[campo] === undefined) {
                toast.error('Preencha todos os campos!!!');
                return;
            }
        }

        try {
            navigation('/listar/Cidade');
            localStorage.setItem('notification', 'Dados atualizados com sucesso');
            await axios.put(`${host}/cidade/` + cidade_Id, formValues);
        } catch (err) {
            toast.error("Erro ao atualizar!");
        }
    };

    const HandleClickButtonCancel = () => {
        toast.warning("Cancelado com sucesso! Redirecionando", {
            autoClose: 3000
        });
        setTimeout(() => {
            navigation('/listar/Cidade');
        }, 3500);
    };
    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 style={{ textAlign: 'center' }}>
                Atualizar Cidade
            </h3>
            <hr />
            <form>
                <div style={{ textAlign: 'center' }}>
                    <label htmlFor="input-city">Nome da cidade</label>
                    <Input
                        id="input-city"
                        className="input-city"
                        onChange={HandleOnChange}
                        value={formValues.nome_Cidade}
                        name='nome_Cidade'
                    />
                    <label htmlFor="input-city-uf">UF</label>
                    <Input
                        id="input-city-uf"
                        className="input-city-uf"
                        onChange={HandleOnChange}
                        value={formValues.sigla_Uf}
                        name='sigla_Uf'
                    />

                    <Button className='buttons-links' color='primary' onClick={HandleClickButton}>
                        Enviar
                    </Button>
                    <Button className='buttons-links' color='danger' onClick={HandleClickButtonCancel}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </>
    )
}
export default UpdateCidade