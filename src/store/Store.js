import { createStore } from "redux";

let actionLog = JSON.parse(localStorage.getItem("actionLog"));
// : {
//     liked: [],
//     disliked: [],
//     favorite: [],
//   };

function manageLikes(state = actionLog, action) {
  switch (action.type) {
    case "ADD_TO_LIKES": {
      state["liked"].push(action.payload);

      return state;
    }
    case "ADD_TO_DISLIKES": {
      state["disliked"].push(action.payload);
      return state;
    }
    case "ADD_TO_FAVORITE": {
      state["favorite"].push(action.payload);
      return state;
    }
    case "REMOVE_FROM_FAVORITE": {
      const index = state["favorite"].findIndex((el) => {
        return el.id === action.payload;
      });
      state["favorite"].splice(index, 1);
      return state;
    }
    default:
      return state;
  }
}
const store = createStore(manageLikes);
store.subscribe(() => {
  localStorage.setItem("actionLog", JSON.stringify(actionLog));
  console.log(actionLog);
});

export default store;
