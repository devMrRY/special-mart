import { combineReducers } from "redux";

const signup = (state = null, action) => {
  if (action.type === "Sign_up") {
    return action.payload;
  }
  return state;
};

const signin = (state = null, action) => {
  if (action.type === "Sign_in") {
    return action.payload;
  }
  return state;
};

const GetItems=(state=[], action )=>{
  if(action.type==='ItemList'){
    return action.payload
  }
  return state
}

const save_product = (state = "", action) => {
  if (action.type === "Save_product") {
    return action.payload;
  }
  return state;
};

const get_product=(state=[], action)=>{
  if(action.type==='Dashboard'){
    return action.payload
  }
  return state;
}

const Edit_product=(state=[], action)=>{
  if(action.type==='Edit_product'){
    return action.payload
  }
  return state;
}

export default combineReducers({ signup, signin, save_product, get_product, Edit_product, GetItems });
