import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { guarantorColumns, applyPatientPaymentColumns, patientPaymentColumns } from "./patientPaymentsData";
import {
  insuranceColumns,
  methodList,
  creditCared,
  PracticeColumns,
  insuranceAssignmentColumns,
  DOSFilter,
} from "../insurance/insurancePaymentsData";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import EditableGrid from "../../../components/editableGrid";
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import CheckboxComponent from "../../../components/Checkbox"
import DatePickerComponent from "../../../components/DatePicker";
import config from "../../../config";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import { SaveLookups } from "../../../redux/actions/lookups";
import NotificationComponent from "../../common/notification";
import PatientFindDialogComponent from "../../common/patientFindDialog";
import { patientColumns } from "../../processPatients/patients/patient/patientData";
import $ from "jquery";
import {
  resetPatientList,
  getPracticeList,
  resetPracticeList,
} from "../../../redux/actions/patient";
import {
  getguarantorList,
  resetGuarantorList,
  resetPhysicianList,
  getPhysicianList,
} from "../../../redux/actions/claimList";
import { getPatientPayments } from "../../../redux/actions/payments"
const DATA_ITEM_KEY_PATIENT = "patientListgridID";
const idGetterPaient = getter(DATA_ITEM_KEY_PATIENT);
const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);

const DATA_ITEM_KEY_PATIENT_PAYMENT = "paymentSID";
const idGetterPatientPaymentID = getter(DATA_ITEM_KEY_PATIENT_PAYMENT);

const DATA_ITEM_KEY_Apply_PATIENT_PAYMENT = "id";
const idGetterApplyPatientPaymentID = getter(DATA_ITEM_KEY_Apply_PATIENT_PAYMENT);

const DATA_ITEM_KEY_Physician = "entitySID";
const idGetterPhysicianID = getter(DATA_ITEM_KEY_Physician);
function mapStateToProps(state) {
  return {
    patientList: state.patients.patientList,
    insuranceList: state.patients.insuranceList,
    guarantorList: state.claimList.guarantorList,
    dropDownPatients: state.lookups.patients,
    dropDownInsurance: state.lookups.insurances,
    dropDownGuarantors: state.lookups.guarantors,
    dropDownPractices: state.lookups.practices,
    dropDownPhysicians: state.lookups.physicians,
    practiceList: state.patients.paractices,
    paymentClass: state.payments.paymentClass,
    physicians: state.claimList.physicians,
    patientPayments: state.payments.patientPayments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getPatientList: (name) => dispatch(getpatientList(name)),
    getguarantorList: (name, refreshData, skip) =>
      dispatch(getguarantorList(name, refreshData, skip)),
    resetPatientList: () => dispatch(resetPatientList()),
    resetGuarantorList: () => dispatch(resetGuarantorList()),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
    resetPracticeList: () => dispatch(resetPracticeList()),
    getPhysicianList: (name, refreshdata, skip) =>
      dispatch(getPhysicianList(name, refreshdata, skip)),
    resetPhysicianList: () => dispatch(resetPhysicianList()),
    getPatientPayments: (PracticeID, PatientID) => dispatch(getPatientPayments(PracticeID, PatientID))
  };
}

