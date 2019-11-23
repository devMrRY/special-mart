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
import { SignIn } from "../actions/auth";

class Signin extends Component {
  state = {
    modal: true,
    email: "",
    password: ""
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const {email, password}=this.state;
    this.props.SignIn(email, password);
  };

  toggle = () => () => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.setform();
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle()} centered>
          <form onSubmit={this.onFormSubmit}>
            <MDBModalHeader toggle={this.toggle()}>SignIn</MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md="12">
                  <div className="grey-text">
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
              <p style={{ color: "red" }}>{this.props.res}</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle()}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" type="submit">
                Signin
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>
      </MDBContainer>
    );
  }
}
const mapstatetoprops = state => {
  return {
    res: state.signin
  };
};
export default connect(mapstatetoprops, { SignIn })(Signin);
