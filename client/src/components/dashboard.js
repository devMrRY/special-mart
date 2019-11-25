import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { withRouter } from "react-router";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBBadge,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import { connect } from "react-redux";
import { dashboard, Delete_product, Edit_product } from "../actions/auth";

class Dashboard extends Component {
  state = { productlist: [], loading: false };

  componentWillMount = async () => {

    this.setState({ productlist: this.props.product_list });
  };

  showlist = () => {
    if (this.state.productlist !== "error occured") {
      let count = 0;
      return this.props.product_list.map(product => {
        count++;
        return (
          <React.Fragment>
            <MDBListGroupItem className="d-flex align-items-center">
              <MDBBadge color="primary" style={{ margin: "5px" }} pill>
                {count}
              </MDBBadge>
              <div className="proddetails">{product[Object.keys(product)]}</div>
              <div className="edbtn">
                <button
                  key={Object.keys(product)}
                  onClick={async e => {
                    await this.props.Edit_product(Object.keys(product));
                    this.props.history.push(`/addproduct`);
                  }}
                >
                  <i className="fas fa-pen"></i>
                </button>
                <button
                  className="fas fa-trash-alt"
                  value={Object.keys(product)}
                  onClick={e => {
                    this.props.Delete_product(e.target.value);
                  }}
                ></button>
              </div>
            </MDBListGroupItem>
          </React.Fragment>
        );
      });
    }
  };

  render() {
    this.props.dashboard();
    return (
      <React.Fragment>
        <MDBContainer>
          <MDBBtn
            color="warning"
            onClick={e => this.props.history.push("/addproduct")}
          >
            <MDBIcon icon="add" className="mr-1">
              <i className="fas fa-cart-plus fa-2x"></i>
            </MDBIcon>
          </MDBBtn>
          <MDBListGroup className="MDBListGroup">
            {this.showlist()}
          </MDBListGroup>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    product_list: state.get_product
  };
};

export default connect(mapStatetoProps, {
  dashboard,
  Delete_product,
  Edit_product
})(withRouter(Dashboard));
