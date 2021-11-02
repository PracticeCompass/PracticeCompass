import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import RadioButtonComponent from "../../../components/RadioButton";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {

  masterColumns,

  PracticeColumns,

} from "./eraPaymentsData";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import CheckboxComponent from "../../../components/Checkbox";
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
import{getERAPaymentHeader} from  "../../../redux/actions/payments";
import { AmountFilter } from "./eraPaymentsData"

const DATA_ITEM_KEY_MASTER_PAYMENT = "Id";
const idGetterMasterPaymentID = getter(DATA_ITEM_KEY_MASTER_PAYMENT);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);
function mapStateToProps(state) {
  return {
    dropDownPractices: state.lookups.practices,
    practiceList: state.patients.paractices,
    eRApayments: state.payments.eRApayments
  };
}

function mapDispatchToProps(dispatch) {
  return {

    SaveLookups: (EntityValueID, EntityName) =>
    dispatch(SaveLookups(EntityValueID, EntityName)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
   
    resetPracticeList: () => dispatch(resetPracticeList()),
    getERAPaymentHeader:(PracticeID, IsPosted,  Amount,  CheckNumber,  AmountType)=>
      dispatch(getERAPaymentHeader(PracticeID, IsPosted,  Amount,  CheckNumber,  AmountType))
  };
}

class EraPayments extends Component {
  state = {
    type: "Patient",
    selected: 0,
    timer: 5000,
    practiceVisiblePatient: false,
    practiceVisibleSubPatient: false,
    practiceVisibleInsurance: false,
    practiceVisibleSubInsurance: false,

    patientPracticeID: null,
    insurancePracticeID: null,
    subPatientPracticeID: null,
    subInsurancePracticeID: null,
    practiceSearchText: null,
    masterExpanded:true
  };


  getParacticesUrl(filter) {
    return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
  }

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
  ERAPaymentGridSearch =()=>{
    this.props.getERAPaymentHeader(this.state.insurancePracticeID?.entityId,this.state.posted,this.state.amountType, this.state.checkNumber,this.state.amountType?.id)
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



          <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
            <PanelBarItem
              id="MasterPaymentSearch"
              expanded={this.state.masterExpanded}
              title="Master"
            >
              <div style={{ width: "100%" }}>
                <div
                  className="rowHeight"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    width: "100%",
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
                <div
                  className="rowHeight"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    width: "100%",
                  }}
                >
                  <div style={{ marginLeft: "5px" }}>
                    <label className="userInfoLabel">Check Number </label>
                  </div>
                  <div style={{ width: "147px" }}>
                    <TextBox
                      type="numeric"
                      format="n2"
                      className="unifyHeight"
                      value={this.state.checkNumber}
                      onChange={(e) =>
                        this.setState({
                          checkNumber: e.value,
                        })
                      }
                    ></TextBox>
                  </div>
                  <div style={{ float: "left" }}>
                    <CheckboxComponent
                      style={{ marginRight: "5px" }}
                      id="posted"
                      label="Posted"
                      value={this.state.posted}
                      onChange={(e) => this.setState({ posted: e.value })}
                    />
                  </div>

                </div>
                <div className="rowHeight"
                  style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                  <div style={{ width: "57px", marginLeft: "36px" }}>
                    <label className="userInfoLabel">Amount</label>
                  </div>
                  <div style={{ width: "147px" }}>
                    <DropDown
                      data={AmountFilter}
                      textField="text"
                      dataItemKey="id"
                      className="unifyHeight"
                      id="tins"
                      name="tins"
                      value={this.state.amountType}
                      onChange={(e) => this.setState({ amountType: e.value })}
                    ></DropDown>
                  </div>
                  <div className="dateStyle" style={{ marginLeft: "5px" }}>
                    <TextBox
                      type="numeric"
                      format="c2"
                      className="unifyHeight"
                      value={this.state.amountFilter}
                      onChange={(e) =>
                        this.setState({
                          amountFilter: e.value,
                        })
                      }
                    ></TextBox>
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
                    onClick={this.ERAPaymentGridSearch}
                  >
                    Search
                  </ButtonComponent>
                </div>
                {/* <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={() => {
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
                    onClick={() => {
                      this.EditInsurance(this.state.InsurancePaymentDetails);
                      //this.setInsurancePaymentDetailsExpanded();
                    }
                    }
                  >
                    Edit
                  </ButtonComponent>
                </div> */}
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
                        columns={masterColumns}
                        skip={0}
                        take={21}
                        onSelectionChange={this.onInsurancePaymentGridSelectionChange}
                        onRowDoubleClick={this.onInsurancePaymentGridDoubleSelectionChange}
                        // getSelectedItems={this.getSelectedClaims}
                        // selectionMode="multiple"
                        DATA_ITEM_KEY="paymentSID"
                        idGetter={idGetterMasterPaymentID}
                        data={this.props.eRApayments}
                        // totalCount={
                        //   this.props.insurancePayments != null && this.props.insurancePayments.length > 0
                        //     ? this.props.insurancePayments[0].totalCount
                        //     : this.props.insurancePayments.length
                        // }
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
              id="InsurancePaymentSearch"
              expanded={this.state.insurancePaymentExpanded}
              title="Details"
            ></PanelBarItem>
          </PanelBar>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EraPayments);
