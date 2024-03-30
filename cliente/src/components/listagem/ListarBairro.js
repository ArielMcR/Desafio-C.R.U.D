import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function ListarBairro() {
    const history = useNavigate()
    const [bairro, setBairro] = useState([])
    const [reload, setReload] = useState(false)
    const fetch = async () => {
        try {
            const res = await axios.get('http://localhost:3001/bairro')
            setBairro(res.data)
        } catch (err) {
        }
    }
    useEffect(() => {
        fetch()
    })


    const HandleClickButton = async (bairro_id) => {
        try {
            toast.warning('Bairro excluído com sucesso')
            await axios.delete('http://localhost:3001/bairro/' + bairro_id);
            setReload(!reload)
            history.back();
        } catch (error) {
            console.log('Erro ao excluir Bairro:', error);
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
                Bairro
                <hr />
            </h2>
            <Link to='/cadastro/Bairros'>
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bairro.map((bairro) => (
                            <tr key={bairro.id_bairro}>
                                <td>{bairro.id_bairro + 1}</td>
                                <td>{bairro.nome_Bairro}</td>
                                <td className='text-center'>
                                    <Link to={`/update/bairro/${bairro.id_bairro}`}>
                                        <Button color='warning' style={{ marginRight: '10px' }}>
                                            Editar
                                        </Button>
                                    </Link>
                                    <Button color='danger' onClick={() => HandleClickButton(bairro.id_bairro)}>
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

export default ListarBairro