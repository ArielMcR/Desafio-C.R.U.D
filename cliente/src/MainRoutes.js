import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Pessoas from './components/cadastros/Pessoas';
import Cidades from './components/cadastros/Cidades';
import Bairros from './components/cadastros/Bairros';
import Produtos from './components/cadastros/Produtos';
import ListarCidade from "./components/listagem/ListarCidade";
import UpdateCidade from "./components/update/UpdateCidade";
import ListarBairro from "./components/listagem/ListarBairro";
import UpdateBairro from "./components/update/UpdateBairro";
import ListarPessoas from "./components/listagem/ListarPessoas";
import UpdatePessoa from "./components/update/UpdatePessoa";
import ListarProduto from "./components/listagem/ListarProduto";
import UpdateProdutos from "./components/update/UpdateProdutos";
import ListarVenda from "./components/listagem/ListarVenda";
import Vendas from "./components/cadastros/Vendas";
function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            {/* Listagem dos dados */}
            <Route path="/listar/Cidade" element={<ListarCidade />} />
            <Route path="/listar/Bairro" element={<ListarBairro />} />
            <Route path="/listar/Pessoas" element={<ListarPessoas />} />
            <Route path="/listar/Produto" element={<ListarProduto />} />
            <Route path="/listar/Vendas" element={<ListarVenda />} />


            {/* Cadastro dos dados */}
            <Route path="/cadastro/Cidade" element={<Cidades />} />
            <Route path="/cadastro/Bairros" element={<Bairros />} />
            <Route path="/cadastro/Pessoas" element={<Pessoas />} />
            <Route path="/cadastro/Produtos" element={<Produtos />} />
            <Route path="/cadastro/Vendas" element={<Vendas />} />

            {/* Update dos dados */}
            <Route path="/update/cidade/:id" element={<UpdateCidade />} />
            <Route path="/update/bairro/:id" element={<UpdateBairro />} />
            <Route path="/update/pessoa/:id" element={<UpdatePessoa />} />
            <Route path="/update/produto/:id" element={<UpdateProdutos />} />
            <Route path="/update/Vendas/:id" element={<UpdateProdutos />} />


        </Routes>
    )
}
export default MainRoutes;