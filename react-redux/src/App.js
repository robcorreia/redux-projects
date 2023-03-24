import { useDispatch, useSelector } from "react-redux";
import { incrementar, reduzir } from "./store/reducers/contador";
import { close, open } from "./store/reducers/modal";

function App() {
  const { contador, modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Total: {contador}</h1>
      <h2>modal state: {String(modal)}</h2>
      <button onClick={() => dispatch(incrementar())}>incrementar</button>
      <button onClick={() => dispatch(reduzir())}>decrementar</button>
      <button onClick={() => dispatch(open())}>abrir modal</button>
      <button onClick={() => dispatch(close())}>fechar modal</button>
    </div>
  );
}

export default App;
