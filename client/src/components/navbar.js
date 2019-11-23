import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Signin from "./signin";
import Signup from "./signup";
import { connect } from "react-redux";
import { LogOut } from "../actions/auth";
import Cookie from "js-cookie";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  state = { form: null, buttons: null };

  setform = () => {
    this.setState({ form: null });
  };

  showbutton = () => {
    if (Cookie.get("token") === undefined) {
      this.setState({
        buttons: (
          <React.Fragment>
            <Button
              onClick={e => {
                this.setState({ form: <Signup setform={this.setform} /> });
              }}
              color="inherit"
            >
              SignUp
            </Button>
            <Button
              onClick={e =>
                this.setState({ form: <Signin setform={this.setform} /> })
              }
              color="inherit"
            >
              Login
            </Button>
          </React.Fragment>
        )
      });
    } else {
      this.setState({
        buttons: (
          <React.Fragment>
            <a href="/dashboard">
              <Button style={{ color: "white" }}>dashboard</Button>
            </a>
            <Button
              onClick={e => {
                this.props.LogOut();
                Cookie.remove("token");
                this.props.history.push("/");
              }}
              color="inherit"
            >
              LogOut
            </Button>
          </React.Fragment>
        )
      });
    }
  };

  componentDidMount() {
    this.showbutton();
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <div className="navbarcontainer">
            <div className="navbar">
              <a href="/">Mern-Mart</a>
            </div>
            <div className="loginbtn">{this.state.buttons}</div>
          </div>
        </AppBar>
        {this.state.form}
      </div>
    );
  }
}

export default connect(null, { LogOut })(withRouter(NavBar));
