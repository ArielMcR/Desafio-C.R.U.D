import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
function Listar_cidade() {
    const [cidade, setCidade] = useState([])
    const [reload, setReload] = useState(false)
    const history = useNavigate();

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
    })

    const HandleClickButton = async (cidade_id) => {
        try {
            toast.warning('Cidade excluída com sucesso');
            await axios.delete('http://localhost:3001/cidade/' + cidade_id);
            setReload(!reload)
            history.back();
        } catch (error) {
            console.log('Erro ao excluir cidade:', error);
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
                Cidades
                <hr />
            </h2>
            <Link to='/cadastro/Cidade'>
                <Button color='primary'>
                    Adicionar
                </Button>
            </Link>
            <div style={{ display: 'contents', justifyContent: 'center' }}>
                <Table className='tabela-dados text-center' hover striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>UF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cidade.map((cidade) => (
                            <tr key={cidade.id_Cidade}>
                                <td>{cidade.id_Cidade}</td>
                                <td>{cidade.nome_Cidade}</td>
                                <td>{cidade.sigla_Uf}</td>
                                <td className='text-center'>
                                    <Link to={`/update/cidade/${cidade.id_Cidade}`}>
                                        <Button color='warning' style={{ marginRight: '10px' }}>
                                            Editar
                                        </Button>
                                    </Link>
                                    <Button color='danger' onClick={() => HandleClickButton(cidade.id_Cidade)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>




        </>
    )
}

export default Listar_cidade