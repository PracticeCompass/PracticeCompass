import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import LookUpsList from "./LookUpsList";
import LookUpsDetails from "./LookUpsDetails"
import $ from "jquery";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class LookUps extends Component {
  state = {
    LookupsDetails: null,
    LookupsDetailExpanded: false,
    LookupsListExpanded: true,
  };
  setLookupsExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#lookupList").children("span").trigger("click");
  };
  setLookupsDetailExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#lookupDetail").children("span").trigger("click");
  };
  handleSelect = () => { };
  setLookupsDetails = (lookup) => {
    this.setState({
      LookupDetails: lookup,
      LookupsDetailExpanded: true,
      LookupsListExpanded: false,
    });
  };
  render() {
    return (
      <Fragment>
        <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
          <PanelBarItem
            expanded={this.state.LookupsListExpanded}
            id="lookupList"
            title="LOOKUP LIST"
          >
            <LookUpsList
              setLookupsDetailExpanded={this.setLookupsDetailExpanded}
              setLookupsExpanded={this.setLookupsExpanded}
            ></LookUpsList>
          </PanelBarItem>
          <PanelBarItem
            id="lookupDetail"
            expanded={this.state.LookupsDetailExpanded}
            title="LOOKUP DETAILS"
          >
            <LookUpsDetails
              setLookupsExpanded={this.setLookupsExpanded}
              LookupsDetails={this.state.LookupsDetails}
            ></LookUpsDetails>
          </PanelBarItem>
        </PanelBar>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LookUps);
