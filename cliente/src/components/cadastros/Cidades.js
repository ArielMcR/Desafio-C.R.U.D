import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button } from "reactstrap"
import Header from "../Header"
import { ToastContainer, toast } from 'react-toastify';
function Cidade() {
    const [city, setCity] = useState({
        nome_Cidade: '',
        sigla_Uf: '',
    })
    const navigate = useNavigate()
    const HandleChange = (e) => {
        setCity(prev => (
            { ...prev, [e.target.name]: e.target.value }))

    }
    const notify = (message, type) => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default:
                toast(message);
        }
    }
    const HandleClickButton = async (e) => {
        e.preventDefault()
        for (let field in city) {
            if (!city[field]) {
                toast.error("Por favor, preencha todos os campos.")
                return
            }
        }
        try {
            await axios.post('http://localhost:3001/cidade', city)
            localStorage.setItem('notification', "cidade cadastrada com sucesso!");
            navigate('/listar/Cidade')
        } catch (err) {
            notify("Ocorreu um erro ao cadastrar a cidade.", 'error');
        }

    }
    return (
        <>
            <Header />
            <ToastContainer autoClose={2000} />
            <h3 style={{ textAlign: 'center' }}>
                Cadastrar Cidade
            </h3>
            <hr />
            <form>
                <div style={{ textAlign: 'center' }}>
                    <label htmlFor="input-city">Nome da cidade</label>
                    <Input
                        id="input-city"
                        className="input-city"
                        onChange={HandleChange}
                        name='nome_Cidade'
                    />
                    <label htmlFor="input-city-uf">UF</label>
                    <Input
                        id="input-city-uf"
                        className="input-city-uf"
                        onChange={HandleChange}
                        name='sigla_Uf'
                    />

                    <Button className='buttons-links' color='primary' onClick={HandleClickButton}>
                        Enviar
                    </Button>
                    <Button className='buttons-links' color='danger'>
                        Cancelar
                    </Button>

                </div>
            </form>
        </>
    )
}
export default Cidade