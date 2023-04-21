import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adicionarDatas } from "./src/store/reducers/date";

const Form = () => {
  const [nome, setNome] = useState("");
  const [partida, setPartida] = useState("");
  const [retorno, setRetorno] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(adicionarDatas({ nome, partida, retorno }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={({ target }) => setNome(target.value)}
        />
      </p>
      <p>
        <label htmlFor="partida">Partida</label>
        <input
          id="partida"
          type="date"
          value={partida}
          onChange={({ target }) => setPartida(target.value)}
        />
      </p>
      <p>
        <label htmlFor="partida">Retorno</label>
        <input
          id="retorno"
          type="date"
          value={retorno}
          onChange={({ target }) => setRetorno(target.value)}
        />
      </p>
      <button>Buscar</button>
    </form>
  );
};

export default Form;
