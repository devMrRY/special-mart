import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class Save extends Component {
  showitems = () => {
    let count = 0;
    return this.props.Itemlist.map(item => {
      count++;
      return (
        <React.Fragment>
          <tr>
            <th scope="row">{count}</th>
            <td>{Object.keys(item)}</td>
            <td>{item[Object.keys(item)]}</td>
          </tr>
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <p style={{ background: "", color: "red" }}>
          {this.props.save_product}
        </p>
        <p>product name: {this.props.product_name}</p>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Items</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>{this.showitems()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    save_product: state.save_product,
    product_id: state.Edit_product.product_id
  };
};

export default connect(mapStatetoProps)(withRouter(Save));
