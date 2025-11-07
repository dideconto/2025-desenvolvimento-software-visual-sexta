import { useState } from "react";
import Produto from "../../../models/Produto";
import axios from "axios";

function CadastrarProduto() {
  //Estados
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);

  function enviarProduto(event: any) {
    event.preventDefault();
    submeterProdutoAPI();
  }

  async function submeterProdutoAPI() {
    //Biblioteca AXIOS
    try {
      const produto: Produto = {
        nome, descricao, preco, quantidade,
      };
      const resposta = await axios.post("http://localhost:5011/api/produto/cadastrar", produto);            
      console.log(await resposta.data);
    } catch (error : any) {
      if(error.status === 409){
        console.log("Esse produto já foi cadastrado!");
      }
    }
  }

  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={enviarProduto}>
        <div>
          <label>Nome:</label>
          <input onChange={(e : any) => setNome(e.target.value)} type="text" />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="text"
            onChange={(e: any) => setQuantidade(e.target.value)}
          />
        </div>
        <div>
          <label>Preço:</label>
          <input type="text" onChange={(e: any) => setPreco(e.target.value)} />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarProduto;
