import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarChamados from "./components/chamado/ListarChamados";
import ListarResolvidos from "./components/chamado/ListarResolvidos";
import ListarNaoResolvidos from "./components/chamado/ListarNaoResolvidos";
import CadastrarChamado from "./components/chamado/CadastrarChamado";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Lista de Chamados</Link>
            </li>
            <li>
              <Link to="/resolvidos">
                Lista de Chamados Resolvidos
              </Link>
            </li>
            <li>
              <Link to="/naoresolvidos">
                Lista de Chamados Não Resolvidos
              </Link>
            </li>
            <li>
              <Link to="/cadastrar">Cadastrar Chamado</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarChamados />} />
          <Route path="/resolvidos" element={<ListarResolvidos />} />
          <Route
            path="/naoresolvidos"
            element={<ListarNaoResolvidos />}
          />
          <Route path="/cadastrar" element={<CadastrarChamado />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
