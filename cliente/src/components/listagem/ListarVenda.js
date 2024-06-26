import Header from "../Header"
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";



function ListarVenda() {
    const host = 'http://localhost:3001'

    const history = useNavigate()
    const [reload, setReload] = useState(true)
    const [venda, setVenda] = useState([])
    const fetchVenda = async () => {
        try {
            const res = await axios.get(`${host}/venda`)
            setVenda(res.data)
        } catch (error) {
            toast.error('Algum erro aconteceu!!!')

        }
    }

    useEffect(() => {
        fetchVenda()
    }, [])


    const HandleClickButton = async (id) => {
        try {
            await axios.delete(`${host}/vendaItens/` + id)
            setReload(!reload)
            toast.success('Excluído com sucesso')
            history('/listar/Vendas');
        } catch (error) {
            toast.error('Ocorreu algum com sucesso')
        }
    }
    useEffect(() => {
        const notification = localStorage.getItem('notification');
        if (notification) {
            toast.success(notification);
            localStorage.removeItem('notification');
        }
    }, []);

    return (
        <>
            <Header />
            <ToastContainer autoClose={2000} />
            <h2 className='Title'>
                Vendas
                <hr />
            </h2>
            <Link to='/cadastro/Vendas'>
                <Button color='primary' className="ms-4">
                    Adicionar
                </Button>
            </Link>

            {venda.length > 0 ? (
                <div style={{ display: 'contents', justifyContent: 'center' }}>
                    <Table className='tabela-dados text-center' hover striped>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Pessoas</th>
                                <th>Valor Total </th>
                                <th>Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                            {venda.map((venda) => (
                                <tr key={venda.id}>
                                    <td>{venda.id}</td>
                                    <td>{venda.nome_Pessoa}</td>
                                    <td>{venda.vr_Total.toFixed(2)}</td>

                                    <td className='text-center m-2'>
                                        <Link to={`/update/vendas/${venda.id}`}>
                                            <Button color='warning' style={{ marginRight: '10px' }}>
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button color='danger' onClick={() => HandleClickButton(venda.id)}>
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
export default ListarVenda