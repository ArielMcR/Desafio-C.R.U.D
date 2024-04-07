import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
function ListarProduto() {
    const host = 'http://localhost:3001'

    const [produto, setProduto] = useState([])
    const [reload, setReload] = useState(false)
    const history = useNavigate();

    const fetchProduto = async () => {
        try {
            const res = await axios.get(`${host}/produto`)
            setProduto(res.data)
        } catch (err) {
            console.log('Erro ao buscar cidades:', err);
        }
    }

    useEffect(() => {
        fetchProduto()
    })

    const HandleClickButton = async (produto_id) => {
        try {
            toast.success('Excluído com sucesso')
            await axios.delete(`${host}/produto/` + produto_id);
            setReload(!reload)
            history('/listar/produto');
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
                Produto
                <hr />
            </h2>
            <Link to='/cadastro/Produtos'>
                <Button color='primary'>
                    Adicionar
                </Button>
            </Link>
            {produto.length > 0 ? (
                <div style={{ display: 'contents', justifyContent: 'center' }}>
                    <Table className='tabela-dados text-center' hover striped>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome do Produto</th>
                                <th>Valor de Venda</th>

                            </tr>
                        </thead>
                        <tbody>
                            {produto.map((produto) => (
                                <tr key={produto.id_Produto}>
                                    <td>{produto.id_Produto}</td>
                                    <td>{produto.nome_Produto}</td>
                                    <td>{produto.vr_Venda.toFixed(2)}</td>

                                    <td className='text-center'>
                                        <Link to={`/update/produto/${produto.id_Produto}`}>
                                            <Button color='warning' style={{ marginRight: '10px' }}>
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button color='danger' onClick={() => HandleClickButton(produto.id_Produto)}>
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

export default ListarProduto