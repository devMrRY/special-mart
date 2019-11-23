import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";

class Preview extends Component {
  showitems = () => {
    let count = 0;
    return this.props.selectedItems.map(item => {
      count++;
      return (
        <React.Fragment>
          <tr style={{padding:"0px", fontSize:"15px", fontWeight:"bold"}}>
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
        <div>
          <p>product : {this.props.product_name}</p>
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
        </div>
      </React.Fragment>
    );
  }
}

export default Preview;
