import { createStore } from "redux";

let actionLog = {
  liked: [],
  disliked: [],
  favorite: [],
};

function manageLikes(state = actionLog, action) {
  switch (action.type) {
    case "ADD_TO_LIKES": {
      let liked = [...state["liked"], action.payload];

      return { ...state, liked };
    }
    case "ADD_TO_DISLIKES": {
      console.log(action, state);
      let disliked = [...state["disliked"], action.payload];
      return { ...state, disliked };
    }
    case "ADD_TO_FAVORITE": {
      let favorite = [...state["favorite"], action.payload];
      return { ...state, favorite };
    }
    case "REMOVE_FROM_FAVORITE": {
      let favoriteRemoved = state["favorite"].filter((el) => {
        return el.id !== action.payload;
      });
      return { ...state, favorite: favoriteRemoved };
    }
    default:
      return state;
  }
}

function saveStateToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.error("Error saving state to localStorage:", e);
  }
}
function loadStateFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading state from localStorage:", e);
    return undefined;
  }
}
const persistedState = loadStateFromLocalStorage();
const store = createStore(manageLikes, persistedState);

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
