import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, login } from "./store/reducers/login";
import { somar } from "./store/reducers/contador";


function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  const { data } = useSelector(state => state.login.user)
  console.log(data)
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch])

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
      <button onClick={() => dispatch(somar(5))}>Somar</button>
    </div>
  );
}

export default App;
