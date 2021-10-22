import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ERA from "./ERA";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class AutomationTasks extends Component {
  render() {
    return (
      <Fragment>
        <ERA></ERA>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AutomationTasks);
