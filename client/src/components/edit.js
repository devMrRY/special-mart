import React, { Component } from "react";
import Axios from "axios";
import "mdbreact/dist/css/mdb.css";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBBadge,
  MDBBtn
} from "mdbreact";

class Edit extends Component {
  state = {
    itemlist: [],
    product_name: "",
    product_id: window.location.pathname.split("/")[2]
  };
  
  showlist = () => {
    if (this.state.itemlist !== undefined) {
      let count = 0;
      return this.state.itemlist.map(item => {
        count++;
        return (
          <React.Fragment>
            <MDBListGroupItem className="d-flex align-items-center">
              <MDBBadge color="primary" style={{ margin: "5px" }} pill>
                {count}
              </MDBBadge>
              <div className="proddetails">{Object.keys(item)}</div>
              <div>
                <input
                  type="Number"
                  min={1}
                  value={item[Object.keys(item)]}
                  onChange={e => this.quantity(e.target.value, item)}
                  style={{ width: "70px" }}
                  placeholder={item[Object.keys(item)]}
                />
              </div>
              <div className="edbtn">
                <button
                  className="fas fa-trash-alt"
                  onClick={e => {
                    this.delete(e.target.value);
                  }}
                  value={Object.keys(item)}
                ></button>
              </div>
            </MDBListGroupItem>
          </React.Fragment>
        );
      });
    } else {
      this.props.history.push("/");
    }
  };

  onupdate = async () => {
    const id = window.location.pathname.split("/")[2];
    const list = this.state.itemlist;
    await Axios.post(`/update`, {
      headers: { "Content-Type": "application/json" },
      params: { id, list }
    });
    this.props.history.push("/dashboard");
  };

  quantity = (qty, val) => {
    const arr = this.state.itemlist.filter(item => {
      return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    });
    const index = this.state.itemlist.indexOf(val);
    arr.splice(index, 0, { [Object.keys(val)]: qty });
    this.setState({ itemlist: [...arr] });
  };

  delete = async val => {
    const arr = this.state.itemlist.filter(item => {
      return Object.keys(item) !== val ? true : false;
    });
    await this.setState({ itemlist: [...arr] });
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer className="dashboardlist">
          <MDBListGroup className="MDBListGroup">
            <MDBListGroupItem
              className="d-flex align-items-center"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "bold"
              }}
            >
              {this.state.product_name}
            </MDBListGroupItem>
            {this.showlist()}

            <MDBBtn gradient="peach" onClick={this.onupdate}>
              Update
            </MDBBtn>
          </MDBListGroup>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default Edit;
