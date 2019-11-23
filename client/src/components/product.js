import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import { connect } from "react-redux";

class Product extends Component {
  state = { productname: this.props.selectedProductName };
  render() {
    return (
      <React.Fragment>
        <MDBInput
          label="Enter Product Name"
          onChange={e => {
            this.setState({ productname: e.target.value });
            this.props.productname(e.target.value);
          }}
          style={{ width: "100%" }}
          value={this.state.productname}
        />
      </React.Fragment>
    );
  }
}

export default connect(null)(Product);
