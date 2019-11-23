import Axios from "axios";
import Cookie from "js-cookie";

export const SignUp = (username, email, password) => async dispatch => {
  if (password.length > 7) {
    Axios.post("/signup", { username, email, password }).then(res => {
      dispatch({
        type: "Sign_up",
        payload: res.data
      });
    });
  } else {
    dispatch({
      type: "Sign_up",
      payload: "password length must be greater than or equal to 8"
    });
  }
};

export const SignIn = (email, password) => async dispatch => {
  Axios.post("/signin", { email, password }).then(res => {
    if (res.data !== "credentials doesn not match") {
      Cookie.set("token", res.data);
      dispatch({
        type: "Sign_in",
        payload: "successfully logged in"
      });
    } else {
      dispatch({
        type: "Sign_in",
        payload: res.data
      });
    }
  });
};

export const LogOut = () => async () => {
  Axios.get("/logout");
};

export const GetItems = () => async dispatch => {
  const res = await Axios.get("/stepperform");
  dispatch({
    type: "ItemList",
    payload: res.data
  });
};

export const SaveProduct = ({ product_name, Itemlist, product_id }) => async dispatch => {
  if (product_name && Itemlist.length>0) {
    const res = await Axios.post("/save", { product_name, Itemlist, product_id });
    dispatch({
      type: "Save_product",
      payload: res.data
    });
  } else {
    dispatch({
      type: "Save_product",
      payload: "Please fill all the fields"
    });
  }
};

export const dashboard = () => async dispatch => {
  const res = await Axios.get("/getproduct");
  dispatch({
    type: "Dashboard",
    payload: res.data
  });
};

export const Delete_product = product_id => async () => {
  await Axios.get(`/delete/${product_id}`);
};

export const Edit_product = product_id => async dispatch => {
  const res = await Axios.get(`/edit_items/${product_id}`);
  dispatch({
    type: "Edit_product",
    payload: {...res.data, product_id}
  });
};
