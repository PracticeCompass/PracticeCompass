import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import TextBox from "../../../components/TextBox";
import GridComponent from "../../../components/Grid";
import NotificationComponent from "../../common/notification";
import DropDown from "../../../components/DropDown";
import { getter } from "@progress/kendo-react-common";
import { LookupTypeClass } from "./LookUpsData";
import { TextArea } from "@progress/kendo-react-inputs";
import { AddLookupType } from "../../../redux/actions/lookupCode"

const DATA_ITEM_KEY_DETAILS_PAYMENT = "gridID";
const idGetterDetailsPaymentID = getter(DATA_ITEM_KEY_DETAILS_PAYMENT);

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    AddLookupType: (data) =>
    dispatch(AddLookupType(data))
  };
}

class LookupTypeDialogComponent extends Component {
  state = {
    refresh: true,
    lookupType: null,
    timer:2000
  };
  setShowValue = (e, index) => {
    this.setState({ refresh: false });
    this.props.columns[index].hide = !e.value;
    this.setState({ refresh: true });
  };
  componentDidMount = () => {
    this.setState({
      class: { id: "S", text: "S" }
    })
  }


  AddLookupType=async()=>{
    if(this.state.lookupType ==null || this.state.description==null || this.state.class==null){
      this.setState({ warning: true, message: "Please fill lookup Type,description and Class" });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
      return;
    }
    let data={
      lookupType:this.state.lookupType??"",
      description:this.state.description??"",
      descriptionLabel:this.state.descriptionLabel??"",
      Class:this.state.class?this.state.class.id:"",
      Length:this.state.Length?this.state.length:0,
      lookupFilter:this.props.lookupFilter
    }
    let result = await this.props.AddLookupType(data);
    if (result) {
      this.setState({ success: true, message: "Lookup Type ("+ this.state.lookupType +") save succefully" });
      setTimeout(() => {
        this.setState({
          success: false,
        });
        this.props.toggleLookupTypeDialog();
      }, this.state.timer);
      return;
    } else {
      this.setState({ error: true, message: "Lookup Type ("+ this.state.lookupType +") save failed" });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
      return;
    }
  }
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title || "Add Lookup Type"}
          onClose={this.props.toggleLookupTypeDialog}
        // width={400}
        >
         <NotificationComponent
            message={this.state.message}
            onClose={this.closeNotification}
            success={this.state.success}
            error={this.state.error}
            warning={this.state.warning}
            info={this.state.info}
            none={this.state.none}
          ></NotificationComponent>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ width: "102px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Lookup Type </label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                className="unifyHeight"
                value={this.state.lookupType}
                onChange={(e) =>
                  this.setState({
                    lookupType: e.value,
                  })
                }
              ></TextBox>
            </div>
            {this.state.lookupType == null && (
              <div>
                <span style={{ color: "red" }}>*</span>
              </div>
            )}

          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ width: "102px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Class </label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <DropDown
                className="unifyHeight"
                data={LookupTypeClass}
                textField="text"
                dataItemKey="id"
                defaultValue={{ id: "S", text: "S" }}
                value={this.state.class}
                onChange={(e) =>
                  this.setState({
                    class: {
                      id: e.value?.id,
                      text: e.value?.text,
                    },
                  })
                }
              ></DropDown>
            </div>
            {(this.state.class ==null|| this.state.class.id == null )&&(
            <div>
              <span style={{color:"red"}}>*</span>
            </div>
            )}
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ width: "102px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Length</label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                className="unifyHeight"
                format={""}
                value={this.state.length}
                onChange={(e) =>
                  this.setState({
                    length: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div>

          <div style={{ display: "flex", flexFlow: "row", width: "100%", marginTop: "4px" }}>
            <div style={{ width: "102px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Description</label>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <TextArea
                rows={5}
                style={{ width: "360px", height: "3cm" }}
                value={this.state.description ?? ""}
                onChange={(e) =>
                  this.setState({
                    description: e.value,
                  })
                }
              ></TextArea>
            </div>
            {this.state.description ==null &&(
            <div>
              <span style={{color:"red"}}>*</span>
            </div>
            )}
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%", marginTop: "4px" }}>
            <div style={{ width: "102px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Description Label</label>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <TextArea
                rows={5}
                style={{ width: "360px", height: "3cm" }}
                value={this.state.descriptionLabel ?? ""}
                onChange={(e) =>
                  this.setState({
                    descriptionLabel: e.value,
                  })
                }
              ></TextArea>
            </div>
          </div>

          <DialogActionsBar>
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={this.AddLookupType}
                >
                  Ok
                </button>
              </div>
              <div className="col-6">
                {!this.props.hideCancel && (
                  <button
                    type="button"
                    className="k-button"
                    onClick={this.props.toggleLookupTypeDialog}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </DialogActionsBar>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LookupTypeDialogComponent);
