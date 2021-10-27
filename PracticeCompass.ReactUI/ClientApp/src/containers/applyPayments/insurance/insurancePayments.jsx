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
} from "./insurancePaymentsData";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
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
  getInsurancePayments
} from "../../../redux/actions/payments";
import $ from "jquery";

const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);
const DATA_ITEM_KEY_INSURANCE_PAYMENT = "paymentSID";
const idGetterInsurancePaymentID = getter(DATA_ITEM_KEY_INSURANCE_PAYMENT);
function mapStateToProps(state) {
  return {
    insuranceList: state.patients.insuranceList,
    guarantorList: state.claimList.guarantorList,
    dropDownInsurance: state.lookups.insurances,
    dropDownPractices: state.lookups.practices,
    practiceList: state.patients.paractices,
    paymentClass: state.payments.paymentClass,
    insurancePayments: state.payments.insurancePayemnts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getPatientList: (name) => dispatch(getpatientList(name)),
    getinsuranceList: (name, refreshData,
      skip) => dispatch(getinsuranceList(name, refreshData,
        skip)),
    resetInsuranceList: () => dispatch(resetInsuranceList()),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
    resetPracticeList: () => dispatch(resetPracticeList()),
    getInsurancePayments: (PracticeID, PatientID) => dispatch(getInsurancePayments(PracticeID, PatientID))

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

    patientPracticeID: null,
    insurancePracticeID: null,
    subPatientPracticeID: null,
    subInsurancePracticeID: null,
    practiceSearchText: null,
    fullyApplied: false
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
  getInsuranceFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=paymentInsurance&DisplayName=${filter}`;
  }
  getParacticesUrl(filter) {
    return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
  }
  // patientsearch = () => {
  //     this.props.getPatientList(this.state.patientSearchText);
  // };
  toggleInsuranceDialog = (isDetails =false) => {
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
      if(isDetails){
        this.setState({
          insuranceDetailsVisible: !this.state.insuranceDetailsVisible
        });
      }else{
        this.setState({
          insuranceVisible: !this.state.insuranceVisible
        });
      }

    }
  };
  onInsuranceDoubleClick = async (event) => {
    debugger;
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
  insurancePaymentGridSearch = () => {
    //this.props.getInsurancePayments(73835 , 916497);
    this.props.getInsurancePayments(this.state.insurancePracticeID?.entityId, this.state.insuranceID);
  }
  onInsurancePaymentGridSelectionChange = (event) => {
    this.setState({
      InsurancePaymentDetails: event.dataItems == null || event.dataItems.length == 0
        ? event.dataItem
        : event.dataItems[event.endRowIndex]
    });
  };
  onInsurancePaymentGridDoubleSelectionChange = (event) => {
    this.setState({
      InsurancePaymentDetails: event.dataItems == null || event.dataItems.length == 0
        ? event.dataItem
        : event.dataItems[event.endRowIndex]
    });
    this.setInsurancePaymentDetailsExpanded();
  };
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
                title="Insurance Search"
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
                    onClick={this.toggleInsuranceDialog}
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
                    onClick={this.setInsurancePaymentDetailsExpanded}
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
                style={{ display: "flex", flexFlow: "row", marginTop: "10px" }}
              >
                <TabStrip
                  className="userManagmentTabStrip"
                  selected={this.state.tabSelected}
                  onSelect={this.handleTabSelect}
                  style={{ width: "100%" }}
                >
                  <TabStripTab title="Payment Details" selected={"true"}>
                    <div
                      style={{
                        marginTop: "5px",
                        marginBottom: "30px",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ marginLeft: "14px" }}>
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
                          <label className="userInfoLabel">Plan </label>
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
                            onClick={()=>this.toggleInsuranceDialog(true)}
                            style={{ marginTop: "0px" }}
                          >
                            Find
                          </ButtonComponent>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ float: "left", marginLeft: "31px" }}>
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
                        <div style={{ float: "left", marginLeft: "13px" }}>
                          <label className="userInfoLabel">Amount </label>
                        </div>
                        <div style={{ float: "left", width: "100px" }}>
                          <TextBox
                            type="numeric"
                            format="c2"
                            className="unifyHeight"
                            value={this.state.units}
                            onChange={(e) =>
                              this.setState({
                                units: e.value,
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
                              this.state.currentInsurance != null &&
                                this.state.currentInsurance.endDate
                                ? new Date(this.state.currentInsurance.endDate)
                                : null
                            }
                            onChange={(e) =>
                              this.setState({ PlanEndDate: e.value })
                            }
                          ></DatePickerComponent>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <fieldset
                          className="fieldsetStyle"
                          style={{
                            width: "700px",
                            marginTop: "5px",
                            height: "130px",
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
                                value={this.state.method}
                                onChange={(e) =>
                                  this.setState({
                                    method: e.value,
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
                                value={this.state.units}
                                onChange={(e) =>
                                  this.setState({
                                    units: e.value,
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
                                value={this.state.creditCard}
                                onChange={(e) =>
                                  this.setState({
                                    creditCard: e.value,
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
                                value={this.state.units}
                                onChange={(e) =>
                                  this.setState({
                                    units: e.value,
                                  })
                                }
                              ></TextBox>
                            </div>
                          </div>
                        </fieldset>
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
                  <TabStripTab title="Payment Details" selected={"true"}>
                    <div
                      style={{
                        marginTop: "5px",
                        marginBottom: "30px",
                        width: "100%",
                      }}
                    ></div>
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
