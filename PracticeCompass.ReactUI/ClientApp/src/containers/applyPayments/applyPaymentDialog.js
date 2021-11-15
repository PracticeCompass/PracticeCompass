import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import TextBox from "../../components/TextBox";
import CheckboxComponent from "../../components/Checkbox"
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class ApplyPaymentDialogComponent extends Component {
  state = {
    refresh: true,
  };
  setShowValue = (e, index) => {
    this.setState({ refresh: false });
    this.props.columns[index].hide = !e.value;
    this.setState({ refresh: true });
  };
  componentDidMount = () => {
    let item = {...this.props.paymentRow};

    this.setState({
      insurancePaid: this.props.isHideMoveToNext?item?.patientPaid: item?.insurancePaid,
      adjustments: item?.adjustments,
      amount: item?.amount,
      chargeBalance: item?.chargeBalance,
      moveToNextPlan: item?.moveToNextPlan,
      chargeSID: item?.chargeSID
    })
  }
  onBlur=()=>{
    this.setState({
      chargeBalance:this.state.amount-this.state.insurancePaid-this.state.adjustments
    })
  }
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title || "Edit Payment"}
          onClose={this.props.togglePaymentDialog}
          width={400}
        >
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "77px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Amount </label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                format="c3"
                className="unifyHeight"
                value={this.state.amount}
                onChange={(e) =>
                  this.setState({
                    amount: e.value,
                  })
                }
                disabled={true}
              ></TextBox>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "40px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Insurance Paid </label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                format="c2"
                className="unifyHeight"
                value={this.state.insurancePaid}
                onChange={(e) =>
                  this.setState({
                    insurancePaid: e.value,
                  })
                }
                onBlur={(e)=>
                  this.onBlur()
                }
              ></TextBox>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "50px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Adjustments</label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                format="c2"
                className="unifyHeight"
                value={this.state.adjustments}
                onChange={(e) =>
                  this.setState({
                    adjustments: e.value,
                  })
                }
                onBlur={(e)=>
                  this.onBlur()
                }
              ></TextBox>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "60px" }}>
              <label className="userInfoLabel" style={{ float: "right" }}>Remaining </label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                format="c2"
                className="unifyHeight"
                value={this.state.chargeBalance}
                onChange={(e) =>
                  this.setState({
                    chargeBalance: e.value,
                  })
                }
                disabled={true}
              ></TextBox>
            </div>
          </div>
          { !this.props.isHideMoveToNext &&(
          <div style={{marginLeft:"100px"}}>
            <CheckboxComponent
              style={{ marginRight: "5px" }}
              id="paymentId"
              label="Move To Next Plan"
              value={this.state.moveToNextPlan}
              onChange={(e) => this.setState({ moveToNextPlan: e.value })}
            />
          </div>
           ) }


          <DialogActionsBar>
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={() => this.props.applyPaymentTransaction({
                    insurancePaid:this.state.insurancePaid,
                    adjustments:this.state.adjustments,
                    amount:this.state.amount,
                    chargeBalance:this.state.chargeBalance,
                    moveToNextPlan:this.state.moveToNextPlan,
                    chargeSID:this.state.chargeSID
                  })}
                >
                  Ok
                </button>
              </div>
              <div className="col-6">
                {!this.props.hideCancel && (
                  <button
                    type="button"
                    className="k-button"
                    onClick={this.props.togglePaymentDialog}
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
)(ApplyPaymentDialogComponent);
