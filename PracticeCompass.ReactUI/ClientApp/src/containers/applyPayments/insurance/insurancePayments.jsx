import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {
  insuranceColumns,
  methodList,
  creditCared,
  insurancePatientColumns,
  PracticeColumns,
  insuranceAssignmentColumns,
  DOSFilter,
  applyPlanPaymentColumns,
  guarantorColumns
} from "./insurancePaymentsData";
import {
  getguarantorList,
  resetGuarantorList
} from "../../../redux/actions/claimList";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import EditableGrid from "../../../components/editableGrid"
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import DatePickerComponent from "../../../components/DatePicker";
import CheckboxComponent from "../../../components/Checkbox"
import config from "../../../config";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import { SaveLookups } from "../../../redux/actions/lookups";
import NotificationComponent from "../../common/notification";
import {
  resetInsuranceList,
  getinsuranceList,
  getPracticeList,
  resetPracticeList,
} from "../../../redux/actions/patient";
import {
  getInsurancePayments,
  GetPaymentDetails,
  getPaymentAssignments
} from "../../../redux/actions/payments";
import $ from "jquery";

const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);
const DATA_ITEM_KEY_INSURANCE_PAYMENT = "paymentSID";
const idGetterInsurancePaymentID = getter(DATA_ITEM_KEY_INSURANCE_PAYMENT);

const DATA_ITEM_KEY_Apply_PLAN_PAYMENT = "id";
const idGetterApplyPlanPaymentID = getter(DATA_ITEM_KEY_Apply_PLAN_PAYMENT);

function mapStateToProps(state) {
  return {
    insuranceList: state.patients.insuranceList,
    dropDownInsurance: state.lookups.insurances,
    guarantorList: state.claimList.guarantorList,
    dropDownGuarantors: state.lookups.guarantors,
    dropDownPractices: state.lookups.practices,
    practiceList: state.patients.paractices,
    paymentClass: state.payments.paymentClass,
    insurancePayments: state.payments.insurancePayemnts,
    paymentAssignments: state.payments.paymentAssignments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getPatientList: (name) => dispatch(getpatientList(name)),
    getguarantorList: (name, refreshData, skip) =>
      dispatch(getguarantorList(name, refreshData, skip)),
    resetGuarantorList: () => dispatch(resetGuarantorList()),
    getinsuranceList: (name, refreshData,
      skip) => dispatch(getinsuranceList(name, refreshData,
        skip)),
    resetInsuranceList: () => dispatch(resetInsuranceList()),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
    resetPracticeList: () => dispatch(resetPracticeList()),
    getInsurancePayments: (PracticeID, PatientID, DateType, Datevalue, Fullyapplied) => dispatch(getInsurancePayments(PracticeID, PatientID, DateType, Datevalue, Fullyapplied)),
    GetPaymentDetails: (PaymentSID) => dispatch(GetPaymentDetails(PaymentSID)),
    getPaymentAssignments:(PaymentSID) => dispatch(getPaymentAssignments(PaymentSID)),

  };
}

