import { createStore } from "redux";
let likedImgs = new Set();
function manageLikes(state = likedImgs, action) {
  switch (action.type) {
    case "ADD_T0_LIKES": {
      state.add(action.payload);
      return state;
    }
    case "DELETE_FROM_LIKES": {
      state.delete(action.payload);
      return state;
    }
    default:
      return state;
  }
}
const store = createStore(manageLikes);
// store.subscribe(() => console.log(likedImgs));

export default store;
