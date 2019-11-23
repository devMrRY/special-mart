import React, { Component } from 'react';
import Frontpage from './frontpage'
import "../css/index.css";

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Frontpage/>
            </React.Fragment>
         );
    }
}
 
export default Home;