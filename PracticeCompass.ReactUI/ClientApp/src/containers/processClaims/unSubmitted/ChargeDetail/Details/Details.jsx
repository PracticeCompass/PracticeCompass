import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TextBox from "components/TextBox";
import ButtonComponent from "components/Button";
import DropDown from "components/DropDown";
import DatePicker from "components/DatePicker";
import {
  medicalProcType,
  modifiers,
  currentStatusLookup,
  recordStatusLookUp,
  CptColumns,
  ProviderColumns,
  ICDcolumns,
} from "../ChargeDetailData";
import CheckboxComponent from "components/Checkbox";
import FindDialogComponent from "../../../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import {
  ResetICD10Codes,
  GetICD10Codes,
  GetCPTCodes,
  resetCPTCodes,
  GetCharageDetails,
} from "../../../../../redux/actions/chargeDetail";
import { SaveLookups } from "../../../../../redux/actions/lookups";

const DATA_ITEM_KEY_ICD = "diagnosisCode";
const idGetterIcd = getter(DATA_ITEM_KEY_ICD);

const DATA_ITEM_KEY_CPT = "procedureCode";
const cptGetterCode = getter(DATA_ITEM_KEY_CPT);

const DATA_ITEM_KEY_PROVIDER = "providerId";
const providerId = getter(DATA_ITEM_KEY_PROVIDER);

function mapStateToProps(state) {
  return {
    ICD10List: state.charageDetails.icd10List,
    CptList: state.charageDetails.cptList,
    modifiers1: state.charageDetails.modifiers?.filter((x) => x.order == 1),
    modifiers2: state.charageDetails.modifiers?.filter((x) => x.order == 2),
    modifiers3: state.charageDetails.modifiers?.filter((x) => x.order == 3),
    modifiers4: state.charageDetails.modifiers?.filter((x) => x.order == 4),
    dropDownCpts: state.lookups.cpts,
    dropDownICD10: state.lookups.iCD10s,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetICD10Codes: (filter, refreshData, skip) =>
      dispatch(GetICD10Codes(filter, refreshData, skip)),
    GetCPTCodes: (filter) => dispatch(GetCPTCodes(filter)),
    resetCPTCodes: () => dispatch(resetCPTCodes()),
    GetCharageDetails: (chargeSID) => dispatch(GetCharageDetails(chargeSID)),
    ResetICD10Codes: () => dispatch(ResetICD10Codes()),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
  };
}

