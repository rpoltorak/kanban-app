import { RootState } from "../reducers/rootReducer";

export function loadState(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    // ignore
  }
}