class insurancePayments extends Component {
  state = {
    insurancePaymentExpanded: true,
    insurancePaymentDetailsExpanded: false,
    applyInsurancePaymentExpanded: false,
    selected: 0,
    tabSelected: 0,
    method: null,
    creditCard: null,
    methodSelected: 0,
    methodTabSelected: 0,
    payment_calss: null,
    insuranceVisible: false,
    insuranceSearchText: null,
    insuranceSelectedState: null,
    insuranceIDSelectedState: null,
    insuranceNameSelected: null,
    insuranceID: null,
    timer: 5000,
    dostype: null,
    dos: null,
    insurancePhysicianID: null,
    insuranceType: null,
    practiceVisiblePatient: false,
    practiceVisibleSubPatient: false,
    practiceVisibleInsurance: false,
    practiceVisibleSubInsurance: false,
    guarantorVisible: false,
    patientPracticeID: null,
    insurancePracticeID: null,
    subPatientPracticeID: null,
    subInsurancePracticeID: null,
    practiceSearchText: null,
    fullyApplied: false,
    guarantorSearchText: null,
  };
  handleSelect = (e) => {
    this.setState({
      type: e.selected == 0 ? "Patient" : "Insurance",
      selected: e.selected,
      tabSelected:
        e.selected == 0 || e.selected == 1
          ? e.selected
          : this.state.tabSelected,
    });
  };
  handleTabSelect = (e) => {
    this.setState({
      type: e.selected == 0 ? "Patient" : "Insurance",
      tabSelected: e.selected,
      selected:
        e.selected == 0 || e.selected == 1 ? e.selected : this.state.selected,
    });
  };
  handleMethodTabSelect = (e) => {
    this.setState({
      methodTabSelected: e.selected,
      methodSelected: e.selected,
    });
  };
  async getInsuranceFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=paymentInsurance&DisplayName=${filter}`;
  }
  getParacticesUrl(filter) {
    return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
  }
  // patientsearch = () => {
  //     this.props.getPatientList(this.state.patientSearchText);
  // };
  toggleInsuranceDialog = (isDetails = false) => {
    if (this.state.insuranceVisible || this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceSearchText: null,
      });
      this.props.resetInsuranceList();
    }
    if (this.state.insuranceVisible || this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceVisible: false,
        insuranceDetailsVisible: false
      });
    } else {
      if (isDetails) {
        this.setState({
          insuranceDetailsVisible: !this.state.insuranceDetailsVisible
        });
      } else {
        this.setState({
          insuranceVisible: !this.state.insuranceVisible
        });
      }

    }
  };
  onInsuranceDoubleClick = async (event) => {
    if (this.state.insuranceVisible) {
      await this.setState({
        insuranceSelectedState: event.dataItem.sortName,
        insuranceIDSelectedState: event.dataItem.entitySID,
        insuranceNameSelected: event.dataItem.sortName,
        insuranceID: event.dataItem.entitySID,
      });
    } else if (this.state.insuranceDetailsVisible) {
      await this.setState({
        insuranceDetailsSelectedState: event.dataItem.sortName,
        insuranceDetailsIDSelectedState: event.dataItem.entitySID,
        insuranceDetailsNameSelected: event.dataItem.sortName,
        insuranceDetailsID: event.dataItem.entitySID,
      });
    }
    this.props.SaveLookups(event.dataItem.entitySID, "Insurance");
    //this.selectInsurance();
    this.toggleInsuranceDialog();
  };
  onInsuranceKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    if (this.state.insuranceVisible) {
      this.setState({
        insuranceSelectedState: selectedDataItems[0].sortName,
        insuranceIDSelectedState: selectedDataItems[0].entitySID,
      });
    } else if (this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceDetailsSelectedState: selectedDataItems[0].sortName,
        insuranceDetailsIDSelectedState: selectedDataItems[0].entitySID,
      });
    }
  };
  insuranceSearch = async (refreshData, skip) => {
    this.props.getinsuranceList(this.state.insuranceSearchText, refreshData,
      skip);
  };
  onInsuranceSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    if (this.state.insuranceVisible) {
      this.setState({
        insuranceSelectedState: selectedDataItems[0].sortName,
        insuranceIDSelectedState: selectedDataItems[0].entitySID,
      });
    } else if (this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceDetailsSelectedState: selectedDataItems[0].sortName,
        insuranceDetailsIDSelectedState: selectedDataItems[0].entitySID,
      });
    }
  };
  cancelInsuranceDialog = () => {
    if (this.state.insuranceVisible) {
      this.setState({
        insuranceSelectedState: null,
      });
    } else if (this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceDetailsSelectedState: null,
      });
    }
    this.toggleInsuranceDialog();
  };
  onSortChange = () => { };
  toggleSaveInsuranceDialog = () => {
    this.setState({
      visibleInsuranceSaveFilter: false,
      editInsuranceFilter: false,
    });
  };
  setSelectedPractice = (entitySID, sortName) => {
    if (this.state.practiceVisiblePatient) {
      this.setState({
        patientPracticeID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    } else if (this.state.practiceVisibleSubPatient) {
      this.setState({
        subPatientPracticeID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    } else if (this.state.practiceVisibleInsurance) {
      this.setState({
        insurancePracticeID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    } else if (this.state.practiceVisibleSubInsurance) {
      this.setState({
        subInsurancePracticeID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    }
  };
  onPracticeSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setSelectedPractice(
      selectedDataItems[0].practiceID,
      selectedDataItems[0].sortName
    );
  };
  onPracticeDoubleClick = async (event) => {
    this.setSelectedPractice(
      event.dataItem.practiceID,
      event.dataItem.sortName
    );

    this.props.SaveLookups(event.dataItem.practiceID, "Practice");
    //this.selectPatient();
    this.togglePracticeDialog();
  };
  onPracticeKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setSelectedPractice(
      selectedDataItems ? selectedDataItems[0].practiceID : null,
      selectedDataItems ? selectedDataItems[0].sortName : null
    );
  };
  cancelPracticeDialog = () => {
    this.setState({
      practiceSearchText: null,
    });
    this.togglePracticeDialog();
  };
  togglePracticeDialog = () => {
    if (
      this.state.practiceVisiblePatient ||
      this.state.practiceVisibleSubPatient ||
      this.state.practiceVisibleInsurance ||
      this.state.practiceVisibleSubInsurance
    ) {
      this.setState({
        practiceSearchText: null,
      });
      this.props.resetPracticeList();
    }
    this.setState({
      practiceVisiblePatient: false,
      practiceVisibleSubPatient: false,
      practiceVisibleInsurance: false,
      practiceVisibleSubInsurance: false,
    });
  };
  setInsurancePaymentDetailsExpanded = () => {
    $("#InsurancePaymentDetails").children("span").trigger("click");
  };
  setApplyInsurancePaymentExpanded = () => {
    $("#ApplyInsurancePayment").children("span").trigger("click");
  };
  practiceSearch = () => {
    this.props.getPracticeList(this.state.practiceSearchText);
  };
  insurancePaymentGridSearch = async () => {
    this.props.getInsurancePayments(this.state.insurancePracticeID ? this.state.insurancePracticeID.entityId : null, this.state.insuranceID,
      this.state.txnDatetype ? this.state.txnDatetype.id : 0, this.state.txnDate ? this.state.txnDate.toLocaleDateString() : null, this.state.fullyApplied ?? false);
  }
  onInsurancePaymentGridSelectionChange = (event) => {
    this.setState({
      InsurancePaymentDetails: event.dataItems == null || event.dataItems.length == 0
        ? event.dataItem
        : event.dataItems[event.endRowIndex]
    });
  };
  onInsurancePaymentGridDoubleSelectionChange = async (event) => {
    let InsurancePaymentDetails = event.dataItems == null || event.dataItems.length == 0
      ? event.dataItem
      : event.dataItems[event.endRowIndex];
     this.props.getPaymentAssignments(InsurancePaymentDetails.paymentSID);
    InsurancePaymentDetails = await this.props.GetPaymentDetails(InsurancePaymentDetails.paymentSID);
    if (InsurancePaymentDetails) {
      if (InsurancePaymentDetails.practiceID !=null && (this.props.dropDownPractices == null ||
        this.props.dropDownPractices.filter(
          (x) => x.entityId ==InsurancePaymentDetails.practiceID
        ).length == 0)) {
        await this.props.SaveLookups(
          InsurancePaymentDetails?.practiceID,
          "Practice"
        );
      }
      this.setState({
        InsurancePaymentDetails,
        paymentSID:InsurancePaymentDetails.paymentSID,
        subInsurancePracticeID: {
          entityName: InsurancePaymentDetails?.practiceName,
          entityId: InsurancePaymentDetails?.practiceID,
        },
        insuranceDetailsID:InsurancePaymentDetails?.payorID,
        insuranceDetailsNameSelected:InsurancePaymentDetails?.payorName,
        payment_calss:{
          description:InsurancePaymentDetails?.paymentClass,
          lookupCode:InsurancePaymentDetails?.paymentClasscode
        },
        amountDetails:InsurancePaymentDetails?.amount,
        txnDataDetails:InsurancePaymentDetails?new Date(InsurancePaymentDetails?.postDate):null,
        methodDetails:{
          label:InsurancePaymentDetails?.payMethod,
          value:InsurancePaymentDetails?.paymentmethodcode
        },
        voucherdetails:InsurancePaymentDetails?.voucher,
        authorizationCode:InsurancePaymentDetails?.authorizationCode,
        creditCardDetails:{
          code: InsurancePaymentDetails?.creditCard,
          value: InsurancePaymentDetails?.creditCardname
        }

      });
    } else {
      this.resetInsuranceDetails();
    }
    this.setInsurancePaymentDetailsExpanded();
  };
  resetInsuranceDetails(){
    this.setState({
      InsurancePaymentDetails:null,
      paymentSID:null,
      subInsurancePracticeID: null,
      insuranceDetailsID:null,
      insuranceDetailsNameSelected:null,
      payment_calss:null,
      amountDetails:null,
      txnDataDetails:null,
      methodDetails:null,
      voucherdetails:null,
      authorizationCode:null,
      creditCardDetails:null

    });
  }
  guarantorsearch = (refreshData, skip) => {
    this.props.getguarantorList(
      this.state.guarantorSearchText,
      refreshData,
      skip
    );
  };
  toggleGuarantorDialog = (isDetails = false) => {
    if (this.state.guarantorVisible || this.state.guarantorDetailsVisible) {
      this.setState({
        guarantorSearchText: null,
      });
      this.props.resetGuarantorList();
    }
    if (this.state.guarantorVisible || this.state.guarantorDetailsVisible) {
      this.setState({
        guarantorDetailsVisible: false,
        guarantorVisible: false
      });
    } else {
      if (isDetails) {
        this.setState({
          guarantorDetailsVisible: !this.state.guarantorDetailsVisible,
        });
      } else {
        this.setState({
          guarantorVisible: !this.state.guarantorVisible,
        });
      }
    }
  };
  cancelGuarantorDialog = () => {
    this.setState({
      guarantorSelectedState: null,
    });
    this.toggleGuarantorDialog();
  };
  onGuarantorSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setGuarantorItem(selectedDataItems[0].entitySID, selectedDataItems[0].sortName);
  };
  setGuarantorItem = (entityId, entityName) => {
    if (this.state.guarantorVisible) {
      this.setState({
        patientGuarantorID: {
          entityId, entityName
        }
      })
    }
    else if (this.state.guarantorDetailsVisible) {
      this.setState({
        patientDetailsGuarantorID: {
          entityId, entityName
        }
      })

    }
  }
  onGuarantorDoubleClick = async (event) => {

    this.setGuarantorItem(event.dataItem.entitySID, event.dataItem.sortName);
    this.props.SaveLookups(event.dataItem.entitySID, "Guarantor");
    //this.selectGuarantor();
    this.toggleGuarantorDialog();
  };
  onGuarantorKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setGuarantorItem(selectedDataItems[0].entitySID, selectedDataItems[0].sortName);
  };
  onApplyPaymentGridSelectionChange = () => {

  }
  onApplyPaymentGridDoubleSelectionChange = () => {

  }
  render() {
    return (
      <Fragment>
        <div
          style={{
            backgroundColor: "white",
            padding: "5px",
          }}
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
          {(this.state.guarantorVisible || this.state.guarantorDetailsVisible) && (
            <FindDialogComponent
              title="Guarantor Search"
              placeholder="Enter Guarantor Name"
              searcTextBoxValue={this.state.guarantorSearchText}
              onTextSearchChange={(e) => {
                this.setState({
                  guarantorSearchText: e.value,
                });
              }}
              clickOnSearch={this.guarantorsearch}
              dataItemKey="entitySID"
              data={this.props.guarantorList}
              columns={guarantorColumns}
              onSelectionChange={this.onGuarantorSelectionChange}
              onRowDoubleClick={this.onGuarantorDoubleClick}
              onKeyDown={this.onGuarantorKeyDown}
              idGetterLookup={idGetterInsurance}
              toggleDialog={this.cancelGuarantorDialog}
              cancelDialog={this.cancelGuarantorDialog}
            ></FindDialogComponent>
          )}
          {(this.state.practiceVisiblePatient ||
            this.state.practiceVisibleSubPatient ||
            this.state.practiceVisibleInsurance ||
            this.state.practiceVisibleSubInsurance) && (
              <FindDialogComponent
                title="Practice Search"
                placeholder="Enter Practice Name"
                searcTextBoxValue={this.state.practiceSearchText}
                onTextSearchChange={(e) => {
                  this.setState({
                    practiceSearchText: e.value,
                  });
                }}
                clickOnSearch={this.practiceSearch}
                dataItemKey="practiceID"
                data={this.props.practiceList}
                columns={PracticeColumns}
                onSelectionChange={this.onPracticeSelectionChange}
                onRowDoubleClick={this.onPracticeDoubleClick}
                onKeyDown={this.onPracticeKeyDown}
                idGetterLookup={idGetterPracticeID}
                toggleDialog={this.cancelPracticeDialog}
                cancelDialog={this.cancelPracticeDialog}
              ></FindDialogComponent>
            )}
          {(this.state.insuranceVisible ||
            this.state.insuranceDetailsVisible) && (
              <FindDialogComponent
                title="Plan Search"
                placeholder="Enter Plan Company Name"
                searcTextBoxValue={this.state.insuranceSearchText}
                onTextSearchChange={(e) => {
                  this.setState({
                    insuranceSearchText: e.value,
                  });
                }}
                clickOnSearch={this.insuranceSearch}
                dataItemKey="entitySID"
                data={this.props.insuranceList}
                columns={insurancePatientColumns}
                onSelectionChange={this.onInsuranceSelectionChange}
                onRowDoubleClick={this.onInsuranceDoubleClick}
                onKeyDown={this.onInsuranceKeyDown}
                idGetterLookup={idGetterInsurance}
                toggleDialog={this.cancelInsuranceDialog}
                cancelDialog={this.cancelInsuranceDialog}
                getNextData={true}
              ></FindDialogComponent>
            )}
          <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
            <PanelBarItem
              id="InsurancePaymentSearch"
              expanded={this.state.insurancePaymentExpanded}
              title="Plan Payment"
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <div style={{ marginLeft: "45px" }}>
                  <label className="userInfoLabel">Practice </label>
                </div>
                <div className="PracticeStyle">
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownPractices}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={this.state.insurancePracticeID}
                    value={this.state.insurancePracticeID}
                    onChange={(e) =>
                      this.setState({
                        insurancePracticeID: {
                          entityName: e.value?.entityName,
                          entityId: e.value?.entityId,
                        },
                      })
                    }
                  ></DropDown>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    icon="search"
                    type="search"
                    classButton="infraBtn-primary find-button"
                    style={{ marginTop: "0px" }}
                    onClick={(e) =>
                      this.setState({ practiceVisibleInsurance: true })
                    }
                  >
                    Find
                  </ButtonComponent>
                </div>

              </div>
              <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <label className="userInfoLabel">Plan Company</label>
                </div>
                <div
                  className="insuranceStyle"
                  style={{
                    float: "left",
                    width: "314px",
                    marginLeft: "3px",
                  }}
                >
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownInsurance}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={{
                      entityId: this.state.insuranceID,
                      entityName: this.state.insuranceNameSelected,
                    }}
                    value={{
                      entityId: this.state.insuranceID,
                      entityName: this.state.insuranceNameSelected,
                    }}
                    onChange={(e) =>
                      this.setState({
                        insuranceSelectedState: e.value?.entityName,
                        insuranceIDSelectedState: e.value?.entityId,
                        insuranceNameSelected: e.value?.entityName,
                        insuranceID: e.value?.entityId,
                      })
                    }
                  ></DropDown>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    look="outline"
                    icon="search"
                    type="search"
                    classButton="infraBtn-primary find-button"
                    onClick={() => this.toggleInsuranceDialog(false)}
                    style={{ marginTop: "0px" }}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
              <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                <div style={{ width: "57px", marginLeft: "36px" }}>
                  <label className="userInfoLabel">Txn Date </label>
                </div>
                <div style={{ width: "147px" }}>
                  <DropDown
                    data={DOSFilter}
                    textField="text"
                    dataItemKey="id"
                    className="unifyHeight"
                    id="tins"
                    name="tins"
                    value={this.state.txnDatetype}
                    onChange={(e) => this.setState({ txnDatetype: e.value })}
                  ></DropDown>
                </div>
                <div className="dateStyle" style={{ marginLeft: "5px" }}>
                  <DatePickerComponent
                    className="unifyHeight"
                    placeholder="MM/DD/YYYY"
                    format="M/dd/yyyy"
                    value={this.state.txnDate}
                    onChange={(e) => this.setState({ txnDate: e.value })}
                  ></DatePickerComponent>
                </div>
                <div>
                  <CheckboxComponent
                    style={{ marginRight: "5px" }}
                    id="isCopayExmpted"
                    label="Fully Applied"
                    value={this.state.fullyApplied}
                    onChange={(e) => this.setState({ fullyApplied: e.value })}
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", flexFlow: "row", marginLeft: "15px" }}
              >
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    icon="search"
                    type="search"
                    classButton="infraBtn-primary action-button"
                    onClick={this.insurancePaymentGridSearch}
                  >
                    Search
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={()=>{
                      this.resetInsuranceDetails();
                      this.setInsurancePaymentDetailsExpanded();
                    }
                  }
                  >
                    Add
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={this.setApplyInsurancePaymentExpanded}
                  >
                    Apply
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={this.setInsurancePaymentDetailsExpanded}
                  >
                    Edit
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
                    >
                      <GridComponent
                        id="insurancePayment"
                        columns={insuranceColumns}
                        skip={0}
                        take={21}
                        onSelectionChange={this.onInsurancePaymentGridSelectionChange}
                        onRowDoubleClick={this.onInsurancePaymentGridDoubleSelectionChange}
                        // getSelectedItems={this.getSelectedClaims}
                        // selectionMode="multiple"
                        DATA_ITEM_KEY="paymentSID"
                        idGetter={idGetterInsurancePaymentID}
                        data={this.props.insurancePayments}
                        totalCount={
                          this.props.insurancePayments != null && this.props.insurancePayments.length > 0
                            ? this.props.insurancePayments[0].totalCount
                            : this.props.insurancePayments.length
                        }
                        height="579px"
                        width="100%"
                        //hasCheckBox={true}
                        sortColumns={[]}
                        onSortChange={this.onSortChange}
                        pageChange={this.pageChange}
                      ></GridComponent>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
            <PanelBarItem
              id="InsurancePaymentDetails"
              expanded={this.state.insurancePaymentDetailsExpanded}
              title="Plan Payment Details"
            >
              <div
                style={{
                  marginTop: "5px",

                  width: "100%",
                }}
              >

                <div
                  style={{
                    marginTop: "5px",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ marginLeft: "42px" }}>
                      <label className="userInfoLabel">Practice </label>
                    </div>
                    <div className="PracticeStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownPractices}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={this.state.subInsurancePracticeID}
                        value={this.state.subInsurancePracticeID}
                        onChange={(e) =>
                          this.setState({
                            subInsurancePracticeID: {
                              entityName: e.value?.entityName,
                              entityId: e.value?.entityId,
                            },
                          })
                        }
                      ></DropDown>
                    </div>
                    <div style={{ float: "left" }}>
                      <ButtonComponent
                        icon="search"
                        type="search"
                        classButton="infraBtn-primary find-button"
                        style={{ marginTop: "0px" }}
                        onClick={(e) =>
                          this.setState({
                            practiceVisibleSubInsurance: true,
                          })
                        }
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Plan Company </label>
                    </div>
                    <div
                      className="insuranceStyle"
                      style={{ float: "left" }}
                    >
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownInsurance}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={{
                          entityId: this.state.insuranceDetailsID,
                          entityName: this.state.insuranceDetailsNameSelected,
                        }}
                        value={{
                          entityId: this.state.insuranceDetailsID,
                          entityName: this.state.insuranceDetailsNameSelected,
                        }}
                        onChange={(e) =>
                          this.setState({
                            insuranceDetailsSelectedState: e.value?.entityName,
                            insuranceDetailsIDSelectedState: e.value?.entityId,
                            insuranceDetailsNameSelected: e.value?.entityName,
                            insuranceDetailsID: e.value?.entityId,
                          })
                        }
                      ></DropDown>
                    </div>
                    <div style={{ float: "left" }}>
                      <ButtonComponent
                        look="outline"
                        icon="search"
                        type="search"
                        classButton="infraBtn-primary find-button"
                        onClick={() => this.toggleInsuranceDialog(true)}
                        style={{ marginTop: "0px" }}
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "58px" }}>
                      <label className="userInfoLabel">Class </label>
                    </div>
                    <div
                      className="insuranceStyle"
                      style={{ float: "left" }}
                    >
                      <DropDown
                        className="unifyHeight"
                        data={this.props.paymentClass}
                        textField="description"
                        dataItemKey="lookupCode"
                        value={this.state.payment_calss}
                        onChange={(e) =>
                          this.setState({
                            payment_calss: e.value,
                          })
                        }
                      ></DropDown>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "40px" }}>
                      <label className="userInfoLabel">Amount </label>
                    </div>
                    <div style={{ float: "left", width: "100px" }}>
                      <TextBox
                        type="numeric"
                        format="c2"
                        className="unifyHeight"
                        value={this.state.amountDetails}
                        onChange={(e) =>
                          this.setState({
                            amountDetails: e.value,
                          })
                        }
                      ></TextBox>
                    </div>
                    <div style={{ float: "left", marginLeft: "10px" }}>
                      <label className="userInfoLabel">Txn Date </label>
                    </div>
                    <div style={{ float: "left", width: "132px" }}>
                      <DatePickerComponent
                        id="planEndDate"
                        name="planEndDate"
                        className="unifyHeight"
                        placeholder="MM/DD/YYYY"
                        format="M/dd/yyyy"
                        value={
                          this.state.txnDataDetails
                        }
                        onChange={(e) =>
                          this.setState({ txnDataDetails: e.value })
                        }
                      ></DatePickerComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <fieldset
                      className="fieldsetStyle"
                      style={{
                        width: "540px",
                        marginTop: "5px",
                        height: "85px",
                        marginLeft: "10px"
                      }}
                    >
                      <legend
                        className="legendStyle"
                        style={{ paddingRight: "5px", paddingLeft: "5px" }}
                      >
                        Payment Method
                      </legend>
                      <div className="row" style={{ marginLeft: "5px" }}>
                        <div style={{ float: "left", marginLeft: "24px" }}>
                          <label className="userInfoLabel">Method</label>
                        </div>
                        <div style={{ float: "left", width: "215px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={methodList}
                            textField="label"
                            dataItemKey="value"
                            value={this.state.methodDetails}
                            onChange={(e) =>
                              this.setState({
                                methodDetails: e.value,
                              })
                            }
                          ></DropDown>
                        </div>
                        <div style={{ float: "left", marginLeft: "12px" }}>
                          <label className="userInfoLabel">Voucher </label>
                        </div>
                        <div style={{ float: "left", width: "100px" }}>
                          <TextBox
                            className="unifyHeight"
                            value={this.state.voucherdetails}
                            onChange={(e) =>
                              this.setState({
                                voucherdetails: e.value,
                              })
                            }
                          ></TextBox>
                        </div>
                      </div>
                      <div className="row" style={{ marginLeft: "5px" }}>
                        <div style={{ float: "left", marginLeft: "5px" }}>
                          <label className="userInfoLabel">
                            Credit Card
                          </label>
                        </div>
                        <div style={{ float: "left", width: "215px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={creditCared}
                            textField="value"
                            dataItemKey="code"
                            value={this.state.creditCardDetails}
                            onChange={(e) =>
                              this.setState({
                                creditCardDetails: e.value,
                              })
                            }
                          ></DropDown>
                        </div>
                        <div style={{ float: "left", marginLeft: "12px" }}>
                          <label className="userInfoLabel">
                            Authorization Code
                          </label>
                        </div>
                        <div style={{ float: "left", width: "100px" }}>
                          <TextBox
                            className="unifyHeight"
                            value={this.state.authorizationCode}
                            onChange={(e) =>
                              this.setState({
                                authorizationCode: e.value,
                              })
                            }
                          ></TextBox>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div
                  className="rowHeight"
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    marginTop: "10px",
                    marginLeft: "10px"
                  }}
                >
                  <ButtonComponent
                    classButton="infraBtn-primary action-button"
                    look="outline"
                    icon="edit"
                    type="edit"
                    onClick={this.savePatientPaymentDetails}
                  >
                    Save
                  </ButtonComponent>
                </div>

                <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
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
                      >
                        <GridComponent
                          id="insurancePayment"
                          columns={insuranceAssignmentColumns}
                          skip={0}
                          take={21}
                          // onSelectionChange={this.onClaimGridSelectionChange}
                          // onRowDoubleClick={this.onClaimGridDoubleSelectionChange}
                          // getSelectedItems={this.getSelectedClaims}
                          // selectionMode="multiple"
                          DATA_ITEM_KEY="paymentSID"
                          idGetter={idGetterInsurancePaymentID}
                          // data={this.props.Claims}
                          // totalCount={
                          //   this.props.Claims != null && this.props.Claims.length > 0
                          //     ? this.props.Claims[0].totalCount
                          //     : this.props.Claims.length
                          // }
                          height="700px"
                          width="100%"
                          //hasCheckBox={true}
                          sortColumns={[]}
                          onSortChange={this.onSortChange}
                          pageChange={this.pageChange}
                        ></GridComponent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
            <PanelBarItem
              id="ApplyInsurancePayment"
              expanded={this.state.applyInsurancePaymentExpanded}
              title="Apply Plan Payment"
            >
              <div
                style={{ display: "flex", flexFlow: "row", marginTop: "10px" }}
              >
                <TabStrip
                  className="userManagmentTabStrip"
                  selected={this.state.tabSelected}
                  onSelect={this.handleTabSelect}
                  style={{ width: "100%" }}
                >
                  <TabStripTab title="Apply Patient Payments Details">
                    <div
                      style={{
                        // display: "flex",
                        // flexFlow: "row",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
                        <div style={{ float: "left", marginLeft: "14px" }}>
                          <label className="userInfoLabel">Amount </label>
                        </div>
                        <div style={{ float: "left", width: "100px" }}>
                          <TextBox
                            type="numeric"
                            format="c2"
                            className="unifyHeight"
                            value={this.state.amountApply}
                            onChange={(e) =>
                              this.setState({
                                amountApply: e.value,
                              })
                            }
                          ></TextBox>
                        </div>
                        <div style={{ float: "left", marginLeft: "10px" }}>
                          <label className="userInfoLabel">Remaining </label>
                        </div>
                        <div style={{ float: "left", width: "132px" }}>
                          <TextBox
                            type="numeric"
                            format="c2"
                            className="unifyHeight"
                            value={this.state.remaining}
                            onChange={(e) =>
                              this.setState({
                                remaining: e.value,
                              })
                            }
                          ></TextBox>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
                        <fieldset
                          className="fieldsetStyle"
                          style={{
                            width: "540px",
                            marginTop: "5px",
                            height: "110px",
                            marginLeft: "10px"
                          }}
                        >
                          {/* <legend
                            className="legendStyle"
                            style={{ paddingRight: "5px", paddingLeft: "5px" }}
                          >
                            Payment Method
                          </legend> */}
                          <div className="row nowrap rowHeight">
                            <div style={{ textAlign: "right", marginLeft: "66px" }}>
                              <label className="userInfoLabel">Claim# </label>
                            </div>
                            <div style={{ width: "120px" }}>
                              <TextBox
                                type="text"
                                className="unifyHeight"
                                value={this.state.billNumber}
                                onChange={(e) =>
                                  this.setState({
                                    billNumber: e.value,
                                  })
                                }
                              ></TextBox>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                            <div style={{ float: "left", marginLeft: "5px" }}>
                              <label className="userInfoLabel">Plan Company</label>
                            </div>
                            <div
                              className="insuranceStyle"
                              style={{
                                float: "left",
                                width: "314px",
                                marginLeft: "3px",
                              }}
                            >
                              <DropDown
                                className="unifyHeight"
                                data={this.props.dropDownInsurance}
                                textField="entityName"
                                dataItemKey="entityId"
                                defaultValue={{
                                  entityId: this.state.insuranceApplyID,
                                  entityName: this.state.insuranceApplyNameSelected,
                                }}
                                value={{
                                  entityId: this.state.insuranceApplyID,
                                  entityName: this.state.insuranceApplyNameSelected,
                                }}
                                onChange={(e) =>
                                  this.setState({
                                    insuranceApplySelectedState: e.value?.entityName,
                                    insuranceApplyIDSelectedState: e.value?.entityId,
                                    insuranceApplyNameSelected: e.value?.entityName,
                                    insuranceApplyID: e.value?.entityId,
                                  })
                                }
                              ></DropDown>
                            </div>
                            <div style={{ float: "left" }}>
                              <ButtonComponent
                                look="outline"
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary find-button"
                                onClick={() => this.toggleInsuranceDialog(false)}
                                style={{ marginTop: "0px" }}
                              >
                                Find
                              </ButtonComponent>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexFlow: "row nowrap" }}>

                            <div style={{ marginLeft: "31px" }}>
                              <label className="userInfoLabel">Guarantor</label>
                            </div>
                            <div className="GuarantorStyle">
                              <DropDown
                                className="unifyHeight"
                                data={this.props.dropDownGuarantors}
                                textField="entityName"
                                dataItemKey="entityId"
                                defaultValue={this.state.patientApplyGuarantorID}
                                value={this.state.patientApplyGuarantorID}
                                onChange={(e) =>
                                  this.setState({
                                    patientApplyGuarantorID: {
                                      entityName: e.value?.entityName,
                                      entityId: e.value?.entityId,
                                    }
                                  })
                                }
                              ></DropDown>
                            </div>
                            <div>
                              <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary find-button"
                                onClick={() => this.toggleGuarantorDialog(false)}
                                style={{ marginTop: "0px" }}
                              >
                                Find
                              </ButtonComponent>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                            <div style={{ width: "57px", marginLeft: "36px" }}>
                              <label className="userInfoLabel">Txn Date </label>
                            </div>
                            <div style={{ width: "147px" }}>
                              <DropDown
                                data={DOSFilter}
                                textField="text"
                                dataItemKey="id"
                                className="unifyHeight"
                                id="tins"
                                name="tins"
                                value={this.state.txnApplyDatetype}
                                onChange={(e) => this.setState({ txnApplyDatetype: e.value })}
                              ></DropDown>
                            </div>
                            <div className="dateStyle" style={{ marginLeft: "5px" }}>
                              <DatePickerComponent
                                className="unifyHeight"
                                placeholder="MM/DD/YYYY"
                                format="M/dd/yyyy"
                                value={this.state.txnApplyDate}
                                onChange={(e) => this.setState({ txnApplyDate: e.value })}
                              ></DatePickerComponent>
                            </div>
                            <div>
                              <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary"
                                onClick={() => this.findClaim(false)}
                                style={{ marginTop: "0px" }}
                              >
                                Find Claim
                              </ButtonComponent>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
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
                            >
                              <EditableGrid
                                data={[]}
                                id="applyedPatient"
                                skip={0}
                                take={21}
                                height="700px"
                                width="100%"
                                editColumn={"paymentSID"}
                                DATA_ITEM_KEY="paymentSID"
                                idGetter={idGetterApplyPlanPaymentID}
                                onSelectionChange={this.onApplyPaymentGridSelectionChange}
                                onRowDoubleClick={this.onApplyPaymentGridDoubleSelectionChange}
                                columns={applyPlanPaymentColumns}
                                onSortChange={this.onSortChange}
                                // pageChange={this.pageChange}
                                isEditable={true}
                              // totalCount={
                              //   this.props.patientApplys != null && this.props.patientApplys.length > 0
                              //     ? this.props.patientApplys[0].totalCount
                              //     : this.props.patientApplys.length
                              // }
                              ></EditableGrid>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%", marginBottom: "10px" }}>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary"
                          onClick={() => this.Apply()}
                          style={{ marginTop: "0px" }}
                        >
                          Apply
                        </ButtonComponent>
                      </div>
                    </div>
                  </TabStripTab>
                  <TabStripTab title="Payment Assignment">
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        width: "100%",
                      }}
                    >
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
                          >
                            <GridComponent
                              id="insurancePayment"
                              columns={insuranceAssignmentColumns}
                              skip={0}
                              take={21}
                              // onSelectionChange={this.onClaimGridSelectionChange}
                              // onRowDoubleClick={this.onClaimGridDoubleSelectionChange}
                              // getSelectedItems={this.getSelectedClaims}
                              // selectionMode="multiple"
                              DATA_ITEM_KEY="paymentSID"
                              idGetter={idGetterInsurancePaymentID}
                              // data={this.props.Claims}
                              // totalCount={
                              //   this.props.Claims != null && this.props.Claims.length > 0
                              //     ? this.props.Claims[0].totalCount
                              //     : this.props.Claims.length
                              // }
                              height="700px"
                              width="100%"
                              //hasCheckBox={true}
                              sortColumns={[]}
                              onSortChange={this.onSortChange}
                              pageChange={this.pageChange}
                            ></GridComponent>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabStripTab>
                </TabStrip>
              </div>
            </PanelBarItem>
          </PanelBar>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(insurancePayments);
