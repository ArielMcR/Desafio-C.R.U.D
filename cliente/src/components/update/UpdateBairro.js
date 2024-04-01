import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Input, Button } from "reactstrap"
import Header from "../Header"
import { ToastContainer, toast } from 'react-toastify';

function UpdateBairro() {
    const host = 'http://localhost:3001'

    const navigation = useNavigate()
    const [formValues, setFormValues] = useState({
        nome_Bairro: '',
    });
    const location = useLocation()
    const bairro_id = location.pathname.split('/')[3]

    useEffect(() => {
        axios.get(`${host}/bairro/` + bairro_id)
            .then(res => {
                const bairroData = res.data[0];
                setFormValues({
                    nome_Bairro: bairroData.nome_Bairro,
                });
            })
            .catch(error => {
                console.log('Erro ao buscar dados:', error);
            });
    }, [bairro_id]);
    console.log(formValues)

    const HandleChange = (e) => {
        setFormValues(prev => (
            { ...prev, [e.target.name]: e.target.value }))

    }
    const HandleClickButton = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${host}/bairro/` + bairro_id, formValues)
            localStorage.setItem('notification', 'Dados atualizados com sucesso');
            navigation('/listar/Bairro')
        } catch (err) {
            toast.error("Erro ao atualizar!")

        }

    }
    const HandleClickButtonCancel = () => {
        toast.warning("Cancelado com sucesso! Redirecionando", {
            autoClose: 3000
        })
        setTimeout(() => {
            navigation('/listar/Bairro');
        }, 3500);

    }
    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 style={{ textAlign: 'center' }}>
                Atualizar Bairro
            </h3>
            <hr />
            <form>
                <div style={{ textAlign: 'center' }}>
                    <label htmlFor="input-bairro">Nome do Bairro</label>
                    <Input
                        id="input-bairro"
                        className="input-bairro"
                        onChange={HandleChange}
                        value={formValues.nome_Bairro}
                        name='nome_Bairro'
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
export default UpdateBairro