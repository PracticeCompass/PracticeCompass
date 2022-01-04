import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TextBox from "components/TextBox";
import DropDown from "components/DropDown";
import CheckboxComponent from "../../../../components/Checkbox";
import DatePickerComponent from "components/DatePicker";
import ButtonComponent from "../../../../components/Button";
import FindDialogComponent from "../../../common/findDialog";
import DatePicker from "components/DatePicker";
import {
    getPracticeList,
    resetPracticeList,
} from "../../../../redux/actions/patient";
import { InsuranceStatus } from "../ClaimList/ClaimListData.js";
import { GetClaimDetails } from "../../../../redux/actions/claimDetails";
import { SaveLookups } from "../../../../redux/actions/lookups";
import { getter } from "@progress/kendo-react-common";
import { PracticeColumns } from "./../../unSubmitted/ClaimList/ClaimListData";

const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);
function mapStateToProps(state) {
    return {
        dropDownPractices: state.lookups.practices,
        practiceList: state.patients.paractices,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resetPracticeList: () => dispatch(resetPracticeList()),
        getPracticeList: (name) => dispatch(getPracticeList(name)),
        SaveLookups: (EntityValueID, EntityName) =>
            dispatch(SaveLookups(EntityValueID, EntityName)),
        GetClaimDetails: (claimID, practiceID) =>
            dispatch(GetClaimDetails(claimID, practiceID)),
    };
}

