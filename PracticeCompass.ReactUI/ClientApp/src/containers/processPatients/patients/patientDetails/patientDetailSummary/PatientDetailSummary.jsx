import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ButtonComponent from "components/Button";
import TextBox from "components/TextBox";
import FindDialogComponent from "../../../../common/findDialog";
import Show_HideDialogComponent from "../../../../common/show_hideDialog";
import RadioButtonComponent from "components/RadioButton";
import DropDown from "components/DropDown";
import DatePicker from "components/DatePicker";
import GridComponent from "components/Grid";
import "./PatientDetailSummary.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import {
  getParacticesUrl,
  getMaritalStatus,
  getGenderUrl,
  getRelationUrl,
  getPatientTypeUrl,
  getCompanyNameUrl,
  getCompanyTypeUrl,
  getPlanTypeUrl,
  countryStateGetUrl,
  Insured,
  columns,
} from "./patientDetailSummaryData.js";
import { getter } from "@progress/kendo-react-common";
import {
  InsuranceGridGet,
  GetPatientDetails,
  resetInsuranceGridGet,
} from "../../../../../redux/actions/patientDetails";
import {
  getPracticeList,
  getpatientTypes,
  resetPatientTypeList,
  resetCompanyList,
  resetPracticeList,
  getCompaniesList
} from "../../../../../redux/actions/patient";
import {
  PracticeColumns,
  PatientTypesColumns,
  companyNameColumns
} from "./../../patient/patientData";
import { SaveLookups } from "../../../../../redux/actions/lookups";
import NotificationComponent from "../../../../common/notification";
import {
  GetGridColumns, SaveGridColumns
} from "../../../../../redux/actions/GridColumns"
function mapStateToProps(state) {
  return {
    insurances: state.patientDetails.insurances,
    practiceList: state.patients.paractices,
    companyList: state.patients.companies,
    dropDownPractices: state.lookups.practices,
    dropDownCompanies: state.lookups.companies,
    patientTypes: state.patients.patientTypes,
    dropDownPatientTypes: state.lookups.patientTypes,
    UiExpand: state.ui.UiExpand
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetGridColumns: (name) => dispatch(GetGridColumns(name)),
    SaveGridColumns: (name, columns) =>
      dispatch(SaveGridColumns(name, columns)),
    InsuranceGridGet: (personID) => dispatch(InsuranceGridGet(personID)),
    GetPatientDetails: (personID, PracticeID) =>
      dispatch(GetPatientDetails(personID, PracticeID)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
    getCompaniesList:(name)=>dispatch(getCompaniesList(name)),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    getpatientTypes: (name) => dispatch(getpatientTypes(name)),
    resetPatientTypeList: () => dispatch(resetPatientTypeList()),
    resetCompanyList:()=>dispatch(resetCompanyList()),
    resetPracticeList: () => dispatch(resetPracticeList()),
    resetInsuranceGridGet: () => dispatch(resetInsuranceGridGet()),
  };
}
const DATA_ITEM_KEY_INSURANCE = "gridID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);
const DATA_ITEM_KEY_PATIENT_TYPE = "lookupCode";
const idGetterPaientYype = getter(DATA_ITEM_KEY_PATIENT_TYPE);
const DATA_ITEM_KEY_COMPANY_NAME = "entitySID";
const idGetterCompanyName = getter(DATA_ITEM_KEY_COMPANY_NAME);
class PatientDetailSummary extends Component {
  state = {
    selected: 0,
    practiceID: null,
    firstName: null,
    MI: null,
    LastName: null,
    Suffix: null,
    Copay: null,
    PrimaryInsuranceBalanc: null,
    Address1: null,
    Address2: null,
    Pre_PayAmount: null,
    SecondaryInsuranceBalance: null,
    PaidAmount: null,
    TericiaryInsuranceBalance: null,
    City: null,
    Statevalue: null,
    Zip: null,
    SS: null,
    PatientPortion: null,
    InsurancePortion: null,
    DOB: null,
    Gender: null,
    MaritalStatus: null,
    TotalDue: null,
    HomePhone: null,
    PatientType: null,
    WorkPhone: null,
    Ext: null,
    CellPhone: null,
    Insured: null,
    CompanyName: null,
    Type: null,
    PlanName: null,
    PolicyNumber: null,
    PlanType: null,
    InsuredID: null,
    GroupNumber: null,
    PlanEffectiveDate: null,
    PlanEndDate: null,
    MedicareType: null,
    patientId: null,
    patientDetails: null,
    practiceVisible: false,
    practiceSearchText: null,
    patientTypeVisible: false,
    patientTypeSearchText: null,
    refreshGrid: true,
    success: false,
    none: false,
    error: false,
    warning: false,
    info: false,
    timer: 5000,
    companySearchText:null,
    patientListColumns: columns
  };
  handleSelect = (e) => {
    this.setState({ selected: e.selected });
  };
  practiceSearch = () => {
    this.props.getPracticeList(this.state.practiceSearchText);
  };
  // componentDidMount() {
  //   //this.props.InsuranceGridGet(null);
  // }
  patientTypeSearch = () => {
    this.props.getpatientTypes(this.state.patientTypeSearchText);
  };
  companySearch = () => {
    this.props.getCompaniesList(this.state.companySearchText);
  };
  getBaseGridUrl(filter) {
    return getCompanyNameUrl(filter);
  }
  onPatientDetailClick = (event) => { };
  onPatientDetailKeyDown = (event) => { };
  async componentDidMount() {
    await this.props.resetInsuranceGridGet();
    if (
      this.props.patientDetails != null &&
      this.state.patientId != this.props.patientDetails.patientID
    ) {
      let patientDetails = await this.props.GetPatientDetails(
        this.props.patientDetails.personID,
        this.props.patientDetails.practiceID
      );
      if (patientDetails == null) return;
      if (
        patientDetails?.practiceID != null &&
        (this.props.dropDownPractices == null ||
          this.props.dropDownPractices.filter(
            (x) => x.entityId == patientDetails?.practiceID
          ).length == 0)
      ) {
        await this.props.SaveLookups(patientDetails?.practiceID, "Practice");
      }
      if (
        patientDetails?.patienttypecode != null &&
        (this.props.dropDownPatientTypes == null ||
          this.props.dropDownPatientTypes.filter(
            (x) => x.entityId == patientDetails?.patienttypecode
          ).length == 0)
      ) {
        this.props.SaveLookups(patientDetails?.patienttypecode, "PatientType");
      }
      this.setState({
        patientId: patientDetails.patientID,
        patientDetails: patientDetails,
        Gender: {
          lookupCode: patientDetails?.Gender,
          description: patientDetails?.genderName,
        },
        practiceID: {
          entityName: patientDetails?.practiceName,
          entityId: patientDetails?.practiceID,
        },
        Statevalue: {
          stateCode: patientDetails?.stateCode,
          state: patientDetails?.state,
        },
        maritalStatus: {
          lookupCode: patientDetails?.maritalStatusCode,
          description: patientDetails?.maritalStatusName,
        },
        PatientType: {
          lookupCode: patientDetails?.patienttypecode,
          description: patientDetails?.patienttypeName,
        },
        firstName: patientDetails?.dnFirstName,
        MI: patientDetails?.dnMiddleName,
        LastName: patientDetails?.dnLastName,
        Suffix: patientDetails?.dnNameSuffix,
        Address1: patientDetails?.address1,
        Address2: patientDetails?.address2,
        City: patientDetails?.city,
        Zip: patientDetails?.zip,
        SS: patientDetails?.dnssn,
        DOB: patientDetails ? new Date(patientDetails.dndob) : null,
        HomePhone: patientDetails?.homePhone,
        WorkPhone: patientDetails?.workPhone,
        Ext: patientDetails?.workPhoneExt,
        CellPhone: patientDetails?.mobilePhone,
        Copay: patientDetails?.copayAmount,
        PaidAmount: patientDetails?.paidAmount,
        InsurancePortion: patientDetails?.insurancePortion,
        TotalDue: patientDetails?.totalDue,
        PatientPortion: patientDetails?.patientPortion,
      });
      await this.props.InsuranceGridGet(this.props.patientDetails.patientID);
    }
    this.getGridColumns();
  }

  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns('summeryGrid');
    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns) ?? columns;
      this.setState({ patientListColumns: currentColumns });
    }
    this.setState({ refreshGrid: true });
  }
  onInsuranceGridSelectionChange = (event) => {
    this.setState({
      currentInsurance: event.dataItem != null ? event.dataItem : null,
    });
    this.setState({
      Type: {
        lookupCode: this.state.currentInsurance?.insuranceTypeCode,
        description: this.state.currentInsurance?.insuranceTypeName,
      },
      CompanyName: {
        carrierID: this.state.currentInsurance?.carrierID,
        name: this.state.currentInsurance?.companyName,
      },
      PlanType: {
        lookupCode: this.state.currentInsurance?.plantypecode,
        description: this.state.currentInsurance?.planTypeName,
      },
      PlanName: this.state.currentInsurance?.planName,
      PolicyNumber: this.state.currentInsurance?.policyNumber,
      GroupNumber: this.state.currentInsurance?.groupNumber,
      PlanEndDate:
        this.state.currentInsurance != null &&
          this.state.currentInsurance.endDate
          ? new Date(this.state.currentInsurance.endDate)
          : null,
      PlanEffectiveDate:
        this.state.currentInsurance != null &&
          this.state.currentInsurance.startDate
          ? new Date(this.state.currentInsurance.startDate)
          : null,
      Insured: this.state.currentInsurance?.relationToSub,
      InsuredID: this.state.currentInsurance?.insuredID,
    });
    this.scrollToBottom();
  };
  scrollToBottom = () => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  };
  onPracticeSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      practiceID: {
        entityId: selectedDataItems[0].patientID,
        entityName: selectedDataItems[0].sortName
      }
    });
  };
  onPracticeDoubleClick = async (event) => {
    this.setState({
      practiceID: {
        entityId: event.dataItem.practiceID,
        entityName: event.dataItem.sortName
      }
    });
    this.props.SaveLookups(event.dataItem.practiceID, "Practice");
    //this.selectPatient();
    this.togglePracticeDialog();
  };
  onPracticeKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      practiceID: {
        entityId: selectedDataItems
          ? selectedDataItems[0].practiceID
          : null,
        entityName: selectedDataItems
          ? selectedDataItems[0].sortName
          : null
      }
    });
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
  cancelcomapnyNameeDialog = () => {
    this.setState({
      companySearchText: null,
    });
    this.toggleCompaniesDialog();
  };
  toggleCompaniesDialog = () => {
    if (this.state.companyNameVisible) {
      this.setState({
        companySearchText: null,
      });
      this.props.resetCompanyList();
    }
    this.setState({
      companyNameVisible: !this.state.companyNameVisible,
    });
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
  onCompanyNameKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      CompanyName: selectedDataItems[0]
        ? {
          entityName: selectedDataItems[0].sortName,
          entityId: selectedDataItems[0].entitySID,
        }
        : null,
    });
  };
  onCompanyNameSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      CompanyName: {
        entityName: selectedDataItems[0].sortName,
        entityId: selectedDataItems[0].entitySID,
      },
    });
  };
  onCompanyNameDoubleClick = async (event) => {
    this.setState({
      CompanyName: {
        entityName: event.dataItem.sortName,
        entityId: event.dataItem.entitySID,
      },
    });
    this.props.SaveLookups(event.dataItem.entitySID, "Company");
    //this.selectPatient();
    this.toggleCompaniesDialog();
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
      //localStorage.setItem("summeryGrid", JSON.stringify(columns));
      let GridColumns = await this.props.SaveGridColumns("summeryGrid", JSON.stringify(columns));
      this.setState({ patientListColumns: JSON.parse(GridColumns?.columns), Show_HideDialogVisible: false });
      setTimeout(() => {
        this.setState({ refreshGrid: true });
      }, 10);
    }
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
  revertOtherCompany = (e) => {
    this.setState({ Insured: e.value });
    if (e.value != null && (e.value == "S" || e.value == "Self")) {
      this.setState({
        OtherName: null,
        OtherRelationShip: null,
        OtherAddress: null,
      });
    }
  };
  onSortChange = () => { }
  render() {
    return (
      <Fragment>
        <div style={{ width: "100%", padding: "5px" }}>
          {this.state.Show_HideDialogVisible && (
            <Show_HideDialogComponent
              columns={
                this.state.patientListColumns
              }
              toggleShowColumnsDialog={this.toggleShowColumnsDialog}
              SaveColumnsShow={this.SaveColumnsShow}
            ></Show_HideDialogComponent>
          )}
          <NotificationComponent
            message={this.state.message}
            onClose={this.closeNotification}
            success={this.state.success}
            error={this.state.error}
            warning={this.state.warning}
            info={this.state.info}
            none={this.state.none}
          ></NotificationComponent>
          {this.state.companyNameVisible && (
            <FindDialogComponent
            title="Company Name Search"
            placeholder="Enter Company Name"
            searcTextBoxValue={this.state.companySearchText}
            onTextSearchChange={(e) => {
              this.setState({
                companySearchText: e.value,
              });
            }}
            clickOnSearch={this.companySearch}
            dataItemKey="entitySID"
            data={this.props.companyList}
            columns={companyNameColumns}
            onSelectionChange={this.onCompanyNameSelectionChange}
            onRowDoubleClick={this.onCompanyNameDoubleClick}
            onKeyDown={this.onCompanyNameKeyDown}
            idGetterLookup={idGetterCompanyName}
            toggleDialog={this.cancelcomapnyNameeDialog}
            cancelDialog={this.cancelcomapnyNameeDialog}
          ></FindDialogComponent>
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
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ float: "left" }}>
              <div className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}>
                <div style={{ float: "left", width: "362px" }}>
                  <div style={{ float: "left", marginLeft: "5px" }}>
                    <label className="userInfoLabel">Patient Type</label>
                  </div>
                  <div className="patientStyle" style={{ float: "left" }}>
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
                      onClick={(e) =>
                        this.setState({ patientTypeVisible: true })
                      }
                    >
                      Find
                    </ButtonComponent>
                  </div>
                </div>
                <div style={{ float: "left", width: "550px" }}>
                  <div style={{ float: "left", marginLeft: "-3px" }}>
                    <label className="userInfoLabel">Practice</label>
                  </div>
                  <div className="PracticeStyle" style={{ float: "left" }}>
                    <DropDown
                      className="unifyHeight"
                      data={this.props.dropDownPractices}
                      textField="entityName"
                      dataItemKey="entityId"
                      defaultValue={this.state.practiceID}
                      value={this.state.practiceID}
                      onChange={(e) =>
                        this.setState({
                          practiceSelectedState: e.value?.entityName,
                          practiceIDSelectedState: e.value?.entityId,
                          practiceNameSelected: e.value?.entityName,
                          practiceID: e.value?.entityId,
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
                <div style={{ float: "left", width: "316px", marginLeft: "13px" }}>
                  <div style={{ float: "left" }}>
                    <label className="userInfoLabel">First Name</label>
                  </div>
                  <div style={{ float: "left", width: "140px" }}>
                    <TextBox
                      value={this.state.firstName}
                      className="unifyHeight"
                      onChange={(e) => this.setState({ firstName: e.value })}
                    ></TextBox>
                  </div>
                  <div style={{ float: "left", marginLeft: "15px" }}>
                    <label className="userInfoLabel">M.I.</label>
                  </div>
                  <div style={{ float: "left", width: "36px" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.MI}
                      onChange={(e) => this.setState({ MI: e.value })}
                    ></TextBox>
                  </div>
                </div>
                <div style={{ float: "left", width: "401px" }}>
                  <div style={{ float: "left", marginLeft: "15px" }}>
                    <label className="userInfoLabel">Last Name</label>
                  </div>
                  <div style={{ float: "left", width: "140px" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.LastName}
                      onChange={(e) => {
                        this.setState({ LastName: e.value });
                      }}
                    ></TextBox>
                  </div>
                  <div style={{ float: "left", marginLeft: "15px" }}>
                    <label className="userInfoLabel">Suffix</label>
                  </div>
                  <div style={{ float: "left", width: "70px" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.Suffix}
                      onChange={(e) => {
                        this.setState({ Suffix: e.value });
                      }}
                    ></TextBox>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ float: "left", width: "408px" }}>
                  <div style={{ float: "left", marginLeft: "47px" }}>
                    <label className="userInfoLabel">DOB</label>
                  </div>
                  <div className="dateStyle" style={{ float: "left" }}>
                    <DatePicker
                      className="unifyHeight"
                      placeholder="MM/DD/YYYY"
                      format="M/dd/yyyy"
                      value={this.state.DOB}
                      onChange={(e) => this.setState({ DOB: e.value })}
                    ></DatePicker>
                  </div>
                  <div style={{ float: "left", marginLeft: "15px" }}>
                    <label className="userInfoLabel">Gender</label>
                  </div>
                  <div className="genderStyle" style={{ float: "left" }}>
                    <DropDown
                      className="unifyHeight"
                      id="genderList"
                      name="genderList"
                      type="remoteDropDown"
                      textField="description"
                      dataItemKey="lookupCode"
                      getBaseUrl={(filter) => getGenderUrl(filter)}
                      value={this.state.Gender}
                      onChange={(e) => this.setState({ Gender: e.value })}
                    ></DropDown>
                  </div>
                </div>
                <div style={{ float: "left", width: "336px" }}>
                  <div style={{ float: "left", marginLeft: "20px" }}>
                    <label className="userInfoLabel">Marital Status</label>
                  </div>
                  <div style={{ float: "left", width: "180px" }}>
                    <DropDown
                      className="unifyHeight"
                      id="maritalStatus"
                      name="maritalStatus"
                      type="remoteDropDown"
                      textField="description"
                      dataItemKey="lookupCode"
                      getBaseUrl={(filter) => getMaritalStatus(filter)}
                      value={this.state.MaritalStatus}
                      onChange={(e) =>
                        this.setState({ MaritalStatus: e.value })
                      }
                    ></DropDown>
                  </div>
                </div>
              </div>

              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row" }}
              >
                <div style={{ float: "left", width: "377px" }}>
                  <div style={{ float: "left", marginLeft: "17px" }}>
                    <label className="userInfoLabel">Address 1</label>
                  </div>
                  <div style={{ float: "left", width: "300px" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.Address1}
                      onChange={(e) => {
                        this.setState({ Address1: e.value });
                      }}
                    ></TextBox>
                  </div>
                </div>


              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ float: "left", width: "377px" }}>
                  <div style={{ float: "left", marginLeft: "17px" }}>
                    <label className="userInfoLabel">Address 2</label>
                  </div>
                  <div style={{ float: "left", width: "300px" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.Address2}
                      onChange={(e) => this.setState({ Address2: e.value })}
                    ></TextBox>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ float: "left", width: "400px" }}>
                  <div style={{ float: "left", marginLeft: "51px" }}>
                    <label className="userInfoLabel">City</label>
                  </div>
                  <div style={{ float: "left", width: "133px" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.City}
                      onChange={(e) => this.setState({ City: e.value })}
                    ></TextBox>
                  </div>
                  <div style={{ float: "left", marginLeft: "29px" }}>
                    <label className="userInfoLabel">State</label>
                  </div>
                  <div style={{ float: "left", width: "105px" }}>
                    <DropDown
                      className="unifyHeight"
                      id="stateList"
                      name="stateList"
                      type="remoteDropDown"
                      textField="stateCode"
                      dataItemKey="stateCode"
                      getBaseUrl={(filter) => countryStateGetUrl(filter)}
                      value={this.state.Statevalue}
                      onChange={(e) => this.setState({ Statevalue: e.value })}
                    ></DropDown>
                  </div>
                </div>
                <div style={{ float: "left", width: "336px" }}>
                  <div style={{ float: "left", marginLeft: "15px" }}>
                    <label className="userInfoLabel">Zip</label>
                  </div>
                  <div className="ZipStyle" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="#####-####"
                      placeholder="00000-0000"
                      className="unifyHeight"
                      value={this.state.Zip}
                      onValueChange={(e) => this.setState({ Zip: e.target.value })}
                    ></TextBox>
                  </div>
                  <div style={{ float: "left", marginLeft: "15px" }}>
                    <label className="userInfoLabel">SSN</label>
                  </div>
                  <div className="SSNStyle" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="###-##-####"
                      placeholder="000-00-00000"
                      className="unifyHeight"
                      value={this.state.SS}
                      onValueChange={(e) => this.setState({ SS: e.target.value })}
                    ></TextBox>
                  </div>
                </div>
              </div>

              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row" }}
              >
                <div style={{ float: "left", width: "440px" }}>
                  <div style={{ float: "left" }}>
                    <label className="userInfoLabel">Home Phone</label>
                  </div>
                  <div className="PhoneStyle" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="(###) ###-####"
                      placeholder="(000) 000-0000"
                      className="unifyHeight"
                      value={this.state.HomePhone}
                      onValueChange={(e) =>
                        this.setState({ HomePhone: e.target.value })
                      }
                    ></TextBox>
                  </div>
                </div>


              </div>

              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ float: "left", width: "435px" }}>
                  <div style={{ float: "left", marginLeft: "3px" }}>
                    <label className="userInfoLabel">Work Phone</label>
                  </div>
                  <div className="PhoneStyle" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="(###) ###-####"
                      placeholder="(000) 000-0000"
                      className="unifyHeight"
                      value={this.state.WorkPhone}
                      onValueChange={(e) =>
                        this.setState({ WorkPhone: e.target.value })
                      }
                    ></TextBox>
                  </div>
                  <div style={{ float: "left", marginLeft: "5px" }}>
                    <label className="userInfoLabel">Ext</label>
                  </div>
                  <div className="phoneExt" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="#####"
                      placeholder="00000"
                      className="unifyHeight"
                      value={this.state.Ext}
                      onValueChange={(e) => this.setState({ Ext: e.target.value })}
                    ></TextBox>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ float: "left", width: "400px" }}>
                  <div style={{ float: "left", marginLeft: "13px" }}>
                    <label className="userInfoLabel">Cell Phone</label>
                  </div>
                  <div className="PhoneStyle" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="(###) ###-####"
                      placeholder="(000) 000-0000"
                      className="unifyHeight"
                      value={this.state.CellPhone}
                      onValueChange={(e) =>
                        this.setState({ CellPhone: e.target.value })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>

              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ float: "left", width: "430px" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={() => {
                      this.setState({ visibleSaveFilter: true });
                    }}
                  >
                    Add
                  </ButtonComponent>
                  <ButtonComponent
                    type="delete"
                    icon="delete"
                    classButton="infraBtn-primary action-button"
                    onClick={this.delete}
                  >
                    Edit
                  </ButtonComponent>
                  <ButtonComponent
                    type="edit"
                    icon="reset"
                    classButton="infraBtn-primary action-button"
                    onClick={this.reset}
                  >
                    Inactive
                  </ButtonComponent>
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
                </div>
                <div
                  style={{
                    float: "right",
                    position: "absolute",
                    marginRight: "30px",
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
            <div
              style={{
                borderStyle: "dotted",
                borderWidth: "thin",
                paddingLeft: "15px",
                paddingTop: "10px",
                width: "240px",
                height: "170px",
              }}
            >
              <div className="row rowHeight">
                <div style={{ textAlign: "right", marginLeft: "74px" }}>
                  <label className="userInfoLabel">Copay: </label>
                </div>
                <div style={{ marginRight: "5px", width: "100px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.copay}
                    onChange={(e) =>
                      this.setState({
                        copay: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
              <div className="row rowHeight">
                <div style={{ textAlign: "right" }}>
                  <label className="userInfoLabel">UnApplied Amount: </label>
                </div>
                <div style={{ marginRight: "5px", width: "100px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.Pre_PayAmount}
                    onChange={(e) =>
                      this.setState({
                        Pre_PayAmount: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
              <div className="row rowHeight">
                <div style={{ textAlign: "right", marginLeft: "36px" }}>
                  <label className="userInfoLabel">Paid Amount: </label>
                </div>
                <div style={{ marginRight: "5px", width: "100px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.PaidAmount}
                    onChange={(e) =>
                      this.setState({
                        PaidAmount: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
              <div className="row rowHeight">
                <div style={{ textAlign: "right", marginLeft: "24px" }}>
                  <label className="userInfoLabel">Patient Portion: </label>
                </div>
                <div style={{ marginRight: "5px", width: "100px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.PatientPortion}
                    onChange={(e) =>
                      this.setState({
                        PatientPortion: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
              <div className="row rowHeight">
                <div style={{ textAlign: "right", marginLeft: "9px" }}>
                  <label className="userInfoLabel">Insurance Portion: </label>
                </div>
                <div style={{ marginRight: "5px", width: "100px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.InsurancePortion}
                    onChange={(e) =>
                      this.setState({
                        InsurancePortion: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
              <div className="row rowHeight">
                <div style={{ textAlign: "right", marginLeft: "55px" }}>
                  <label className="userInfoLabel">Total Due: </label>
                </div>
                <div style={{ marginRight: "5px", width: "100px" }}>
                  <TextBox
                    type="numeric"
                    format="c2"
                    className="unifyHeight"
                    value={this.state.TotalDue}
                    onChange={(e) =>
                      this.setState({
                        TotalDue: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            width: window.innerWidth - (!this.props.UiExpand ? 120 : 310),
          }}
        >
          <div className="accordion" id="accordionExample">
            <div
              className="card bg-light mb-3"
              style={{
                marginTop: "5px",
                paddingLeft: "14px",
              }}
            >
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="row" >
                  {this.state.refreshGrid && (
                    <GridComponent
                      id="summeryGrid"
                      height="150px"
                      width="100%"
                      take={3}
                      columns={
                        this.state.patientListColumns
                      }
                      selectionMode="single"
                      onSelectionChange={this.onInsuranceGridSelectionChange}
                      onRowDoubleClick={this.onInsuranceGridSelectionChange}
                      onKeyDown={this.onPatientDetailKeyDown}
                      data={this.props.insurances}
                      getBaseUrl={(filter) => this.getBaseGridUrl(filter)}
                      DATA_ITEM_KEY="gridID"
                      idGetter={idGetterInsurance}
                      sortColumns={[]}
                      onSortChange={this.onSortChange}
                    ></GridComponent>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "5px" }}>
          <div style={{ display: "flex", flexFlow: "row nowrap" }}>
            {/* <ButtonComponent
              type="edit"
              onClick={this.delete}
              style={{
                width: "120px",
                color: "red",
                backgroundColor: "lightgreen",
              }}
            >
              {" "}
              View
            </ButtonComponent> */}
          </div>
          <div style={{ display: "flex", flexFlow: "row nowrap", width: "1222px" }}>
            <fieldset
              className="fieldsetStyle"
              style={{ width: "99%", height: "260px" }}
            >
              <legend
                className="legendStyle"
                style={{ paddingRight: "5px", paddingLeft: "5px" }}
              >
                Plan Detail
              </legend>
              <div style={{ float: "left", width: "110px" }}>
                <fieldset
                  className="fieldsetStyle"
                  style={{
                    width: "75px",
                    marginLeft: "10px",
                    marginTop: "5px",
                    height: "75px",
                  }}
                >
                  <legend
                    className="legendStyle"
                    style={{ paddingRight: "5px", paddingLeft: "5px" }}
                  >
                    Insured
                  </legend>
                  <div className="row" style={{ marginLeft: "5px" }}>
                    <RadioButtonComponent
                      name="Insured"
                      className="userInfoLabel"
                      items={Insured}
                      selectedValue={
                        this.state.Insured &&
                        (this.state.Insured == "S" ||
                          this.state.Insured == "Self"
                          ? "Self"
                          : "Other")
                      }
                      handleChange={(e) => this.revertOtherCompany(e)}
                    ></RadioButtonComponent>
                  </div>
                </fieldset>
              </div>
              <div style={{ float: "left" }}>
                <TabStrip
                  selected={this.state.selected}
                  onSelect={this.handleSelect}
                >
                  <TabStripTab title="Plan">
                    <div className="rowHeight" style={{ display: "flex", flexFlow: "row nowrap" }}>
                      <div style={{ float: "left" }}>
                        <label className="userInfoLabel">Company Name</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <DropDown
                          className="unifyHeight"
                          textField="entityName"
                          dataItemKey="entityId"
                          value={this.state.CompanyName}
                          data={this.props.dropDownCompanies}
                          onChange={(e) =>
                            this.setState({ CompanyName: e.value })
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
                            this.setState({ companyNameVisible: true })
                          }
                        >
                          Find
                        </ButtonComponent>
                      </div>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Type</label>
                      </div>
                      <div style={{ float: "left", width: "362px" }}>
                        <DropDown
                          className="unifyHeight"
                          type="remoteDropDown"
                          textField="description"
                          dataItemKey="lookupCode"
                          getBaseUrl={(filter) => getCompanyTypeUrl(filter)}
                          value={this.state.Type}
                          onChange={(e) => this.setState({ Type: e.value })}
                        ></DropDown>
                      </div>
                    </div>
                    <div className="rowHeight" style={{ display: "flex", flexFlow: "row nowrap" }}>
                      <div style={{ float: "left", marginLeft: "28px" }}>
                        <label className="userInfoLabel">Plan Name</label>
                      </div>
                      <div style={{ float: "left" }}>
                        <TextBox
                          className="unifyHeight"
                          value={this.state.PlanName}
                          onChange={(e) => this.setState({ PlanName: e.value })}
                        ></TextBox>
                      </div>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Policy Number</label>
                      </div>
                      <div style={{ float: "left" }}>
                        <TextBox
                          className="unifyHeight"
                          value={this.state.PolicyNumber}
                          onChange={(e) =>
                            this.setState({ PolicyNumber: e.value })
                          }
                        ></TextBox>
                      </div>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Plan Type</label>
                      </div>
                      <div style={{ float: "left", width: "261px" }}>
                        <DropDown
                          className="unifyHeight"
                          type="remoteDropDown"
                          textField="description"
                          dataItemKey="lookupCode"
                          getBaseUrl={(filter) => getPlanTypeUrl(filter)}
                          value={this.state.PlanType}
                          onChange={(e) => this.setState({ PlanType: e.value })}
                        ></DropDown>
                      </div>
                    </div>
                    <div className="rowHeight" style={{ display: "flex", flexFlow: "row nowrap" }}>
                      <div style={{ float: "left", marginLeft: "31px" }}>
                        <label className="userInfoLabel">Insured ID</label>
                      </div>
                      <div style={{ float: "left" }}>
                        <TextBox
                          className="unifyHeight"
                          value={this.state.InsuredID}
                          onChange={(e) =>
                            this.setState({ InsuredID: e.value })
                          }
                        ></TextBox>
                      </div>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Group Number</label>
                      </div>
                      <div style={{ float: "left" }}>
                        <TextBox
                          className="unifyHeight"
                          value={this.state.GroupNumber}
                          onChange={(e) =>
                            this.setState({ GroupNumber: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                    <div className="rowHeight" style={{ display: "flex", flexFlow: "row nowrap" }}>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">
                          Plan Effective Date
                        </label>
                      </div>
                      <div className="dateStyle" style={{ float: "left" }}>
                        <DatePicker
                          id="planEndDate"
                          name="planEndDate"
                          className="unifyHeight"
                          placeholder="MM/DD/YYYY"
                          format="M/dd/yyyy"
                          value={this.state.PlanEffectiveDate}
                          onChange={(e) =>
                            this.setState({ PlanEffectiveDate: e.value })
                          }
                        ></DatePicker>
                      </div>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Plan End Date</label>
                      </div>
                      <div className="dateStyle" style={{ float: "left" }}>
                        <DatePicker
                          id="planEndDate"
                          name="planEndDate"
                          className="unifyHeight"
                          placeholder="MM/DD/YYYY"
                          format="M/dd/yyyy"
                          value={
                            this.state.PlanEndDate
                          }
                          onChange={(e) =>
                            this.setState({ PlanEndDate: e.value })
                          }
                        ></DatePicker>
                      </div>
                    </div>
                    <div className="rowHeight" style={{ display: "flex", flexFlow: "row nowrap" }}></div>
                  </TabStripTab>

                  <TabStripTab title="Other">
                    <div
                      className="rowHeight"
                      style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                      }}
                    >
                      <div style={{ float: "left", marginLeft: "40px" }}>
                        <label className="userInfoLabel">Name</label>
                      </div>
                      <div style={{ float: "left", width: "200px" }}>
                        <TextBox
                          className="unifyHeight"
                          value={this.state.OtherName}
                          onChange={(e) =>
                            this.setState({ OtherName: e.value })
                          }
                        ></TextBox>
                      </div>
                      <div style={{ float: "left", marginLeft: "32px" }}>
                        <label className="userInfoLabel">RelationShip</label>
                      </div>
                      <div style={{ width: "185px" }}>
                        <DropDown
                          className="unifyHeight"
                          id="relationList"
                          name="relationList"
                          type="remoteDropDown"
                          textField="description"
                          dataItemKey="lookupCode"
                          getBaseUrl={(filter) => getRelationUrl(filter)}
                          value={this.state.OtherRelationShip}
                          onChange={(e) =>
                            this.setState({ OtherRelationShip: e.value })
                          }
                        ></DropDown>
                      </div>
                    </div>
                    <div
                      className="rowHeight"
                      style={{ display: "flex", flexFlow: "row" }}
                    >
                      <div style={{ float: "left", width: "377px" }}>
                        <div style={{ float: "left", marginLeft: "17px" }}>
                          <label className="userInfoLabel">Address 1</label>
                        </div>
                        <div style={{ float: "left", width: "300px" }}>
                          <TextBox
                            className="unifyHeight"
                            value={this.state.OtherAddress1}
                            onChange={(e) => {
                              this.setState({ OtherAddress1: e.value });
                            }}
                          ></TextBox>
                        </div>
                      </div>


                    </div>
                    <div
                      className="rowHeight"
                      style={{ display: "flex", flexFlow: "row nowrap" }}
                    >
                      <div style={{ float: "left", width: "377px" }}>
                        <div style={{ float: "left", marginLeft: "17px" }}>
                          <label className="userInfoLabel">Address 2</label>
                        </div>
                        <div style={{ float: "left", width: "300px" }}>
                          <TextBox
                            className="unifyHeight"
                            value={this.state.OtherAddress2}
                            onChange={(e) => this.setState({ OtherAddress2: e.value })}
                          ></TextBox>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rowHeight"
                      style={{ display: "flex", flexFlow: "row nowrap" }}
                    >
                      <div style={{ float: "left", width: "400px" }}>
                        <div style={{ float: "left", marginLeft: "51px" }}>
                          <label className="userInfoLabel">City</label>
                        </div>
                        <div style={{ float: "left", width: "133px" }}>
                          <TextBox
                            className="unifyHeight"
                            value={this.state.OtherCity}
                            onChange={(e) => this.setState({ OtherCity: e.value })}
                          ></TextBox>
                        </div>
                        <div style={{ float: "left", marginLeft: "29px" }}>
                          <label className="userInfoLabel">State</label>
                        </div>
                        <div style={{ float: "left", width: "105px" }}>
                          <DropDown
                            className="unifyHeight"
                            id="stateList"
                            name="stateList"
                            type="remoteDropDown"
                            textField="stateCode"
                            dataItemKey="stateCode"
                            getBaseUrl={(filter) => countryStateGetUrl(filter)}
                            value={this.state.OtherStatevalue}
                            onChange={(e) => this.setState({ OtherStatevalue: e.value })}
                          ></DropDown>
                        </div>
                      </div>
                      <div style={{ float: "left", width: "336px" }}>
                        <div style={{ float: "left", marginLeft: "15px" }}>
                          <label className="userInfoLabel">Zip</label>
                        </div>
                        <div className="ZipStyle" style={{ float: "left" }}>
                          <TextBox
                            type="maskedTextBox"
                            format="#####-####"
                            placeholder="00000-0000"
                            className="unifyHeight"
                            value={this.state.OtherZip}
                            onValueChange={(e) => this.setState({ OtherZip: e.target.value })}
                          ></TextBox>
                        </div>
                        <div style={{ float: "left", marginLeft: "15px" }}>
                          <label className="userInfoLabel">SSN</label>
                        </div>
                        <div className="SSNStyle" style={{ float: "left" }}>
                          <TextBox
                            type="maskedTextBox"
                            format="###-##-####"
                            placeholder="000-00-00000"
                            className="unifyHeight"
                            value={this.state.OtherSSN}
                            onValueChange={(e) => this.setState({ OtherSSN: e.target.value })}
                          ></TextBox>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rowHeight"
                      style={{ display: "flex", flexFlow: "row" }}
                    >
                      <div style={{ float: "left", width: "440px" }}>
                        <div style={{ float: "left" }}>
                          <label className="userInfoLabel">Home Phone</label>
                        </div>
                        <div className="PhoneStyle" style={{ float: "left" }}>
                          <TextBox
                            type="maskedTextBox"
                            format="(###) ###-####"
                            placeholder="(000) 000-0000"
                            className="unifyHeight"
                            value={this.state.OtherHomePhone}
                            onValueChange={(e) =>
                              this.setState({ OtherHomePhone: e.target.value })
                            }
                          ></TextBox>
                        </div>
                      </div>


                    </div>
                    <div
                      className="rowHeight"
                      style={{ display: "flex", flexFlow: "row nowrap" }}
                    >
                      <div style={{ float: "left", width: "435px" }}>
                        <div style={{ float: "left", marginLeft: "3px" }}>
                          <label className="userInfoLabel">Work Phone</label>
                        </div>
                        <div className="PhoneStyle" style={{ float: "left" }}>
                          <TextBox
                            type="maskedTextBox"
                            format="(###) ###-####"
                            placeholder="(000) 000-0000"
                            className="unifyHeight"
                            value={this.state.OtherWorkPhone}
                            onValueChange={(e) =>
                              this.setState({ OtherWorkPhone: e.target.value })
                            }
                          ></TextBox>
                        </div>
                        <div style={{ float: "left", marginLeft: "5px" }}>
                          <label className="userInfoLabel">Ext</label>
                        </div>
                        <div className="phoneExt" style={{ float: "left" }}>
                          <TextBox
                            type="maskedTextBox"
                            format="#####"
                            placeholder="00000"
                            className="unifyHeight"
                            value={this.state.OtherExt}
                            onValueChange={(e) => this.setState({ OtherExt: e.target.value })}
                          ></TextBox>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rowHeight"
                      style={{ display: "flex", flexFlow: "row nowrap" }}
                    >
                      <div style={{ float: "left", width: "400px" }}>
                        <div style={{ float: "left", marginLeft: "13px" }}>
                          <label className="userInfoLabel">Cell Phone</label>
                        </div>
                        <div className="PhoneStyle" style={{ float: "left" }}>
                          <TextBox
                            type="maskedTextBox"
                            format="(###) ###-####"
                            placeholder="(000) 000-0000"
                            className="unifyHeight"
                            value={this.state.OtherCellPhone}
                            onValueChange={(e) =>
                              this.setState({ OtherCellPhone: e.target.value })
                            }
                          ></TextBox>
                        </div>
                      </div>
                    </div>
                  </TabStripTab>
                </TabStrip>
              </div>
            </fieldset>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetailSummary);