class PatientPayments extends Component {
  state = {
    method: null,
    methodSelected: 0,
    methodTabSelected: 0,
    patientPaymentExpanded: true,
    patientPaymentDetailsExpanded: false,
    applypatientPaymentExpanded: false,
    selected: 0,
    refreshFilter: true,
    tabSelected: 0,
    dostype: null,
    dos: null,
    payment_calss: null,
    patientGuarantorID: null,
    patientDetailsGuarantorID: null,
    guarantorSearchText: null,
    guarantorVisible: false,
    guarantorDetailsVisible: false,
    insuranceVisible: false,
    insuranceSearchText: null,
    insuranceSelectedState: null,
    insuranceIDSelectedState: null,
    insuranceNameSelected: null,
    insuranceID: null,
    visiblePatientSaveFilter: false,
    editPatientFilter: false,
    currentPatientFilter: null,
    timer: 5000,
    visibleInsuranceSaveFilter: false,
    editInsuranceFilter: false,
    currentInsuranceFilter: null,
    insuranceBatch: null,
    insurancePhysicianID: null,
    insuranceType: null,

    subInsurancePhysicianID: null,
    subPatientPhysicianID: null,

    practiceVisiblePatient: false,
    practiceVisibleSubPatient: false,
    practiceVisibleInsurance: false,
    practiceVisibleSubInsurance: false,
    fullyApplied: false,
    patientPracticeID: null,
    insurancePracticeID: null,
    subPatientPracticeID: null,
    subInsurancePracticeID: null,
    practiceSearchText: null,
    physicianSearchText: null,
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
  getPatientFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=paymentPatient&DisplayName=${filter}`;
  }

  getParacticesUrl(filter) {
    return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
  }
  // patientsearch = () => {
  //     this.props.getPatientList(this.state.patientSearchText);
  // };
  togglePatientDialog = () => {
    if (this.state.patientVisible) {
      this.setState({
        patientSearchText: null,
      });
      this.props.resetPatientList();
    }
    this.setState({
      patientVisible: !this.state.patientVisible,
    });
  };
  onPatientSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      patientSelectedState: selectedDataItems[0].sortName,
      patientIDSelectedState: selectedDataItems[0].patientID,
    });
  };
  onPatientDoubleClick = async (event) => {
    await this.setState({
      patientSelectedState: event.dataItem.sortName,
      patientIDSelectedState: event.dataItem.patientID,
      patientNameSelected: event.dataItem.sortName,
      patientID: event.dataItem.patientID,
    });
    this.props.SaveLookups(event.dataItem.patientID, "Patient");
    //this.selectPatient();
    this.togglePatientDialog();
  };
  onPatientKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      patientSelectedState: selectedDataItems[0].sortName,
      patientIDSelectedState: selectedDataItems[0].patientID,
    });
  };
  cancelPatientDialog = () => {
    this.setState({
      patientSelectedState: null,
    });
    this.togglePatientDialog();
  };
  onSortChange = () => { };
  practiceSearch = () => {
    this.props.getPracticeList(this.state.practiceSearchText);
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
  handleMethodTabSelect = (e) => {
    this.setState({
      methodTabSelected: e.selected,
      methodSelected: e.selected,
    });
  };
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
  patientPaymentGridSearch = () => {
    //this.props.getPatientPayments(142690, 886880)
    this.props.getPatientPayments(this.state.patientPracticeID?.entityId, this.state.patientGuarantorID?.entityId);
  }
  onPatientPaymentGridSelectionChange = (event) => {
    this.setState({
      patientPaymentDetails: event.dataItems == null || event.dataItems.length == 0
        ? event.dataItem
        : event.dataItems[event.endRowIndex]
    });
  };
  onPatientPaymentGridDoubleSelectionChange = (event) => {
    this.setState({
      patientPaymentDetails: event.dataItems == null || event.dataItems.length == 0
        ? event.dataItem
        : event.dataItems[event.endRowIndex]
    });
    this.setPatientPaymentDetailExpanded();
  };
  setPatientPaymentDetailExpanded = () => {
    //$("#patient").children("span").trigger("click");
    $("#PatientPaymentDetailsSearch").children("span").trigger("click");
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
          {this.state.patientVisible && (
            <PatientFindDialogComponent
              title="Patient Search"
              placeholder="Enter Patient Name"
              // searcTextBoxValue={this.state.patientSearchText}
              onTextSearchChange={(e) => {
                this.setState({
                  patientSearchText: e.value,
                });
              }}
              clickOnSearch={this.patientsearch}
              dataItemKey="patientListgridID"
              data={this.props.patientList}
              columns={patientColumns}
              onSelectionChange={this.onPatientSelectionChange}
              onRowDoubleClick={this.onPatientDoubleClick}
              onKeyDown={this.onPatientKeyDown}
              idGetterLookup={idGetterPaient}
              toggleDialog={this.cancelPatientDialog}
              cancelDialog={this.cancelPatientDialog}
            ></PatientFindDialogComponent>
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
          <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
            <PanelBarItem
              id="PatientPaymentSearch"
              expanded={this.state.patientPaymentExpanded}
              title="Patient Payment"
            >
              <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                <div style={{ float: "left", width: "100%" }}>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ marginLeft: "32px" }}>
                      <label className="userInfoLabel">Practice </label>
                    </div>
                    <div className="PracticeStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownPractices}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={this.state.patientPracticeID}
                        value={this.state.patientPracticeID}
                        onChange={(e) =>
                          this.setState({
                            patientPracticeID: {
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
                          this.setState({ practiceVisiblePatient: true })
                        }
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      marginLeft: "20px",
                    }}
                  >
                    <div>
                      <label className="userInfoLabel">Guarantor </label>
                    </div>
                    <div className="GuarantorStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownGuarantors}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={this.state.patientGuarantorID}
                        value={this.state.patientGuarantorID}
                        onChange={(e) =>
                          this.setState({
                            patientGuarantorID: {
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
                  <div
                    style={{ display: "flex", flexFlow: "row", width: "100%" }}
                  >
                    <div style={{ width: "54px", marginLeft: "27px" }}>
                      <label className="userInfoLabel">Txn Date</label>
                    </div>
                    <div style={{ width: "147px" }}>
                      <DropDown
                        data={DOSFilter}
                        textField="text"
                        dataItemKey="id"
                        className="unifyHeight"
                        id="tins"
                        name="tins"
                        value={this.state.dostype}
                        onChange={(e) => this.setState({ dostype: e.value })}
                      ></DropDown>
                    </div>
                    <div className="dateStyle" style={{ marginLeft: "5px" }}>
                      <DatePickerComponent
                        className="unifyHeight"
                        placeholder="MM/DD/YYYY"
                        format="M/dd/yyyy"
                        value={this.state.dos}
                        onChange={(e) => this.setState({ dos: e.value })}
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
                </div>
              </div>
              <div
                style={{ display: "flex", flexFlow: "row", marginLeft: "20px" }}
              >
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    classButton="infraBtn-primary action-grid-button"
                    icon="search"
                    type="search"
                    onClick={this.patientPaymentGridSearch}
                  >
                    Search
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={() => {
                      this.setPatientPaymentDetailExpanded()
                    }}
                  >
                    Add
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                  // onClick={() => {
                  //     this.setState({ visibleSaveFilter: true });
                  // }}
                  >
                    Apply
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                  // onClick={() => {
                  //     this.setState({ visibleSaveFilter: true });
                  // }}
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
                        columns={patientPaymentColumns}
                        skip={0}
                        take={21}
                        onSelectionChange={this.onPatientPaymentGridSelectionChange}
                        onRowDoubleClick={this.onPatientPaymentGridDoubleSelectionChange}
                        // getSelectedItems={this.getSelectedClaims}
                        // selectionMode="multiple"
                        DATA_ITEM_KEY="paymentSID"
                        idGetter={idGetterPatientPaymentID}
                        data={this.props.patientPayments}
                        totalCount={
                          this.props.patientPayments != null && this.props.patientPayments.length > 0
                            ? this.props.patientPayments[0].totalCount
                            : this.props.patientPayments.length
                        }
                        height="579px"
                        width="100%"
                        //hasCheckBox={true}
                        sortColumns={[]}
                        onSortChange={this.onSortChange}
                      // pageChange={this.pageChange}
                      ></GridComponent>
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
            </PanelBarItem>
            <PanelBarItem
              id="PatientPaymentDetailsSearch"
              expanded={this.state.patientPaymentDetailsExpanded}
              title="Patient Payment Details"
            >
              <div
                style={{
                  marginTop: "5px",
                  width: "100%",
                }}
              >

                <div style={{ display: "flex", flexFlow: "row nowrap" }}>
                  <div style={{ marginLeft: "15px" }}>
                    <label className="userInfoLabel">Practice </label>
                  </div>
                  <div className="PracticeStyle">
                    <DropDown
                      className="unifyHeight"
                      data={this.props.dropDownPractices}
                      textField="entityName"
                      dataItemKey="entityId"
                      defaultValue={this.state.subPatientPracticeID}
                      value={this.state.subPatientPracticeID}
                      onChange={(e) =>
                        this.setState({
                          subPatientPracticeID: {
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
                        this.setState({ practiceVisibleSubPatient: true })
                      }
                    >
                      Find
                    </ButtonComponent>
                  </div>

                </div>
                <div style={{ display: "flex", flexFlow: "row nowrap" }}>

                  <div style={{ marginLeft: "2px" }}>
                    <label className="userInfoLabel">Guarantor</label>
                  </div>
                  <div className="GuarantorStyle">
                    <DropDown
                      className="unifyHeight"
                      data={this.props.dropDownGuarantors}
                      textField="entityName"
                      dataItemKey="entityId"
                      defaultValue={this.state.patientDetailsGuarantorID}
                      value={this.state.patientDetailsGuarantorID}
                      onChange={(e) =>
                        this.setState({
                          patientDetailsGuarantorID: {
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
                      onClick={() => this.toggleGuarantorDialog(true)}
                      style={{ marginTop: "0px" }}
                    >
                      Find
                    </ButtonComponent>
                  </div>
                </div>
                <div style={{ display: "flex", flexFlow: "row nowrap" }}>
                  <div style={{ float: "left", marginLeft: "32px" }}>
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
                <div style={{ display: "flex", flexFlow: "row nowrap" }}>
                  <div style={{ float: "left", marginLeft: "14px" }}>
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
                      value={this.state.txnDate}
                      onChange={(e) =>
                        this.setState({
                          txnDate: e.value,
                        })
                      }
                    ></DatePickerComponent>
                  </div>
                </div>
                <div style={{ display: "flex", flexFlow: "row nowrap" }}>
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
                    <div className="row nowrap" style={{ marginLeft: "5px" }}>
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
                          idGetter={idGetterPatientPaymentID}
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
                        // pageChange={this.pageChange}
                        ></GridComponent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
            <PanelBarItem
              id="ApplyPatientPayment"
              expanded={this.state.applypatientPaymentExpanded}
              title="Apply Patient Payments"
            >
              <div
                style={{
                  marginTop: "5px",
                  marginBottom: "30px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexFlow: "row" }}>
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
                                  idGetter={idGetterApplyPatientPaymentID}
                                  onSelectionChange={this.onApplyPaymentGridSelectionChange}
                                  onRowDoubleClick={this.onApplyPaymentGridDoubleSelectionChange}
                                  columns={applyPatientPaymentColumns}
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
                      </div>
                    </TabStripTab>
                    <TabStripTab title="Apply Patient Payments Assignment" selected={"true"}>
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
                                idGetter={idGetterPatientPaymentID}
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
                              // pageChange={this.pageChange}
                              ></GridComponent>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabStripTab>

                  </TabStrip>
                </div>
              </div>
            </PanelBarItem>
          </PanelBar>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientPayments);
