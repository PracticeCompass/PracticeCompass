import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../../components/Button";
import GridComponent from "../../../../components/Grid";
import ClaimDetailSummary from "./ClaimDetailSummary";
import ClaimDetailFilling from "./ClaimDetailFilling";
import ClaimDetailSubmissionHistory from "./ClaimDetailSubmissionHistory";
import ClaimDetailClaimNotes from "./ClaimDetailClaimNotes";
import { columns } from "./ClaimDetailData";
import Show_HideDialogComponent from "../../../common/show_hideDialog";
import NotificationComponent from "../../../common/notification";
import {
    GetClaimDetails,
    ChargeGridGet,
} from "../../../../redux/actions/claimDetails";
import {
    GetGridColumns,
    SaveGridColumns,
} from "../../../../redux/actions/GridColumns";
import { getter } from "@progress/kendo-react-common";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import PatientDetails from "../../../processPatients/patients/patientDetails/PatientDetails"

function mapStateToProps(state) {
    return {
        charges: state.claimDetails.charges,
        UiExpand: state.ui.UiExpand,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ChargeGridGet: (claimID) => dispatch(ChargeGridGet(claimID)),
        GetClaimDetails: (claimID, practiceID) =>
            dispatch(GetClaimDetails(claimID, practiceID)),
        GetGridColumns: (name) => dispatch(GetGridColumns(name)),
        SaveGridColumns: (name, columns) =>
            dispatch(SaveGridColumns(name, columns)),
    };
}
const DATA_ITEM_KEY_CHARGES = "chargeSID";
const idGetterCharges = getter(DATA_ITEM_KEY_CHARGES);
class ClaimDetail extends Component {
    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    state = {
        selected: 0,
        Show_HideDialogVisible: false,
        claimId: 0,
        claimDetails: null,
        refreshGrid: true,
        success: false,
        none: false,
        error: false,
        warning: false,
        info: false,
        timer: 5000,
        selectedChargeSID: 0,
        claimListColumns: columns,
        gridWidth: 0,
        Show_PatientDetailsDialog: false,
        PatientDetails: {},
    };
    handleSelect = (e) => {
        this.setState({ selected: e.selected });
    };
    toggleShowColumnsDialog = () => {
        this.setState({ Show_HideDialogVisible: false });
    };
    togglePatientDetailsDialog = () => {
        this.setState({ Show_PatientDetailsDialog: true });
    };
    onClaimGridSelectionChange = (event) => {
        this.props.setChargeDetailsData(
            event.dataItems == null || event.dataItems.length == 0
                ? event.dataItem
                : event.dataItems[event.endRowIndex]
        );
        this.setState({
            selectedChargeSID:
                event.dataItems == null || event.dataItems.length == 0
                    ? event.dataItem.chargeSID
                    : event.dataItems[event.endRowIndex].chargeSID,
        });
    };
    onClaimGridDoubleSelectionChange = (event) => {
        this.props.setChargeDetailsData(
            event.dataItems == null || event.dataItems.length == 0
                ? event.dataItem
                : event.dataItems[event.endRowIndex]
        );
        this.setState({
            selectedChargeSID:
                event.dataItems == null || event.dataItems.length == 0
                    ? event.dataItem.chargeSID
                    : event.dataItems[event.endRowIndex].chargeSID,
        });
        this.props.setChargeDetailExpanded();
    };
    expandChargeDetails = () => {
        if (this.state.selectedChargeSID !== 0) {
            this.props.setChargeDetailExpanded();
        } else {
            this.setState({
                warning: true,
                message: "Please Select Charge to Edit.",
            });
            setTimeout(() => {
                this.setState({
                    warning: false,
                });
            }, this.state.timer);
        }
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
            //localStorage.setItem("claimDetailsId", JSON.stringify(columns));
            let GridColumns = await this.props.SaveGridColumns(
                "claimDetailsId",
                JSON.stringify(columns)
            );
            this.setState({
                claimListColumns: JSON.parse(GridColumns?.columns),
                Show_HideDialogVisible: false,
            });
            setTimeout(() => {
                this.setState({ refreshGrid: true });
            }, 10);
        }
    };
    componentDidMount(prevProps) {
        if (
            this.props.claimDetails != null &&
            this.state.claimId != this.props.claimDetails.claimSID
        ) {
            this.props.ChargeGridGet(
                this.props.claimDetails.claimSID,
                this.props.claimDetails.practiceID
            );
        }
        this.getGridColumns();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
        let patientDetailsData = { patientID: this.props.claimDetails?.patientID, personID: this.props.claimDetails?.patientID, practiceID: this.props.claimDetails?.practiceID }
        this.setState({
            patientDetails: patientDetailsData
        })
    }
    componentDidUpdate = (event) => {
        if (event.UiExpand != this.props.UiExpand) {
            this.updateDimensions();
        }
    };
    updateDimensions() {
        this.setState({
            gridWidth: window.innerWidth - (!this.props.UiExpand ? 93 : 273),
        });
    }
    getGridColumns = async () => {
        this.setState({ refreshGrid: false });
        let currentColumns = await this.props.GetGridColumns("claimDetailsId");
        if (currentColumns != null && currentColumns != "") {
            currentColumns = JSON.parse(currentColumns?.columns) ?? columns;
            this.setState({ claimListColumns: currentColumns });
        }
        this.setState({ refreshGrid: true });
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
    onSortChange = () => { };
    render() {
        return (
            <Fragment>
                <div
                    style={{
                        paddingTop: "5px",
                        overflow: "hidden",
                        marginTop: "10px",
                        paddingBottom: "15px",
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
                    {this.state.Show_HideDialogVisible && (
                        <Show_HideDialogComponent
                            columns={this.state.claimListColumns}
                            toggleShowColumnsDialog={this.toggleShowColumnsDialog}
                            SaveColumnsShow={this.SaveColumnsShow}
                        ></Show_HideDialogComponent>
                    )}
                    {this.state.Show_PatientDetailsDialog && (
                        <Dialog
                            title={"Patient Details"}
                            onClose={() => {
                                this.setState({ Show_PatientDetailsDialog: false });
                            }}
                            width={window.innerWidth - 235}
                            height={window.innerHeight - 80}
                        >
                            <PatientDetails
                                patientDetails={this.state.patientDetails}
                            ></PatientDetails>
                            <DialogActionsBar>
                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="button"
                                            className="k-button k-primary"
                                            style={{
                                                float: "right",
                                                right: 0,
                                                marginRight: "20px",
                                            }}
                                            onClick={() => {
                                                this.setState({ Show_PatientDetailsDialog: false });
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="k-button k-primary"
                                            style={{
                                                float: "right",
                                                right: 0,
                                                marginRight: "20px",
                                            }}
                                            onClick={() => { }}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </DialogActionsBar>
                        </Dialog>
                    )}
                    <TabStrip
                        className="userManagmentTabStrip"
                        selected={this.state.selected}
                        onSelect={this.handleSelect}
                    >
                        <TabStripTab title="Summary" selected="true">
                            <ClaimDetailSummary
                                claimDetails={this.props.claimDetails} togglePatientDetailsDialog={this.togglePatientDetailsDialog}
                            ></ClaimDetailSummary>
                        </TabStripTab>
                        {/* <TabStripTab title="Filing">
              <ClaimDetailFilling
                claimDetails={this.props.claimDetails}
              ></ClaimDetailFilling>
            </TabStripTab> */}
                        <TabStripTab title="Submission History">
                            <ClaimDetailSubmissionHistory
                                claimDetails={this.props.claimDetails}
                            ></ClaimDetailSubmissionHistory>
                        </TabStripTab>
                        <TabStripTab title="Claim Notes">
                            <ClaimDetailClaimNotes
                                claimDetails={this.props.claimDetails}
                            ></ClaimDetailClaimNotes>
                        </TabStripTab>
                        {/* <TabStripTab title="Tasks">
              <ClaimDetailBillTasks
                claimDetails={this.state.claimDetails}
              ></ClaimDetailBillTasks>
            </TabStripTab>
            <TabStripTab title="Collection Status">

            </TabStripTab> */}
                    </TabStrip>
                </div>
                <div className="accordion">
                    <div
                        id="collapseOne"
                        className="collapse show row"
                        aria-labelledby="headingOne"
                        data-parent="#accordionSummary"
                    >
                        <ButtonComponent
                            onClick={this.expandChargeDetails}
                            look="outline"
                            icon="edit"
                            classButton="infraBtn-primary"
                            style={{ marginTop: "0px", marginLeft: "27px" }}
                        >
                            Edit Charge
                        </ButtonComponent>
                        <ButtonComponent
                            onClick={this.expandChargeDetails}
                            look="outline"
                            icon="edit"
                            classButton="infraBtn-primary"
                            style={{ marginTop: "0px", marginLeft: "5px" }}
                        >
                            Save
                        </ButtonComponent>
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
                <div
                    style={{
                        display: "flex",
                        flexFlow: "row",
                        width: this.state.gridWidth,
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
                                    id="claimDetailsId"
                                    columns={this.state.claimListColumns}
                                    skip={0}
                                    take={15}
                                    onSelectionChange={this.onClaimGridSelectionChange}
                                    onRowDoubleClick={this.onClaimGridDoubleSelectionChange}
                                    selectionMode="single"
                                    DATA_ITEM_KEY={DATA_ITEM_KEY_CHARGES}
                                    idGetter={idGetterCharges}
                                    data={this.props.charges}
                                    height="415px"
                                    width="100%"
                                    sortColumns={[]}
                                    onSortChange={this.onSortChange}
                                ></GridComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimDetail);
