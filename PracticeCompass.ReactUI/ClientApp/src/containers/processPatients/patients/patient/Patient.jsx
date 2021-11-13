import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ButtonComponent from "../../../../components/Button";
import GridComponent from "../../../../components/Grid";
import DropDown from "../../../../components/DropDown";
import TextBox from "../../../../components/TextBox";
import DatePickerComponent from "../../../../components/DatePicker";
import "./Patient.css";
import config from "../../../../../src/config";
import { getter } from "@progress/kendo-react-common";
import {
  patientColumns,
  insuranceColumns,
  columns,
  DOBFilter,
  sortColumns,
  patientFilter,
  BalanceList,
  patientSort,
  insuranceSort,
  PlanCategory,
  PracticeColumns,
  PatientTypesColumns,
} from "./patientData.js";
import {
  getPatients,
  getPracticeList,
  resetPatientList,
  resetPracticeList,
  resetInsuranceList,
  getinsuranceList,
  getpatientFilters,
  getpatientTypes,
  resetPatientTypeList,
} from "../../../../redux/actions/patient";
import {
  GetGridColumns,
  SaveGridColumns,
} from "../../../../redux/actions/GridColumns";
import {
  getFilters,
  FilterDelete,
  FilterInsert,
  FilterUpdate,
} from "../../../../redux/actions/filter";
import { SaveLookups } from "../../../../redux/actions/lookups";
import SaveFilterComponent from "../../../common/saveFilter";
import DeleteDialogComponent from "../../../common/deleteDialog";
import NotificationComponent from "../../../common/notification";
import FindDialogComponent from "../../../common/findDialog";
import PatientFindDialogComponent from "../../../common/patientFindDialog";
import Show_HideDialogComponent from "../../../common/show_hideDialog";
import CheckboxComponent from "../../../../components/Checkbox";
function mapStateToProps(state) {
  return {
    patientTypes: state.patients.patientTypes,
    patientFilter: state.patients.patientFilter,
    paractices: state.patients.paractices,
    Patients: state.patients.patients,
    patientList: state.patients.patientList,
    insuranceList: state.patients.insuranceList,
    dropDownPatients: state.lookups.patients,
    dropDownInsurance: state.lookups.insurances,
    dropDownPractices: state.lookups.practices,
    dropDownPatientTypes: state.lookups.patientTypes,
    dropDownPhysicians: state.lookups.physicians,
    practiceList: state.patients.paractices,
    UiExpand:state.ui.UiExpand
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetGridColumns: (name) => dispatch(GetGridColumns(name)),
    SaveGridColumns: (name, columns) =>
      dispatch(SaveGridColumns(name, columns)),
    getpatientFilters: (sortname) => dispatch(getpatientFilters(sortname)),
    getPatients: (patientGrid, refreshData) =>
      dispatch(getPatients(patientGrid, refreshData)),
    // getPatientList: (name) => dispatch(getpatientList(name)),
    getinsuranceList: (name, refreshData, skip) =>
      dispatch(getinsuranceList(name, refreshData, skip)),
    resetPatientList: () => dispatch(resetPatientList()),
    resetPracticeList: () => dispatch(resetPracticeList()),
    resetPatientTypeList: () => dispatch(resetPatientTypeList()),
    resetInsuranceList: () => dispatch(resetInsuranceList()),
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
    getpatientTypes: (name) => dispatch(getpatientTypes(name)),
  };
}
const DATA_ITEM_KEY_PATIENTlIST = "patientgridID";
const idGetterPaientList = getter(DATA_ITEM_KEY_PATIENTlIST);

const DATA_ITEM_KEY_PATIENT = "patientListgridID";
const idGetterPaient = getter(DATA_ITEM_KEY_PATIENT);
const DATA_ITEM_KEY_PATIENT_TYPE = "lookupCode";
const idGetterPaientYype = getter(DATA_ITEM_KEY_PATIENT_TYPE);

const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);

