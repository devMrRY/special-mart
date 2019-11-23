import React, { Component } from 'react';
import logo from '../img/cart.png';
class Frontpage extends Component {
    state = { bg:true }
    showbg=()=>{
        if(this.state.bg){
          return (
            <React.Fragment>
            <p className="mernheading">
                MERN MART
            </p>
            <div className="logo">
            <img src={logo} alt="logo"/>
            </div>
        </React.Fragment>
          )
        }
      }
    render() { 
    return (<React.Fragment> {this.showbg()} </React.Fragment>);
    }
}
 
export default Frontpage;