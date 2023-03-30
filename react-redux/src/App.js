import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/reducers/login";


function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { data } = useSelector(state => state.login.user)
  console.log(data)

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <label
          style={{ display: "block" }} htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />

        <label style={{ display: "block" }} htmlFor="password"
        >Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <div>
          <button>Enviar</button>
        </div>
      </form>
      <p>{data?.email}</p>
    </div>
  );
}

export default App;
