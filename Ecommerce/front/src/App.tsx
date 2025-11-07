import React from "react";
import ListarProdutos from "./components/pages/produto/ListarProdutos";
import CadastrarProduto from "./components/pages/produto/CadastrarProduto";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

//Instalar biblioteca na aplicação
//npm i nome_biblioteca @types/nome_biblioteca

//Componentes
// - HTML, CSS e JS ou TS
function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Listar Produtos</Link>
            </li>
            <li>
              <Link to="/produto/cadastrar"> Cadastrar Produtos </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarProdutos/>} />
          <Route path="/produto/cadastrar" element={<CadastrarProduto/>} />
        </Routes>
        <footer>
          Rodapé da aplicação
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
