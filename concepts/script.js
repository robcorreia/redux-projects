const initialState = {
  loading: false,
  data: null,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// thunk
const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  } else {
    return next(action);
  }
};

const { applyMiddleware, compose } = Redux;

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnchancers(applyMiddleware(thunk));

const store = Redux.createStore(reducer, enhancer);

// Action Creator, retorna uma função ao invés de um objeto
function fetchUrl(url) {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_STARTED" });
      const data = await fetch(url).then((r) => r.json());
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
}

store.dispatch(fetchUrl("https://dogsapi.origamid.dev/json/api/photo"));
