import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import RadioButtonComponent from "../../../components/RadioButton";
import {
  typeList,
  InsuranceCategory,
  insuranceColumns,
  methodList,
  guarantorColumns,
  insurancePatientColumns,
  PracticeColumns,
  PhysicianColumns,
  patientPaymentColumns,
} from "./eraPaymentsData";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import DatePicker from "../../../components/DatePicker";
import config from "../../../config";
import SaveFilterComponent from "../../common/saveFilter";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import { SaveLookups } from "../../../redux/actions/lookups";
import NotificationComponent from "../../common/notification";
import {
  resetPatientList,
  resetInsuranceList,
  getinsuranceList,
  getPracticeList,
  resetPracticeList,
} from "../../../redux/actions/patient";
import {
  resetPhysicianList,
  getPhysicianList,
  getguarantorList,
  resetGuarantorList,
} from "../../../redux/actions/claimList";
import {
  getFilters,
  FilterDelete,
  FilterInsert,
  FilterUpdate,
} from "../../../redux/actions/filter";
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
    getinsuranceList: (name) => dispatch(getinsuranceList(name)),
    resetPatientList: () => dispatch(resetPatientList()),
    resetInsuranceList: () => dispatch(resetInsuranceList()),
    resetGuarantorList: () => dispatch(resetGuarantorList()),
    getFilters: (entity) => dispatch(getFilters(entity)),
    FilterDelete: (filterId) => dispatch(FilterDelete(filterId)),
    FilterInsert: (displayName, body, entity, order, userId) =>
      dispatch(FilterInsert(displayName, body, entity, order, userId)),
    FilterUpdate: (filterId, displayName, body, entity, order, userId) =>
      dispatch(
        FilterUpdate(filterId, displayName, body, entity, order, userId)
      ),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
    getPhysicianList: (name, refreshdata, skip) =>
      dispatch(getPhysicianList(name, refreshdata, skip)),
    resetPhysicianList: () => dispatch(resetPhysicianList()),
    resetPracticeList: () => dispatch(resetPracticeList()),
  };
}