class Details extends Component {
  state = {
    selected: 0,
    description: null,
    units: null,
    charge: null,
    from: null,
    to: null,
    medicalProcType: null,
    isCopayExmpted: false,
    modifier1: null,
    modifier2: null,
    modifier3: null,
    modifier4: null,
    descriptionICD1: null,
    descriptionICD2: null,
    descriptionICD3: null,
    descriptionICD4: null,
    descriptionICD5: null,
    descriptionICD6: null,
    descriptionICD7: null,
    descriptionICD8: null,
    referralNumber: null,
    authorizationNumber: null,
    rendering: null,
    ordering: null,
    referring: null,
    chargeAmount: null,
    patientPortion: null,
    allowed: null,
    insurancePortion: null,
    paidAmount: null,
    chargeBalance: null,
    secondary: false,
    secondaryStatus: null,
    secondaryAgingStart: null,
    primary: false,
    primaryStatus: null,
    primaryAgingStart: null,
    tritiary: false,
    tritiaryStatus: null,
    tritiaryAgingStart: null,
    patient: false,
    patientStatus: null,
    patientAgingStart: null,
    cptDialogVisible: false,
    cptSearchText: null,
    icd10SearchText: null,
    chargeID: 0,
    chargeDetailsSummary: null,
    chargeActivity: null,
    recordStatus: null,
    currentStatus: null,
    cptCode: null,
    cptCodeDescription: null,
    icd10_1: null,
    icd10_2: null,
    icd10_3: null,
    icd10_4: null,
    icd10_5: null,
    icd10_6: null,
    icd10_7: null,
    icd10_8: null,
  };
  async componentDidMount() {
    if (
      this.props.ChargeDetails != null &&
      this.props.ChargeDetails.chargeSID != undefined &&
      this.state.chargeID != this.props.ChargeDetails.chargeSID
    ) {
      let chargeDetailsData = await this.props.GetCharageDetails(
        this.props.ChargeDetails.chargeSID
      );
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag1
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag1, "ICD10");
      }
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag2
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag2, "ICD10");
      }
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag3
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag3, "ICD10");
      }
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag4
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag4, "ICD10");
      }
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag5
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag5, "ICD10");
      }
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag6
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag6, "ICD10");
      }
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag7
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag7, "ICD10");
      }
      if (
        this.props.dropDownICD10 == null ||
        this.props.dropDownICD10.filter(
          (x) => x.entityId == chargeDetailsData.diag8
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.diag8, "ICD10");
      }
      if (
        this.props.dropDownCpts == null ||
        this.props.dropDownCpts.filter(
          (x) => x.entityId == chargeDetailsData.procedureCode
        ).length == 0
      ) {
        await this.props.SaveLookups(chargeDetailsData.procedureCode, "CPT");
      }
      await this.setState({
        // patientId: claimDetails.patientID,
        chargeDetailsSummary: chargeDetailsData,
        chargeID: this.props.ChargeDetails.chargeSID,
        chargeBalance: chargeDetailsData.chargeBalance,
        chargeAmount: chargeDetailsData.amount,
        patientPortion: chargeDetailsData.patientPortion,
        allowed: chargeDetailsData.approvedAmount,
        insurancePortion: chargeDetailsData.insurancePaid,
        paidAmount: chargeDetailsData.patientPaid,
        cptCode:
          chargeDetailsData.procedureCode !== null
            ? this.props.dropDownCpts.filter(
                (x) => x.entityId == chargeDetailsData.procedureCode
              )[0]
            : null,
        cptCodeDescription: chargeDetailsData.procedureDescription,
        modifier1:
          chargeDetailsData.modifier1 !== null
            ? this.props.modifiers1.filter(
                (x) => x.modifier == chargeDetailsData.modifier1
              )[0]
            : null,
        modifier2:
          chargeDetailsData.modifier2 !== null
            ? this.props.modifiers2.filter(
                (x) => x.modifier == chargeDetailsData.modifier2
              )[0]
            : null,
        modifier3:
          chargeDetailsData.modifier3 !== null
            ? this.props.modifiers3.filter(
                (x) => x.modifier == chargeDetailsData.modifier3
              )[0]
            : null,
        modifier4:
          chargeDetailsData.modifier4 !== null
            ? this.props.modifiers4.filter(
                (x) => x.modifier == chargeDetailsData.modifier4
              )[0]
            : null,
        recordStatus:
          chargeDetailsData.recordStatus !== null
            ? recordStatusLookUp.filter(
                (x) => x.id == chargeDetailsData.recordStatus
              )[0]
            : null,
        currentStatus:
          chargeDetailsData.currentStatus !== null
            ? currentStatusLookup.filter(
                (x) => x.id == chargeDetailsData.currentStatus
              )[0]
            : null,
        from:
          chargeDetailsData.fromServiceDate != null
            ? new Date(chargeDetailsData.fromServiceDate)
            : null,
        to:
          chargeDetailsData.toServiceDate != null
            ? new Date(chargeDetailsData.toServiceDate)
            : null,
        icd10_1:
          chargeDetailsData.diag1 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag1
              )[0]
            : null,
        icd10_2:
          chargeDetailsData.diag2 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag2
              )[0]
            : null,
        icd10_3:
          chargeDetailsData.diag3 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag3
              )[0]
            : null,
        icd10_4:
          chargeDetailsData.diag4 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag4
              )[0]
            : null,
        icd10_5:
          chargeDetailsData.diag5 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag5
              )[0]
            : null,
        icd10_6:
          chargeDetailsData.diag6 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag6
              )[0]
            : null,
        icd10_7:
          chargeDetailsData.diag7 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag7
              )[0]
            : null,
        icd10_8:
          chargeDetailsData.diag8 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag8
              )[0]
            : null,
        descriptionICD1:
          chargeDetailsData.diag1 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag1
              )[0].entityName
            : null,
        descriptionICD2:
          chargeDetailsData.diag2 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag2
              )[0].entityName
            : null,
        descriptionICD3:
          chargeDetailsData.diag3 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag3
              )[0].entityName
            : null,
        descriptionICD4:
          chargeDetailsData.diag4 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag4
              )[0].entityName
            : null,
        descriptionICD5:
          chargeDetailsData.diag5 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag5
              )[0].entityName
            : null,
        descriptionICD6:
          chargeDetailsData.diag6 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag6
              )[0].entityName
            : null,
        descriptionICD7:
          chargeDetailsData.diag7 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag7
              )[0].entityName
            : null,
        descriptionICD8:
          chargeDetailsData.diag8 != null
            ? this.props.dropDownICD10.filter(
                (x) => x.entityId == chargeDetailsData.diag8
              )[0].entityName
            : null,
        authorizationNumber: chargeDetailsData.authorizationNumber,
        units: chargeDetailsData.chargeDetailsData,
      });
    }
  }
  handleSelect = (e) => {
    this.setState({ selected: e.selected });
  };

  icd10CodesSearch = async (refreshData, skip) => {
    await this.props.GetICD10Codes(
      this.state.icd10SearchText,
      refreshData,
      skip
    );
  };
  onCptCodeSelectionChange = (event) => {
    if (event.dataItem != null) {
      this.setState({
        cptCode: {
          entityName: event.dataItem.description,
          entityId: event.dataItem.procedureCode,
        },
      });
    }
  };
  onCptCodeDoubleClick = (event) => {
    if (event.dataItem != null) {
      this.setState({
        cptCode: {
          entityName: event.dataItem.description,
          entityId: event.dataItem.procedureCode,
        },
        cptCodeDescription: event.dataItem.description,
      });
      this.props.SaveLookups(event.dataItem.procedureCode, "CPT");
    }
    this.cancelCptCodeDialog(null);
  };
  onCptCodeKeyDown = (event) => {};
  cancelCptCodeDialog = (event) => {
    this.props.resetCPTCodes();
    this.setState({ cptDialogVisible: false });
    this.setState({ cptSearchText: null });
  };
  cptSearch = async () => {
    this.props.GetCPTCodes(this.state.cptSearchText ?? "");
  };
  cancelProviderDialog = (event) => {
    this.props.resetCPTCodes();
    this.setState({ providerVisible: false });
    this.setState({ providerText: null });
  };
  setSelectedIcd10Codes = (diagnosisCode, shortDescription) => {
    if (this.state.visiableICD1) {
      this.setState({
        icd10_1: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD1: shortDescription,
      });
    } else if (this.state.visiableICD2) {
      this.setState({
        icd10_2: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD2: shortDescription,
      });
    } else if (this.state.visiableICD3) {
      this.setState({
        icd10_3: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD3: shortDescription,
      });
    } else if (this.state.visiableICD4) {
      this.setState({
        icd10_4: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD4: shortDescription,
      });
    } else if (this.state.visiableICD5) {
      this.setState({
        icd10_5: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD5: shortDescription,
      });
    } else if (this.state.visiableICD6) {
      this.setState({
        icd10_6: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD6: shortDescription,
      });
    } else if (this.state.visiableICD7) {
      this.setState({
        icd10_7: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD7: shortDescription,
      });
    } else if (this.state.visiableICD8) {
      this.setState({
        icd10_8: {
          entityName: shortDescription,
          entityId: diagnosisCode,
        },
        descriptionICD8: shortDescription,
      });
    }
  };
  onICD10SelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setSelectedIcd10Codes(
      selectedDataItems[0].diagnosisCode,
      selectedDataItems[0].shortDescription
    );
  };
  onICD10DoubleClick = async (event) => {
    await this.props.SaveLookups(event.dataItem.diagnosisCode, "ICD10");
    this.setSelectedIcd10Codes(
      event.dataItem.diagnosisCode,
      event.dataItem.shortDescription
    );

    //this.selectPatient();
    this.toggleICD10Dialog();
  };
  onICD10KeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setSelectedIcd10Codes(
      selectedDataItems ? selectedDataItems[0].diagnosisCode : null,
      selectedDataItems ? selectedDataItems[0].shortDescription : null
    );
  };
  cancelICD10Dialog = () => {
    this.setState({
      icd10SearchText: null,
    });
    this.toggleICD10Dialog();
  };
  toggleICD10Dialog = () => {
    if (
      this.state.visiableICD1 ||
      this.state.visiableICD2 ||
      this.state.visiableICD3 ||
      this.state.visiableICD4 ||
      this.state.visiableICD5 ||
      this.state.visiableICD6 ||
      this.state.visiableICD7 ||
      this.state.visiableICD8
    ) {
      this.setState({
        icd10SearchText: null,
      });
      this.props.ResetICD10Codes();
    }
    this.setState({
      visiableICD1: false,
      visiableICD2: false,
      visiableICD3: false,
      visiableICD4: false,
      visiableICD5: false,
      visiableICD6: false,
      visiableICD7: false,
      visiableICD8: false,
    });
  };
  render() {
    return (
      <Fragment>
        {(this.state.visiableICD1 ||
          this.state.visiableICD2 ||
          this.state.visiableICD3 ||
          this.state.visiableICD4 ||
          this.state.visiableICD5 ||
          this.state.visiableICD6 ||
          this.state.visiableICD7 ||
          this.state.visiableICD8) && (
          <FindDialogComponent
            title="ICD Search"
            placeholder="Enter ICD Code , Short or Long Description"
            searcTextBoxValue={this.state.icd10SearchText}
            onTextSearchChange={(e) => {
              this.setState({
                icd10SearchText: e.value,
              });
            }}
            clickOnSearch={this.icd10CodesSearch}
            dataItemKey="diagnosisCode"
            data={this.props.ICD10List}
            columns={ICDcolumns}
            onSelectionChange={this.onICD10SelectionChange}
            onRowDoubleClick={this.onICD10DoubleClick}
            onKeyDown={this.onICD10KeyDown}
            idGetterLookup={idGetterIcd}
            toggleDialog={this.cancelICD10Dialog}
            cancelDialog={this.cancelICD10Dialog}
            pageChange={this.pageChange}
            getNextData={true}
          ></FindDialogComponent>
        )}
        {this.state.cptDialogVisible && (
          <FindDialogComponent
            title="Cpt Search"
            placeholder="Enter Cpt Code"
            searcTextBoxValue={this.state.cptSearchText}
            onTextSearchChange={(e) => {
              this.setState({
                cptSearchText: e.value,
              });
            }}
            clickOnSearch={this.cptSearch}
            dataItemKey="procedureCode"
            data={this.props.CptList}
            columns={CptColumns}
            onSelectionChange={this.onCptCodeSelectionChange}
            onRowDoubleClick={this.onCptCodeDoubleClick}
            onKeyDown={this.onCptCodeKeyDown}
            idGetterLookup={cptGetterCode}
            toggleDialog={this.cancelCptCodeDialog}
            cancelDialog={this.cancelCptCodeDialog}
          ></FindDialogComponent>
        )}
        {this.state.providerVisible && (
          <FindDialogComponent
            title={this.state.providerTitle}
            placeholder={"Enter " + this.state.providerTitle}
            searcTextBoxValue={this.state.providerText}
            onTextSearchChange={(e) => {
              this.setState({
                providerText: e.value,
              });
            }}
            clickOnSearch={this.cptSearch}
            dataItemKey="providerId"
            data={[]}
            columns={ProviderColumns}
            onSelectionChange={this.onCptCodeSelectionChange}
            onRowDoubleClick={this.onCptCodeDoubleClick}
            onKeyDown={this.onCptCodeKeyDown}
            idGetterLookup={cptGetterCode}
            toggleDialog={this.cancelProviderDialog}
            cancelDialog={this.cancelProviderDialog}
          ></FindDialogComponent>
        )}
        <div style={{ width: "100%", padding: "5px", height: "300px" }}>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ float: "left" }}>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row" }}
              >
                <div style={{ float: "left", width: "270px" }}>
                  <div style={{ float: "left" }}>
                    <label className="userInfoLabel">CPT Codes</label>
                  </div>
                  <div style={{ float: "left", width: "139px" }}>
                    <DropDown
                      className="unifyHeight"
                      textField="entityId"
                      dataItemKey="entityId"
                      value={this.state.cptCode}
                      onChange={(e) =>
                        this.setState({
                          cptCodeDescription: e.value?.entityName,
                        })
                      }
                      data={this.props.dropDownCpts}
                    ></DropDown>
                  </div>
                  <div style={{ float: "left", marginTop: "-3px" }}>
                    <ButtonComponent
                      icon="search"
                      type="search"
                      classButton="infraBtn-primary find-button"
                      onClick={(e) => this.setState({ cptDialogVisible: true })}
                    >
                      Find
                    </ButtonComponent>
                  </div>
                </div>
                <div style={{ float: "left", width: "380px" }}>
                  <div style={{ float: "left", marginLeft: "10px" }}>
                    <label className="userInfoLabel">Description</label>
                  </div>
                  <div style={{ float: "left", width: "300px" }}>
                    <TextBox
                      value={this.state.cptCodeDescription}
                      className="unifyHeight"
                      onChange={(e) =>
                        this.setState({ cptCodeDescription: e.value })
                      }
                    ></TextBox>
                  </div>
                </div>
                <div style={{ float: "left", width: "305px" }}>
                  <div style={{ float: "left" }}>
                    <div style={{ float: "left", marginLeft: "10px" }}>
                      <label className="userInfoLabel">Units</label>
                    </div>
                    <div style={{ float: "left", width: "65px" }}>
                      <TextBox
                        type="numeric"
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
                  <div style={{ float: "left" }}>
                    <div style={{ float: "left", marginLeft: "10px" }}>
                      <label className="userInfoLabel">Charge</label>
                    </div>
                    <div style={{ float: "left", width: "90px" }}>
                      <TextBox
                        type="numeric"
                        className="unifyHeight"
                        format="c2"
                        value={this.state.charge}
                        onChange={(e) =>
                          this.setState({
                            charge: e.value,
                          })
                        }
                      ></TextBox>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row" }}
              >
                <div style={{ float: "left" }}>
                  <div style={{ float: "left", marginLeft: "30px" }}>
                    <label className="userInfoLabel">From</label>
                  </div>
                  <div style={{ float: "left", width: "134px" }}>
                    <DatePicker
                      className="unifyHeight"
                      placeholder="MM/DD/YYYY"
                      format="M/dd/yyyy"
                      value={this.state.from}
                      onChange={(e) => this.setState({ from: e.value })}
                    ></DatePicker>
                  </div>
                </div>
                <div style={{ float: "left" }}>
                  <div style={{ float: "left", marginLeft: "10px" }}>
                    <label className="userInfoLabel">To</label>
                  </div>
                  <div style={{ float: "left", width: "134px" }}>
                    <DatePicker
                      className="unifyHeight"
                      placeholder="MM/DD/YYYY"
                      format="M/dd/yyyy"
                      value={this.state.to}
                      onChange={(e) => this.setState({ to: e.value })}
                    ></DatePicker>
                  </div>
                </div>
                <div style={{ float: "left" }}>
                  <div style={{ float: "left", marginLeft: "10px" }}>
                    <label className="userInfoLabel">Medical Proc Type</label>
                  </div>
                  <div style={{ float: "left", width: "149px" }}>
                    <DropDown
                      className="unifyHeight"
                      data={medicalProcType}
                      value={this.state.medicalProcType}
                      onChange={(e) =>
                        this.setState({ medicalProcType: e.value })
                      }
                    ></DropDown>
                  </div>
                  <div style={{ float: "left", marginLeft: "10px" }}>
                    <label className="userInfoLabel">Record Status</label>
                  </div>
                  <div
                    style={{
                      float: "left",
                      width: "140px",
                      marginRight: "10px",
                    }}
                  >
                    <DropDown
                      className="unifyHeight"
                      textField="text"
                      dataItemKey="id"
                      data={recordStatusLookUp}
                      value={this.state.recordStatus}
                      onChange={(e) => this.setState({ recordStatus: e.value })}
                    ></DropDown>
                  </div>
                </div>
                {/* <div
                  style={{
                    float: "left",
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  <CheckboxComponent
                    style={{ marginRight: "5px" }}
                    id="isCopayExmpted"
                    label="Is Copay exmpted"
                    value={this.state.isCopayExmpted}
                    onChange={(e) => this.setState({ isCopayExmpted: e.value })}
                  />
                </div> */}
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row" }}
              >
                <div style={{ float: "left" }}>
                  <div style={{ float: "left", marginLeft: "4px" }}>
                    <label className="userInfoLabel">Modifiers</label>
                  </div>
                  <div
                    style={{
                      float: "left",
                      width: "105px",
                      marginRight: "10px",
                    }}
                  >
                    <DropDown
                      className="unifyHeight"
                      textField="modifier"
                      dataItemKey="modifier"
                      data={this.props.modifiers1}
                      value={this.state.modifier1}
                      onChange={(e) => this.setState({ modifier1: e.value })}
                    ></DropDown>
                  </div>
                  <div
                    style={{
                      float: "left",
                      width: "105px",
                      marginRight: "10px",
                    }}
                  >
                    <DropDown
                      className="unifyHeight"
                      textField="modifier"
                      dataItemKey="modifier"
                      data={this.props.modifiers2}
                      value={this.state.modifier2}
                      onChange={(e) => this.setState({ modifier2: e.value })}
                    ></DropDown>
                  </div>
                  <div
                    style={{
                      float: "left",
                      width: "105px",
                      marginRight: "10px",
                    }}
                  >
                    <DropDown
                      className="unifyHeight"
                      textField="modifier"
                      dataItemKey="modifier"
                      data={this.props.modifiers3}
                      value={this.state.modifier3}
                      onChange={(e) => this.setState({ modifier3: e.value })}
                    ></DropDown>
                  </div>
                  <div
                    style={{
                      float: "left",
                      width: "105px",
                      marginRight: "10px",
                    }}
                  >
                    <DropDown
                      className="unifyHeight"
                      textField="modifier"
                      dataItemKey="modifier"
                      data={this.props.modifiers4}
                      value={this.state.modifier4}
                      onChange={(e) => this.setState({ modifier4: e.value })}
                    ></DropDown>
                  </div>
                  <div style={{ float: "left", marginLeft: "4px" }}>
                    <label className="userInfoLabel">Current Status</label>
                  </div>
                  <div
                    style={{
                      float: "left",
                      width: "368px",
                      marginRight: "10px",
                    }}
                  >
                    <DropDown
                      className="unifyHeight"
                      textField="text"
                      dataItemKey="id"
                      data={currentStatusLookup}
                      value={this.state.currentStatus}
                      onChange={(e) =>
                        this.setState({ currentStatus: e.value })
                      }
                    ></DropDown>
                  </div>
                </div>
              </div>
              <div
                className="rowHeight"
                style={{ display: "flex", flexFlow: "row" }}
              >
                <div style={{ float: "left" }}>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "255" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD1</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_1}
                            value={this.state.icd10_1}
                            onChange={(e) => {
                              this.setState({
                                icd10_1: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD1: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD1: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD1}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD1: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "267px" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD2</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_2}
                            value={this.state.icd10_2}
                            onChange={(e) => {
                              this.setState({
                                icd10_2: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD2: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD2: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD2}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD2: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "267px" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD3</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_3}
                            value={this.state.icd10_3}
                            onChange={(e) => {
                              this.setState({
                                icd10_3: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD3: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD3: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD3}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD3: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "267px" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD4</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_4}
                            value={this.state.icd10_4}
                            onChange={(e) => {
                              this.setState({
                                icd10_4: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD4: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD4: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD4}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD4: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "267px" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD5</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_5}
                            value={this.state.icd10_5}
                            onChange={(e) => {
                              this.setState({
                                icd10_5: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD5: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD5: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD5}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD5: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "267px" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD6</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_6}
                            value={this.state.icd10_6}
                            onChange={(e) => {
                              this.setState({
                                icd10_6: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD6: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD6: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD6}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD6: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "267px" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD7</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_7}
                            value={this.state.icd10_7}
                            onChange={(e) => {
                              this.setState({
                                icd10_7: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD7: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD7: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD7}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD7: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", width: "267px" }}>
                        <div style={{ float: "left", marginLeft: "30px" }}>
                          <label className="userInfoLabel">ICD8</label>
                        </div>
                        <div style={{ float: "left", width: "139px" }}>
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownICD10}
                            textField="entityId"
                            dataItemKey="entityId"
                            defaultValue={this.state.icd10_8}
                            value={this.state.icd10_8}
                            onChange={(e) => {
                              this.setState({
                                icd10_8: {
                                  entityName: e.value?.entityName,
                                  entityId: e.value?.entityId,
                                },
                                descriptionICD8: e.value?.entityName,
                              });
                            }}
                          ></DropDown>
                        </div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={(e) => {
                            this.setState({ visiableICD8: true });
                          }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "380px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "300px" }}>
                        <TextBox
                          value={this.state.descriptionICD8}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionICD8: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ float: "left", width: "345px" }}>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">
                          Authorization Number
                        </label>
                      </div>
                      <div style={{ float: "left", width: "195px" }}>
                        <TextBox
                          value={this.state.authorizationNumber}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ authorizationNumber: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "44px" }}>
                        <label className="userInfoLabel">Referral Number</label>
                      </div>
                      <div style={{ float: "left", width: "195px" }}>
                        <TextBox
                          value={this.state.referralNumber}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ referralNumber: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div>
                    <fieldset
                      className="fieldsetStyle"
                      style={{
                        width: "325px",
                        height: "150px",
                        marginLeft: "10px",
                      }}
                    >
                      <legend
                        className="legendStyle"
                        style={{ paddingRight: "5px", paddingLeft: "5px" }}
                      >
                        Providers
                      </legend>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexFlow: "row",
                            marginTop: "20px",
                          }}
                        >
                          <div style={{ float: "left" }}>
                            <div style={{ float: "left", marginLeft: "21px" }}>
                              <label className="userInfoLabel">Rendering</label>
                            </div>
                            <div style={{ float: "left", width: "173px" }}>
                              <DropDown
                                className="unifyHeight"
                                data={medicalProcType}
                                value={this.state.rendering}
                                onChange={(e) =>
                                  this.setState({ rendering: e.value })
                                }
                              ></DropDown>
                            </div>
                            <div style={{ float: "left", marginTop: "-3px" }}>
                              <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary find-button"
                                onClick={(e) =>
                                  this.setState({
                                    providerVisible: true,
                                    providerTitle: "Rendering",
                                  })
                                }
                              >
                                Find
                              </ButtonComponent>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <div style={{ float: "left" }}>
                            <div style={{ float: "left", marginLeft: "28px" }}>
                              <label className="userInfoLabel">Ordering</label>
                            </div>
                            <div style={{ float: "left", width: "173px" }}>
                              <DropDown
                                className="unifyHeight"
                                data={medicalProcType}
                                value={this.state.ordering}
                                onChange={(e) =>
                                  this.setState({ ordering: e.value })
                                }
                              ></DropDown>
                            </div>
                            <div style={{ float: "left", marginTop: "-3px" }}>
                              <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary find-button"
                                onClick={(e) =>
                                  this.setState({
                                    providerVisible: true,
                                    providerTitle: "Ordering",
                                  })
                                }
                              >
                                Find
                              </ButtonComponent>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <div style={{ float: "left" }}>
                            <div style={{ float: "left", marginLeft: "26px" }}>
                              <label className="userInfoLabel">Referring</label>
                            </div>
                            <div style={{ float: "left", width: "173px" }}>
                              <DropDown
                                className="unifyHeight"
                                data={medicalProcType}
                                value={this.state.referring}
                                onChange={(e) =>
                                  this.setState({ referring: e.value })
                                }
                              ></DropDown>
                            </div>
                            <div style={{ float: "left", marginTop: "-3px" }}>
                              <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary find-button"
                                onClick={(e) =>
                                  this.setState({
                                    providerVisible: true,
                                    providerTitle: "Referring",
                                  })
                                }
                              >
                                Find
                              </ButtonComponent>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <div style={{ float: "left" }}>
                            <div style={{ float: "left", marginLeft: "13px" }}>
                              <label className="userInfoLabel">
                                Supervising
                              </label>
                            </div>
                            <div style={{ float: "left", width: "173px" }}>
                              <DropDown
                                className="unifyHeight"
                                data={medicalProcType}
                                value={this.state.referring}
                                onChange={(e) =>
                                  this.setState({ referring: e.value })
                                }
                              ></DropDown>
                            </div>
                            <div style={{ float: "left", marginTop: "-3px" }}>
                              <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary find-button"
                                onClick={(e) =>
                                  this.setState({
                                    providerVisible: true,
                                    providerTitle: "Supervising",
                                  })
                                }
                              >
                                Find
                              </ButtonComponent>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ float: "left" }}>
              <div style={{ display: "flex", flexFlow: "row" }}>
                <fieldset
                  className="fieldsetStyle"
                  style={{
                    width: "263px",
                    height: "183px",
                  }}
                >
                  <legend
                    className="legendStyle"
                    style={{ paddingRight: "5px", paddingLeft: "5px" }}
                  >
                    Charges
                  </legend>
                  <div>
                    <div
                      className="rowHeight"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        marginTop: "5px",
                      }}
                    >
                      <div style={{ float: "left" }}>
                        <div style={{ float: "left", marginLeft: "33px" }}>
                          <label className="userInfoLabel">Charge Amount</label>
                        </div>
                        <div style={{ float: "left", width: "120px" }}>
                          <TextBox
                            type="numeric"
                            className="unifyHeight"
                            format="c2"
                            value={this.state.chargeAmount}
                            onChange={(e) =>
                              this.setState({
                                chargeAmount: e.value,
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
                      <div style={{ float: "left" }}>
                        <div style={{ float: "left", marginLeft: "75px" }}>
                          <label className="userInfoLabel">Allowed</label>
                        </div>
                        <div style={{ float: "left", width: "120px" }}>
                          <TextBox
                            type="numeric"
                            className="unifyHeight"
                            format="c2"
                            value={this.state.allowed}
                            onChange={(e) =>
                              this.setState({
                                allowed: e.value,
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
                      <div style={{ float: "left" }}>
                        <div style={{ float: "left", marginLeft: "35px" }}>
                          <label className="userInfoLabel">
                            Patient Portion
                          </label>
                        </div>
                        <div style={{ float: "left", width: "120px" }}>
                          <TextBox
                            type="numeric"
                            className="unifyHeight"
                            format="c2"
                            value={this.state.patientPortion}
                            onChange={(e) =>
                              this.setState({
                                patientPortion: e.value,
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
                      <div style={{ float: "left" }}>
                        <div style={{ float: "left", marginLeft: "49px" }}>
                          <label className="userInfoLabel">
                            Plan Portion
                          </label>
                        </div>
                        <div style={{ float: "left", width: "120px" }}>
                          <TextBox
                            type="numeric"
                            className="unifyHeight"
                            format="c2"
                            value={this.state.insurancePortion}
                            onChange={(e) =>
                              this.setState({
                                insurancePortion: e.value,
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
                      <div style={{ float: "left" }}>
                        <div style={{ float: "left", marginLeft: "47px" }}>
                          <label className="userInfoLabel">Paid Amount</label>
                        </div>
                        <div style={{ float: "left", width: "120px" }}>
                          <TextBox
                            type="numeric"
                            className="unifyHeight"
                            format="c2"
                            value={this.state.paidAmount}
                            onChange={(e) =>
                              this.setState({
                                paidAmount: e.value,
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
                      <div style={{ float: "left" }}>
                        <div style={{ float: "left", marginLeft: "34px" }}>
                          <label className="userInfoLabel">
                            Charge Balance
                          </label>
                        </div>
                        <div style={{ float: "left", width: "120px" }}>
                          <TextBox
                            type="numeric"
                            className="unifyHeight"
                            format="c2"
                            value={this.state.chargeBalance}
                            onChange={(e) =>
                              this.setState({
                                chargeBalance: e.value,
                              })
                            }
                          ></TextBox>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div style={{ display: "flex", flexFlow: "row" }}></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);
