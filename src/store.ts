import { createStore } from "redux";

import { saveState, loadState } from "./services/localStorage";
import rootReducer from "./reducers/rootReducer";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => saveState(store.getState()));

export default store;