const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
class Patient extends Component {
  state = {
    patientNameSelected: null,
    insuranceNameSelected: null,
    selectedPatient: null,
    selectedInsurance: null,
    patientType: null,
    dnLastName: null,
    dnFirstName: null,
    // dobtype: null,
    balanceType: null,
    insuranceType: null,
    // dndob: null,
    balance: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    email: null,
    patientVisible: false,
    insuranceVisible: false,
    patientSearchText: "",
    insuranceSearchText: "",
    patientDataItemKey: "sortName",
    insuranceDataItemKey: "sortName",
    currentFilter: {},
    refreshFilter: true,
    visibleSaveFilter: false,
    visibleDeleteDialog: false,
    editFilter: false,
    success: false,
    none: false,
    error: false,
    warning: false,
    info: false,
    timer: 5000,
    editFilterDialog: false,
    selectedPractice: null,
    patientTypeVisible: false,
    patientTypeSearchText: null,
    skip: 0,
    take: 23,
    refreshPaging: true,
    Show_HideDialogVisible: false,
    refreshGrid: true,
    noBalancePatients: false,
    isVisibleNextData: false,
    selectedSortColumn: null,
    sortDirection: null,
    patientListColumns: columns,
  };
  // getPatientTypeUrl(filter) {
  //   return `${config.baseUrl}/patient/PatientTypesGet?description=${filter}`;
  // }
  getFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=patient&DisplayName=${filter}`;
  }
  componentDidMount() {
    // this.props.getpatientFilters("");
    //this.props.getPatients(null);
    this.getGridColumns();
  }
  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns("patientGrid");
    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns) ?? columns;
      this.setState({ patientListColumns: currentColumns });
    }
    this.setState({ refreshGrid: true });
  };
  delete = async () => {
    if (this.state.currentFilter && this.state.currentFilter.displayName) {
      {
        this.toggleDeleteDialog();
      }
    } else {
      this.setState({
        warning: true,
        message: "Please Select filter to Delete.",
      });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
      //this.setState({ confirmMessage: true });
    }
  };
  editFilterConfirm = () => {
    this.setState({ editFilterDialog: false });
  };
  pageChange = async (skip, take) => {
    if (skip == 0) return;
    if (this.props.Patients.length < skip + take + 1) {
      this.setState({
        isVisibleNextData: true,
        skip: this.props.Patients.length,
      });
      this.getNextData();
    } else {
      this.setState({ isVisibleNextData: false });
    }
  };
  getNextData = async () => {
    await this.patientGridSearch(false);
    this.setState({ isVisibleNextData: false });
  };
  deleteFilter = async (filterID) => {
    let deleteFilter = await this.props.FilterDelete(filterID);
    if (deleteFilter) {
      this.setState({ success: true, message: "delete filter succefully " });
      setTimeout(() => {
        this.setState({
          success: false,
        });
      }, this.state.timer);
    } else {
      this.setState({ error: true, message: "Error wit delete filter" });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
    }
    this.toggleDeleteDialog();
    this.setState({ refreshFilter: false });
    this.reset();
    //await this.getpatientFilters("");
    this.setState({ refreshFilter: true });
  };
  // patientsearch = () => {
  //   this.props.getPatientList(this.state.patientSearchText);
  // };
  practiceSearch = () => {
    this.props.getPracticeList(this.state.practiceSearchText);
  };
  insuranceSearch = (refreshData = true, skip = 0) => {
    this.props.getinsuranceList(
      this.state.insuranceSearchText,
      refreshData,
      skip
    );
  };
  patientTypeSearch = () => {
    this.props.getpatientTypes(this.state.patientTypeSearchText);
  };
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
  toggleShowColumnsDialog = () => {
    this.setState({ Show_HideDialogVisible: false });
  };
  SaveColumnsShow = async (columns) => {
    if (!columns.find((x) => x.hide != true)) {
      this.setState({ Show_HideDialogVisible: false });
      this.setState({ warning: true, message: "Cann't hide all columns" });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
      return;
    } else {
      this.setState({ refreshGrid: false });
      //localStorage.setItem("patientGrid", JSON.stringify(columns));
      let GridColumns = await this.props.SaveGridColumns(
        "patientGrid",
        JSON.stringify(columns)
      );
      this.setState({
        patientListColumns: JSON.parse(GridColumns?.columns),
        Show_HideDialogVisible: false,
      });
      this.setState({ Show_HideDialogVisible: false });
      setTimeout(() => {
        this.setState({ refreshGrid: true });
      }, 10);
    }
  };
  toggleDeleteDialog = () => {
    this.setState({
      visibleDeleteDialog: !this.state.visibleDeleteDialog,
      confirmMessage: false,
    });
  };
  closeConfirmMessage = () => {
    this.setState({
      confirmMessage: false,
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
  onPracticeSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      selectedPractice: {
        entityId: selectedDataItems[0].practiceID,
        entityName: selectedDataItems[0].sortName,
      },
    });
  };
  onPatientTypeSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      patientType: {
        entityName: selectedDataItems[0].description,
        entityId: selectedDataItems[0].lookupCode,
      },
    });
  };
  onPatientSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      selectedPatient: {
        entityId: selectedDataItems[0].patientID,
        entityName: selectedDataItems[0].sortName,
      },
    });
  };
  onPatientGridSelectionChange = (event) => {
    this.props.setPatientDetails(
      event.dataItems == null || event.dataItems.length == 0
        ? event.dataItem
        : event.dataItems[event.endRowIndex]
    );
  };
  onPatientGridDoubleSelectionChange = (event) => {
    this.props.setPatientDetails(
      event.dataItems == null || event.dataItems.length == 0
        ? event.dataItem
        : event.dataItems[event.endRowIndex]
    );
    this.props.setPatientDetailExpanded();
  };
  onPatientDoubleClick = async (event) => {
    this.setState({
      selectedPatient: {
        entityId: event.dataItem.patientID,
        entityName: event.dataItem.sortName,
      },
    });
    this.props.SaveLookups(event.dataItem.patientID, "Patient");
    //this.selectPatient();
    this.togglePatientDialog();
  };
  onPracticeDoubleClick = async (event) => {
    this.setState({
      selectedPractice: {
        entityId: event.dataItem.practiceID,
        entityName: event.dataItem.sortName,
      },
    });
    this.props.SaveLookups(event.dataItem.practiceID, "Practice");
    //this.selectPatient();
    this.togglePracticeDialog();
  };
  // onPracticeDoubleClick = async (event) => {
  //   this.setState({
  //     selectedPractice: {
  //       entityId: event.dataItem.practiceID,
  //       entityName: event.dataItem.sortName,
  //     },
  //   });
  //   this.props.SaveLookups(event.dataItem.practiceID, "Practice");
  //   //this.selectPatient();
  //   this.togglePracticeDialog();
  // };
  onPatientTypeDoubleClick = async (event) => {
    this.setState({
      patientType: {
        entityName: event.dataItem.description,
        entityId: event.dataItem.lookupCode,
      },
    });
    this.props.SaveLookups(event.dataItem.lookupCode, "PatientType");
    //this.selectPatient();
    this.togglePatientTypeDialog();
  };
  onPatientKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      patientSelectedState: selectedDataItems
        ? selectedDataItems[0].sortName
        : null,
      patientIDSelectedState: selectedDataItems
        ? selectedDataItems[0].patientID
        : null,
    });
  };
  onPracticeKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      selectedPractice: {
        entityId: selectedDataItems ? selectedDataItems[0].practiceID : null,
        entityName: selectedDataItems ? selectedDataItems[0].sortName : null,
      },
    });
  };
  onPatientTypeKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      patientType: selectedDataItems[0]
        ? {
          entityName: selectedDataItems[0].description,
          entityId: selectedDataItems[0].lookupCode,
        }
        : null,
    });
  };
  revertChange = async () => {
    if (this.state.currentFilter && this.state.currentFilter.body) {
      let body = JSON.parse(this.state.currentFilter.body);
      await this.setState({
        patientNameSelected: body.PatientName,
        selectedPatient: body.selectedPatient,
        selectedPractice: body.selectedPractice,
        // dobtype: body.DOBType,
        // dndob: body.DOBvalue ? new Date(body.DOBvalue) : null,
        patientType: body.PatientClass,
        balanceType: body.BalanceType,
        balance: body.BalanceValue,
        insuranceType: body.InsuranceType,
        selectedInsurance: body.selectedInsurance,
        noBalancePatients: body.NoBalancePatients,
      });
    } else {
      this.reset();
    }
  };
  onSortChange = async (column, sort) => {
    await this.setState({
      selectedSortColumn: column,
      sortDirection: sort,
    });
    this.patientGridSearch();
  };
  filterChange = async (event) => {
    if (event && event.value) {
      await this.setState({
        currentFilter: event.value,
      });
      let body = JSON.parse(event.value.body);
      if (
        body.selectedPractice != null &&
        body.selectedPractice.entityId != null &&
        (this.props.dropDownPractices == null ||
          this.props.dropDownPractices.filter(
            (x) => x.entityId == body.selectedPractice.entityId
          ).length == 0)
      ) {
        await this.props.SaveLookups(
          body.selectedPractice.entityId,
          "Practice"
        );
      }
      if (
        body.selectedPatient != null &&
        body.selectedPatient.entityId != null &&
        (this.props.dropDownPatients == null ||
          this.props.dropDownPatients.filter(
            (x) => x.entityId == body.selectedPatient.entityId
          ).length == 0)
      ) {
        await this.props.SaveLookups(body.selectedPatient.entityId, "Patient");
      }
      if (
        body.PatientClass != null &&
        body.PatientClass.entityId != null &&
        (this.props.dropDownPatientTypes == null ||
          this.props.dropDownPatientTypes.filter(
            (x) => x.entityId == body.PatientClass.entityId
          ).length == 0)
      ) {
        await this.props.SaveLookups(body.PatientClass.entityId, "PatientType");
      }
      if (
        body.selectedInsurance != null &&
        body.selectedInsurance.entityId != null &&
        (this.props.dropDownInsurance == null ||
          this.props.dropDownInsurance.filter(
            (x) => x.entityId == body.selectedInsurance.entityId
          ).length == 0)
      ) {
        await this.props.SaveLookups(
          body.selectedInsurance.entityId,
          "Insurance"
        );
      }

      await this.setState({
        patientNameSelected: body.PatientName,
        selectedPatient: body.selectedPatient,
        selectedPractice: body.selectedPractice,
        // dobtype: body.DOBType,
        // dndob: body.DOBvalue ? new Date(body.DOBvalue) : null,
        patientType: body.PatientClass,
        balanceType: body.BalanceType,
        balance: body.BalanceValue,
        insuranceType: body.InsuranceType,
        selectedInsurance: body.selectedInsurance,
        noBalancePatients: body.NoBalancePatients,
      });
    } else {
      this.reset();
    }
  };
  reset = () => {
    this.setState({
      currentFilter: null,
      selectedPatient: null,
      insuranceID: null,
      patientNameSelected: null,
      selectedPractice: null,
      // dobtype: null,
      // dndob: null,
      patientType: null,
      balanceType: null,
      balance: null,
      insuranceType: null,
      selectedInsurance: null,
      patientSearchText: "",
      insuranceSearchText: "",
      patientSelectedState: "",
      noBalancePatients: false,
    });
  };
  onInsuranceSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      selectedInsurance: {
        entityId: selectedDataItems[0].entitySID,
        entityName: selectedDataItems[0].sortName,
      },
    });
  };
  onInsuranceDoubleClick = async (event) => {
    await this.setState({
      selectedInsurance: {
        entityId: event.dataItem.entitySID,
        entityName: event.dataItem.sortName,
      },
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
      selectedInsurance: {
        entityId: selectedDataItems[0].entitySID,
        entityName: selectedDataItems[0].sortName,
      },
    });
  };
  toggleSaveDialog = () => {
    this.setState({ visibleSaveFilter: false, editFilter: false });
  };
  editcurrentFilter = async () => {
    if (this.state.currentFilter && this.state.currentFilter.body) {
      this.setState({ editFilter: true });
    } else {
      this.setState({ editFilterDialog: true });
    }
  };
  saveFilter = async (event) => {
    this.toggleSaveDialog();
    var patientGrid = JSON.stringify({
      PatientName: this.state.patientNameSelected
        ? this.state.patientNameSelected
        : null,
      selectedPatient: this.state.selectedPatient
        ? this.state.selectedPatient
        : null,
      selectedPractice: this.state.selectedPractice
        ? this.state.selectedPractice
        : null,
      // DOBType: this.state.dobtype ? this.state.dobtype : null,
      // DOBvalue: this.state.dndob ? this.state.dndob : null,
      PatientClass: this.state.patientType ? this.state.patientType : null,
      BalanceType: this.state.balanceType ? this.state.balanceType : null,
      BalanceValue: this.state.balance ? this.state.balance : null,
      InsuranceType: this.state.insuranceType ? this.state.insuranceType : null,
      selectedInsurance: this.state.selectedInsurance
        ? this.state.selectedInsurance
        : null,
      NoBalancePatients: this.state.noBalancePatients
        ? this.state.noBalancePatients
        : false,
    });
    if (this.state.currentFilter && this.state.currentFilter.filterID) {
      let updateFilter = await this.props.FilterUpdate(
        this.state.currentFilter.filterID,
        event,
        patientGrid,
        "patient",
        0,
        0
      );
      if (updateFilter) {
        this.setState({ success: true, message: "Edit filter succefully " });
        setTimeout(() => {
          this.setState({
            success: false,
          });
        }, this.state.timer);
      } else {
        this.setState({ error: true, message: "Error with Edit filter" });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      }
    } else {
      let insertFilter = await this.props.FilterInsert(
        event,
        patientGrid,
        "patient",
        0,
        0
      );
      if (insertFilter.saved) {
        this.setState({ success: true, message: "Save filter succefully " });
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
        this.setState({ error: true, message: "Error with Save filter" });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      }
    }
    this.setState({ refreshFilter: false });
    // await this.props.getFilters("patient");
    this.reset();
    this.setState({ refreshFilter: true });
  };
  cancelPatientDialog = () => {
    this.setState({
      patientSelectedState: null,
    });
    this.togglePatientDialog();
  };
  cancelPracticeDialog = () => {
    this.setState({
      practiceSearchText: null,
    });
    this.togglePracticeDialog();
  };
  togglePracticeDialog = () => {
    if (this.state.practiceVisible) {
      this.setState({
        practiceSearchText: null,
      });
      this.props.resetPracticeList();
    }
    this.setState({
      practiceVisible: !this.state.practiceVisible,
    });
  };
  cancelPatientTypeDialog = () => {
    this.setState({
      patientTypeSearchText: null,
    });
    this.togglePatientTypeDialog();
  };
  togglePatientTypeDialog = () => {
    if (this.state.patientTypeVisible) {
      this.setState({
        patientTypeSearchText: null,
      });
      this.props.resetPatientTypeList();
    }
    this.setState({
      patientTypeVisible: !this.state.patientTypeVisible,
    });
  };
  cancelInsuranceDialog = () => {
    this.setState({
      selectedInsurance: null,
    });
    this.toggleInsuranceDialog();
  };
  patientGridSearch = async (refreshData = true) => {
    var patientGrid = {
      PatientID: this.state.selectedPatient
        ? this.state.selectedPatient.entityId
        : 0,
      PracticeID: this.state.selectedPractice
        ? this.state.selectedPractice.entityId
        : 0,
      // DOBType: this.state.dobtype ? this.state.dobtype.id : 0,
      // DOBvalue: this.state.dndob ? this.state.dndob.toLocaleDateString() : null,
      PatientClass: this.state.patientType
        ? this.state.patientType.entityId
        : null,
      BalanceType: this.state.balanceType ? this.state.balanceType.id : 0,
      BalanceValue: this.state.balance ? Number(this.state.balance) : 0,
      InsuranceType: this.state.insuranceType ? this.state.insuranceType.id : 0,
      InsurancID: this.state.insuranceID ? this.state.insuranceID : 0,
      skip: refreshData ? 0 : this.props.Patients.length,
      take: this.state.take,
      NoBalancePatients: this.state.noBalancePatients,
      SortColumn: this.state.selectedSortColumn
        ? this.state.selectedSortColumn
        : "",
      SortDirection: this.state.sortDirection ? this.state.sortDirection : "",
    };
    await this.props.getPatients(patientGrid, refreshData);
  };
  closeNotification = () => {
    this.setState({
      success: false,
      error: false,
      warning: false,
      info: false,
      none: false,
    });
  };
  render() {
    // if (this.props.Patients.count != this.state.count)
    //   this.setState({ count: this.props.Patients.count, skip: 0 });
    return (
      <Fragment>
        <div
          style={{
            marginLeft: "20px",
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
          {this.state.confirmMessage && (
            <DeleteDialogComponent
              title="Select Filter"
              toggleDeleteDialog={this.closeConfirmMessage}
              deleteMessage={`Please select filter to delete it`}
              hideCancel={true}
              deleteFilter={this.closeConfirmMessage}
            ></DeleteDialogComponent>
          )}
          {this.state.visibleDeleteDialog && (
            <DeleteDialogComponent
              title="Delete Patient Filter"
              toggleDeleteDialog={this.toggleDeleteDialog}
              deleteMessage={`Are you sure you wish to delete Patient Filter : ${this.state.currentFilter && this.state.currentFilter.displayName
                  ? this.state.currentFilter.displayName
                  : ""
                }?`}
              currentFilterID={this.state.currentFilter.filterID}
              deleteFilter={this.deleteFilter}
            ></DeleteDialogComponent>
          )}
          {this.state.editFilterDialog && (
            <DeleteDialogComponent
              hideCancel={true}
              title="Edit Patient Filter"
              toggleDeleteDialog={this.toggleDeleteDialog}
              deleteMessage={`Please select filter to update.`}
              currentFilterID={this.state.currentFilter?.filterID}
              deleteFilter={this.editFilterConfirm}
            ></DeleteDialogComponent>
          )}
          {(this.state.visibleSaveFilter || this.state.editFilter) && (
            <SaveFilterComponent
              toggleSaveDialog={() => {
                this.toggleSaveDialog();
              }}
              filterName={
                this.state.currentFilter && this.state.currentFilter.displayName
                  ? this.state.currentFilter.displayName
                  : ""
              }
              saveFilter={this.saveFilter}
            ></SaveFilterComponent>
          )}
          <div style={{ width: "100%" }}>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ width: "320px" }}>
                <div style={{ float: "left", marginLeft: "41px" }}>
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
                      value={this.state.currentFilter}
                      getBaseUrl={() => this.getFilters("")}
                      onChange={(event) => this.filterChange(event)}
                    ></DropDown>
                  </div>
                )}
              </div>
              <div style={{ float: "left", width: "210px" }}>
                <ButtonComponent
                  type="edit"
                  icon="edit"
                  classButton="infraBtn-primary action-button"
                  onClick={() => {
                    this.setState({ visibleSaveFilter: true });
                  }}
                >
                  Save
                </ButtonComponent>
                <ButtonComponent
                  type="delete"
                  icon="delete"
                  classButton="infraBtn-primary action-button"
                  onClick={this.delete}
                >
                  Delete
                </ButtonComponent>
                <ButtonComponent
                  type="edit"
                  icon="reset"
                  classButton="infraBtn-primary action-button"
                  onClick={this.reset}
                >
                  Reset
                </ButtonComponent>
              </div>
            </div>

            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ width: "335px" }}>
                <div style={{ float: "left", marginLeft: "30px" }}>
                  <label className="userInfoLabel">Patient</label>
                </div>
                <div className="patientStyle" style={{ float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownPatients}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={this.state.selectedPatient}
                    value={this.state.selectedPatient}
                    onChange={(e) =>
                      this.setState({
                        selectedPatient: {
                          entityId: e.value?.entityId,
                          entityName: e.value?.entityName,
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
                    onClick={this.togglePatientDialog}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
              <div style={{ float: "left", width: "536px" }}>
                {/* <label
                  className="userInfoLabel"
                  style={{ float: "left" }}
                >
                  Practice{" "}
                </label> */}
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <label className="userInfoLabel">Practice</label>
                </div>
                <div className="PracticeStyle" style={{ float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownPractices}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={this.state.selectedPractice}
                    value={this.state.selectedPractice}
                    onChange={(e) =>
                      this.setState({
                        selectedPractice: {
                          entityId: e.value?.entityId,
                          entityName: e.value?.entityName,
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
                    onClick={(e) => this.setState({ practiceVisible: true })}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
            </div>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              {/* <div style={{ float: "left", width: "341px" }}>
                <div style={{ float: "left" }}>
                  <label
                    className="userInfoLabel"
                    style={{ marginLeft: "6px" }}
                  >
                    DOB
                  </label>
                </div> 
                 <div
                  style={{ float: "left", width: "148px", marginRight: "3px" }}
                >
                  <DropDown
                    className="unifyHeight"
                    id="DOB"
                    name="DOB"
                    data={DOBFilter}
                    textField="text"
                    dataItemKey="text"
                    defaultValue={this.state.dobtype}
                    value={this.state.dobtype}
                    onChange={(e) => this.setState({ dobtype: e.value })}
                  ></DropDown>
                </div>
                <div style={{ float: "left", width: "150px" }}>
                  <DatePickerComponent
                    className="unifyHeight"
                    placeholder="MM/DD/YYYY"
                    format="M/dd/yyyy"
                    value={this.state.dndob}
                    onChange={(e) => this.setState({ dndob: e.value })}
                  ></DatePickerComponent>
                </div> 
              </div> */}
              <div style={{ float: "left", width: "505px" }}>
                <div style={{ float: "left" }}>
                  <label className="userInfoLabel">Patient Type</label>
                </div>
                <div className="patientTypeStyle" style={{ float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownPatientTypes}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={this.state.patientType}
                    value={this.state.patientType}
                    onChange={(e) =>
                      this.setState({
                        patientType: e.value,
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
                    onClick={(e) => this.setState({ patientTypeVisible: true })}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
              <div style={{ float: "left" }}>
                <div style={{ float: "left" }}>
                  <label className="userInfoLabel">Balance</label>
                </div>
                <div
                  style={{
                    float: "left",
                    width: "150px",
                    marginRight: "3px",
                  }}
                >
                  <DropDown
                    className="unifyHeight"
                    id="balance"
                    name="balance"
                    data={BalanceList}
                    textField="text"
                    dataItemKey="id"
                    defaultValue={this.state.balanceType}
                    value={this.state.balanceType}
                    onChange={(e) => this.setState({ balanceType: e.value })}
                  ></DropDown>
                </div>
                <div style={{ float: "left", width: "80px" }}>
                  <TextBox
                    type="numeric"
                    className="unifyHeight"
                    format="c2"
                    value={this.state.balance}
                    onChange={(e) =>
                      this.setState({
                        balance: e.value,
                      })
                    }
                  ></TextBox>
                </div>
                <div style={{ float: "left" }}>
                  <CheckboxComponent
                    marginLeftStyle="7px"
                    label="Include Patients With No Balance"
                    value={this.state.noBalancePatients}
                    onChange={(e) =>
                      this.setState({ noBalancePatients: e.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ float: "left" }}>
                <div style={{ float: "left", marginLeft: "44px" }}>
                  <label className="userInfoLabel">Plan</label>
                </div>
                <div
                  className="insPlan"
                  style={{ float: "left", marginRight: "3px" }}
                >
                  <DropDown
                    data={PlanCategory}
                    textField="text"
                    dataItemKey="id"
                    className="unifyHeight"
                    id="ins"
                    name="ins"
                    value={this.state.insuranceType}
                    onChange={(e) => this.setState({ insuranceType: e.value })}
                  ></DropDown>
                </div>
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <label className="userInfoLabel">Plan Company</label>
                </div>
                <div style={{ float: "left" }} className="insuranceStyle">
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownInsurance}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={this.state.selectedInsurance}
                    value={this.state.selectedInsurance}
                    onChange={(e) =>
                      this.setState({
                        selectedInsurance: {
                          entityId: e.value?.entityId,
                          entityName: e.value?.entityName,
                        },
                      })
                    }
                  ></DropDown>
                </div>
                <div
                  style={{ float: "left", width: "70px", marginRight: "3px" }}
                >
                  <ButtonComponent
                    look="outline"
                    icon="search"
                    type="search"
                    classButton="infraBtn-primary find-button"
                    onClick={this.toggleInsuranceDialog}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
            </div>
            <div
              className="rowHeight"
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                marginTop: "10px",
              }}
            >
              <div style={{ float: "left", width: "430px" }}>
                <ButtonComponent
                  classButton="infraBtn-primary action-button"
                  look="outline"
                  icon="search"
                  type="search"
                  onClick={this.patientGridSearch}
                >
                  Search
                </ButtonComponent>
                <ButtonComponent
                  classButton="infraBtn-primary action-button"
                  look="outline"
                  icon="edit"
                  onClick={() => {
                    this.props.setPatientDetailExpanded();
                  }}
                >
                  Open
                </ButtonComponent>
                <ButtonComponent
                  type="add"
                  icon="add"
                  classButton="infraBtn-primary action-button"
                  onClick={this.reset}
                >
                  New
                </ButtonComponent>
              </div>
              <div
                style={{
                  float: "right",
                  position: "absolute",
                  marginRight: "10px",
                  right: "0",
                }}
              >
                <ButtonComponent
                  type="add"
                  classButton="infraBtn-primary action-button"
                  onClick={() => {
                    this.setState({ Show_HideDialogVisible: true });
                  }}
                >
                  Edit Grid
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            width: window.innerWidth - (!this.props.UiExpand ? 120 : 273),
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
                {this.state.refreshGrid && (
                  <GridComponent
                    id="patientGrid"
                    columns={this.state.patientListColumns}
                    data={this.props.Patients}
                    totalCount={
                      this.props.Patients != null &&
                        this.props.Patients.length > 0
                        ? this.props.Patients[0].totalCount
                        : this.props.Patients.length
                    }
                    skip={0}
                    take={this.state.take}
                    height="650px"
                    width="100%"
                    onSelectionChange={this.onPatientGridSelectionChange}
                    onRowDoubleClick={this.onPatientGridDoubleSelectionChange}
                    selectionMode="single"
                    DATA_ITEM_KEY="patientgridID"
                    idGetter={idGetterPaientList}
                    sortColumns={sortColumns}
                    onSortChange={this.onSortChange}
                    pageChange={this.pageChange}
                  ></GridComponent>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.patientVisible && (
          <PatientFindDialogComponent
            title="Patient Search"
            placeholder="Enter Patient Name"
            searcTextBoxValue={this.state.patientSearchText}
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
        {this.state.patientTypeVisible && (
          <FindDialogComponent
            title="Patient Type Search"
            placeholder="Enter Patient Type Name"
            searcTextBoxValue={this.state.patientTypeSearchText}
            onTextSearchChange={(e) => {
              this.setState({
                patientTypeSearchText: e.value,
              });
            }}
            clickOnSearch={this.patientTypeSearch}
            dataItemKey="lookupCode"
            data={this.props.patientTypes}
            columns={PatientTypesColumns}
            onSelectionChange={this.onPatientTypeSelectionChange}
            onRowDoubleClick={this.onPatientTypeDoubleClick}
            onKeyDown={this.onPatientTypeKeyDown}
            idGetterLookup={idGetterPaientYype}
            toggleDialog={this.cancelPatientTypeDialog}
            cancelDialog={this.cancelPatientTypeDialog}
            skipNextData={true}
          ></FindDialogComponent>
        )}
        {this.state.practiceVisible && (
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
        {this.state.insuranceVisible && (
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
            columns={insuranceColumns}
            onSelectionChange={this.onInsuranceSelectionChange}
            onRowDoubleClick={this.onInsuranceDoubleClick}
            onKeyDown={this.onInsuranceKeyDown}
            idGetterLookup={idGetterInsurance}
            toggleDialog={this.cancelInsuranceDialog}
            cancelDialog={this.cancelInsuranceDialog}
            getNextData={true}
          ></FindDialogComponent>
        )}
        {this.state.Show_HideDialogVisible && (
          <Show_HideDialogComponent
            columns={this.state.patientListColumns}
            toggleShowColumnsDialog={this.toggleShowColumnsDialog}
            SaveColumnsShow={this.SaveColumnsShow}
          ></Show_HideDialogComponent>
        )}
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Patient);
