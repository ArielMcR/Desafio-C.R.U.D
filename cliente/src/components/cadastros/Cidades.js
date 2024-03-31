import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button } from "reactstrap"
import Header from "../Header"
import { ToastContainer, toast } from 'react-toastify';
function Cidade() {
    const host = 'http://localhost:3001'

    const [city, setCity] = useState({
        nome_Cidade: '',
        sigla_Uf: '',
    })
    const navigate = useNavigate()
    const HandleChange = (e) => {
        setCity(prev => (
            { ...prev, [e.target.name]: e.target.value }))

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
            await axios.post(`${host}/cidade`, city)
            localStorage.setItem('notification', "cidade cadastrada com sucesso!");
            navigate('/listar/Cidade')
        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error('Cidade já está cadastrada')
            } else {
                toast.error("Algum erro aconteceu, tente novamente")
            }
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