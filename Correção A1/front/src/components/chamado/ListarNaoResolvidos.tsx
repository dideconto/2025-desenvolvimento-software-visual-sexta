import { useEffect, useState } from "react";
import Chamado from "../../models/Chamado";
import axios from "axios";

function ListarNaoResolvidos() {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => {
    listarChamadosAPI();
  }, []);

  async function listarChamadosAPI() {
    try {
      const resposta = await axios.get<Chamado[]>(
        "http://localhost:5000/api/chamado/naoresolvidos"
      );
      const dados = resposta.data;
      setChamados(dados);
    } catch (error) {
      console.log("Erro na requisição: " + error);
    }
  }

  return (
    <div id="componente_listar_produtos">
      <h1>Listar Chamados Não Resolvidos</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado em</th>
            {/* <th>Editar</th> */}
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.chamadoId}>
              <td>{chamado.chamadoId}</td>
              <td>{chamado.descricao}</td>
              <td>{chamado.status}</td>
              <td>{chamado.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarNaoResolvidos;
