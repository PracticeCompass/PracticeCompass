import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "./layout/main";
import "./custom.css";
import { GetLookups } from "../src/redux/actions/lookups";
import { setUserId } from "../src/redux/actions/account";
import "@progress/kendo-theme-bootstrap/dist/all.css";
const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLookups: () => dispatch(GetLookups()),
    setUserId: (userId) => dispatch(setUserId(userId)),
  };
};

class App extends Component {
  componentDidMount() {
    this.props.setUserId(5);
    this.props.GetLookups();
  }

  render() {
    return (
      <React.Fragment>
        <Main />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
