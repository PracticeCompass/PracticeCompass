import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import TextBox from "../../../components/TextBox";
import CheckboxComponent from "../../../components/Checkbox";
import ButtonComponent from "../../../components/Button";
import NotificationComponent from "../../common/notification";
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
    GetChargeAdjustmentDetails: (chargeSID, claimSID, planId) => dispatch(GetChargeAdjustmentDetails(chargeSID, claimSID, planId))
  };
}

class ApplyPlanPaymentDialogComponent extends Component {
  state = {
    refresh: true,
    ChargeAdjustmentDetails: [],
    timer: 5000,
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
      copayAmount: item?.copayAmount,
      approvedAmount: item?.approvedAmount,
      claimSID: item?.claimSID,
    })
    let data = [];
    if (item?.isEdit  && ( item?.ChargeAdjustmentDetails !=null && item?.ChargeAdjustmentDetails.length != 0   )) {
      data = item?.ChargeAdjustmentDetails;
      this.setState({ ChargeAdjustmentDetails: item?.ChargeAdjustmentDetails });
    } else {
      //data = await this.props.GetChargeAdjustmentDetails(1447762, 1100381, 4271); this.props.planId
      data = await this.props.GetChargeAdjustmentDetails(item?.chargeSID, item?.claimSID, this.props.planId);
      this.setState({ ChargeAdjustmentDetails: data });
    }
    let adjustments = data.filter(row => !row.isDelete).map(a => a.adjustmentAmount).reduce(function (a, b) {
      return a + b;
    }, 0);
    this.setState(
      {
        adjustments
      })
  }
  onBlur = () => {
    this.setState({
      chargeBalance: this.state.amount - this.state.insurancePaid - this.state.adjustments
    })
  }
  onRowRender = () => { }
  onSortChange = () => { }
  deleteRow = (row) => {
    let data = this.state.ChargeAdjustmentDetails.map((item) =>
      item["gridId"] === row.gridId
        ? {
          ...item,
          isDelete: true,
        }
        : item
    );
    let adjustments = (data.filter(row => !row.isDelete) || []).map(a => a.adjustmentAmount).reduce(function (a, b) {
      return a + b;
    }, 0);
    this.setState(
      {
        adjustments
      })
    this.setState({ ChargeAdjustmentDetails: data });
  }
  onSelectionChange = () => { }
  onDoubleSelectionChange = () => { }
  applyItemChanged = (event) => {
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
    let adjustments = data.filter(row => !row.isDelete).map(a => a.adjustmentAmount).reduce(function (a, b) {
      return a + b;
    }, 0);
    this.setState(
      {
        chargeBalance: this.state.amount - this.state.insurancePaid - adjustments,
        adjustments
      })
  }
  addAdjustment = () => {
    if (this.state.ChargeAdjustmentDetails.filter(x => x.adjustmentAmount == null || x.adjustmentReasonCode == null || x.claimAdjustmentGroupCode == null).length > 0) {
      this.setState({
        error: true,
        message: "Plase fill last row.",
      });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
      return;
    }
    let item = {
      adjustmentAmount: null,
      adjustmentReasonCode: null,
      chargeSid: this.state.chargeSID,
      claimAdjustmentGroupCode: null,
      claimSid: this.state.claimSID,
      gridId: uuidv4(),
      isAdd: true
    };
    this.setState({
      ChargeAdjustmentDetails: this.state.ChargeAdjustmentDetails.concat(item)
    })
  }
  applyPaymentTransaction() {
    if (this.state.ChargeAdjustmentDetails.filter(x => x.adjustmentAmount == null || x.adjustmentReasonCode == null || x.claimAdjustmentGroupCode == null).length > 0) {
      this.setState({
        error: true,
        message: "Plase fill last row.",
      });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
      return;
    }
    let uniqueArray = [];
    this.state.ChargeAdjustmentDetails.filter(x=>!x.isDelete).map((a, index) => {
      if (uniqueArray.filter(y => y.adjustmentReasonCode == a.adjustmentReasonCode && y.claimAdjustmentGroupCode == a.claimAdjustmentGroupCode).length == 0) {
        uniqueArray.push({
          adjustmentReasonCode: a.adjustmentReasonCode,
          claimAdjustmentGroupCode: a.claimAdjustmentGroupCode
        })
      }
    });
    if (uniqueArray.length != this.state.ChargeAdjustmentDetails.filter(x=>!x.isDelete).length) {
      this.setState({
        error: true,
        message: "Plase remove duplicate rows.",
      });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
      return;
    }
    this.props.applyPaymentTransaction({
      insurancePaid: this.state.insurancePaid,
      adjustments: this.state.adjustments,
      amount: this.state.amount,
      chargeBalance: this.state.chargeBalance,
      moveToNextPlan: this.state.moveToNextPlan,
      chargeSID: this.state.chargeSID,
      deductibleApplied: this.state.deductibleApplied,
      copayAmount: this.state.copayAmount,
      ChargeAdjustmentDetails: this.state.ChargeAdjustmentDetails,
      approvedAmount: this.state.approvedAmount
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
          <NotificationComponent
            message={this.state.message}
            onClose={this.closeNotification}
            success={this.state.success}
            error={this.state.error}
            warning={this.state.warning}
            info={this.state.info}
            none={this.state.none}
          ></NotificationComponent>
          {/* <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
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
            <div style={{ marginLeft: "14px" }}>
              <label className="userInfoLabel" >Other Adjustments</label>
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
                    copayAmount: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ marginLeft: "26px" }}>
              <label className="userInfoLabel" >Allowed Amount</label>
            </div>
            <div className="dateStyle" style={{ marginLeft: "5px" }}>
              <TextBox
                type="numeric"
                format="c2"
                className="unifyHeight"
                disabled={this.state.approvedAmount>0?true:false}
                value={this.state.approvedAmount}
                onChange={(e) =>
                  this.setState({
                    approvedAmount: e.value,
                  })
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "122px" }}>
              <CheckboxComponent
                style={{ marginRight: "5px" }}
                id="paymentId"
                label="Move To Next Plan"
                value={this.state.moveToNextPlan}
                onChange={(e) => this.setState({ moveToNextPlan: e.value })}
              />

            </div>
          </div> */}
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
                    data={this.state.ChargeAdjustmentDetails?.filter(item => !item.isDelete) || []}
                    height="400px"
                    width="100%"
                    noPageable={true}
                    isEditable={true}
                    itemChange={this.applyItemChanged}
                    //hasCheckBox={true}
                    sortColumns={[]}
                    onSortChange={this.onSortChange}
                    deleteRow={this.deleteRow}
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
                  onClick={() =>
                    this.applyPaymentTransaction()
                  }
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
