import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import TextBox from "../../../components/TextBox";
import CheckboxComponent from "../../../components/Checkbox";
import ButtonComponent from "../../../components/Button";
import DropDown from "../../../components/DropDown";
import EditableGrid from "../../../components/editableGrid";
import { getter } from "@progress/kendo-react-common";
import "./applyPlan.css";
import { v4 as uuidv4 } from 'uuid';
import { applyPlanColumns } from "./insurancePaymentsData";

import {
  GetChargeAdjustmentDetails
} from "../../../redux/actions/payments";
const DATA_ITEM_KEY_DETAILS_PAYMENT = "gridId";

const idGetterDetailsPaymentID = getter(DATA_ITEM_KEY_DETAILS_PAYMENT);
function mapStateToProps(state) {
  return {
    dropDownPractices: state.lookups.practices,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    GetChargeAdjustmentDetails: (chargeSID, claimSID) => dispatch(GetChargeAdjustmentDetails(chargeSID, claimSID))
  };
}

class ApplyPlanPaymentDialogComponent extends Component {
  state = {
    refresh: true,
    ChargeAdjustmentDetails: []
  };
  setShowValue = (e, index) => {
    this.setState({ refresh: false });
    this.props.columns[index].hide = !e.value;
    this.setState({ refresh: true });
  };
  componentDidMount = async () => {
    let item = { ...this.props.paymentRow };
    this.setState({
      insurancePaid: this.props.isHideMoveToNext ? item?.patientPaid : item?.insurancePaid,
      adjustments: item?.adjustments,
      amount: item?.amount,
      chargeBalance: item?.chargeBalance,
      moveToNextPlan: item?.moveToNextPlan,
      chargeSID: item?.chargeSID,
      deductibleApplied: item?.deductibleApplied,
      copayAmount: item?.copayAmount
    })
    let result = await this.props.GetChargeAdjustmentDetails(item?.chargeSID, item?.claimSID);
    this.setState({ ChargeAdjustmentDetails: result });
  }
  onBlur = () => {
    this.setState({
      chargeBalance: this.state.amount - this.state.insurancePaid - this.state.adjustments
    })
  }
  onRowRender = () => { }
  onSortChange = () => { }
  onSelectionChange = () => { }
  onDoubleSelectionChange = () => { }
  applyItemChanged = (event) => {
    debugger;
    const field = event.field || "";
    const inEditID = event.dataItem["gridId"];
    let data = this.state.ChargeAdjustmentDetails.map((item) =>
      item["gridId"] === inEditID
        ? {
          ...item,
          [field]: event.value,
          isEdit: true,
        }
        : item
    );
    this.setState({ ChargeAdjustmentDetails: data });
    let adjustments = data.map(a => a.adjustmentAmount).reduce(function (a, b) {
      return a + b;
    });
    this.setState(
      {
        chargeBalance: this.state.amount - this.state.insurancePaid - adjustments,
        adjustments
      })
  }
  addAdjustment = () => {
    if(this.state.ChargeAdjustmentDetails.filter(x=>x.adjustmentAmount == null) != null) return;
    let item={
      adjustmentAmount: null,
      adjustmentReasonCode: null,
      chargeSid: null,
      claimAdjustmentGroupCode: null,
      claimSid: null,
      gridId: uuidv4(),
      isAdd:true
    };
    this.setState({
      ChargeAdjustmentDetails: this.state.ChargeAdjustmentDetails.concat(item)
    })
  }
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title || "Edit Payment"}
          onClose={this.props.togglePaymentDialog}
          width={700}
        >
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "77px" }}>
              <label className="userInfoLabel" >Amount </label>
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

            <div style={{ marginLeft: "60px" }}>
              <label className="userInfoLabel" >Remaining </label>
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
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "40px" }}>
              <label className="userInfoLabel" >Insurance Paid</label>
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
                onBlur={(e) =>
                  this.onBlur()
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <label className="userInfoLabel" >Adjustments</label>
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
                disabled={true}
              ></TextBox>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "13px" }}>
              <label className="userInfoLabel" >Deductible Applied</label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                format="c2"
                className="unifyHeight"
                value={this.state.deductibleApplied}
                onChange={(e) =>
                  this.setState({
                    deductibleApplied: e.value,
                  })
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "37px" }}>
              <label className="userInfoLabel" >Copay Amount</label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                format="c2"
                className="unifyHeight"
                value={this.state.copayAmount}
                onChange={(e) =>
                  this.setState({
                    adjustments: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div>
          <div style={{ marginLeft: "100px" }}>
            <CheckboxComponent
              style={{ marginRight: "5px" }}
              id="paymentId"
              label="Move To Next Plan"
              value={this.state.moveToNextPlan}
              onChange={(e) => this.setState({ moveToNextPlan: e.value })}
            />

          </div>
          {this.state.chargeBalance < 0 && (
            <div style={{ marginLeft: "100px" }}>
              <label className="userInfoLabel" ref={(node) => {
                if (node) {
                  node.style.setProperty("color", "red", "important");
                }
              }}>Paid is higher than remaining.</label>
            </div>
          )}
          <div
            style={{ display: "flex", flexFlow: "row", marginLeft: "15px" }}
          >
            <div style={{ float: "left" }}>
              <ButtonComponent
                icon="search"
                type="search"
                classButton="infraBtn-primary"
                onClick={this.addAdjustment}
              >
                Add Adjustment
              </ButtonComponent>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div className="accordion" id="accordionExample">
              <div
                className="card bg-light mb-3"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "5px",
                }}
              >
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                  style={{ width: this.state.gridWidth }}
                >
                  <EditableGrid
                    id="applyPlanPayment"
                    columns={applyPlanColumns}
                    skip={0}
                    take={21}
                    onSelectionChange={this.onSelectionChange}
                    onRowDoubleClick={
                      this.onDoubleSelectionChange
                    }
                    editColumn={"gridId"}
                    DATA_ITEM_KEY="gridId"
                    idGetter={idGetterDetailsPaymentID}
                    data={this.state.ChargeAdjustmentDetails}
                    height="400px"
                    width="100%"
                    noPageable={true}
                    isEditable={true}
                    itemChange={this.applyItemChanged}
                    //hasCheckBox={true}
                    sortColumns={[]}
                    onSortChange={this.onSortChange}
                  // pageChange={this.pageChange}
                  ></EditableGrid>
                </div>
              </div>
            </div>
          </div>

          <DialogActionsBar>
            <div className="row">
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
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={() => this.props.applyPaymentTransaction({
                    insurancePaid: this.state.insurancePaid,
                    adjustments: this.state.adjustments,
                    amount: this.state.amount,
                    chargeBalance: this.state.chargeBalance,
                    moveToNextPlan: this.state.moveToNextPlan,
                    chargeSID: this.state.chargeSID
                  })}
                >
                  Ok
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
)(ApplyPlanPaymentDialogComponent);
