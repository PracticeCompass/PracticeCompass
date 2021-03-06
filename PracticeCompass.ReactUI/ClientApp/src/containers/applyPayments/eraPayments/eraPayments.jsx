import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import RadioButtonComponent from "../../../components/RadioButton";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { masterColumns, PracticeColumns, PlanCategory,insuranceColumns } from "./eraPaymentsData";
import $ from "jquery";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import CheckboxComponent from "../../../components/Checkbox";
import DatePickerComponent from "../../../components/DatePicker";
import config from "../../../config";
import SaveFilterComponent from "../../common/saveFilter";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import { SaveLookups } from "../../../redux/actions/lookups";
import NotificationComponent from "../../common/notification";
import EraPaymentsDialogComponent from "./eraPaymentsDialog";
import { RadioGroup } from "@progress/kendo-react-inputs";
import { exportExcelFile } from "../../common/export";
import moment from 'moment';
import {
    GetGridColumns,
    SaveGridColumns,
} from "../../../redux/actions/GridColumns";
import {
    resetPatientList,
    resetInsuranceList,
    getinsuranceList,
    getPracticeList,
    resetPracticeList,
} from "../../../redux/actions/patient";
import {
    getERAPaymentHeader,
    GetERAPaymentDetails, PostEraPayment
} from "../../../redux/actions/payments";
import { AmountFilter, detailsColumns, Days } from "./eraPaymentsData";
import EditableGrid from "../../../components/editableGrid";
import Show_HideDialogComponent from "../../common/show_hideDialog";

const DATA_ITEM_KEY_MASTER_PAYMENT = "ersPaymentSID";
const idGetterMasterPaymentID = getter(DATA_ITEM_KEY_MASTER_PAYMENT);
const DATA_ITEM_KEY_DETAILS_PAYMENT = "gridID";
const idGetterDetailsPaymentID = getter(DATA_ITEM_KEY_DETAILS_PAYMENT);
const DATA_ITEM_KEY_INSURANCE = "gridID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);
const filters = [
    { label: "Summary", value: "Charge" },
    { label: "Detail", value: "All" },
];

function mapStateToProps(state) {
    return {
        dropDownPractices: state.lookups.practices,
        practiceList: state.patients.paractices,
        eRApayments: state.payments.eRApayments,
        UiExpand: state.ui.UiExpand,
        insuranceList: state.patients.insuranceList,
        dropDownInsurance: state.lookups.insurances,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        SaveGridColumns: (name, columns) =>
            dispatch(SaveGridColumns(name, columns)),
        GetGridColumns: (name) => dispatch(GetGridColumns(name)),
        SaveLookups: (EntityValueID, EntityName) =>
            dispatch(SaveLookups(EntityValueID, EntityName)),
        getPracticeList: (name) => dispatch(getPracticeList(name)),
        GetERAPaymentDetails: (PaymentSID) =>
            dispatch(GetERAPaymentDetails(PaymentSID)),
        resetPracticeList: () => dispatch(resetPracticeList()),
        resetInsuranceList: () => dispatch(resetInsuranceList()),
        getinsuranceList: (name, refreshData, skip) =>
        dispatch(getinsuranceList(name, refreshData, skip)),
        getERAPaymentHeader: (
            PracticeID,
            IsPosted,
            Amount,
            CheckNumber,
            AmountType,
            PostDate,
            Days,
            payerId
        ) =>
            dispatch(
                getERAPaymentHeader(
                    PracticeID,
                    IsPosted,
                    Amount,
                    CheckNumber,
                    AmountType,
                    PostDate,
                    Days,
                    payerId
                )
            ),
        PostingEraPayment: (checkTraceNbr) => dispatch(PostEraPayment(checkTraceNbr)),
    };
}

