import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import RadioButtonComponent from "../../../components/RadioButton";
import {
  typeList,
  InsuranceCategory,
  guarantorColumns,
  PhysicianColumns,
  patientPaymentColumns,
} from "./patientPaymentsData";
import {
  insuranceColumns,
  methodList,
  insurancePatientColumns,
  PracticeColumns,
  insuranceAssignmentColumns,
} from "../insurance/insurancePaymentsData";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import DatePicker from "../../../components/DatePicker";
import config from "../../../config";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import { SaveLookups } from "../../../redux/actions/lookups";
import NotificationComponent from "../../common/notification";
import {
  resetPatientList,
  getPracticeList,
  resetPracticeList,
} from "../../../redux/actions/patient";
import {
  getguarantorList,
  resetGuarantorList,
} from "../../../redux/actions/claimList";

import PatientFindDialogComponent from "../../common/patientFindDialog";
import { patientColumns } from "../../processPatients/patients/patient/patientData";

const DATA_ITEM_KEY_PATIENT = "patientListgridID";
const idGetterPaient = getter(DATA_ITEM_KEY_PATIENT);
const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);

const DATA_ITEM_KEY_Physician = "entitySID";
const idGetterPhysicianID = getter(DATA_ITEM_KEY_Physician);

const DATA_ITEM_KEY_PATIENT_PAYMENT = "paymentSID";
const idGetterPatientPaymentID = getter(DATA_ITEM_KEY_PATIENT_PAYMENT);
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
    physicians: state.claimList.physicians,
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
  };
}