class EraPayments extends Component {
  state = {
    type: "Patient",
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
  getInsuranceFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=paymentInsurance&DisplayName=${filter}`;
  }
  getParacticesUrl(filter) {
    return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
  }
  getPhysiciansUrl(filter) {
    return `${config.baseUrl}/ClaimList/PhysicianGet?sortname=${filter}`;
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
  toggleGuarantorDialog = () => {
    if (this.state.guarantorVisible) {
      this.setState({
        guarantorSearchText: null,
      });
      this.props.resetGuarantorList();
    }
    this.setState({
      guarantorVisible: !this.state.guarantorVisible,
    });
  };
  guarantorsearch = (refreshData, skip) => {
    this.props.getguarantorList(
      this.state.guarantorSearchText,
      refreshData,
      skip
    );
  };
  onGuarantorSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      guarantorSelectedState: selectedDataItems[0].sortName,
      guarantorIDSelectedState: selectedDataItems[0].entitySID,
    });
  };
  onGuarantorDoubleClick = async (event) => {
    await this.setState({
      guarantorSelectedState: event.dataItem.sortName,
      guarantorIDSelectedState: event.dataItem.entitySID,
      guarantorSelected: event.dataItem.sortName,
      guarantorID: event.dataItem.entitySID,
    });
    this.props.SaveLookups(event.dataItem.entitySID, "Guarantor");
    //this.selectGuarantor();
    this.toggleGuarantorDialog();
  };
  onGuarantorKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      guarantorSelectedState: selectedDataItems[0].sortName,
      guarantorIDSelectedState: selectedDataItems[0].entitySID,
    });
  };
  toggleInsuranceDialog = () => {
    if (this.state.insuranceVisible) {
      this.setState({
        insuranceSearchText: null,
      });
      this.props.resetInsuranceList();
    }
    this.setState({
      insuranceVisible: !this.state.insuranceVisible,
    });
  };
  onInsuranceDoubleClick = async (event) => {
    await this.setState({
      insuranceSelectedState: event.dataItem.sortName,
      insuranceIDSelectedState: event.dataItem.entitySID,
      insuranceNameSelected: event.dataItem.sortName,
      insuranceID: event.dataItem.entitySID,
    });
    this.props.SaveLookups(event.dataItem.entitySID, "Insurance");
    //this.selectInsurance();
    this.toggleInsuranceDialog();
  };
  onInsuranceKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      insuranceSelectedState: selectedDataItems[0].sortName,
      insuranceIDSelectedState: selectedDataItems[0].entitySID,
    });
  };
  insuranceSearch = () => {
    this.props.getinsuranceList(this.state.insuranceSearchText);
  };
  onInsuranceSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      insuranceSelectedState: selectedDataItems[0].sortName,
      insuranceIDSelectedState: selectedDataItems[0].entitySID,
    });
  };

  cancelPatientDialog = () => {
    this.setState({
      patientSelectedState: null,
    });
    this.togglePatientDialog();
  };
  cancelGuarantorDialog = () => {
    this.setState({
      guarantorSelectedState: null,
    });
    this.toggleGuarantorDialog();
  };

  cancelInsuranceDialog = () => {
    this.setState({
      insuranceSelectedState: null,
    });
    this.toggleInsuranceDialog();
  };
  toggleSavePatientDialog = () => {
    this.setState({
      visiblePatientSaveFilter: false,
      editPatientFilter: false,
    });
  };
  editcurrentPatientFilter = async () => {
    if (
      this.state.currentPatientFilter &&
      this.state.currentPatientFilter.body
    ) {
      this.setState({ editPatientFilter: true });
    } else {
      this.setState({
        warning: true,
        message: "Please select patient filter to update.",
      });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
    }
  };
  savePatientFilter = async (event) => {
    this.toggleSavePatientDialog();
    var patientListGrid = JSON.stringify({
      patientBatch: this.state.patientBatch,
      patientPracticeID: this.state.patientPracticeID,
      patientPhysicianID: this.state.patientPhysicianID,
      patientID: this.state.patientID,
      patientNameSelected: this.state.patientNameSelected,
      guarantorID: this.state.guarantorID,
      guarantorSelected: this.state.guarantorSelected,
    });
    if (
      this.state.currentPatientFilter &&
      this.state.currentPatientFilter.filterID
    ) {
      let updateFilter = await this.props.FilterUpdate(
        this.state.currentPatientFilter.filterID,
        event,
        patientListGrid,
        "paymentPatient",
        0,
        0
      );
      if (updateFilter) {
        this.setState({
          success: true,
          message: "Edit patient filter succefully ",
        });
        setTimeout(() => {
          this.setState({
            success: false,
          });
        }, this.state.timer);
      } else {
        this.setState({
          error: true,
          message: "Error with Edit patient filter",
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      }
    } else {
      let insertFilter = await this.props.FilterInsert(
        event,
        patientListGrid,
        "paymentPatient",
        0,
        0
      );
      if (insertFilter.saved) {
        this.setState({
          success: true,
          message: "Save patient filter succefully ",
        });
        setTimeout(() => {
          this.setState({
            success: false,
          });
        }, this.state.timer);
      } else if (insertFilter.isExist) {
        this.setState({
          error: true,
          message: "Filter Name is Used, Please Select Another Name",
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      } else {
        this.setState({
          error: true,
          message: "Error with Save patient filter",
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      }
    }

    this.setState({ refreshFilter: false });
    // await this.props.getFilters("patient");
    this.resetPatient();
    this.setState({ refreshFilter: true });
  };
  filterPatientChange = async (event) => {
    if (event && event.value) {
      await this.setState({
        currentPatientFilter: event.value,
      });
      let body = JSON.parse(event.value.body);
      await this.setState({
        patientBatch: body.patientBatch,
        patientPracticeID: body.patientPracticeID,
        patientPhysicianID: body.patientPhysicianID,
        patientID: body.patientID,
        patientNameSelected: body.patientNameSelected,
        guarantorID: body.guarantorID,
        guarantorSelected: body.guarantorSelected,
      });
    } else {
      this.resetPatient();
    }
  };
  resetPatient = (event) => {
    this.setState({
      currentPatientFilter: null,
      patientBatch: null,
      patientPracticeID: null,
      patientPhysicianID: null,
      patientID: null,
      patientNameSelected: null,
      guarantorID: null,
      guarantorSelected: null,
    });
  };
  onSortChange = () => {};
  toggleSaveInsuranceDialog = () => {
    this.setState({
      visibleInsuranceSaveFilter: false,
      editInsuranceFilter: false,
    });
  };
  editcurrentInsuranceFilter = async () => {
    if (
      this.state.currentInsuranceFilter &&
      this.state.currentInsuranceFilter.body
    ) {
      this.setState({ editInsuranceFilter: true });
    } else {
      this.setState({
        warning: true,
        message: "Please select insurance filter to update.",
      });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
    }
  };
  saveInsuranceFilter = async (event) => {
    this.toggleSaveInsuranceDialog();
    var insuranceListGrid = JSON.stringify({
      insuranceBatch: this.state.insuranceBatch,
      insurancePracticeID: this.state.insurancePracticeID,
      insurancePhysicianID: this.state.insurancePhysicianID,
      patientID: this.state.patientID,
      patientNameSelected: this.state.patientNameSelected,
      guarantorID: this.state.guarantorID,
      guarantorSelected: this.state.guarantorSelected,
      insuranceType: this.state.insuranceType,
      insuranceID: this.state.insuranceID,
      insuranceNameSelected: this.state.insuranceNameSelected,
    });
    if (
      this.state.currentPatientFilter &&
      this.state.currentPatientFilter.filterID
    ) {
      let updateFilter = await this.props.FilterUpdate(
        this.state.currentPatientFilter.filterID,
        event,
        insuranceListGrid,
        "paymentInsurance",
        0,
        0
      );
      if (updateFilter) {
        this.setState({
          success: true,
          message: "Edit insurance filter succefully ",
        });
        setTimeout(() => {
          this.setState({
            success: false,
          });
        }, this.state.timer);
      } else {
        this.setState({
          error: true,
          message: "Error with Edit insurance filter",
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      }
    } else {
      let insertFilter = await this.props.FilterInsert(
        event,
        insuranceListGrid,
        "paymentInsurance",
        0,
        0
      );
      if (insertFilter.saved) {
        this.setState({
          success: true,
          message: "Save insurance filter succefully ",
        });
        setTimeout(() => {
          this.setState({
            success: false,
          });
        }, this.state.timer);
      } else if (insertFilter.isExist) {
        this.setState({
          error: true,
          message: "Filter Name is Used, Please Select Another Name",
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      } else {
        this.setState({
          error: true,
          message: "Error with Save insurance filter",
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      }
    }

    this.setState({ refreshFilter: false });
    // await this.props.getFilters("patient");
    this.resetInsurance();
    this.setState({ refreshFilter: true });
  };
  filterInsuranceChange = async (event) => {
    if (event && event.value) {
      await this.setState({
        currentInsuranceFilter: event.value,
      });
      let body = JSON.parse(event.value.body);
      await this.setState({
        insuranceBatch: body.insuranceBatch,
        insurancePracticeID: body.insurancePracticeID,
        insurancePhysicianID: body.insurancePhysicianID,
        patientID: body.patientID,
        patientNameSelected: body.patientNameSelected,
        guarantorID: body.guarantorID,
        guarantorSelected: body.guarantorSelected,
        insuranceType: body.insuranceType,
        insuranceID: body.insuranceID,
        insuranceNameSelected: body.insuranceNameSelected,
      });
    } else {
      this.resetInsurance();
    }
  };
  resetInsurance = (event) => {
    this.setState({
      currentInsuranceFilter: null,
      insuranceBatch: null,
      insurancePracticeID: null,
      insurancePhysicianID: null,
      patientID: null,
      patientNameSelected: null,
      guarantorID: null,
      guarantorSelected: null,
      insuranceType: null,
      insuranceID: null,
      insuranceNameSelected: null,
    });
  };
  physicianSearch = (refreshdata, skip) => {
    this.props.getPhysicianList(
      this.state.physicianSearchText,
      refreshdata,
      skip
    );
  };
  setSelectedPhysican = (entitySID, sortName) => {
    if (this.state.physicianVisiblePatient) {
      this.setState({
        patientPhysicianID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    } else if (this.state.physicianVisibleSubPatient) {
      this.setState({
        subPatientPhysicianID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    } else if (this.state.physicianVisibleInsurance) {
      this.setState({
        insurancePhysicianID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    } else if (this.state.physicianVisibleSubInsurance) {
      this.setState({
        subInsurancePhysicianID: {
          entityName: sortName,
          entityId: entitySID,
        },
      });
    }
  };
  onPhysicianSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setSelectedPhysican(
      selectedDataItems[0].entitySID,
      selectedDataItems[0].sortName
    );
  };
  onPhysicianDoubleClick = async (event) => {
    this.setSelectedPhysican(event.dataItem.entitySID, event.dataItem.sortName);
    this.props.SaveLookups(event.dataItem.entitySID, "Physician");
    //this.selectPatient();
    this.togglePhysicianDialog();
  };
  onPhysicianKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setSelectedPhysican(
      selectedDataItems ? selectedDataItems[0].entitySID : null,
      selectedDataItems ? selectedDataItems[0].sortName : null
    );
  };
  cancelPhysicianDialog = () => {
    this.setState({
      physicianSearchText: null,
    });
    this.togglePhysicianDialog();
  };
  togglePhysicianDialog = () => {
    if (
      this.state.physicianVisiblePatient ||
      this.state.physicianVisibleSubPatient ||
      this.state.physicianVisibleInsurance ||
      this.state.physicianVisibleSubInsurance
    ) {
      this.setState({
        physicianSearchText: null,
      });
      this.props.resetPhysicianList();
    }
    this.setState({
      physicianVisiblePatient: false,
      physicianVisibleSubPatient: false,
      physicianVisibleInsurance: false,
      physicianVisibleSubInsurance: false,
    });
  };
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

          {(this.state.physicianVisiblePatient ||
            this.state.physicianVisibleSubPatient ||
            this.state.physicianVisibleInsurance ||
            this.state.physicianVisibleSubInsurance) && (
            <FindDialogComponent
              title="Physician Search"
              placeholder="Enter Physician Name"
              searcTextBoxValue={this.state.physicianSearchText}
              onTextSearchChange={(e) => {
                this.setState({
                  physicianSearchText: e.value,
                });
              }}
              clickOnSearch={this.physicianSearch}
              dataItemKey="EntitySID"
              data={this.props.physicians}
              columns={PhysicianColumns}
              onSelectionChange={this.onPhysicianSelectionChange}
              onRowDoubleClick={this.onPhysicianDoubleClick}
              onKeyDown={this.onPhysicianKeyDown}
              idGetterLookup={idGetterPhysicianID}
              toggleDialog={this.cancelPhysicianDialog}
              cancelDialog={this.cancelPhysicianDialog}
            ></FindDialogComponent>
          )}
          {this.state.insuranceVisible && (
            <FindDialogComponent
              title="Insurance Search"
              placeholder="Enter Insurance Company Name"
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
          {(this.state.visiblePatientSaveFilter ||
            this.state.editPatientFilter) && (
            <SaveFilterComponent
              toggleSaveDialog={() => {
                this.toggleSavePatientDialog();
              }}
              filterName={
                this.state.currentPatientFilter &&
                this.state.currentPatientFilter.displayName
                  ? this.state.currentPatientFilter.displayName
                  : ""
              }
              saveFilter={this.savePatientFilter}
            ></SaveFilterComponent>
          )}
          {(this.state.visibleInsuranceSaveFilter ||
            this.state.editInsuranceFilter) && (
            <SaveFilterComponent
              toggleSaveDialog={() => {
                this.toggleSaveInsuranceDialog();
              }}
              filterName={
                this.state.currentInsuranceFilter &&
                this.state.currentInsuranceFilter.displayName
                  ? this.state.currentInsuranceFilter.displayName
                  : ""
              }
              saveFilter={this.saveInsuranceFilter}
            ></SaveFilterComponent>
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
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              marginBottom: "10px",
            }}
          >
            <div style={{ float: "left" }}>
              <fieldset
                className="fieldsetStyle"
                style={{
                  width: "240px",
                }}
              >
                <legend
                  className="legendStyle"
                  style={{ paddingRight: "5px", paddingLeft: "5px" }}
                >
                  Type:
                </legend>
                <div
                  style={{
                    marginLeft: "32px",
                  }}
                >
                  <RadioButtonComponent
                    name="TypeList"
                    className="userInfoLabel"
                    items={typeList}
                    type="horizontal"
                    selectedValue={this.state.type}
                    handleChange={(e) =>
                      this.setState({
                        type: e.value,
                        selected: e.value == "Patient" ? 0 : 1,
                      })
                    }
                  ></RadioButtonComponent>
                </div>
              </fieldset>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
            <div style={{ float: "left", width: "100%" }}>
              <TabStrip
                className="userManagmentTabStrip"
                selected={this.state.selected}
                onSelect={this.handleSelect}
                style={{ width: "100%" }}
              >
                <TabStripTab title="Patient" selected={"true"}>
                  <div style={{ display: "flex", flexFlow: "row wrap" }}>
                    <div style={{ width: "285px" }}>
                      <div style={{ float: "left", marginLeft: "13px" }}>
                        <label className="userInfoLabel">Filter</label>
                      </div>
                      {this.state.refreshFilter && (
                        <div className="filterStyle" style={{ float: "left" }}>
                          <DropDown
                            className="unifyHeight"
                            id="patientFilter"
                            name="patientFilter"
                            type="remoteDropDown"
                            textField="displayName"
                            dataItemKey="filterID"
                            value={this.state.currentPatientFilter}
                            getBaseUrl={() => this.getPatientFilters("")}
                            onChange={(event) =>
                              this.filterPatientChange(event)
                            }
                          ></DropDown>
                        </div>
                      )}
                    </div>
                    <div style={{ float: "left", width: "430px" }}>
                      <ButtonComponent
                        type="edit"
                        icon="edit"
                        classButton="infraBtn-primary action-button"
                        style={{ marginTop: "0px" }}
                        onClick={() => {
                          this.setState({ visiblePatientSaveFilter: true });
                        }}
                      >
                        Save
                      </ButtonComponent>
                      <ButtonComponent
                        type="edit"
                        icon="reset"
                        classButton="infraBtn-primary action-button"
                        onClick={this.resetPatient}
                        style={{ marginTop: "0px" }}
                      >
                        Reset
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "9px" }}>
                      <label className="userInfoLabel">Batch </label>
                    </div>
                    <div style={{ width: "100px" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.patientBatch ?? ""}
                        onChange={(e) => {
                          this.setState({
                            patientBatch: e.value,
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
                    <div>
                      <label className="userInfoLabel">Physician </label>
                    </div>
                    <div className="physicianStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownPhysicians}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={this.state.patientPhysicianID}
                        value={this.state.patientPhysicianID}
                        onChange={(e) =>
                          this.setState({
                            patientPhysicianID: {
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
                          this.setState({ physicianVisiblePatient: true })
                        }
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
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
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">Plan </label>
                    </div>
                    <div className="insPlan" style={{ float: "left" }}>
                      <DropDown
                        disabled={true}
                        data={InsuranceCategory}
                        textField="text"
                        dataItemKey="id"
                        className="unifyHeight"
                        id="ins"
                        name="ins"
                        value={this.state.insuranceType}
                        onChange={(e) =>
                          this.setState({ insuranceType: e.value })
                        }
                      ></DropDown>
                    </div>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Insurance Company</label>
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
                        disabled={true}
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
                        disabled={true}
                        style={{ marginTop: "0px" }}
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                </TabStripTab>
                <TabStripTab title="Insurance">
                  <div style={{ display: "flex", flexFlow: "row wrap" }}>
                    <div style={{ width: "285px" }}>
                      <div style={{ float: "left", marginLeft: "13px" }}>
                        <label className="userInfoLabel">Filter</label>
                      </div>
                      {this.state.refreshFilter && (
                        <div className="filterStyle" style={{ float: "left" }}>
                          <DropDown
                            className="unifyHeight"
                            id="patientFilter"
                            name="patientFilter"
                            type="remoteDropDown"
                            textField="displayName"
                            dataItemKey="filterID"
                            value={this.state.currentInsuranceFilter}
                            getBaseUrl={() => this.getInsuranceFilters("")}
                            onChange={(event) =>
                              this.filterInsuranceChange(event)
                            }
                          ></DropDown>
                        </div>
                      )}
                    </div>
                    <div style={{ float: "left", width: "430px" }}>
                      <ButtonComponent
                        type="edit"
                        icon="edit"
                        classButton="infraBtn-primary action-button"
                        onClick={() => {
                          this.setState({ visibleInsuranceSaveFilter: true });
                        }}
                        style={{ marginTop: "0px" }}
                      >
                        Save
                      </ButtonComponent>
                      <ButtonComponent
                        type="edit"
                        icon="reset"
                        classButton="infraBtn-primary action-button"
                        onClick={this.resetInsurance}
                        style={{ marginTop: "0px" }}
                      >
                        Reset
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "9px" }}>
                      <label className="userInfoLabel">Batch </label>
                    </div>
                    <div style={{ width: "100px" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.insuranceBatch ?? ""}
                        onChange={(e) => {
                          this.setState({
                            insuranceBatch: e.value,
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
                    <div>
                      <label className="userInfoLabel">Physician </label>
                    </div>
                    <div className="physicianStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownPhysicians}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={this.state.insurancePhysicianID}
                        value={this.state.insurancePhysicianID}
                        onChange={(e) =>
                          this.setState({
                            insurancePhysicianID: {
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
                          this.setState({ physicianVisibleInsurance: true })
                        }
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <label className="userInfoLabel">Patient </label>
                    </div>
                    <div style={{ width: "160px" }}>
                      <DropDown
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
                        style={{ marginTop: "0px" }}
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">Plan </label>
                    </div>
                    <div className="insPlan" style={{ float: "left" }}>
                      <DropDown
                        data={InsuranceCategory}
                        textField="text"
                        dataItemKey="id"
                        className="unifyHeight"
                        id="ins"
                        name="ins"
                        value={this.state.insuranceType}
                        onChange={(e) =>
                          this.setState({ insuranceType: e.value })
                        }
                      ></DropDown>
                    </div>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Insurance Company</label>
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
                </TabStripTab>
              </TabStrip>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row" }}>
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
            <TabStrip
              className="userManagmentTabStrip"
              selected={this.state.selected}
              onSelect={this.handleSelect}
              style={{ width: "100%" }}
            >
              <TabStripTab
                title="Patient Payment List"
                selected={"true"}
                style={{ width: "100%" }}
              >
                <div
                  className="accordion"
                  id="accordionSummary"
                  style={{ marginBottom: "35px", width: "100%" }}
                >
                  <div
                    className="card bg-light mb-3"
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionSummary"
                    >
                      <GridComponent
                        id="findPayment1"
                        columns={patientPaymentColumns}
                        sortColumns={[]}
                        onSortChange={this.onSortChange}
                      ></GridComponent>
                    </div>
                  </div>
                </div>
              </TabStripTab>
              <TabStripTab
                title="Insurance Payment List"
                style={{ width: "100%" }}
              >
                <div
                  className="accordion"
                  id="accordionSummary"
                  style={{ marginBottom: "35px", width: "100%" }}
                >
                  <div
                    className="card bg-light mb-3"
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionSummary"
                    >
                      <GridComponent
                        id="findPayment2"
                        columns={insuranceColumns}
                        sortColumns={[]}
                        onSortChange={this.onSortChange}
                      ></GridComponent>
                    </div>
                  </div>
                </div>
              </TabStripTab>
            </TabStrip>
          </div>
          <div
            style={{ marginTop: "5px", marginBottom: "30px", width: "100%" }}
          >
            <div style={{ display: "flex", flexFlow: "row" }}>
              <TabStrip
                className="userManagmentTabStrip"
                selected={this.state.tabSelected}
                onSelect={this.handleTabSelect}
                style={{ width: "100%" }}
              >
                <TabStripTab title="Patient" selected={"true"}>
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
                          this.setState({ physicianVisibleSubPatient: true })
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
                </TabStripTab>
                <TabStripTab title="Insurance">
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "28px" }}>
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
                          this.setState({ practiceVisibleSubInsurance: true })
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
                        defaultValue={this.state.subInsurancePhysicianID}
                        value={this.state.subInsurancePhysicianID}
                        onChange={(e) =>
                          this.setState({
                            subInsurancePhysicianID: {
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
                          this.setState({ physicianVisibleSubInsurance: true })
                        }
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Insurance </label>
                    </div>
                    <div className="insuranceStyle" style={{ float: "left" }}>
                      <DropDown
                        disabled={true}
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
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left", marginLeft: "12px" }}>
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
                        value={
                          this.state.currentInsurance != null &&
                          this.state.currentInsurance.endDate
                            ? new Date(this.state.currentInsurance.endDate)
                            : null
                        }
                        onChange={(e) =>
                          this.setState({ PlanEndDate: e.value })
                        }
                      ></DatePicker>
                    </div>
                  </div>
                </TabStripTab>
                <TabStripTab title="Notes"></TabStripTab>
              </TabStrip>
            </div>
            <div style={{ display: "flex", flexFlow: "row" }}>
              <fieldset
                className="fieldsetStyle"
                style={{
                  width: "400px",
                  marginTop: "5px",
                  height: "50px",
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
                    onChange={(e) => this.setState({ method: e.value })}
                  ></RadioButtonComponent>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EraPayments);
