import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import CheckboxComponent from "../../components/Checkbox";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class Show_HideDialogComponent extends Component {
  state = {
    refresh: true,
  };
  setShowValue = (e, index) => {
    this.setState({ refresh: false });
    this.props.columns[index].hide = !e.value;
    this.setState({ refresh: true });
  };
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title || "Columns Dialog"}
          onClose={this.props.toggleShowColumnsDialog}
          width={400}
        >
          <div className="row">
            <div className="col-12">
              {this.state.refresh &&
                this.props.columns &&
                this.props.columns.map((column, index) => {
                  return (
                    <CheckboxComponent
                      key={index}
                      label={column.title}
                      style={{ marginRight: "5px" }}
                      value={!this.props.columns[index].hide}
                      onChange={(e) => this.setShowValue(e, index)}
                    ></CheckboxComponent>
                  );
                })}
            </div>
          </div>
          <DialogActionsBar>
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={() => this.props.SaveColumnsShow(this.props.columns)}
                >
                  Ok
                </button>
              </div>
              <div className="col-6">
                {!this.props.hideCancel && (
                  <button
                    type="button"
                    className="k-button"
                    onClick={this.props.toggleShowColumnsDialog}
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
)(Show_HideDialogComponent);
