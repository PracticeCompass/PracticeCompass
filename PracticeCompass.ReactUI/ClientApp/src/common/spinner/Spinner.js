import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "./spinner.css";
function mapStateToProps(state) {
  return {
    isLoading: state.ui.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
class Spinner extends Component {
  render() {
    return (
      this.props.isLoading && (
        <Fragment>
          <div className="k-overlay"></div>
          <div
            className="spinner"
            style={{
              left: "50%",
              top: "50%",
              position: "absolute",
              zIndex: "101",
              width: "200px",
              height: "32px",
            }}
          >
            <Loader type="Bars" color="#00BFFF" height="100" width="100" />
          </div>
        </Fragment>
      )
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
