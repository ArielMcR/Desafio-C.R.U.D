import axios from "axios"
import './Main.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button } from "reactstrap"
import Header from "../Header"
import { ToastContainer, toast } from 'react-toastify';

function Bairro() {
    const [bairro, setBairro] = useState({
        nome_Bairro: '',
    })
    const history = useNavigate()
    const HandleChange = (e) => {
        setBairro(prev => (
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

        if (bairro.nome_Bairro === '' || bairro.nome_Bairro === undefined) {
            notify("Por favor, insira um valor válido para o bairro.", 'error');
            return; // Interrompe a execução da função se o valor for inválido
        }
        try {
            await axios.post('http://localhost:3001/bairro', bairro)
            localStorage.setItem('notification', "Bairro cadastrado com sucesso!");
            history('/listar/Bairro')
        } catch (err) {
            notify("Ocorreu um erro ao cadastrar o Bairro.", 'error');
        }
    }
    const HandleClickReturn = () => {
        history('/listar/Bairro')
    }
    return (
        <>
            <Header />
            <ToastContainer autoClose={2000} />
            <h3 style={{ textAlign: 'center' }}>
                Cadastrar Bairro
            </h3>
            <hr />
            <form>
                <div style={{ textAlign: 'center' }}>
                    <label htmlFor="input-bairro">Nome do Bairro</label>
                    <Input
                        id="input-bairro"
                        className="input-bairro"
                        onChange={HandleChange}
                        name='nome_Bairro'
                    />
                    <Button className='buttons-links' color='primary' onClick={HandleClickButton}>
                        Enviar
                    </Button>
                    <Button className='buttons-links' color='danger' onClick={HandleClickReturn}>
                        Cancelar
                    </Button>

                </div>
            </form>
        </>
    )
}
export default Bairro