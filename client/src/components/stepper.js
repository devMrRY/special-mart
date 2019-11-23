import React, { Component } from "react";
import Product from "./product";
import Item from "./items";
import Preview from "./preview";
import Save from "./save";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import { GetItems, SaveProduct } from "../actions/auth";

class StepperForm extends Component {
  state = {
    step: 1,
    formcontent: "",
    selectedProductName: this.props.product_name,
    selectedItems: this.props.itemlist || []
  };

  // function which will update state with the name user typed in page 1 of stepper

  selectProductName = async val => {
    await this.setState({ selectedProductName: val });
  };

  // function to select the selected item from stepper page 2 and save it in selectedItems of state

  selectItems = async val => {
    const items = this.state.selectedItems;
    const arr = items.filter(item => {
      return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    });
    if (arr.length === this.state.selectedItems.length) {
      this.setState({ selectedItems: [val, ...arr] });
    } else {
      this.setState({ selectedItems: [...arr] });
    }
  };

  //function to change the items quantity from stepper page 2 and save it in selectedItems of state

  ItemsQuantity = async val => {
    const items = this.state.selectedItems;
    const arr = items.filter(item => {
      return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    });
    this.setState({ selectedItems: [val, ...arr] });
  };

  Increment = async () => {
    await this.setState({ step: this.state.step + 1 });
    this.onstatechange();
  };

  Decrement = async () => {
    await this.setState({ step: this.state.step - 1 });
    this.onstatechange();
  };

  async componentDidMount() {
    this.onstatechange();
  }

  onstatechange = async () => {
    switch (this.state.step) {
      case 1:
        this.setState({
          formcontent: (
            <Product
              productname={this.selectProductName}
              selectedProductName={this.state.selectedProductName}
            />
          )
        });
        break;
      case 2:
        await this.props.GetItems();
        this.setState({
          formcontent: (
            <Item
              selectedItems={this.selectItems}
              ItemsQuantity={this.ItemsQuantity}
              clickedbtns={this.state.selectedItems}
            />
          )
        });
        break;
      case 3:
        this.setState({
          formcontent: (
            <Preview
              product_name={this.state.selectedProductName}
              selectedItems={this.state.selectedItems}
            />
          )
        });
        break;
      case 4:
        this.setState({
          formcontent: (
            <Save
              product_name={this.state.selectedProductName}
              Itemlist={this.state.selectedItems}
            />
          )
        });
        break;
      default:
        break;
    }
  };
  showbuttons = () => {
    if (this.state.step === 1) {
      return (
        <React.Fragment>
          <MDBBtn gradient="aqua" rounded onClick={this.Increment}>
            next
          </MDBBtn>
        </React.Fragment>
      );
    } else if (this.state.step === 4) {
      return (
        <React.Fragment>
          <MDBBtn gradient="blue" rounded onClick={this.Decrement}>
            prev
          </MDBBtn>
          <MDBBtn
            gradient="peach"
            onClick={e => {
              this.props.SaveProduct({
                product_name: this.state.selectedProductName,
                Itemlist: this.state.selectedItems,
                product_id: this.props.product_id
              });
              if(this.state.selectedProductName && this.state.selectedItems.length>0){
                this.props.history.push("/dashboard");
              }
            }}
          >
            Save
          </MDBBtn>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <MDBBtn gradient="blue" rounded onClick={this.Decrement}>
            prev
          </MDBBtn>
          <MDBBtn gradient="aqua" rounded onClick={this.Increment}>
            next
          </MDBBtn>
        </React.Fragment>
      );
    }
  };

  stepperprogress = () => {
    if (this.state.step === 1) {
      return (
        <div className="stepperstep">
          <span style={{ background: "orange" }}>
            1<p>Select Product Name</p>
          </span>
          <span style={{ background: "grey" }}>
            2<p>Select Items</p>
          </span>
          <span style={{ background: "grey" }}>
            3<p>Preview</p>
          </span>
          <span style={{ background: "grey" }}>
            4<p>Save</p>
          </span>
        </div>
      );
    } else if (this.state.step === 2) {
      return (
        <div className="stepperstep">
          <span style={{ background: "orange" }}>
            1<p>Select Product Name</p>
          </span>
          <span style={{ background: "orange" }}>
            2<p>Select Items</p>
          </span>
          <span style={{ background: "grey" }}>
            3<p>Preview</p>
          </span>
          <span style={{ background: "grey" }}>
            4<p>Save</p>
          </span>
        </div>
      );
    } else if (this.state.step === 3) {
      return (
        <div className="stepperstep">
          <span style={{ background: "orange" }}>
            1<p>Select Product Name</p>
          </span>
          <span style={{ background: "orange" }}>
            2<p>Select Items</p>
          </span>
          <span style={{ background: "orange" }}>
            3<p>Preview</p>
          </span>
          <span style={{ background: "grey" }}>
            4<p>Save</p>
          </span>
        </div>
      );
    } else if (this.state.step === 4) {
      return (
        <div className="stepperstep">
          <span style={{ background: "orange" }}>
            1<p>Select Product Name</p>
          </span>
          <span style={{ background: "orange" }}>
            2<p>Select Items</p>
          </span>
          <span style={{ background: "orange" }}>
            3<p>Preview</p>
          </span>
          <span style={{ background: "orange" }}>
            4<p>Save</p>
          </span>
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.stepperprogress()}
        <div className="stepperform">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="3"></MDBCol>
              <MDBCol md="6">
                {this.state.formcontent}
                <br />
                {this.state.btn}
                {this.showbuttons()}
              </MDBCol>
              <MDBCol md="3"></MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    product_name: state.Edit_product.product_name,
    itemlist: state.Edit_product.itemlist,
    product_id: state.Edit_product.product_id
  };
};

export default connect(mapStateToProps, { GetItems, SaveProduct })(StepperForm);
