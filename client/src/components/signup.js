import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput
} from "mdbreact";
import { connect } from "react-redux";
import { SignUp } from "../actions/auth";

class Signup extends Component {
  state = {
    modal: true,
    username: "",
    email: "",
    password: ""
  };

  toggle = () => () => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.setform();
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.props.SignUp(username, email, password);
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle()} centered>
          <form onSubmit={this.onFormSubmit}>
            <MDBModalHeader toggle={this.toggle()}>Signup</MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md="12">
                  <div className="grey-text">
                    <MDBInput
                      label="Your name"
                      icon="user"
                      group
                      type="text"
                      validate
                      required
                      error="wrong"
                      success="right"
                      onChange={e => {
                        this.setState({ username: e.target.value });
                      }}
                    />
                    <MDBInput
                      label="Your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      required
                      error="wrong"
                      success="right"
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                    <MDBInput
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      required
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <p style={{ color: "red" }}>{this.props.signup_res}</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle()}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" type="submit">
                Register
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>
      </MDBContainer>
    );
  }
}

const mapStatetoProps = state => {
  return {
    signup_res: state.signup
  };
};

export default connect(mapStatetoProps, { SignUp })(Signup);
