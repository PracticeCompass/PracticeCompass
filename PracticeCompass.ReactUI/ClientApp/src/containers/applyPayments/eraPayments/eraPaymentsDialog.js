import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import TextBox from "../../../components/TextBox";
import GridComponent from "../../../components/Grid";
import { getter } from "@progress/kendo-react-common";

const DATA_ITEM_KEY_DETAILS_PAYMENT = "gridID";
const idGetterDetailsPaymentID = getter(DATA_ITEM_KEY_DETAILS_PAYMENT);

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class EraPaymentsDialogComponent extends Component {
  state = {
    refresh: true,
  };
  setShowValue = (e, index) => {
    this.setState({ refresh: false });
    this.props.columns[index].hide = !e.value;
    this.setState({ refresh: true });
  };
  componentDidMount=()=>{
    let item = this.props.ERAItemDetails;
    this.setState({
      lineItemChargeAmt: item?.lineItemChargeAmt,
      lineItemProviderPaymentAmt: item?.lineItemProviderPaymentAmt,
      chargeClaimAdjustmentAmt:item?.chargeClaimAdjustmentAmt,
      chargeClaimAdjustmentReason: Number(item?.chargeClaimAdjustmentReason),
      claimAdjustmentAmt:item?.claimAdjustmentAmt,
      eRSClaimAdjustmentreason : item?.eRSClaimAdjustmentreason,
      providerAdjustmentAmt: item?.providerAdjustmentAmt,
      pmtProvLevelAdjReason: item?.pmtProvLevelAdjReason
    })
  }
  onERADeitalsPaymentGridSelectionChange=()=>{

  }
  onERADeitalsPaymentGridDoubleSelectionChange=()=>{
  }
  onSortChange=()=>{

  }
  onRowRender = (trElement, props) => {
    const type = props.dataItem.type;
    const bold = {
      borderTopWidth: "3px",
      borderTopColor: "black",
      fontWeight: "bold"
    };
    const normal = {
      fontWeight: "normal"
    };
    let trProps = {
      style: normal,
    };
    switch (type) {
      case "Charge":
        trProps = { style: bold };
        break;
      default:
        trProps = { style: normal };
        break;
    }
    for (let i = 0; i < trElement.props.children.length; i++) {
      let childElement = { ... this.renderCell(trElement.props.children[i], trProps) };
      trElement.props.children[i] = childElement;
    }
    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  }
  renderCell = (trElement, trProps) => {
    return React.cloneElement(
      trElement,
      { ...trProps }
    );
  }
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title || "Edit Payment  Transaction"}
          onClose={this.props.toggleERAPaymentDialog}
         // width={400}
        >
            {/* <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
              <div style={{ width: "221px", marginLeft: "41px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Asking </label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.lineItemChargeAmt}
                    onChange={(e) =>
                      this.setState({
                        lineItemChargeAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div>
            <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
              <div style={{ width: "221px", marginLeft: "41px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Amount </label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.lineItemProviderPaymentAmt}
                    onChange={(e) =>
                      this.setState({
                        lineItemProviderPaymentAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div> */}
            {this.props.showDetailsGrid &&(
            <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
              <div style={{ width: "221px", marginLeft: "40px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Charge Claim Adjustment Amount </label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.chargeClaimAdjustmentAmt}
                    onChange={(e) =>
                      this.setState({
                        chargeClaimAdjustmentAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
              <div style={{ width: "221px", marginLeft: "39px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Claim Adjustment Amount</label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.claimAdjustmentAmt}
                    onChange={(e) =>
                      this.setState({
                        claimAdjustmentAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
              <div style={{ width: "221px", marginLeft: "36px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Provider Adjustment Amount</label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.providerAdjustmentAmt}
                    onChange={(e) =>
                      this.setState({
                        providerAdjustmentAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div>)}
            {/* <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
              <div style={{ width: "221px", marginLeft: "40px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Charge Claim Adjustment Reason</label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.chargeClaimAdjustmentReason}
                    onChange={(e) =>
                      this.setState({
                        chargeClaimAdjustmentReason: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div> */}
            {/* JSON.stringify([{ text: "claimAdjustmentAmt", s: "/" }, { text: "eRSClaimAdjustmentreason", s: "," }]) */}
            {!this.props.showDetailsGrid &&(
            <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ width: "221px", marginLeft: "40px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Charge Claim Adjustment Amount </label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.chargeClaimAdjustmentAmt}
                    onChange={(e) =>
                      this.setState({
                        chargeClaimAdjustmentAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
           </div>)}
           {!this.props.showDetailsGrid &&(
            <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ width: "221px", marginLeft: "39px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Claim Adjustment Amount</label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.claimAdjustmentAmt}
                    onChange={(e) =>
                      this.setState({
                        claimAdjustmentAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div>)}
            {!this.props.showDetailsGrid &&(
            <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ width: "221px", marginLeft: "39px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Provider Adjustment Amount</label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.providerAdjustmentAmt}
                    onChange={(e) =>
                      this.setState({
                        providerAdjustmentAmt: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div>)}
            {/* <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
              <div style={{ width: "221px", marginLeft: "36px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>ERS Claim Adjustment Reason</label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.eRSClaimAdjustmentreason}
                    onChange={(e) =>
                      this.setState({
                        eRSClaimAdjustmentreason: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div> */}
            {/* field: JSON.stringify([{ text: "providerAdjustmentAmt", s: "/" }, { text: "pmtProvLevelAdjReason", s: "," }]), */}

            {/* <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
              <div style={{ width: "221px", marginLeft: "36px" }}>
                <label className="userInfoLabel" style={{ float:"right"}}>Pmt Prov Level Adjustment Reason</label>
              </div>
              <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.pmtProvLevelAdjReason}
                    onChange={(e) =>
                      this.setState({
                        pmtProvLevelAdjReason: e.value,
                      })
                    }
                  ></TextBox>
              </div>
            </div> */}
            {this.props.showDetailsGrid &&(
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
                      <GridComponent
                        id="ERADetailsPayment"
                        activeRowRender={true}
                        onRowRender={this.onRowRender}
                        columns={this.props.detailsColumns}
                        skip={0}
                        take={21}
                        onSelectionChange={this.onERADeitalsPaymentGridSelectionChange}
                        onRowDoubleClick={
                          this.onERADeitalsPaymentGridDoubleSelectionChange
                        }
                        editColumn={"gridID"}
                        DATA_ITEM_KEY="gridID"
                        idGetter={idGetterDetailsPaymentID}
                        data={this.props.detailRows}
                        height="400px"
                        width="100%"
                        noPageable={true}
                        isEditable={true}
                        //hasCheckBox={true}
                        sortColumns={[]}
                        onSortChange={this.onSortChange}
                      // pageChange={this.pageChange}
                      ></GridComponent>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <DialogActionsBar>
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="k-button k-primary"
                  onClick={() => this.props.savePaymentTransaction({
                    lineItemChargeAmt: this.state.lineItemChargeAmt,
                    lineItemProviderPaymentAmt: this.state.lineItemProviderPaymentAmt,
                    chargeClaimAdjustmentAmt: this.state.chargeClaimAdjustmentAmt,
                    chargeClaimAdjustmentReason: this.state.chargeClaimAdjustmentReason.toString(),
                    claimAdjustmentAmt:this.state.claimAdjustmentAmt,
                    eRSClaimAdjustmentreason : this.state.eRSClaimAdjustmentreason,
                    providerAdjustmentAmt: this.state.providerAdjustmentAmt,
                    pmtProvLevelAdjReason: this.state.pmtProvLevelAdjReason
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
                    onClick={this.props.toggleERAPaymentDialog}
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
)(EraPaymentsDialogComponent);
