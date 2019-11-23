import React, { Component } from "react";
import { MDBBtn, MDBInput } from "mdbreact";
import { connect } from "react-redux";

class Item extends Component {
  state = {
    customlist: [],
    searchlist: [],
    toggle: "none",
    add: [],
    clickedbtns: this.props.clickedbtns
  };

  //  it will send a get request to server and fetch the list of items stored in mongoDB

  async componentDidMount() {
    let arr = await this.props.itemlist.map(item => {
      return (
        <React.Fragment>
          <button
            key={item._id}
            onClick={e => this.props.selectedItems({ [item.name]: 1 })}
            value={Object.keys(item)}
          >
            {item.name}
          </button>
          <input
            placeholder="1"
            type="Number"
            onChange={e => {
              this.props.ItemsQuantity({
                [item.name]: e.target.value
              });
            }}
            min={1}
          />
        </React.Fragment>
      );
    });
    let arr1 = await this.props.itemlist.map(item => {
      return { [item.name]: 1 };
    });
    this.setState({ searchlist: [...arr], customlist: [...arr1] });
  }

  /* search function will search the items according to value typed in search bar
    and also update the state with desired button and input field for quantity
*/

  search = async val => {
    await this.setState({ searchlist: [] });
    val = val.replace(/[\])}[*+{(\\]/g, "").toUpperCase();
    let arr = this.state.customlist.filter(item => {
      return String(Object.keys(item)).search(val) >= 0
        ? String(Object.keys(item))
        : false;
    });

    arr.map(item => {
      this.setState({
        searchlist: [
          <React.Fragment>
            <button
              key={Object.keys(item)}
              onClick={e => this.props.selectedItems(item)}
              value={Object.keys(item)}
            >
              {Object.keys(item)}
            </button>
            <input
              placeholder="1"
              onChange={e => {
                this.props.ItemsQuantity({
                  [Object.keys(item)]: e.target.value
                });
              }}
              type="Number"
              min={1}
            />
            <br />
          </React.Fragment>,
          ...this.state.searchlist
        ]
      });
    });
  };

  clickedbtns = () => {
    return this.state.clickedbtns.map(btn => {
      return (
        <React.Fragment>
          <li style={{ fontSize: "10px", fontWeight: "bold" }}>
            {Object.keys(btn)}&nbsp;&nbsp;{btn[Object.keys(btn)]}
          </li>
        </React.Fragment>
      );
    });
  };

  // function to control the dropdown behavior of button

  dropdownToggle = () => {
    this.setState({ toggle: this.state.toggle === "" ? "none" : "" });
  };

  render() {
    return (
      <React.Fragment>
        <div className="btnlist">
          <ul>{this.clickedbtns()}</ul>
        </div>
        <div className="accordion">
          <MDBBtn
            className="acc-btn"
            gradient="blue"
            onClick={this.dropdownToggle}
          >
            dropdown
          </MDBBtn>
          <div style={{ display: this.state.toggle }}>
            <MDBInput
              label="search"
              onChange={e => this.search(e.target.value)}
            />
            <div
              className="content"
              style={{ height: "150px", overflow: "auto" }}
            >
              {this.state.searchlist}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemlist: state.GetItems
  };
};

export default connect(mapStateToProps)(Item);
