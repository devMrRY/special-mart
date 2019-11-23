import React from "react";
import Axios from "axios";
import Cookie from "js-cookie";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./home";
import Navbar from "./navbar";
import ProtectedRoute from "./protectedroute";
import Dashboard from "./dashboard";
import StepperForm from "./stepper";
import Edit from './edit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const mytoken = Cookie.get("token");
Axios.defaults.headers.common["Authorization"] = `${mytoken}`;

const App = () => {
  return (
    <div className="bg">
      <div className="innerdiv">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <ProtectedRoute path="/dashboard" exact component={Dashboard} />
            <ProtectedRoute path="/addproduct" exact component={StepperForm} />
            <ProtectedRoute path="/edit/:product_id" exact component={Edit} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
