function reducer(state = 0, action) {
  console.log("reducer");
  switch (action.type) {
    case "INCREMENTAR":
      return state + 1;
    case "REDUZIR":
      return state - 1;
    default:
      return state;
  }
}

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("action", action);
  console.log("prev state", store.getState());

  const result = next(action);

  console.log("new state", store.getState());

  console.groupEnd();
  next(action);
  return result;
};

const reduzirMiddle = (store) => (next) => (action) => {
  if (action.type === "REDUZIR") window.alert("Reduziu");
  return next(action);
};

const { applyMiddleware, compose } = Redux;

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnchancers(applyMiddleware(logger, reduzirMiddle));

const store = Redux.createStore(reducer, enhancer);

console.log(store.getState());

store.dispatch({ type: "INCREMENTAR" });
// // const testee = store.dispatch({ type: "REDUZIR" });
// console.log(testee);