class EraPayments extends Component {
    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
    }
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
        masterExpanded: true,
        posted: false,
        receiverAccount: null,
        senderAccount: null,
        insuranceSearchText:null,
        checkIssue: null,
        transactionHeader: "Payment Transactions ",
        masterColumns: masterColumns,
        detailsColumns: detailsColumns,
        gridWidth: 0,
        applyFilterChecked: "All",
        detailRows: [],
        selectedVoucher: null,
    };
    componentDidMount = () => {
        this.getGridColumns();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    };
    componentDidUpdate = (event) => {
        if (event.UiExpand != this.props.UiExpand) {
            this.updateDimensions();
        }
    };
    updateDimensions() {
        this.setState({
            gridWidth: window.innerWidth - (!this.props.UiExpand ? 120 : 290),
        });
    }
    getGridColumns = async () => {
        this.setState({ refreshGrid: false });
        let currentColumns = await this.props.GetGridColumns("ERAPayment");
        let ERAPaymentDetails = await this.props.GetGridColumns(
            "ERAPaymentDetails"
        );

        if (currentColumns != null && currentColumns != "") {
            currentColumns = JSON.parse(currentColumns?.columns) ?? masterColumns;
            this.setState({ masterColumns: currentColumns });
        }
        if (ERAPaymentDetails != null && ERAPaymentDetails != "") {
            ERAPaymentDetails =
                JSON.parse(ERAPaymentDetails?.columns) ?? detailsColumns;
            this.setState({ detailsColumns: ERAPaymentDetails });
        }
    };

    getParacticesUrl(filter) {
        return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
    }
    applyItemChanged = (event) => {
        const field = event.field || "";
        const inEditID = event.dataItem["gridID"];
        let data = this.state.eRADetailsPayments.map((item) =>
            item["gridID"] === inEditID
                ? {
                    ...item,
                    [field]: event.value,
                    isEdit: true,
                }
                : item
        );
        let filterData = this.state.filtereRADetailsPayments.map((item) =>
            item["gridID"] === inEditID
                ? {
                    ...item,
                    [field]: event.value,
                    isEdit: true,
                }
                : item
        );
        this.setState({
            eRADetailsPayments: data,
            filtereRADetailsPayments: filterData
        });
    };
    practiceSearch = () => {
        this.props.getPracticeList(this.state.practiceSearchText);
    };
    setExporter = (exporter) => {
        this.setState({ _export: exporter });
    }
    setExporterDetails = (exporter) => {
        this.setState({ _exportDetails: exporter });
    }
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
    onSortChange = () => { };
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
        if (
            event.dataItem.practiceID != null &&
            (this.props.dropDownPractices == null ||
                this.props.dropDownPractices.filter(
                    (x) => x.entityId == event.dataItem.practiceID
                ).length == 0)
        ) {
            await this.props.SaveLookups(event.dataItem.practiceID, "Practice");
        }
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
    ERAPaymentGridSearch = async () => {
        debugger;
        this.props.getERAPaymentHeader(
            this.state.insurancePracticeID?.entityId,
            this.state.posted ? "p" : "r",
            this.state.amountFilter ?? 0,
            this.state.checkNumber ? this.state.checkNumber : "",
            this.state.amountType ? this.state.amountType.id : null,
            this.state.checkIssue
                ? new Date(this.state.checkIssue).toLocaleDateString()
                : "",
            this.state.day?.id ?? 0,
            this.state.selectedInsurance?.entityId,
        );
    };
    onERAPaymentGridSelectionChange = (event) => {
        let ERAPaymentDetails =
            event.dataItems == null || event.dataItems.length == 0
                ? event.dataItem
                : event.dataItems[event.endRowIndex];
        if (ERAPaymentDetails.practiceID != null) {
            ERAPaymentDetails.detailsPracticeID = {
                entityId: ERAPaymentDetails.practiceID,
                entityName: ERAPaymentDetails.practiceName,
            };
        }

        this.setState({
            ERAPaymentDetails,
            selectedVoucher: event.dataItem.checkTraceNbr,
        });
    };
    onERAPaymentGridDoubleSelectionChange = async (event) => {
        let ERAPaymentDetails =
            event.dataItems == null || event.dataItems.length == 0
                ? event.dataItem
                : event.dataItems[event.endRowIndex];
        if (ERAPaymentDetails.practiceID != null) {
            ERAPaymentDetails.detailsPracticeID = {
                entityId: ERAPaymentDetails.practiceID,
                entityName: ERAPaymentDetails.practiceName,
            };
        }
        let header = "Payment Transactions ";

        if (ERAPaymentDetails && ERAPaymentDetails.detailsPracticeID != null) {
            header =
                header +
                "----Practice: " +
                ERAPaymentDetails.detailsPracticeID.entityName +
                "     ";
        }
        if (
            ERAPaymentDetails &&
            ERAPaymentDetails.totalActualProviderPaymentAmt != null
        ) {
            header =
                header +
                "----Total Payment: " +
                (ERAPaymentDetails.totalActualProviderPaymentAmt
                    .toString()
                    .includes("$")
                    ? ""
                    : this.currencyFormat(
                        ERAPaymentDetails.totalActualProviderPaymentAmt
                    ));
        }
        await this.setState({
            ERAPaymentDetails,
            transactionHeader: header,
            selectedVoucher: event.dataItem.checkTraceNbr,
        });
        //let eRAPayments = await this.props.GetERAPaymentDetails(1971933);
        let eRADetailsPayments = await this.props.GetERAPaymentDetails(
            ERAPaymentDetails.ersPaymentSID
        );
        this.setState({
            applyFilterChecked: 'All',
            eRADetailsPayments,
            filtereRADetailsPayments: eRADetailsPayments
        });
        $("#ERADetailsPaymentSearch").children("span").trigger("click");
    };
    currencyFormat(num) {
        return (
            "$" +
            Number(num)
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        );
    }
    onERADetailsPaymentGridSelectionChange = (event) => { };
    onERADetailsPaymentGridDoubleSelectionChange = (event) => {
        this.setState({
            ShowEditERARow: true,
            ERAItemDetails: event.dataItem,
            detailsColumns: this.state.detailsColumns,
            detailRows: this.state.eRADetailsPayments.filter(x => x.ersChargeSID == event.dataItem.ersChargeSID),
            showDetailsGrid: this.state.applyFilterChecked == 'Charge'
        });

    };
    toggleShowColumnsDialog = () => {
        this.setState({
            Show_HideERADialogVisible: false,
            Show_HideDetailsERADialogVisible: false,
        });
    };

    SaveColumnsShow = async (columns) => {
        if (!columns.find((x) => x.hide != true)) {
            this.setState({ Show_HideERADialogVisible: false });
            this.setState({ warning: true, message: "Cann't hide all columns" });
            setTimeout(() => {
                this.setState({
                    warning: false,
                });
            }, this.state.timer);
            return;
        } else {
            this.setState({ refreshGrid: false });
            let GridColumns = await this.props.SaveGridColumns(
                "ERAPayment",
                JSON.stringify(columns)
            );
            this.setState({
                masterColumns: JSON.parse(GridColumns?.columns),
                Show_HideERADialogVisible: false,
            });
        }
    };
    SaveDetailsERAColumnsShow = async (columns) => {
        if (!columns.find((x) => x.hide != true)) {
            this.setState({ Show_HideDetailsERADialogVisible: false });
            this.setState({ warning: true, message: "Cann't hide all columns" });
            setTimeout(() => {
                this.setState({
                    warning: false,
                });
            }, this.state.timer);
            return;
        } else {
            this.setState({ refreshGrid: false });
            let GridColumns = await this.props.SaveGridColumns(
                "ERAPaymentDetails",
                JSON.stringify(columns)
            );
            this.setState({
                detailsColumns: JSON.parse(GridColumns?.columns),
                Show_HideDetailsERADialogVisible: false,
            });
        }
    };
    toggleERAPaymentDialog = () => {
        this.setState({
            ShowEditERARow: false,
        });
    };
    postingEra = async () => {
        let result = await this.props.PostingEraPayment(this.state.selectedVoucher);
        if (result) {
            //this.findClaim();
            this.setState({
                success: true,
                message: "Posting Payment succefully.",
            });
            setTimeout(() => {
                this.setState({
                    success: false,
                });
            }, this.state.timer);
        } else {
            this.setState({
                error: true,
                message: "Error In Posting Payment.",
            });
            setTimeout(() => {
                this.setState({
                    error: false,
                });
            }, this.state.timer);
        }
    }
    savePaymentTransaction = (item) => {
        this.setState({
            ShowEditERARow: false,
        });
    };
    onRowRender = (trElement, props) => {
        const type = props.dataItem.type;
        const bold = {
            borderTopWidth: "3px",
            borderTopColor: "black",
            fontWeight: "bold"
        };
        const normal = {
            fontWeight: "normal"
        };
        let trProps = {
            style: normal,
        };
        switch (type) {
            case "Charge":
                trProps = { style: bold };
                break;
            default:
                trProps = { style: normal };
                break;
        }
        for (let i = 0; i < trElement.props.children.length; i++) {
            let childElement = { ... this.renderCell(trElement.props.children[i], trProps) };
            trElement.props.children[i] = childElement;
        }
        return React.cloneElement(
            trElement,
            { ...trProps },
            trElement.props.children
        );
    }
    renderCell = (trElement, trProps) => {
        return React.cloneElement(
            trElement,
            { ...trProps }
        );
    }
    applyFilter = async (e) => {
        this.setState({ applyFilterChecked: e.value });
        if (e.value == "Charge") {
            let filtereRADetailsPayments = [...(this.state.eRADetailsPayments.filter(x => x.type == "Charge"))];
            let filterItems = [];
            for (let i = 0; i < filtereRADetailsPayments.length; i++) {
                let eraDetails = [...(this.state.eRADetailsPayments.filter(item => item.ersChargeSID == filtereRADetailsPayments[i].ersChargeSID))];
                let filterItem = { ...filtereRADetailsPayments[i] };
                for (let x = 0; x < eraDetails.length; x++) {
                    if (eraDetails[x].chargeClaimAdjustmentReason != "" && eraDetails[x].chargeClaimAdjustmentReason != null) {
                        filterItem.chargeClaimAdjustmentReason = filterItem.chargeClaimAdjustmentReason + eraDetails[x].chargeClaimAdjustmentReason + ', ';
                    }
                }
                filterItem.chargeClaimAdjustmentReason = filterItem.chargeClaimAdjustmentReason.replace(/,\s*$/, "");
                filterItems.push(filterItem);
            }
            this.setState({
                filtereRADetailsPayments: filterItems
            });
        } else {
            this.setState({
                filtereRADetailsPayments: [...this.state.eRADetailsPayments]
            });
        }
    }
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
    cancelInsuranceDialog = () => {
        // this.setState({
        //   selectedInsurance: null,
        // });
        this.toggleInsuranceDialog();
    };
    onInsuranceSelectionChange = (event) => {
        // var selectedDataItems = event.dataItems.slice(
        //   event.startRowIndex,
        //   event.endRowIndex + 1
        // );
        // this.setState({
        //   selectedInsurance: {
        //     entityId: selectedDataItems[0].entitySID,
        //     entityName: selectedDataItems[0].sortName,
        //   },
        // });
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
    insuranceSearch = (refreshData = true, skip = 0) => {
        this.props.getinsuranceList(
            this.state.insuranceSearchText,
            refreshData,
            skip
        );
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
                    {this.state.insuranceVisible && (
                        <FindDialogComponent
                            title="Plan Search"
                            placeholder="Enter Plan Company Name Or Company Code"
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
                    {this.state.ShowEditERARow && (
                        <EraPaymentsDialogComponent
                            ERAItemDetails={this.state.ERAItemDetails}
                            toggleERAPaymentDialog={this.toggleERAPaymentDialog}
                            savePaymentTransaction={this.savePaymentTransaction}
                            detailRows={this.state.detailRows}
                            detailsColumns={this.state.detailsColumns}
                            showDetailsGrid={this.state.showDetailsGrid}
                        ></EraPaymentsDialogComponent>
                    )}
                    {this.state.Show_HideERADialogVisible && (
                        <Show_HideDialogComponent
                            columns={this.state.masterColumns}
                            toggleShowColumnsDialog={this.toggleShowColumnsDialog}
                            SaveColumnsShow={this.SaveColumnsShow}
                        ></Show_HideDialogComponent>
                    )}
                    {this.state.Show_HideDetailsERADialogVisible && (
                        <Show_HideDialogComponent
                            columns={this.state.detailsColumns}
                            toggleShowColumnsDialog={this.toggleShowColumnsDialog}
                            SaveColumnsShow={this.SaveDetailsERAColumnsShow}
                        ></Show_HideDialogComponent>
                    )}
                    {(this.state.practiceVisiblePatient ||
                        this.state.practiceVisibleSubPatient ||
                        this.state.practiceVisibleInsurance ||
                        this.state.practiceVisibleSubInsurance) && (
                            <FindDialogComponent
                                title="Practice Search"
                                placeholder="Enter Practice Name or Practice Code"
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
                            title="Payment Header"
                        >
                            <div style={{ width: "100%" }}>
                                <div
                                    className="rowHeight"
                                    style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        width: "100%",
                                        marginBottom: "-1px"
                                    }}
                                >
                                    <div style={{ marginLeft: "12px" }}>
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
                                    <div style={{ float: "left", marginTop: "2px" }}>
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
                                    <div style={{ float: "left" }}>
                                        {/* <div style={{ float: "left", marginLeft: "45px" }}>
                                            <label className="userInfoLabel">Plan</label>
                                        </div> */}
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
                                            <label className="userInfoLabel">Payer Name</label>
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
                                    {/* <div style={{ marginLeft: "10px", width: "95px" }}>
                                        <label className="userInfoLabel">Sender Account </label>
                                    </div>
                                    <div style={{ width: "147px" }}>
                                        <TextBox
                                            className="unifyHeight"
                                            value={this.state.senderAccount}
                                            onChange={(e) =>
                                                this.setState({
                                                    senderAccount: e.value,
                                                })
                                            }
                                        ></TextBox>
                                    </div>
                                    <div style={{ marginLeft: "10px", width: "102px" }}>
                                        <label className="userInfoLabel">Receiver Account </label>
                                    </div>
                                    <div style={{ width: "147px" }}>
                                        <TextBox
                                            className="unifyHeight"
                                            value={this.state.receiverAccount}
                                            onChange={(e) =>
                                                this.setState({
                                                    receiverAccount: e.value,
                                                })
                                            }
                                        ></TextBox>
                                    </div> */}
                                </div>
                                <div
                                    className="rowHeight"
                                    style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        width: "100%",
                                        marginBottom: "-1px",
                                    }}
                                >
                                    <div style={{ marginLeft: "11px" }}>
                                        <label className="userInfoLabel">Voucher</label>
                                    </div>
                                    <div style={{ width: "147px" }}>
                                        <TextBox
                                            className="unifyHeight"
                                            value={this.state.checkNumber}
                                            onChange={(e) =>
                                                this.setState({
                                                    checkNumber: e.value,
                                                })
                                            }
                                        ></TextBox>
                                    </div>
                                    <div style={{ width: "57px", marginLeft: "10px" }}>
                                        <label className="userInfoLabel">Amount</label>
                                    </div>
                                    <div style={{ width: "147px", marginLeft: "-5px" }}>
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
                                    <div style={{ marginLeft: "10px" }}>
                                        <label className="userInfoLabel">Check Issue </label>
                                    </div>
                                    <div className="dateStyle" style={{ marginLeft: "5px" }}>
                                        <DatePickerComponent
                                            className="unifyHeight"
                                            placeholder="MM/DD/YYYY"
                                            format="M/dd/yyyy"
                                            value={this.state.checkIssue}
                                            onChange={(e) => this.setState({ checkIssue: e.value })}
                                        ></DatePickerComponent>
                                    </div>
                                    <div style={{ marginLeft: "10px" }}>
                                        <label className="userInfoLabel">??</label>
                                    </div>
                                    <div style={{ width: "100px" }}>
                                        <DropDown
                                            className="unifyHeight"
                                            data={Days}
                                            textField="text"
                                            dataItemKey="id"
                                            defaultValue={Days[0]}
                                            value={this.state.day}
                                            onChange={(e) =>
                                                this.setState({
                                                    day: {
                                                        id: e.value?.id,
                                                        text: e.value?.text,
                                                    },
                                                })
                                            }
                                        ></DropDown>
                                    </div>
                                    <div style={{ marginLeft: "2px" }}>
                                        <label className="userInfoLabel">Days</label>
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
                                    style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        width: "100%",
                                        /*marginBottom: "5px",*/
                                        marginLeft: "-22px"
                                    }} >
                                    <div style={{ float: "left", marginLeft: "30px" }}>
                                        <ButtonComponent
                                            icon="search"
                                            type="search"
                                            classButton="infraBtn-primary action-button"
                                            onClick={this.ERAPaymentGridSearch}
                                        >
                                            Search
                                        </ButtonComponent>
                                    </div>
                                    <div style={{ float: "left" }}>
                                        <ButtonComponent
                                            icon="search"
                                            type="search"
                                            classButton="infraBtn-primary"
                                            ref={(node) => {
                                                if (node) {
                                                    node.style.setProperty("height", "22px", "important");
                                                }
                                            }}
                                        // onClick={(e) =>
                                        //   this.setState({ practiceVisibleInsurance: true })
                                        // }
                                        >
                                            Manual Match
                                        </ButtonComponent>
                                    </div>
                                    <div
                                        style={{
                                            float: "right",
                                            position: "absolute",
                                            marginRight: "12px",
                                            right: "0",
                                        }}
                                    >
                                        <ButtonComponent
                                            type="add"
                                            icon="export"
                                            classButton="infraBtn-primary"
                                            onClick={() => {
                                                exportExcelFile(this.state._export, this.props.eRApayments, this.state.masterColumns);
                                            }}
                                        >
                                            Export to Excel
                                        </ButtonComponent>
                                        <ButtonComponent
                                            type="add"
                                            classButton="infraBtn-primary action-button"
                                            onClick={() => {
                                                this.setState({ Show_HideERADialogVisible: true });
                                            }}
                                        >
                                            Edit Grid
                                        </ButtonComponent>
                                    </div>
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
                                            style={{ width: this.state.gridWidth }}
                                        >
                                            <GridComponent
                                                id="ERAPayment"
                                                columns={this.state.masterColumns}
                                                skip={0}
                                                take={21}
                                                onSelectionChange={this.onERAPaymentGridSelectionChange}
                                                onRowDoubleClick={
                                                    this.onERAPaymentGridDoubleSelectionChange
                                                }
                                                // getSelectedItems={this.getSelectedClaims}
                                                // selectionMode="multiple"
                                                DATA_ITEM_KEY="ersPaymentSID"
                                                idGetter={idGetterMasterPaymentID}
                                                data={this.props.eRApayments}
                                                // totalCount={
                                                //   this.props.insurancePayments != null && this.props.insurancePayments.length > 0
                                                //     ? this.props.insurancePayments[0].totalCount
                                                //     : this.props.insurancePayments.length
                                                // }
                                                height="640px"
                                                width="100%"
                                                //hasCheckBox={true}
                                                sortColumns={[]}
                                                onSortChange={this.onSortChange}
                                                setExporter={this.setExporter}
                                                fileName={"ERA Payments " + moment().format('DD/MM/YYYY, h:mm:ss a') + ".xlsx"}
                                            // pageChange={this.pageChange}
                                            ></GridComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PanelBarItem>
                        <PanelBarItem
                            id="ERADetailsPaymentSearch"
                            expanded={this.state.insurancePaymentExpanded}
                            title={this.state.transactionHeader}
                        >
                            <div style={{ width: "100%" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexFlow: "row nowrap",
                                        width: "100%",
                                    }}
                                >
                                    {/* <div style={{ marginLeft: "50px" }}>
                    <label className="userInfoLabel">Practice </label>
                  </div>
                  <div className="PracticeStyle">
                    <DropDown
                      className="unifyHeight"
                      data={this.props.dropDownPractices}
                      textField="entityName"
                      dataItemKey="entityId"
                      defaultValue={this.state.ERAPaymentDetails?.detailsPracticeID}
                      value={this.state.ERAPaymentDetails?.detailsPracticeID}
                      onChange={(e) =>
                        this.setState({
                          detailsPracticeID: {
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
                  <div style={{ float: "left", marginLeft: "10px" }}>
                    <label className="userInfoLabel">Total Payment </label>
                  </div>
                  <div style={{ float: "left", width: "132px" }}>
                    <TextBox
                      type="numeric"
                      format="c2"
                      className="unifyHeight"
                      value={this.state.ERAPaymentDetails?.totalActualProviderPaymentAmt}
                      onChange={(e) =>
                        this.setState({
                          remaining: e.value,
                        })
                      }
                      disabled={true}
                    ></TextBox>
                  </div> */}
                                    <ButtonComponent
                                        icon="edit"
                                        type="edit"
                                        classButton="infraBtn-primary"
                                        onClick={() => { this.postingEra() }}
                                        style={{ marginTop: "2px", marginLeft: "10px" }}
                                    // disabled={this.state.disableApply || (this.state.filterApplyPlanPayments== null || this.state.filterApplyPlanPayments.filter(item=>item.isEdit).length==0)}
                                    >
                                        Post
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
                                            icon="export"
                                            classButton="infraBtn-primary"
                                            onClick={() => {
                                                exportExcelFile(this.state._exportDetails, this.state.filtereRADetailsPayments, this.state.detailsColumns);
                                            }}
                                        >
                                            Export to Excel
                                        </ButtonComponent>
                                        <ButtonComponent
                                            type="add"
                                            classButton="infraBtn-primary action-button"
                                            onClick={() => {
                                                this.setState({
                                                    Show_HideDetailsERADialogVisible: true,
                                                });
                                            }}
                                        >
                                            Edit Grid
                                        </ButtonComponent>
                                    </div>
                                </div>
                                <div
                                    style={{ display: "flex", flexFlow: "row", width: "100%" }}
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
                                            <RadioGroup
                                                data={filters}
                                                value={this.state.applyFilterChecked}
                                                onChange={this.applyFilter}
                                                layout="horizontal"
                                            />
                                            <div
                                                id="collapseOne"
                                                className="collapse show"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordionExample"
                                                style={{ width: this.state.gridWidth }}
                                            >
                                                <EditableGrid
                                                    data={this.state.filtereRADetailsPayments}
                                                    id="ERAPaymentDetails"
                                                    activeRowRender={true}
                                                    onRowRender={this.onRowRender}
                                                    skip={0}
                                                    take={21}
                                                    width="100%"
                                                    editColumn={"gridID"}
                                                    DATA_ITEM_KEY="gridID"
                                                    idGetter={idGetterDetailsPaymentID}
                                                    onSelectionChange={
                                                        this.onERADetailsPaymentGridSelectionChange
                                                    }
                                                    onRowDoubleClick={
                                                        this.onERADetailsPaymentGridDoubleSelectionChange
                                                    }
                                                    columns={this.state.detailsColumns}
                                                    itemChange={this.applyItemChanged}
                                                    onSortChange={this.onSortChange}
                                                    // pageChange={this.pageChange}
                                                    height="640px"
                                                    noPageable={true}
                                                    isEditable={true}
                                                    setExporter={this.setExporterDetails}
                                                    fileName={"Payment Transactions" + moment().format('DD/MM/YYYY, h:mm:ss a') + ".xlsx"}
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
                        </PanelBarItem>
                    </PanelBar>
                </div>
            </Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EraPayments);