class ClaimDetailSummary extends Component {
    state = {
        claimDetailsSummary: null,
        claimId: 0,
        claimNumber: null,
        description: null,
        patient: null,
        PatientClaim: false,
        practice: null,
        origincalCRN: null,
        subDelayReason: null,
        isAccident: false,
        isEmploymentAcceident: false,
        lastSeenDate: null,
        copay: null,
        claimTotal: null,
        insurancePaid: null,
        patientPaid: null,
        adjustments: null,
        claimBallance: null,
        practiceID: null,
        practiceSelected: null,
        practiceIDSelectedState: null,
        practiceSelectedState: null,
        success: false,
        none: false,
        error: false,
        warning: false,
        info: false,
        timer: 5000,
        practiceVisible: false,
        practiceSearchText: null,
        selectedPractice: null,
        primary: false,
        primaryStatus: null,
        primaryAgingStart: null,
        secondary: false,
        secondaryStatus: null,
        secondaryAgingStart: null,
        tertiary: false,
        tertiaryStatus: null,
        tertiaryAgingStart: null,

    };
    async componentDidMount() {
        if (
            this.props.claimDetails != null &&
            this.props.claimDetails.claimSID != undefined &&
            this.state.claimId != this.props.claimDetails.claimSID
        ) {
            let claimDetailsData = await this.props.GetClaimDetails(
                this.props.claimDetails.claimSID,
                this.props.claimDetails.practiceID
            );
            if (
                this.props.claimDetails.practiceID &&
                (this.props.dropDownPractices == null ||
                    this.props.dropDownPractices.filter(
                        (x) => x.entityId == this.props.claimDetails.practiceID
                    ).length == 0)
            ) {
                await this.props.SaveLookups(
                    this.props.claimDetails.practiceID,
                    "Practice"
                );
            }
            if(claimDetailsData ==null) return;
            await this.setState({
                // patientId: claimDetails.patientID,
                claimDetailsSummary: claimDetailsData,
                claimId: this.props.claimDetails.claimSID,
                claimNumber: claimDetailsData.claimNumber,
                copay: claimDetailsData.copayAmount,
                adjustments: claimDetailsData.adjustments,
                claimTotal: claimDetailsData.claimTotal,
                insurancePaid: claimDetailsData.insurancePaid,
                patientPaid: claimDetailsData.patientPaid,
                claimBallance: claimDetailsData.billBalance,
                patient: claimDetailsData.sortName,
                origincalCRN: claimDetailsData.originalCRN,
                isAccident: claimDetailsData.accidentRelated === "Y" ? true : false,
                lastSeenDate: claimDetailsData.lastseen
                    ? new Date(claimDetailsData.lastseen)
                    : null,
                selectedPractice: {
                    entityName: claimDetailsData.practiceName,
                    entityId: claimDetailsData.practiceID,
                },
                primary: claimDetailsData.primaryStatus !== null ? true : false,
                primaryStatus: InsuranceStatus.filter(
                    (item) => item.text === claimDetailsData.primaryStatus
                )[0],
                primaryAgingStart: claimDetailsData.primaryBilledDate
                    ? new Date(claimDetailsData.primaryBilledDate)
                    : null,
                secondary: claimDetailsData.seconadryStatus !== null ? true : false,
                secondaryStatus: InsuranceStatus.filter(
                    (item) => item.text === claimDetailsData.seconadryStatus
                )[0],
                secondaryAgingStart: claimDetailsData.seconadryBilledDate
                    ? new Date(claimDetailsData.seconadryBilledDate)
                    : null,
                tertiary: claimDetailsData.tertiaryStatus !== null ? true : false,
                tertiaryStatus: InsuranceStatus.filter(
                    (item) => item.text === claimDetailsData.tertiaryStatus
                )[0],
                tertiaryAgingStart: claimDetailsData.tertiaryBilledDate
                    ? new Date(claimDetailsData.tertiaryBilledDate)
                    : null,
            });
        }
    }
    // async componentDidUpdate(prevProps) {
    //   if (
    //     this.props.claimDetails != null &&
    //     this.props.claimDetails.claimSID != undefined &&
    //     this.state.claimId != this.props.claimDetails.claimSID
    //   ) {
    //     await this.setState({
    //       claimId: this.props.claimDetails.claimSID,
    //       claimDetailsSummary: this.props.claimDetails,
    //     });
    //   }
    // }
    practiceSearch = () => {
        this.props.getPracticeList(this.state.practiceSearchText);
    };
    onPracticeSelectionChange = (event) => {
        var selectedDataItems = event.dataItems.slice(
            event.startRowIndex,
            event.endRowIndex + 1
        );
        this.setState({
            selectedPractice: {
                entityName: selectedDataItems[0].sortName,
                entityId: selectedDataItems[0].practiceID,
            },
        });
    };
    onPracticeDoubleClick = async (event) => {
        this.setState({
            selectedPractice: {
                entityName: event.dataItem.sortName,
                entityId: event.dataItem.practiceID,
            },
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
            selectedPractice: {
                entityName: selectedDataItems ? selectedDataItems[0].sortName : null,
                entityId: selectedDataItems ? selectedDataItems[0].practiceID : null,
            },
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
    render() {
        return (
            <Fragment>
                <div
                    style={{
                        marginTop: "5px",
                        marginLeft: "20px",
                        backgroundColor: "white",
                        padding: "5px",
                    }}
                >
                    {this.state.practiceVisible && (
                        <FindDialogComponent
                            title="Practice Search"
                            placeholder="Enter Practice Name Or Practice Code"
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
                    <div className="row" style={{ width: "1211px" }}>
                        <div style={{ width: "563px", paddingLeft: "10px" }}>
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right", marginLeft: "37px" }}>
                                    <label className="userInfoLabel">Claim# </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "120px" }}>
                                    <TextBox
                                        type="text"
                                        className="unifyHeight"
                                        value={this.state.claimNumber}
                                        onChange={(e) =>
                                            this.setState({
                                                claimNumber: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                                {/* <div>
                  <label className="userInfoLabel">Batch# </label>
                </div>
                <div style={{ marginRight: "5px", width: "100px" }}>
                  <TextBox className="unifyHeight"></TextBox>
                </div> */}
                                {/* <div style={{ marginLeft: "10px" }}>
                  <label className="userInfoLabel">Description:</label>
                </div>
                <div style={{ width: "300px" }}>
                  <TextBox
                    type="text"
                    className="unifyHeight"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({
                        description: e.value,
                      })
                    }
                  ></TextBox>
                </div> */}
                            </div>
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right", marginLeft: "35px" }}>
                                    <label className="userInfoLabel">Patient </label>
                                </div>
                                <div className="patientStyle" style={{ marginRight: "5px" }}>
                                    <TextBox
                                        type="text"
                                        className="unifyHeight"
                                        value={this.state.patient}
                                        onChange={(e) =>
                                            this.setState({
                                                patient: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                                <div>
                                    <ButtonComponent
                                        icon="edit"
                                        type="edit"
                                        style={{ marginTop: "0px" }}
                                        classButton="infraBtn-primary"
                                        onClick={(e) => { this.props.togglePatientDetailsDialog() }}
                                    >
                                        Patient Details
                                    </ButtonComponent>
                                </div>
                                {/* <div>
                  <label className="userInfoLabel">Physician </label>
                </div>
                <div style={{ marginRight: "5px", width: "300px" }}>
                  <DropDown
                    className="unifyHeight"
                    id="filter"
                    name="filter"
                  ></DropDown>
                </div> */}
                            </div>
                            <div className="row rowHeight">
                                <div style={{ marginLeft: "29px" }}>
                                    <label className="userInfoLabel">Practice</label>
                                </div>
                                <div className="PracticeStyle">
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
                                <div>
                                    <ButtonComponent
                                        icon="search"
                                        type="search"
                                        style={{ marginTop: "0px" }}
                                        classButton="infraBtn-primary find-button"
                                        onClick={(e) => this.setState({ practiceVisible: true })}
                                    >
                                        Find
                                    </ButtonComponent>
                                </div>
                            </div>
                            {/* <div className="row">
                <div style={{ textAlign: "right", marginLeft: "20px" }}>
                  <label className="userInfoLabel">Local Use </label>
                </div>
                <div style={{ marginRight: "5px", width: "300px" }}>
                  <TextBox className="unifyHeight"></TextBox>
                </div>
                <div style={{ marginLeft: "278px" }}>
                  <label className="userInfoLabel">
                    Primary Care Physician
                  </label>
                </div>
                <div style={{ marginRight: "5px", width: "300px" }}>
                  <DropDown
                    className="unifyHeight"
                    id="filter"
                    name="filter"
                  ></DropDown>
                </div>
              </div> */}
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right" }}>
                                    <label className="userInfoLabel">Original CRN </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "190px" }}>
                                    <TextBox
                                        type="text"
                                        className="unifyHeight"
                                        value={this.state.origincalCRN}
                                        onChange={(e) =>
                                            this.setState({
                                                origincalCRN: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                                {/* <div style={{ marginLeft: "10px" }}>
                  <label className="userInfoLabel">
                    Submission Delay Reason
                  </label>
                </div>
                <div style={{ marginRight: "5px", width: "300px" }}>
                  <DropDown
                    //data={InsuranceCategory}
                    textField="text"
                    dataItemKey="id"
                    className="unifyHeight"
                    id="ins"
                    name="ins"
                    value={this.state.subDelayReason}
                    onChange={(e) => this.setState({ subDelayReason: e.value })}
                  ></DropDown>
                </div> */}
                            </div>
                            {/* <div className="row rowHeight" style={{ marginLeft: "52px" }}>
                <div className="wrap">
                  <CheckboxComponent
                    id="isAccident"
                    label="Is Accident"
                    style={{ marginRight: "5px" }}
                    value={this.state.isAccident}
                    onChange={(e) => this.setState({ isAccident: e.value })}
                  ></CheckboxComponent>
                </div>
              </div> */}
                            <div className="row rowHeight" style={{ marginLeft: "52px" }}>
                                <div className="wrap">
                                    <CheckboxComponent
                                        id="isEmploymentAccident"
                                        label="Is Employment Accident"
                                        style={{ marginRight: "5px" }}
                                        value={this.state.isEmploymentAcceident}
                                        onChange={(e) =>
                                            this.setState({ isEmploymentAcceident: e.value })
                                        }
                                    ></CheckboxComponent>
                                </div>
                                <div style={{ marginLeft: "75px" }}>
                                    <label className="userInfoLabel">Last Seen Date: </label>
                                </div>
                                <div className="dateStyle" style={{ marginRight: "5px" }}>
                                    <DatePickerComponent
                                        className="unifyHeight"
                                        placeholder="MM/DD/YYYY"
                                        format="M/dd/yyyy"
                                        value={this.state.lastSeenDate}
                                        onChange={(e) => this.setState({ lastSeenDate: e.value })}
                                    ></DatePickerComponent>
                                </div>
                                {/* <div style={{ marginLeft: "200px" }}>
                  <label className="userInfoLabel">Accident Date: </label>
                </div>
                <div style={{ marginRight: "5px", width: "200px" }}>
                  <DatePicker
                    className="unifyHeight"
                    placeholder="yyyy-MM-dd"
                  ></DatePicker>
                </div> */}
                            </div>
                            {/* <div className="row" style={{ marginLeft: "52px" }}>
                <div className="wrap">
                  <CheckboxComponent
                    id="isEmploymentAccident"
                    label="Is Accident Related To Employment"
                    style={{ marginRight: "5px" }}
                  ></CheckboxComponent>
                </div> 
                <div style={{ marginLeft: "128px" }}>
                  <label className="userInfoLabel">Pregnancy Date: </label>
                </div>
                <div style={{ marginRight: "5px", width: "200px" }}>
                  <DatePicker
                    className="unifyHeight"
                    placeholder="yyyy-MM-dd"
                  ></DatePicker>
                </div> 
              </div> */}
                            {/* <div className="row" style={{ marginLeft: "52px" }}>
                <div className="wrap">
                  <CheckboxComponent
                    id="isOtherAccident"
                    className="userInfoLabel"
                    label="Is Other Accident"
                  ></CheckboxComponent>
                </div> 
                <div style={{ marginLeft: "236px" }}>
                  <label className="userInfoLabel">Last Seen Date: </label>
                </div>
                <div style={{ marginRight: "5px", width: "200px" }}>
                  <DatePicker
                    className="unifyHeight"
                    placeholder="yyyy-MM-dd"
                  ></DatePicker>
                </div>
              </div> */}
                        </div>
                        <div
                            style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                paddingLeft: "15px",
                                paddingTop: "10px",
                                width: "210px",
                                height: "170px",
                            }}
                        >
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right", marginLeft: "57px" }}>
                                    <label className="userInfoLabel">Copay: </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "100px" }}>
                                    <TextBox
                                        type="numeric"
                                        format="c2"
                                        disabled={true}
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
                                <div style={{ textAlign: "right", marginLeft: "29px" }}>
                                    <label className="userInfoLabel">Claim Total: </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "100px" }}>
                                    <TextBox
                                        type="numeric"
                                        format="c2"
                                        disabled={true}
                                        className="unifyHeight"
                                        value={this.state.claimTotal}
                                        onChange={(e) =>
                                            this.setState({
                                                claimTotal: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                            </div>
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right", marginLeft: "10px" }}>
                                    <label className="userInfoLabel">Insurance Paid: </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "100px" }}>
                                    <TextBox
                                        type="numeric"
                                        format="c2"
                                        disabled={true}
                                        className="unifyHeight"
                                        value={this.state.insurancePaid}
                                        onChange={(e) =>
                                            this.setState({
                                                insurancePaid: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                            </div>
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right", marginLeft: "25px" }}>
                                    <label className="userInfoLabel">Patient Paid: </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "100px" }}>
                                    <TextBox
                                        type="numeric"
                                        format="c2"
                                        disabled={true}
                                        className="unifyHeight"
                                        value={this.state.patientPaid}
                                        onChange={(e) =>
                                            this.setState({
                                                patientPaid: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                            </div>
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right", marginLeft: "22px" }}>
                                    <label className="userInfoLabel">Adjustments: </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "100px" }}>
                                    <TextBox
                                        type="numeric"
                                        format="c2"
                                        disabled={true}
                                        className="unifyHeight"
                                        value={this.state.adjustments}
                                        onChange={(e) =>
                                            this.setState({
                                                adjustments: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                            </div>
                            <div className="row rowHeight">
                                <div style={{ textAlign: "right", marginLeft: "15px" }}>
                                    <label className="userInfoLabel">Claim Balance: </label>
                                </div>
                                <div style={{ marginRight: "5px", width: "100px" }}>
                                    <TextBox
                                        type="numeric"
                                        format="c2"
                                        disabled={true}
                                        className="unifyHeight"
                                        value={this.state.claimBallance}
                                        onChange={(e) =>
                                            this.setState({
                                                claimBallance: e.value,
                                            })
                                        }
                                    ></TextBox>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                // borderStyle: "dotted",
                                // borderWidth: "thin",
                                paddingLeft: "15px",
                                paddingTop: "10px",
                                width: "400px",
                                height: "170px",
                            }}
                        >
                            <fieldset
                                className="fieldsetStyle"
                                style={{ width: "400px", height: "153px" }}
                            >
                                <legend
                                    className="legendStyle"
                                    style={{ paddingRight: "5px", paddingLeft: "5px" }}
                                >
                                    Claim To
                                </legend>
                                <div>
                                    <div style={{ display: "flex", flexFlow: "row" }}>
                                        <div style={{ float: "left", marginLeft: "20px" }}>
                                            <label className="userInfoLabel">Plan</label>
                                        </div>
                                        <div style={{ float: "left", marginLeft: "80px" }}>
                                            <label className="userInfoLabel">Status</label>
                                        </div>
                                        <div style={{ float: "left", marginLeft: "80px" }}>
                                            <label className="userInfoLabel">Aging Start </label>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexFlow: "row" }}>
                                        <div style={{ float: "left", width: "88px" }}>
                                            <CheckboxComponent
                                                style={{ marginRight: "5px" }}
                                                id="primary"
                                                label="1"
                                                value={this.state.primary}
                                                onChange={(e) => this.setState({ primary: e.value })}
                                            />
                                        </div>
                                        <div
                                            className="claimStyle"
                                            style={{
                                                float: "left",
                                                marginRight: "10px",
                                            }}
                                        >
                                            <DropDown
                                                className="unifyHeight"
                                                data={InsuranceStatus}
                                                value={this.state.primaryStatus}
                                                onChange={(e) =>
                                                    this.setState({ primaryStatus: e.value })
                                                }
                                            ></DropDown>
                                        </div>
                                        <div className="dateStyle" style={{ float: "left" }}>
                                            <DatePicker
                                                className="unifyHeight"
                                                placeholder="MM/DD/YYYY"
                                                format="M/dd/yyyy"
                                                value={this.state.primaryAgingStart}
                                                onChange={(e) =>
                                                    this.setState({ primaryAgingStart: e.value })
                                                }
                                            ></DatePicker>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexFlow: "row",
                                            marginTop: "3px",
                                        }}
                                    >
                                        <div style={{ float: "left", width: "88px" }}>
                                            <CheckboxComponent
                                                style={{ marginRight: "5px" }}
                                                label="2"
                                                value={this.state.secondary}
                                                onChange={(e) => this.setState({ secondary: e.value })}
                                            />
                                        </div>
                                        <div
                                            className="claimStyle"
                                            style={{
                                                float: "left",
                                                marginRight: "10px",
                                            }}
                                        >
                                            <DropDown
                                                className="unifyHeight"
                                                data={InsuranceStatus}
                                                value={this.state.secondaryStatus}
                                                onChange={(e) =>
                                                    this.setState({ secondaryStatus: e.value })
                                                }
                                            ></DropDown>
                                        </div>
                                        <div className="dateStyle" style={{ float: "left" }}>
                                            <DatePicker
                                                className="unifyHeight"
                                                placeholder="MM/DD/YYYY"
                                                format="M/dd/yyyy"
                                                value={this.state.secondaryAgingStart}
                                                onChange={(e) =>
                                                    this.setState({ secondaryAgingStart: e.value })
                                                }
                                            ></DatePicker>
                                        </div>
                                    </div>
                                    <div
                                        className="rowHeight"
                                        style={{
                                            display: "flex",
                                            flexFlow: "row",
                                            marginTop: "3px",
                                        }}
                                    >
                                        <div style={{ float: "left", width: "88px" }}>
                                            <CheckboxComponent
                                                style={{ marginRight: "5px" }}
                                                label="3"
                                                value={this.state.tertiary}
                                                onChange={(e) => this.setState({ tertiary: e.value })}
                                            />
                                        </div>
                                        <div
                                            className="claimStyle"
                                            style={{
                                                float: "left",
                                                marginRight: "10px",
                                            }}
                                        >
                                            <DropDown
                                                className="unifyHeight"
                                                data={InsuranceStatus}
                                                value={this.state.tertiaryStatus}
                                                onChange={(e) =>
                                                    this.setState({ tertiaryStatus: e.value })
                                                }
                                            ></DropDown>
                                        </div>
                                        <div className="dateStyle" style={{ float: "left" }}>
                                            <DatePicker
                                                className="unifyHeight"
                                                placeholder="MM/DD/YYYY"
                                                format="M/dd/yyyy"
                                                value={this.state.tertiaryAgingStart}
                                                onChange={(e) =>
                                                    this.setState({ tertiaryAgingStart: e.value })
                                                }
                                            ></DatePicker>
                                        </div>
                                    </div>
                                    <div
                                        className="rowHeight"
                                        style={{ display: "flex", flexFlow: "row" }}
                                    >
                                        <div style={{ float: "left", width: "88px" }}>
                                            <CheckboxComponent
                                                style={{ marginRight: "5px" }}
                                                label="Patient"
                                                value={this.state.PatientClaim}
                                                onChange={(e) =>
                                                    this.setState({ PatientClaim: e.value })
                                                }
                                            />
                                        </div>
                                        <div
                                            className="claimStyle"
                                            style={{
                                                float: "left",
                                                marginRight: "10px",
                                            }}
                                        >
                                            <DropDown
                                                className="unifyHeight"
                                                data={InsuranceStatus}
                                                value={this.state.patientStatus}
                                                onChange={(e) =>
                                                    this.setState({ patientStatus: e.value })
                                                }
                                            ></DropDown>
                                        </div>
                                        <div className="dateStyle" style={{ float: "left" }}>
                                            <DatePicker
                                                className="unifyHeight"
                                                placeholder="MM/DD/YYYY"
                                                format="M/dd/yyyy"
                                                value={this.state.patientAgingStart}
                                                onChange={(e) =>
                                                    this.setState({ patientAgingStart: e.value })
                                                }
                                            ></DatePicker>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimDetailSummary);
