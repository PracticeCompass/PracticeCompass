import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import ButtonComponent from "../../../components/Button";
import { getter } from "@progress/kendo-react-common";
import TextBox from "../../../components/TextBox";
import DropDown from "../../../components/DropDown";
import CheckboxComponent from "../../../components/Checkbox";
import { TextArea } from "@progress/kendo-react-inputs";
import { getPlanDetails } from "../../../redux/actions/plans";
import FindDialogComponent from "../../common/findDialog";
import {planGroupColumns} from "./InsurancesData";
import { getPlans,getPlanGroup,resetPlanGroupList } from "../../../redux/actions/plans";
import { SaveLookups } from "../../../redux/actions/lookups";
import {
  countryStateGetUrl
} from "../../processPatients/patients/patientDetails/patientDetailSummary/patientDetailSummaryData.js";
const DATA_ITEM_KEY_PHYSICIAN = "id";
const idGetterInsuranceList = getter(DATA_ITEM_KEY_PHYSICIAN);
const DATA_ITEM_KEY_GROUP_NUMBER = "groupNumber";
const idGetterGroupNumber = getter(DATA_ITEM_KEY_GROUP_NUMBER);
function mapStateToProps(state) {
  return {
    planGroups:state.plans.planGroups,
    dropDownPlanGroups: state.lookups.planGroups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlanDetails: (planId,groupNumber) => dispatch(getPlanDetails(planId,groupNumber)),
    getPlanGroup:(search)=>dispatch(getPlanGroup(search)),
    SaveLookups: (EntityValueID, EntityName) =>
    dispatch(SaveLookups(EntityValueID, EntityName)),
    resetPlanGroupList:() =>dispatch(resetPlanGroupList())
  };
}
class InsuranceDetails extends Component {
  state = {
    name: null,
    eDI: null
  }
  componentDidMount = async () => {
    if (this.props.PlanDetails) {
      let result = await this.props.getPlanDetails(this.props.PlanDetails.planId,this.props.PlanDetails.groupNumber);
      if (
        this.props.PlanDetails.groupNumber != null &&
        (this.props.dropDownPlanGroups == null ||
          this.props.dropDownPlanGroups.filter(
            x => x.entityId == this.props.PlanDetails.groupNumber
          ).length == 0)
      ) {
        await this.props.SaveLookups(
          this.props.PlanDetails.groupNumber,
          "PlanGroup"
        );
      }
      this.setState({
        name: result?.planName,
        listName: result?.companyName,
        Address1: result?.address1,
        Address2: result?.address2,
        City: result?.city,
        Zip: result?.zip,
        Statevalue: {
          stateCode: result?.stateCode
        },
        faxPhone: result?.faxPhone,
        eDI: result?.ediOptions,
        website: result?.webURL,
        state: result?.state,
        HomePhone: result?.homePhone,
        WorkPhone: result?.workPhone,
        Ext: result?.workPhoneExt,
        CellPhone: result?.mobilePhone,
        selectedPlanGroup:{
          entityId:result?.groupNumber,
          entityName:result?.groupNumber
        }
      })
    }
  }
  togglePlanGroupDialog = () => {
    if (this.state.planGroupVisible) {
      this.setState({
        planGroupSearchText: null,
      });
      this.props.resetPlanGroupList();
    }
    this.setState({
      planGroupVisible: !this.state.planGroupVisible,
    });
  };
  planGroupSearch = () => {
    this.props.getPlanGroup(this.state.planGroupSearchText??'');
  };
  onPlanGroupKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      selectedPlanGroup: selectedDataItems[0]
        ? {
            entityName: selectedDataItems[0].groupNumber,
            entityId: selectedDataItems[0].groupNumber,
          }
        : null,
    });
  };
  onPlanGroupSelectionChange=()=>{

  }
  onPlanGroupDoubleClick=(event)=>{
    this.setState({
      selectedPlanGroup: {
        entityId: event.dataItem.groupNumber,
        entityName: event.dataItem.groupNumber,
      },
    });
    this.props.SaveLookups(event.dataItem.groupNumber, "PlanGroup");
    //this.selectPatient();
    this.togglePlanGroupDialog();
  }
  render() {
    return (
      <Fragment>
        <div
          style={{
            marginLeft: "20px",
            backgroundColor: "white",
            padding: "5px",
          }}
        >
          {this.state.planGroupVisible && (
            <FindDialogComponent
              title="Group Search"
              placeholder="Enter Group Number"
              searcTextBoxValue={this.state.planGroupSearchText}
              onTextSearchChange={(e) => {
                this.setState({
                  planGroupSearchText: e.value,
                });
              }}
              clickOnSearch={this.planGroupSearch}
              dataItemKey="groupNumber"
              data={this.props.planGroups}
              columns={planGroupColumns}
              onSelectionChange={this.onPlanGroupSelectionChange}
              onRowDoubleClick={this.onPlanGroupDoubleClick}
              onKeyDown={this.onPlanGroupKeyDown}
              idGetterLookup={idGetterGroupNumber}
              toggleDialog={this.togglePlanGroupDialog}
              cancelDialog={this.togglePlanGroupDialog}
              skipNextData={true}
            ></FindDialogComponent>
          )}
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ float: "left" }}>

              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "289px" }}>
                  <div style={{ float: "left", marginLeft: "40px" }}>
                    <label className="userInfoLabel">Name</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.name}
                      onChange={(e) =>
                        this.setState({
                          name: e.value,
                        })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "470px" }}>
                  <div style={{ float: "left", marginLeft: "18px" }}>
                    <label className="userInfoLabel">List Name</label>
                  </div>
                  <div style={{ width: "300px", float: "left" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.listName}
                      onChange={(e) =>
                        this.setState({
                          listName: e.value,
                        })
                      }
                    ></TextBox>
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
                  {/* <div style={{ float: "left", marginLeft: "15px" }}>
                    <label className="userInfoLabel">SSN</label>
                  </div>
                  <div className="SSNStyle" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="###-##-####"
                      placeholder="000-00-00000"
                      className="unifyHeight"
                      value={this.state.SS}
                      onValueChange={(e) => this.setState({ SS: e.value })}
                    ></TextBox>
                  </div> */}
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
                      max={5}
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
                <div style={{ width: "356px" }}>
                  <div style={{ float: "left", marginLeft: "53px" }}>
                    <label className="userInfoLabel">Fax</label>
                  </div>
                  <div className="PhoneStyle" style={{ float: "left" }}>
                    <TextBox
                      type="maskedTextBox"
                      format="(###) ###-####"
                      placeholder="(000) 000-0000"
                      className="unifyHeight"
                      value={this.state.faxPhone}
                      onValueChange={(e) =>
                        this.setState({ faxPhone: e.target.value })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>


              <div style={{ width: "100%" }}>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div
                    className="rowHeight"
                    style={{ display: "flex", flexFlow: "row nowrap" }}
                  >
                    <div style={{ width: "419px" }}>
                      <div style={{ float: "left", marginLeft: "44px" }}>
                        <CheckboxComponent
                          style={{ marginRight: "5px" }}
                          id="isCopayExmpted"
                          label="Send Taxonomy Code"
                          value={this.state.isCopayExmpted}
                          onChange={(e) => this.setState({ isCopayExmpted: e.value })}
                        />
                      </div>
                      <div style={{ width: "200px", float: "left" }}>
                        <CheckboxComponent
                          style={{ marginRight: "5px" }}
                          id="instituteAsRendering"
                          label="Use Institute As Rendering"
                          value={this.state.instituteAsRendering}
                          onChange={(e) => this.setState({ instituteAsRendering: e.value })}
                        />
                      </div>
                    </div>
                    <div style={{ width: "180px", marginLeft: "-32px" }}>
                      <CheckboxComponent
                        style={{ marginRight: "5px" }}
                        id="useSSNAsCardNumber"
                        label="Use SSN as CardNumber"
                        value={this.state.useSSNAsCardNumber}
                        onChange={(e) => this.setState({ useSSNAsCardNumber: e.value })}
                      />
                    </div>
                    <div style={{ width: "180px" }}>
                      <CheckboxComponent
                        style={{ marginRight: "5px" }}
                        id="suppressSecondaryIds"
                        label="Suppress Secondary Ids"
                        value={this.state.suppressSecondaryIds}
                        onChange={(e) => this.setState({ suppressSecondaryIds: e.value })}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ width: "163px", marginLeft: "44px" }}>
                    <CheckboxComponent
                      style={{ marginRight: "5px" }}
                      id="supportEligibility"
                      label="Support Eligibility"
                      value={this.state.supportEligibility}
                      onChange={(e) => this.setState({ supportEligibility: e.value })}
                    />
                  </div>
                  <div style={{ width: "180px" }}>
                    <CheckboxComponent
                      style={{ marginRight: "5px" }}
                      id="inactivate"
                      label="Inactivate"
                      value={this.state.inactivate}
                      onChange={(e) => this.setState({ inactivate: e.value })}
                    />
                  </div>
                  <div style={{ width: "280px" }}>
                    <CheckboxComponent
                      style={{ marginRight: "5px" }}
                      id="useReferringSameAsRendering"
                      label="Use Referring Same As Rendering"
                      value={this.state.useReferringSameAsRendering}
                      onChange={(e) => this.setState({ useReferringSameAsRendering: e.value })}
                    />
                  </div>
                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ width: "344px", marginLeft: "44px" }}>
                    <CheckboxComponent
                      style={{ marginRight: "5px" }}
                      id="supportEligibility"
                      label="Send Home Claims Service Location"
                      value={this.state.sendHomeClaimsServiceLocation}
                      onChange={(e) => this.setState({ sendHomeClaimsServiceLocation: e.value })}
                    />
                  </div>
                  <div style={{ width: "280px" }}>
                    <CheckboxComponent
                      style={{ marginRight: "5px" }}
                      id="isCopayExmpted"
                      label="Force Old HCFA"
                      value={this.state.forceOldHCFA}
                      onChange={(e) => this.setState({ forceOldHCFA: e.value })}
                    />
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ float: "left", marginLeft: "40px" }}>
                    <label className="userInfoLabel">Notes</label>
                  </div>
                  <div style={{ float: "left", marginLeft: "5px", width: "600px" }}>
                    <TextArea
                      rows={5}
                      style={{ width: "100%", height: "3cm" }}
                      value={this.state.statementNotes ?? ""}
                      onChange={(e) =>
                        this.setState({
                          statementNotes: e.value,
                        })
                      }
                    ></TextArea>
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ float: "right" }}>
                    <ButtonComponent
                      type="edit"
                      icon="edit"
                      classButton="infraBtn-primary insurance-button "
                      onClick={() => {
                        this.props.setInsuranceExpanded();
                      }}
                    >
                      Save
                    </ButtonComponent>
                  </div>
                  <div style={{ float: "right", width: "200px !important" }}>
                    <ButtonComponent
                      type="edit"
                      icon="cancel"
                      classButton="infraBtn-primary insurance-button "
                      onClick={() => {
                        this.props.setInsuranceExpanded();
                      }}
                    >
                      Cancel
                    </ButtonComponent>
                  </div>
                </div>

              </div>
            </div>
            <div
              style={{
                borderStyle: "dotted",
                borderWidth: "thin",
                paddingLeft: "15px",
                paddingTop: "10px",
                width: "370px",
                height: "168px",
                marginLeft: "-225px",
                marginRight: "20px"
              }}
            >
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "370px" }}>
                  <div style={{ float: "left", marginLeft: "74px" }}>
                    <label className="userInfoLabel">EDI</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.eDI}
                      onChange={(e) =>
                        this.setState({
                          eDI: e.value,
                        })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ float: "left", marginLeft: "59px" }}>
                  <label className="userInfoLabel">Group</label>
                </div>
                <div style={{ width: "191px", float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownPlanGroups}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={this.state.selectedPlanGroup}
                    value={this.state.selectedPlanGroup}
                    onChange={(e) =>
                      this.setState({
                        selectedPlanGroup: {
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
                    onClick={this.togglePlanGroupDialog}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "300px" }}>
                  <div style={{ float: "left" }}>
                    <label className="userInfoLabel">Business Contact</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <DropDown
                      className="unifyHeight"
                      value={this.state.lastName}
                      onChange={(e) =>
                        this.setState({
                          lastName: e.value,
                        })
                      }
                    ></DropDown>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "370px" }}>
                  <div style={{ float: "left", marginLeft: "22px" }}>
                    <label className="userInfoLabel">Tech Contact</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <DropDown
                      className="unifyHeight"
                      value={this.state.lastName}
                      onChange={(e) =>
                        this.setState({
                          lastName: e.value,
                        })
                      }
                    ></DropDown>
                  </div>
                </div>
              </div>
              <div className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}>
                <div style={{ width: "299px" }}>
                  <div style={{ float: "left", marginLeft: "64px" }}>
                    <label className="userInfoLabel">Email</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.email}
                      onChange={(e) =>
                        this.setState({
                          email: e.value,
                        })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >

                <div style={{ width: "450px" }}>

                  <div style={{ float: "left", marginLeft: "50px" }}>
                    <label className="userInfoLabel">Website</label>
                  </div>
                  <div style={{ width: "250px", float: "left" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.website}
                      onChange={(e) =>
                        this.setState({
                          website: e.value,
                        })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                borderStyle: "dotted",
                borderWidth: "thin",
                paddingLeft: "15px",
                paddingTop: "10px",
                width: "370px",
                height: "128px",
                marginTop: "10px"
              }}
            >
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "400px" }}>
                  <div style={{ float: "left", marginLeft: "25px" }}>
                    <label className="userInfoLabel">Payer Identifier Value</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.payerIdentifierValue}
                      onChange={(e) =>
                        this.setState({
                          payerIdentifierValue: e.value,
                        })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>

              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "373px" }}>
                  <div style={{ float: "left", marginLeft: "12px" }}>
                    <label className="userInfoLabel">payer Identifiation type</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <DropDown
                      className="unifyHeight"
                      value={this.state.lastName}
                      onChange={(e) =>
                        this.setState({
                          lastName: e.value,
                        })
                      }
                    ></DropDown>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "400px" }}>
                  <div style={{ float: "left", marginLeft: "14px" }}>
                    <label className="userInfoLabel">S payer Identifier Value</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <TextBox
                      className="unifyHeight"
                      value={this.state.SpayerIdentifierValue}
                      onChange={(e) =>
                        this.setState({
                          SpayerIdentifierValue: e.value,
                        })
                      }
                    ></TextBox>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row nowrap" }}
              >
                <div style={{ width: "373px" }}>
                  <div style={{ float: "left" }}>
                    <label className="userInfoLabel">S payer Identifiation type</label>
                  </div>
                  <div style={{ width: "200px", float: "left" }}>
                    <DropDown
                      className="unifyHeight"
                      value={this.state.lastName}
                      onChange={(e) =>
                        this.setState({
                          lastName: e.value,
                        })
                      }
                    ></DropDown>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </Fragment>


    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InsuranceDetails);
