import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ParseERAMessages } from "../../redux/actions/claimList";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return { ParseERAMessages: () => dispatch(ParseERAMessages()) };
}
class ERA extends Component {
  componentDidMount() {
    this.props.ParseERAMessages();
  }
  render() {
    return (
      <Fragment>
        <p>Welcome To ERA Message Parser</p>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ERA);
