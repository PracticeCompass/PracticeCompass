import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return { 
   };
}
class ERA extends Component {
  render() {
    return (
      <Fragment>
         <div>ERA</div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ERA);