class PatientPayments extends Component {
  state = {
    method: null,
    methodSelected: 0,
    methodTabSelected: 0,
    patientPaymentExpanded: true,
    patientPaymentDetailsExpanded: false,
    selected: 0,
    refreshFilter: true,
    patientBatch: null,
    patientPhysicianID: null,
    tabSelected: 0,
    patientVisible: false,
    patientSearchText: null,
    patientSelectedState: null,
    patientIDSelectedState: null,
    patientNameSelected: null,
    patientID: null,
    guarantorSelectedState: null,
    guarantorIDSelectedState: null,
    guarantorSelected: null,
    guarantorID: null,
    guarantorSearchText: null,
    guarantorVisible: false,
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
    physicianVisiblePatient: false,
    physicianVisibleSubPatient: false,
    physicianVisibleInsurance: false,
    physicianVisibleSubInsurance: false,
    physicianSearchText: null,
    subInsurancePhysicianID: null,
    subPatientPhysicianID: null,

    practiceVisiblePatient: false,
    practiceVisibleSubPatient: false,
    practiceVisibleInsurance: false,
    practiceVisibleSubInsurance: false,

    patientPracticeID: null,
    insurancePracticeID: null,
    subPatientPracticeID: null,
    subInsurancePracticeID: null,
    practiceSearchText: null,
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
  onSortChange = () => {};
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
          {this.state.guarantorVisible && (
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
                    <div style={{ marginLeft: "15px" }}>
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
                    <div style={{ float: "left" }}>
                      <label className="userInfoLabel">Patient </label>
                    </div>
                    <div className="patientStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownPatients}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={{
                          entityId: this.state.patientID,
                          entityName: this.state.patientNameSelected,
                        }}
                        value={{
                          entityId: this.state.patientID,
                          entityName: this.state.patientNameSelected,
                        }}
                        onChange={(e) =>
                          this.setState({
                            patientSelectedState: e.value?.entityName,
                            patientIDSelectedState: e.value?.entityId,
                            patientNameSelected: e.value?.entityName,
                            patientID: e.value?.entityId,
                          })
                        }
                      ></DropDown>
                    </div>
                    <div>
                      <ButtonComponent
                        icon="search"
                        type="search"
                        classButton="infraBtn-primary find-button"
                        onClick={this.togglePatientDialog}
                        style={{ marginTop: "0px" }}
                      >
                        Find
                      </ButtonComponent>
                    </div>
                    <div>
                      <label className="userInfoLabel">Guarantor </label>
                    </div>
                    <div className="GuarantorStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownGuarantors}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={{
                          entityId: this.state.guarantorID,
                          entityName: this.state.guarantorSelected,
                        }}
                        value={{
                          entityId: this.state.guarantorID,
                          entityName: this.state.guarantorSelected,
                        }}
                        onChange={(e) =>
                          this.setState({
                            guarantorSelectedState: e.value?.entityName,
                            guarantorIDSelectedState: e.value?.entityId,
                            guarantorSelected: e.value?.entityName,
                            guarantorID: e.value?.entityId,
                          })
                        }
                      ></DropDown>
                    </div>
                    <div>
                      <ButtonComponent
                        icon="search"
                        type="search"
                        classButton="infraBtn-primary find-button"
                        onClick={this.toggleGuarantorDialog}
                        style={{ marginTop: "0px" }}
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexFlow: "row", marginLeft: "20px" }}
              >
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    // onClick={() => {
                    //     this.setState({ visibleSaveFilter: true });
                    // }}
                  >
                    Find
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
                        columns={insuranceColumns}
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
                        pageChange={this.pageChange}
                      ></GridComponent>
                    </div>
                  </div>
                </div>
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
                    <TabStripTab
                      title="Patient Payment Details"
                      selected={"true"}
                    >
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ float: "left", marginLeft: "14px" }}>
                          <label className="userInfoLabel">Batch </label>
                        </div>
                        <div style={{ width: "100px" }}>
                          <TextBox
                            className="unifyHeight"
                            value={this.state.batch ?? ""}
                            onChange={(e) => {
                              this.setState({
                                batch: e.value,
                              });
                            }}
                          ></TextBox>
                        </div>
                        <div style={{ marginLeft: "3px" }}>
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
                        <div>
                          <label className="userInfoLabel">Physician </label>
                        </div>
                        <div className="physicianStyle">
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownPhysicians}
                            textField="entityName"
                            dataItemKey="entityId"
                            defaultValue={this.state.subPatientPhysicianID}
                            value={this.state.subPatientPhysicianID}
                            onChange={(e) =>
                              this.setState({
                                subPatientPhysicianID: {
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
                                physicianVisibleSubPatient: true,
                              })
                            }
                          >
                            Find
                          </ButtonComponent>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ float: "left", marginLeft: "5px" }}>
                          <label className="userInfoLabel">Patient </label>
                        </div>
                        <div className="patientStyle">
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownPatients}
                            textField="entityName"
                            dataItemKey="entityId"
                            defaultValue={{
                              entityId: this.state.patientID,
                              entityName: this.state.patientNameSelected,
                            }}
                            value={{
                              entityId: this.state.patientID,
                              entityName: this.state.patientNameSelected,
                            }}
                            onChange={(e) =>
                              this.setState({
                                patientSelectedState: e.value?.entityName,
                                patientIDSelectedState: e.value?.entityId,
                                patientNameSelected: e.value?.entityName,
                                patientID: e.value?.entityId,
                              })
                            }
                          ></DropDown>
                        </div>
                        <div>
                          <ButtonComponent
                            icon="search"
                            type="search"
                            classButton="infraBtn-primary find-button"
                            onClick={this.togglePatientDialog}
                            style={{ marginTop: "0px" }}
                          >
                            Find
                          </ButtonComponent>
                        </div>
                        <div>
                          <label className="userInfoLabel">Guarantor</label>
                        </div>
                        <div className="GuarantorStyle">
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownGuarantors}
                            textField="entityName"
                            dataItemKey="entityId"
                            defaultValue={{
                              entityId: this.state.guarantorID,
                              entityName: this.state.guarantorSelected,
                            }}
                            value={{
                              entityId: this.state.guarantorID,
                              entityName: this.state.guarantorSelected,
                            }}
                            onChange={(e) =>
                              this.setState({
                                guarantorSelectedState: e.value?.entityName,
                                guarantorIDSelectedState: e.value?.entityId,
                                guarantorSelected: e.value?.entityName,
                                guarantorID: e.value?.entityId,
                              })
                            }
                          ></DropDown>
                        </div>
                        <div>
                          <ButtonComponent
                            icon="search"
                            type="search"
                            classButton="infraBtn-primary find-button"
                            onClick={this.toggleGuarantorDialog}
                            style={{ marginTop: "0px" }}
                          >
                            Find
                          </ButtonComponent>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ float: "left" }}>
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
                          <label className="userInfoLabel">On Hold </label>
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
                          <DatePicker
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
                          ></DatePicker>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <fieldset
                          className="fieldsetStyle"
                          style={{
                            width: "700px",
                            marginTop: "5px",
                            height: "250px",
                          }}
                        >
                          <legend
                            className="legendStyle"
                            style={{ paddingRight: "5px", paddingLeft: "5px" }}
                          >
                            Method
                          </legend>
                          <div className="row" style={{ marginLeft: "5px" }}>
                            <RadioButtonComponent
                              name="method"
                              className="userInfoLabel"
                              type="horizontal"
                              items={methodList}
                              selectedValue={this.state.method}
                              handleChange={(e) =>
                                this.setState({ method: e.value })
                              }
                            ></RadioButtonComponent>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexFlow: "row",
                              marginTop: "10px",
                            }}
                          >
                            <TabStrip
                              className="userManagmentTabStrip"
                              selected={this.state.methodTabSelected}
                              onSelect={this.handleMethodTabSelect}
                              style={{ width: "100%" }}
                            >
                              <TabStripTab title="Check" selected={"true"}>
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Bank:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Check #:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Txn Date:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Account #:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      DL #:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                              </TabStripTab>
                              <TabStripTab title="Charge Card">
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Type
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      CC Number:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Card Holder:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Exp Date:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Auth #:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                              </TabStripTab>
                              <TabStripTab title="Electronic Fund Transfer">
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Account #:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Trace Number:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Source:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Dest:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      Authorization:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                                <div
                                  style={{ display: "flex", flexFlow: "row" }}
                                >
                                  <div
                                    style={{ float: "left", marginLeft: "5px" }}
                                  >
                                    <label className="userInfoLabel">
                                      DL #:
                                    </label>
                                  </div>
                                  <div
                                    className="insuranceStyle"
                                    style={{ float: "left" }}
                                  >
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
                              </TabStripTab>
                            </TabStrip>
                          </div>
                        </fieldset>
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
                                pageChange={this.pageChange}
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
