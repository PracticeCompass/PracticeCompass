import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import CheckboxComponent from "../../components/Checkbox";
import NotificationComponent from "../common/notification";
import { TextArea } from "@progress/kendo-react-inputs";
import { getter } from "@progress/kendo-react-common";
import { AddFileNotes,ProcessFile } from "../../redux/actions/fileManager";

const DATA_ITEM_KEY_DETAILS_PAYMENT = "gridID";
const idGetterDetailsPaymentID = getter(DATA_ITEM_KEY_DETAILS_PAYMENT);

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AddFileNotes: (fileName, documentNote) => dispatch(AddFileNotes(fileName, documentNote)),
    ProcessFile:(fileName, processed) => dispatch(ProcessFile(fileName, processed))
  };
}
class DocumentManagerDialog extends Component {
  state = {
    refresh: true,
    success: false,
    none: false,
    error: false,
    warning: false,
    info: false,
    timer: 500,
  };

  componentDidMount = () => {
    this.setState({
      processed: this.props.row.isProcessed ?? false,
      documentNote: this.props.row.notes
    });
  }
  saveNote = async () => {
    let result = await this.props.AddFileNotes(this.props.row.fileName, this.state.documentNote);
    if (result) {
      this.setState({ success: true, message: "Save File Data succefully " });
      setTimeout(() => {
        this.setState({
          success: false,
        });
        this.props.toggledocumentManagerDialog(this.state.documentNote);
      }, this.state.timer);
    } else {
      this.setState({ error: true, message: "Save File Data failed " });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
    }
  }
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title || ("Edit Note (" + this.props.row.fileName + ")")}
          onClose={()=>this.props.toggledocumentManagerDialog(this.state.documentNote)}
          width={800}
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
          {/* <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ float: "left" }}>
              <CheckboxComponent
                id="processed"
                label="Processed"
                value={this.state.processed}
                onChange={(e) => this.setState({ processed: e.value })}
              />
            </div>
          </div> */}
          <div
            className="rowHeight"
            style={{
              display: "flex",
              flexFlow: "row",
              paddingLeft: "10px",
            }}
          >
            <div style={{ float: "left" }}>
              <label className="userInfoLabel">Note</label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              paddingLeft: "10px",
              paddingRight: "5px",
            }}
          >
            <TextArea
              rows={5}
              style={{ width: "100%", height: "5cm" }}
              value={this.state.documentNote ?? ""}
              onChange={(e) => {
                this.setState({ documentNote: e.value });
              }}
            ></TextArea>
          </div>
          <DialogActionsBar>
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={() => this.saveNote()}
                >
                  Ok
                </button>
              </div>
              <div className="col-6">
                {!this.props.hideCancel && (
                  <button
                    type="button"
                    className="k-button"
                    onClick={()=>this.props.toggledocumentManagerDialog(this.state.documentNote)}
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
)(DocumentManagerDialog);
