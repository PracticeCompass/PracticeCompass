import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TextBox from "../../components/TextBox";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class SaveFilterComponent extends Component {
  state = {
    filterName: this.props.filterName,
  };
  render() {
    return (
      <Fragment>
        <Dialog
          title={"Save Filter"}
          onClose={this.props.toggleSaveDialog}
          height={200}
          width={400}
        >
          <div className="row">
            <div className="col-12">
              <TextBox
                placeholder="Enter Filter Name"
                value={this.state.filterName}
                valid={true}
                onChange={(event) => {
                  this.setState({ filterName: event.value });
                }}
              ></TextBox>
            </div>
          </div>
          <DialogActionsBar>
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={() => this.props.saveFilter(this.state.filterName)}
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="k-button"
                  onClick={this.props.toggleSaveDialog}
                >
                  Cancel
                </button>
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
)(SaveFilterComponent);
