const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("ACTION", action);
  console.log("PREV STATE", store.getState());
  const result = next(action);
  console.log("NEW_STATE", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
