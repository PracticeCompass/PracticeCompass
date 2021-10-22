import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class DeleteDialogComponent extends Component {
  state = {
    filterName: this.props.filterName,
  };
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title || "Delete Dialog"}
          onClose={this.props.toggleDeleteDialog}
          height={200}
          width={400}
        >
          <div className="row">
            <div className="col-12">
              <label>{this.props.deleteMessage}</label>
            </div>
          </div>
          <DialogActionsBar>
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={() =>
                    this.props.deleteFilter(this.props.currentFilterID)
                  }
                >
                  Ok
                </button>
              </div>
              <div className="col-6">
                {!this.props.hideCancel && (
                  <button
                    type="button"
                    className="k-button"
                    onClick={this.props.toggleDeleteDialog}
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
)(DeleteDialogComponent);
