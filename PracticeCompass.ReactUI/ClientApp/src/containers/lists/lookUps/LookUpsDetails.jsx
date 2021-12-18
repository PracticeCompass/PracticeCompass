import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import TextBox from "../../../components/TextBox";
import DropDown from "../../../components/DropDown";
import CheckboxComponent from "../../../components/Checkbox";
import ButtonComponent from "../../../components/Button";
import { TextArea } from "@progress/kendo-react-inputs";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class LookUpsDetails extends Component {
  state = {
    lookupDetais: {}
  }
  componentDidMount() {
    this.setState({ lookupDetais: this.props.LookupsDetails })
    if (this.props.LookupsDetails != null) {
      let row = this.props.LookupsDetails;
      this.setState({
        selectedLookUpType: {
          entityId: row.lookupType,
          entityName: row.lookupType,
        },
        active: row.recordStatus == "true",
        lookupCode: row.lookupCode,
        description: row.description
      })

    }
  }
  render() {
    return (
      <Fragment>
        <div
          style={{
            marginLeft: "20px",
            backgroundColor: "white",
            padding: "5px",
            height:"160px"
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ width: "315px" }}>
                <div style={{ float: "left", marginLeft: "31px" }}>
                  <label className="userInfoLabel">Lookup Type</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownlookupTypes}
                    textField="entityName"
                    dataItemKey="entityId"
                    disabled={true}
                    defaultValue={this.state.selectedLookUpType}
                    value={this.state.selectedLookUpType}
                    onChange={(e) =>
                      this.setState({
                        selectedLookUpType: {
                          entityId: e.value?.entityId,
                          entityName: e.value?.entityName,
                        },
                      })
                    }
                  ></DropDown>
                </div>
              </div>
              <div style={{ width: "280px" }}>
                <div style={{ float: "left" }}>
                  <label className="userInfoLabel">Lookup Code</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
                  <TextBox
                    className="unifyHeight"
                    value={this.state.lookupCode}
                    onChange={(e) =>
                      this.setState({
                        lookupCode: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
              <div style={{ float: "left" }}>
                <CheckboxComponent
                  style={{ marginRight: "5px" }}
                  id="active"
                  label="Active"
                  value={this.state.active}
                  onChange={(e) => this.setState({ active: e.value })}
                />
              </div>
            </div>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap",marginTop:"10px" }}
            >
              <div style={{ width: "515px" }}>
                <div style={{ float: "left", marginLeft: "38px" }}>
                  <label className="userInfoLabel">Description</label>
                </div>
                <div style={{ width: "400px", float: "left" }}>


                  <TextArea
                    rows={5}
                    style={{ width: "100%", height: "3cm" }}
                    value={this.state.description ?? ""}
                    onChange={(e) =>
                      this.setState({
                        description: e.value,
                      })
                    }
                  ></TextArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LookUpsDetails);
