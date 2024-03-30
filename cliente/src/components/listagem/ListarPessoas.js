import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
function ListarPessoas() {
    const [pessoas, setPessoas] = useState([])
    const [reload, setReload] = useState(false)
    const history = useNavigate();

    const fetchPessoas = async () => {
        try {
            const res = await axios.get('http://localhost:3001/pessoas')
            setPessoas(res.data)
        } catch (err) {
            console.log('Erro ao buscar cidades:', err);
        }
    }
    console.log(pessoas)
    useEffect(() => {
        fetchPessoas()
    }, [])

    const HandleClickButton = async (pessoas_id) => {
        try {
            toast.success('Excluído com sucesso')
            await axios.delete('http://localhost:3001/pessoas/' + pessoas_id);
            setReload(!reload)
            history('/listar/Pessoas');
        } catch (error) {
            toast.success('Ocorreu algum com sucesso')
        }
    }
    useEffect(() => {
        const notification = localStorage.getItem('notification');
        if (notification) {
            toast.success(notification);
            localStorage.removeItem('notification');
        }
    }, [reload]);

    return (
        <>
            <Header />
            <ToastContainer autoClose={2000} />
            <h2 className='Title'>
                Pessoas
                <hr />
            </h2>
            <Link to='/cadastro/Pessoas'>
                <Button color='primary'>
                    Adicionar
                </Button>
            </Link>
            {pessoas.length > 0 ? (
                <div style={{ display: 'contents', justifyContent: 'center' }}>
                    <Table className='tabela-dados text-center' hover striped>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome Completo</th>
                                <th>Telefone</th>
                                <th>Cidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pessoas.map((pessoa) => (
                                <tr key={pessoa.id_Pessoa}>
                                    <td>{pessoa.id_Pessoa}</td>
                                    <td>{pessoa.nome_Pessoa}</td>
                                    <td>{pessoa.telefone}</td>
                                    <td>{pessoa.nome_Cidade}</td>
                                    <td className='text-center'>
                                        <Link to={`/update/pessoa/${pessoa.id_Pessoa}`}>
                                            <Button color='warning' style={{ marginRight: '10px' }}>
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button color='danger' onClick={() => HandleClickButton(pessoa.id_Pessoa)}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center">
                    Nenhum dado cadastrado
                </div>
            )}



        </>
    )
}

export default ListarPessoas