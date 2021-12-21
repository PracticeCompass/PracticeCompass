import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ButtonComponent from "../../../../components/Button";
import GridComponent from "../../../../components/Grid";
import DropDown from "../../../../components/DropDown";
import TextBox from "../../../../components/TextBox";
import DatePickerComponent from "../../../../components/DatePicker";
import "./ClaimList.css";
import config from "../../../../../src/config";
import { getter } from "@progress/kendo-react-common";
import CheckboxComponent from "../../../../components/Checkbox";
import {exportExcelFile} from "../../../common/export";
import moment from 'moment';
import {
    guarantorColumns,
    insuranceColumns,
    columns,
    DOSFilter,
    InsuranceCategory,
    InsuranceStatus,
    PhysicianColumns,
    InsuranceOrder,
    PatientTypesColumns,
    PracticeColumns,
    sortColumns,
} from "./ClaimListData.js";
import { patientColumns } from "../../../processPatients/patients/patient/patientData";
import {
    resetPatientList,
    resetInsuranceList,
    getinsuranceList,
    getPracticeList,
    getpatientTypes,
    resetPatientTypeList,
    resetPracticeList,
} from "../../../../redux/actions/patient";
import {
    getguarantorList,
    getclaimListFilters,
    getclaims,
    resetGuarantorList,
    setClaimDetails,
    getPhysicianList,
    resetPhysicianList,
    SubmitClaims,
    ParseERAMessages,
} from "../../../../redux/actions/claimList";
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
import Show_HideDialogComponent from "../../../common/show_hideDialog";
import PatientFindDialogComponent from "../../../common/patientFindDialog";
import {
    GetGridColumns,
    SaveGridColumns,
} from "../../../../redux/actions/GridColumns";
const DATA_ITEM_KEY_PATIENT_TYPE = "lookupCode";
const idGetterPaientYype = getter(DATA_ITEM_KEY_PATIENT_TYPE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);

const DATA_ITEM_KEY_Physician = "entitySID";
const idGetterPhysicianID = getter(DATA_ITEM_KEY_Physician);

function mapStateToProps(state) {
    return {
        patientTypes: state.patients.patientTypes,
        patientFilter: state.patients.patientFilter,
        paractices: state.patients.paractices,
        Patients: state.patients.patients,
        Claims: state.claimList.claims,
        patientList: state.patients.patientList,
        insuranceList: state.patients.insuranceList,
        guarantorList: state.claimList.guarantorList,
        dropDownPatients: state.lookups.patients,
        dropDownInsurance: state.lookups.insurances,
        dropDownGuarantors: state.lookups.guarantors,
        dropDownPatientTypes: state.lookups.patientTypes,
        dropDownPractices: state.lookups.practices,
        dropDownPhysicians: state.lookups.physicians,
        practiceList: state.patients.paractices,
        physicians: state.claimList.physicians,
        UiExpand: state.ui.UiExpand,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        GetGridColumns: (name) => dispatch(GetGridColumns(name)),
        SaveGridColumns: (name, columns) =>
            dispatch(SaveGridColumns(name, columns)),
        getclaims: (claimGrid, refreshData) =>
            dispatch(getclaims(claimGrid, refreshData)),
        setClaimDetails: (claimDetails) => dispatch(setClaimDetails(claimDetails)),
        getclaimListFilters: (sortname) => dispatch(getclaimListFilters(sortname)),
        // getPatientList: (name) => dispatch(getpatientList(name)),
        getguarantorList: (name, refreshData, skip) =>
            dispatch(getguarantorList(name, refreshData, skip)),
        getinsuranceList: (name, refreshdata, skip) =>
            dispatch(getinsuranceList(name, refreshdata, skip)),
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
        getpatientTypes: (name) => dispatch(getpatientTypes(name)),
        resetPatientTypeList: () => dispatch(resetPatientTypeList()),
        getPracticeList: (name) => dispatch(getPracticeList(name)),
        getPhysicianList: (name, refreshdata, skip) =>
            dispatch(getPhysicianList(name, refreshdata, skip)),
        resetPhysicianList: () => dispatch(resetPhysicianList()),
        resetPracticeList: () => dispatch(resetPracticeList()),
        SubmitClaims: (claims) => dispatch(SubmitClaims(claims)),
        ParseERAMessages: () => dispatch(ParseERAMessages()),
    };
}
// const DATA_ITEM_KEY_LOOKUP = "sortName";
// const idGetterLookup = getter(DATA_ITEM_KEY_LOOKUP);

const DATA_ITEM_KEY_CLAIMlIST = "gridID";
const idGetterClaimList = getter(DATA_ITEM_KEY_CLAIMlIST);

const DATA_ITEM_KEY_PATIENT = "patientListgridID";
const idGetterPaient = getter(DATA_ITEM_KEY_PATIENT);

const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);

class ClaimList extends Component {
    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    state = {
        patientNameSelected: null,
        guarantorSelected: null,
        insuranceNameSelected: null,
        patientID: null,
        guarantorID: null,
        insuranceID: null,
        patientType: null,
        physicianID: null,
        dostype: null,
        insuranceType: null,
        insuranceStatus: null,
        insuranceOrder: null,
        dos: null,
        claimValue: null,
        age: null,
        billNumber: null,
        claimIcnNumber: null,
        batch: null,
        patientVisible: false,
        guarantorVisible: false,
        insuranceVisible: false,
        visibleSaveFilter: false,
        patientSearchText: "",
        guarantorSearchText: "",
        insuranceSearchText: "",
        patientSelectedState: "",
        guarantorSelectedState: "",
        patientIDSelectedState: null,
        guarantorIDSelectedState: null,
        insuranceSelectedState: "",
        insuranceIDSelectedState: null,
        patientDataItemKey: "sortName",
        insuranceDataItemKey: "sortName",
        guarantorDataItemKey: "sortName",
        currentFilter: {},
        refreshFilter: true,
        editFilter: false,
        visibleDeleteDialog: false,
        success: false,
        none: false,
        error: false,
        warning: false,
        info: false,
        timer: 5000,
        patientTypeVisible: false,
        patientTypeSearchText: null,
        practiceVisible: false,
        practiceSearchText: null,
        selectedPractice: null,
        physicianVisible: false,
        PhysicianSearchText: null,
        completedClaims: false,
        cashClaims: false,
        voidedClaims: false,
        refreshGrid: true,
        Show_HideDialogVisible: false,
        selectedClaimSID: 0,
        selectedSortColumn: null,
        sortDirection: null,
        selectedClaims: null,
        claimListColumns: columns,
        gridWidth: 0
    };
    setExporter = (exporter) => {
        this.setState({ _export: exporter });
    }
    getPhysiciansUrl(filter) {
        return `${config.baseUrl}/ClaimList/PhysicianGet?sortname=${filter}`;
    }
    getFilters(filter) {
        if (filter !== undefined) filter = "";
        return `${config.baseUrl}/Filters/FiltersGet?Entity=claim&DisplayName=${filter}`;
    }
    ParseERA = () => {
        this.props.ParseERAMessages();
    };
    submitClaim = () => {
        if (this.state.selectedClaims != "" && this.state.selectedClaims != null) {
            this.props.SubmitClaims(this.state.selectedClaims);
        } else {
            this.setState({
                warning: true,
                message: "Please Select Claim to Submit.",
            });
            setTimeout(() => {
                this.setState({
                    warning: false,
                });
            }, this.state.timer);
        }
    };
    componentDidMount() {
        this.getGridColumns();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    componentDidUpdate = (event) => {
        if (event.UiExpand != this.props.UiExpand) {
            this.updateDimensions();
        }
    }
    updateDimensions() {
        this.setState({
            gridWidth: window.innerWidth - (!this.props.UiExpand ? 93 : 273)
        })
    }
    getGridColumns = async () => {
        this.setState({ refreshGrid: false });
        let currentColumns = await this.props.GetGridColumns("claimList");
        if (currentColumns != null && currentColumns != "") {
            currentColumns = JSON.parse(currentColumns?.columns) ?? columns;
            this.setState({ claimListColumns: currentColumns });
        }
        this.setState({ refreshGrid: true });
    };
    delete = async () => {
        if (this.state.currentFilter && this.state.currentFilter.displayName) {
            this.toggleDeleteDialog();
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
        //await this.props.getclaimListFilters("");
        this.setState({ refreshFilter: true });
    };
    toggleDeleteDialog = () => {
        this.setState({
            visibleDeleteDialog: !this.state.visibleDeleteDialog,
        });
    };
    selectPatient = () => {
        this.setState({
            patientNameSelected: this.state.patientSelectedState,
            patientID: this.state.patientIDSelectedState,
        });
        this.togglePatientDialog();
    };
    onSortChange = async (column, sort) => {
        await this.setState({
            selectedSortColumn: column,
            sortDirection: sort,
        });
        this.claimGridSearch();
    };
    selectGuarantor = () => {
        this.setState({
            guarantorSelected: this.state.guarantorSelectedState,
            guarantorID: this.state.guarantorIDSelectedState,
        });
        this.toggleGuarantorDialog();
    };
    selectInsurance = () => {
        this.setState({
            insuranceNameSelected: this.state.insuranceSelectedState,
            insuranceID: this.state.insuranceIDSelectedState,
        });
        this.toggleInsuranceDialog();
    };
    // patientsearch = () => {
    //   this.props.getPatientList(this.state.patientSearchText);
    // };
    guarantorsearch = (refreshData, skip) => {
        this.props.getguarantorList(
            this.state.guarantorSearchText,
            refreshData,
            skip
        );
    };
    insuranceSearch = (refreshData, skip) => {
        this.props.getinsuranceList(
            this.state.insuranceSearchText,
            refreshData,
            skip
        );
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
    onClaimGridSelectionChange = (event) => {
        this.props.setClaimDetailsData(
            event.dataItems == null || event.dataItems.length == 0
                ? event.dataItem
                : event.dataItems[event.endRowIndex]
        );
        this.props.SaveLookups(event.dataItem.patientID, "Patient");
        this.props.SaveLookups(event.dataItem.practiceID, "Practice");
        this.setState({
            selectedClaimSID:
                event.dataItems == null || event.dataItems.length == 0
                    ? event.dataItem.claimSID
                    : event.dataItems[event.endRowIndex].claimSID,
        });
    };
    getSelectedClaims = (event) => {
        this.setState({
            selectedClaims: event,
        });
    };
    onClaimGridDoubleSelectionChange = (event) => {
        this.props.setClaimDetailsData(
            event.dataItems == null || event.dataItems.length == 0
                ? event.dataItem
                : event.dataItems[event.endRowIndex]
        );
        this.setState({
            selectedClaimSID:
                event.dataItems == null || event.dataItems.length == 0
                    ? event.dataItem.claimSID
                    : event.dataItems[event.endRowIndex].claimSID,
        });
        this.props.SaveLookups(event.dataItem.patientID, "Patient");
        this.props.SaveLookups(event.dataItem.practiceID, "Practice");
        this.props.setClaimDetailExpanded();
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
    revertChange = async () => {
        if (this.state.currentFilter && this.state.currentFilter.body) {
            let body = JSON.parse(this.state.currentFilter.body);
            await this.setState({
                patientNameSelected: body.PatientName,
                patientID: body.PatientID,
                practiceID: body.practiceID,
                dobtype: body.DOBType,
                dndob: body.DOBvalue ? new Date(body.DOBvalue) : null,
                patientType: body.PatientClass,
                balanceType: body.BalanceType,
                balance: body.BalanceValue,
                insuranceType: body.InsuranceType,
                insuranceNameSelected: body.InsuranceName,
                insuranceID: body.InsuranceID,
                completedClaims: body.completedClaims,
                cashClaims: body.CashClaims,
                voidedClaims: body.VoidedClaims,
            });
        } else {
            this.reset();
        }
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
    expandClaimDetails = () => {
        if (this.state.selectedClaimSID !== 0) {
            this.props.setClaimDetailExpanded();
        } else {
            this.setState({
                warning: true,
                message: "Please Select Claim to Edit.",
            });
            setTimeout(() => {
                this.setState({
                    warning: false,
                });
            }, this.state.timer);
        }
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
    toggleSaveDialog = () => {
        this.setState({ visibleSaveFilter: false, editFilter: false });
    };
    editcurrentFilter = async () => {
        if (this.state.currentFilter && this.state.currentFilter.body) {
            this.setState({ editFilter: true });
        } else {
            this.setState({
                warning: true,
                message: "Please select filter to update.",
            });
            setTimeout(() => {
                this.setState({
                    warning: false,
                });
            }, this.state.timer);
        }
    };
    reset = () => {
        this.setState({
            currentFilter: null,
            patientID: null,
            physicianID: null,
            insuranceID: null,
            patientNameSelected: null,
            selectedPractice: null,
            dostype: null,
            dos: null,
            patientType: null,
            guarantorSelected: null,
            guarantorID: null,
            insuranceType: null,
            insuranceNameSelected: null,
            billNumber: null,
            claimIcnNumber: null,
            claimValue: null,
            age: null,
            batch: null,
            insuranceStatus: null,
            insuranceOrder: null,
            refreshFilter: true,
            patientSearchText: "",
            guarantorSearchText: "",
            insuranceSearchText: "",
            patientSelectedState: "",
            guarantorSelectedState: "",
            patientIDSelectedState: null,
            guarantorIDSelectedState: null,
            insuranceSelectedState: "",
            insuranceIDSelectedState: null,
            completedClaims: false,
            cashClaims: false,
            voidedClaims: false,
            selectedSortColumn: null,
            sortDirection: null,
        });
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
            if (
                body.Physician != null &&
                body.Physician.entityId != null &&
                (this.props.dropDownPhysicians == null ||
                    this.props.dropDownPhysicians.filter(
                        (x) => x.entityId == body.Physician.entityId
                    ).length == 0)
            ) {
                await this.props.SaveLookups(body.Physician.entityId, "Physician");
            }
            if (
                body.GurantorID &&
                (this.props.dropDownGuarantors == null ||
                    this.props.dropDownGuarantors.filter(
                        (x) => x.entityId == body.GurantorID
                    ).length == 0)
            ) {
                this.props.SaveLookups(body.GurantorID, "Guarantor");
            }
            await this.setState({
                patientNameSelected: body.PatientName,
                patientID: body.PatientID,
                selectedPractice: body.selectedPractice,
                physicianID: body.Physician,
                dostype: body.DOSType,
                dos: body.DOSvalue ? new Date(body.DOSvalue) : null,
                patientType: body.PatientClass,
                insuranceType: body.InsuranceType,
                insuranceNameSelected: body.InsuranceName,
                insuranceID: body.InsuranceID,
                guarantorSelected: body.Gurantor,
                guarantorID: body.GurantorID,
                billNumber: body.BILLNUMBER,
                claimIcnNumber: body.ClaimIcnNumber,
                claimValue: body.ClaimValue,
                age: body.Age,
                batch: body.Batch,
                insuranceStatus: body.InsuranceStatus,
                insuranceOrder: body.InsuranceOrder,
                completedClaims: body.completedClaims,
                cashClaims: body.CashClaims,
                voidedClaims: body.VoidedClaims,
            });
        } else {
            this.reset();
        }
    };
    claimGridSearch = (refreshData = true) => {
        var claimGrid = {
            PatientID: this.state.patientID ? this.state.patientID : 0,
            PracticeID: this.state.selectedPractice
                ? this.state.selectedPractice.entityId
                : 0,
            PhysicianID: this.state.physicianID ? this.state.physicianID.entityId : 0,
            GurantorID: this.state.guarantorID ? this.state.guarantorID : 0,
            DOSType: this.state.dostype ? this.state.dostype.id : 0,
            DOSvalue: this.state.dos ? this.state.dos.toLocaleDateString() : null,
            PatientClass: this.state.patientType
                ? this.state.patientType.lookupCode
                : null,
            BILLNUMBER: this.state.billNumber ? this.state.billNumber : null,
            ClaimIcnNumber: this.state.claimIcnNumber
                ? Number(this.state.claimIcnNumber)
                : 0,
            ClaimValue: this.state.claimValue ? Number(this.state.claimValue) : null,
            Age: this.state.age ? Number(this.state.age) : null,
            Batch: this.state.batch ? this.state.batch : "",
            InsuranceType: this.state.insuranceType ? this.state.insuranceType.id : 0,
            InsurancID: this.state.insuranceID ? this.state.insuranceID : 0,
            InsuranceStatus: this.state.insuranceStatus
                ? this.state.insuranceStatus.text
                : "",
            InsuranceOrder: this.state.insuranceOrder
                ? this.state.insuranceOrder.text
                : "",
            completedClaims: this.state.completedClaims
                ? this.state.completedClaims
                : 0,
            CashClaims: this.state.cashClaims
                ? this.state.cashClaims
                : 0,
            VoidedClaims: this.state.voidedClaims ? this.state.voidedClaims : 0,
            Skip: refreshData ? 0 : this.props.Claims.length,
            SortColumn: this.state.selectedSortColumn
                ? this.state.selectedSortColumn
                : sortColumns[0].field,
            SortDirection: this.state.sortDirection ? this.state.sortDirection : sortColumns[0].dir,
        };
        this.props.getclaims(claimGrid, refreshData);
    };
    saveFilter = async (event) => {
        this.toggleSaveDialog();
        var claimListGrid = JSON.stringify({
            PatientName: this.state.patientNameSelected
                ? this.state.patientNameSelected
                : null,
            PatientID: this.state.patientID ? this.state.patientID : null,
            selectedPractice: this.state.selectedPractice
                ? this.state.selectedPractice
                : null,
            Physician: this.state.physicianID ? this.state.physicianID : null,
            DOSType: this.state.dostype ? this.state.dostype : null,
            DOSvalue: this.state.dos ? this.state.dos : null,
            PatientClass: this.state.patientType ? this.state.patientType : null,
            InsuranceType: this.state.insuranceType ? this.state.insuranceType : null,
            InsuranceName: this.state.insuranceNameSelected
                ? this.state.insuranceNameSelected
                : null,
            InsuranceID: this.state.insuranceID ? this.state.insuranceID : null,
            Gurantor: this.state.guarantorSelected
                ? this.state.guarantorSelected
                : null,
            GurantorID: this.state.guarantorID ? this.state.guarantorID : null,
            BILLNUMBER: this.state.billNumber ? this.state.billNumber : null,
            ClaimIcnNumber: this.state.claimIcnNumber
                ? this.state.claimIcnNumber
                : null,
            ClaimValue: this.state.claimValue ? this.state.claimValue : null,
            Age: this.state.age ? this.state.age : null,
            Batch: this.state.batch ? this.state.batch : "",
            InsuranceStatus: this.state.insuranceStatus
                ? this.state.insuranceStatus
                : null,
            InsuranceOrder: this.state.insuranceOrder
                ? this.state.insuranceOrder
                : null,
            completedClaims: this.state.completedClaims
                ? this.state.completedClaims
                : 0,
            CashClaims: this.state.cashClaims
                ? this.state.cashClaims
                : 0,
            VoidedClaims: this.state.voidedClaims ? this.state.voidedClaims : 0,
        });
        if (this.state.currentFilter && this.state.currentFilter.filterID) {
            let updateFilter = await this.props.FilterUpdate(
                this.state.currentFilter.filterID,
                event,
                claimListGrid,
                "claim",
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
                claimListGrid,
                "claim",
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
    closeConfirmMessage = () => {
        this.setState({
            confirmMessage: false,
        });
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
    patientTypeSearch = () => {
        this.props.getpatientTypes(this.state.patientTypeSearchText);
    };
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
    physicianSearch = (refreshdata, skip) => {
        this.props.getPhysicianList(
            this.state.PhysicianSearchText,
            refreshdata,
            skip
        );
    };
    onPhysicianSelectionChange = (event) => {
        var selectedDataItems = event.dataItems.slice(
            event.startRowIndex,
            event.endRowIndex + 1
        );
        this.setState({
            physicianID: {
                entityName: selectedDataItems[0].sortName,
                entityId: selectedDataItems[0].entitySID,
            },
        });
    };
    onPhysicianDoubleClick = async (event) => {
        this.setState({
            physicianID: {
                entityName: event.dataItem.sortName,
                entityId: event.dataItem.entitySID,
            },
        });
        this.props.SaveLookups(event.dataItem.entitySID, "Physician");
        //this.selectPatient();
        this.togglePhysicianDialog();
    };
    onPhysicianKeyDown = (event) => {
        var selectedDataItems = event.dataItems.slice(
            event.startRowIndex,
            event.endRowIndex + 1
        );
        this.setState({
            physicianID: {
                entityName: selectedDataItems ? selectedDataItems[0].sortName : null,
                entityId: selectedDataItems ? selectedDataItems[0].entitySID : null,
            },
        });
    };
    cancelPhysicianDialog = () => {
        this.setState({
            physicianSearchText: null,
        });
        this.togglePhysicianDialog();
    };
    togglePhysicianDialog = () => {
        if (this.state.physicianVisible) {
            this.setState({
                physicianSearchText: null,
            });
            this.props.resetPhysicianList();
        }
        this.setState({
            physicianVisible: !this.state.physicianVisible,
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
            //localStorage.setItem("claimListId", JSON.stringify(columns));
            let GridColumns = await this.props.SaveGridColumns(
                "claimList",
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
    getNextData = async () => {
        await this.claimGridSearch(false);
        this.setState({ isVisibleNextData: false });
    };
    pageChange = async (skip, take) => {
        if (skip == 0) return;
        if (this.props.Claims.length < skip + take + 1) {
            this.setState({
                isVisibleNextData: true,
                skip: this.props.Claims.length,
            });
            this.getNextData();
        } else {
            this.setState({ isVisibleNextData: false });
        }
    };
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
                    {this.state.Show_HideDialogVisible && (
                        <Show_HideDialogComponent
                            columns={this.state.claimListColumns}
                            toggleShowColumnsDialog={this.toggleShowColumnsDialog}
                            SaveColumnsShow={this.SaveColumnsShow}
                        ></Show_HideDialogComponent>
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
                    {this.state.physicianVisible && (
                        <FindDialogComponent
                            title="Physician Search"
                            placeholder="Enter Physician Name"
                            searcTextBoxValue={this.state.PhysicianSearchText}
                            onTextSearchChange={(e) => {
                                this.setState({
                                    PhysicianSearchText: e.value,
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
                            title="Delete Claim Filter"
                            toggleDeleteDialog={this.toggleDeleteDialog}
                            deleteMessage={`Are you sure you wish to delete Claim Filter : ${this.state.currentFilter && this.state.currentFilter.displayName
                                ? this.state.currentFilter.displayName
                                : ""
                                }?`}
                            currentFilterID={this.state.currentFilter.filterID}
                            deleteFilter={this.deleteFilter}
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
                    <div className="row nowrap rowHeight">
                        <div style={{ textAlign: "right", marginLeft: "65px" }}>
                            <label className="userInfoLabel">Filter</label>
                        </div>
                        <div className="filterStyle">
                            {this.state.refreshFilter && (
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
                            )}
                        </div>
                        <div style={{ width: "220px", marginLeft: "10px" }}>
                            <div className="float-left">
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
                            <div className="float-left ">
                                <ButtonComponent
                                    type="delete"
                                    icon="delete"
                                    classButton="infraBtn-primary action-button"
                                    onClick={this.delete}
                                >
                                    Delete
                                </ButtonComponent>
                            </div>
                            <div className="float-left ">
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
                    </div>
                    <div className="row nowrap rowHeight" style={{ width: "1390px" }}>
                        <div style={{ textAlign: "right", marginLeft: "55px" }}>
                            <label className="userInfoLabel">Claim# </label>
                        </div>
                        <div style={{ width: "120px" }}>
                            <TextBox
                                type="text"
                                className="unifyHeight"
                                value={this.state.billNumber}
                                onChange={(e) =>
                                    this.setState({
                                        billNumber: e.value,
                                    })
                                }
                            ></TextBox>
                        </div>
                        <div style={{ textAlign: "right", marginLeft: "10px" }}>
                            <label className="userInfoLabel">CLaim ICN# </label>
                        </div>
                        <div style={{ width: "120px" }}>
                            <TextBox
                                type="text"
                                className="unifyHeight"
                                value={this.state.claimIcnNumber}
                                onChange={(e) =>
                                    this.setState({
                                        claimIcnNumber: e.value,
                                    })
                                }
                            ></TextBox>
                        </div>
                        {/* <div style={{ marginLeft: "10px" }}>
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
            </div> */}
                        <div style={{ marginLeft: "10px" }}>
                            <label className="userInfoLabel">Practice </label>
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
                                onClick={(e) => this.setState({ practiceVisible: true })}
                            >
                                Find
                            </ButtonComponent>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                            <label className="userInfoLabel">Physician </label>
                        </div>
                        <div className="physicianStyle">
                            <DropDown
                                className="unifyHeight"
                                data={this.props.dropDownPhysicians}
                                textField="entityName"
                                dataItemKey="entityId"
                                defaultValue={this.state.physicianID}
                                value={this.state.physicianID}
                                onChange={(e) =>
                                    this.setState({
                                        physicianID: {
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
                                onClick={(e) => this.setState({ physicianVisible: true })}
                            >
                                Find
                            </ButtonComponent>
                        </div>
                    </div>
                    <div className="row nowrap rowHeight">
                        <div style={{ textAlign: "right", paddingLeft: "54px" }}>
                            <label className="userInfoLabel">Patient </label>
                        </div>
                        <div className="patientStyle">
                            <DropDown
                                className="unifyHeight"
                                data={this.props.dropDownPatients}
                                textField="entityName"
                                dataItemKey="entityId"
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
                            >
                                Find
                            </ButtonComponent>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
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
                            >
                                Find
                            </ButtonComponent>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                            <label className="userInfoLabel">Patient Type </label>
                        </div>
                        <div className="patientTypeStyle">
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
                    <div className="row nowrap rowHeight">
                        <div style={{ textAlign: "right", marginLeft: "68px" }}>
                            <label className="userInfoLabel">Plan </label>
                        </div>
                        <div className="insPlan">
                            <DropDown
                                data={InsuranceCategory}
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
                        <div className="insuranceStyle" style={{ marginLeft: "10px" }}>
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
                        <div>
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
                        <div>
                            <CheckboxComponent
                                label="Completed Claims"
                                value={this.state.completedClaims}
                                onChange={(e) => this.setState({ completedClaims: e.value })}
                            />
                        </div>
                        <div>
                            <CheckboxComponent
                                label="Include Cash Claims"
                                value={this.state.cashClaims}
                                onChange={(e) => this.setState({ cashClaims: e.value })}
                            />
                        </div>
                        <div>
                            <CheckboxComponent
                                label="Include Voided Claims"
                                value={this.state.voidedClaims}
                                onChange={(e) => this.setState({ voidedClaims: e.value })}
                            />
                        </div>
                    </div>
                    <div className="row nowrap rowHeight" style={{ flexWrap: "nowrap" }}>
                        <div style={{ textAlign: "right", marginLeft: "24px" }}>
                            <label className="userInfoLabel">Claim Status </label>
                        </div>
                        <div className="claimStyle">
                            <DropDown
                                data={InsuranceStatus}
                                textField="text"
                                dataItemKey="id"
                                className="unifyHeight2"
                                id="sins"
                                name="sins"
                                value={this.state.insuranceStatus}
                                onChange={(e) => this.setState({ insuranceStatus: e.value })}
                            ></DropDown>
                        </div>

                        <div style={{ width: "83px" }}>
                            <label className="userInfoLabel">Claim Value {">"}</label>
                        </div>
                        <div style={{ width: "80px" }}>
                            <TextBox
                                type="numeric"
                                format="c2"
                                className="unifyHeight"
                                value={this.state.claimValue}
                                onChange={(e) =>
                                    this.setState({
                                        claimValue: e.value,
                                    })
                                }
                            ></TextBox>
                        </div>
                        <div style={{ width: "75px", marginLeft: "10px" }}>
                            <label className="userInfoLabel">Claim Age {">"} </label>
                        </div>
                        <div style={{ width: "80px" }}>
                            <TextBox
                                type="numeric"
                                format="n"
                                className="unifyHeight"
                                value={this.state.age}
                                onChange={(e) =>
                                    this.setState({
                                        age: e.value,
                                    })
                                }
                            ></TextBox>
                        </div>
                        <div style={{ width: "28px", marginLeft: "10px" }}>
                            <label className="userInfoLabel">DOS </label>
                        </div>
                        <div style={{ width: "147px" }}>
                            <DropDown
                                data={DOSFilter}
                                textField="text"
                                dataItemKey="id"
                                className="unifyHeight"
                                id="tins"
                                name="tins"
                                value={this.state.dostype}
                                onChange={(e) => this.setState({ dostype: e.value })}
                            ></DropDown>
                        </div>
                        <div className="dateStyle" style={{ marginLeft: "5px" }}>
                            <DatePickerComponent
                                className="unifyHeight"
                                placeholder="MM/DD/YYYY"
                                format="M/dd/yyyy"
                                value={this.state.dos}
                                onChange={(e) => this.setState({ dos: e.value })}
                            ></DatePickerComponent>
                        </div>
                    </div>
                    <div className="row nowrap rowHeight" style={{ marginTop: "10px" }}>
                        <div style={{ width: "800px" }}>
                            <div className="float-left">
                                <ButtonComponent
                                    classButton="infraBtn-primary action-grid-button"
                                    look="outline"
                                    icon="search"
                                    onClick={this.claimGridSearch}
                                >
                                    Search
                                </ButtonComponent>
                            </div>
                            <div className="float-left">
                                <ButtonComponent
                                    onClick={this.expandClaimDetails}
                                    classButton="infraBtn-primary action-grid-button"
                                    look="outline"
                                    icon="edit"
                                >
                                    Open
                                </ButtonComponent>
                            </div>
                            <div className="float-left">
                                <ButtonComponent
                                    classButton="infraBtn-primary action-grid-button"
                                    look="outline"
                                    icon="error"
                                >
                                    Check Errors
                                </ButtonComponent>
                            </div>
                            <div className="float-left">
                                <ButtonComponent
                                    classButton="infraBtn-primary action-grid-button"
                                    look="outline"
                                    icon="edit"
                                >
                                    Select All
                                </ButtonComponent>
                            </div>
                            <div className="float-left">
                                <ButtonComponent
                                    onClick={this.submitClaim}
                                    classButton="infraBtn-primary action-grid-button"
                                    look="outline"
                                    icon="edit"
                                >
                                    Submit
                                </ButtonComponent>
                            </div>
                            {/* <div className="float-left">
                <ButtonComponent
                  onClick={this.ParseERA}
                  classButton="infraBtn-primary action-grid-button"
                  look="outline"
                  icon="edit"
                >
                  Parse ERA
                </ButtonComponent>
              </div> */}
                            <div className="float-left">
                                <ButtonComponent
                                    classButton="infraBtn-primary action-grid-button"
                                    look="outline"
                                    icon="edit"
                                >
                                    Hold all
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
                                    icon="export"
                                    classButton="infraBtn-primary"
                                    onClick={() => {
                                        exportExcelFile(this.state._export, this.props.Claims, this.state.claimListColumns);
                                    }}
                                >
                                    Export to Excel
                                </ButtonComponent>
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
                                {this.state.refreshGrid && (
                                    <GridComponent
                                        id="claimListId"
                                        columns={
                                            this.state.claimListColumns
                                            //JSON.parse(localStorage.getItem("claimListId")) ?? columns
                                        }
                                        skip={0}
                                        take={24}
                                        onSelectionChange={this.onClaimGridSelectionChange}
                                        onRowDoubleClick={this.onClaimGridDoubleSelectionChange}
                                        getSelectedItems={this.getSelectedClaims}
                                        selectionMode="multiple"
                                        DATA_ITEM_KEY="gridID"
                                        idGetter={idGetterClaimList}
                                        data={this.props.Claims}
                                        totalCount={
                                            this.props.Claims != null && this.props.Claims.length > 0
                                                ? this.props.Claims[0].totalCount
                                                : this.props.Claims.length
                                        }
                                        height="600px"
                                        width="100%"
                                        hasCheckBox={true}
                                        sortColumns={sortColumns}
                                        onSortChange={this.onSortChange}
                                        pageChange={this.pageChange}
                                        setExporter={this.setExporter}
                                        fileName={"Claim " + moment().format('DD/MM/YYYY, h:mm:ss a') + ".xlsx"}
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
                        // clickOnSearch={this.patientsearch}
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
                    ></FindDialogComponent>
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
            </Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimList);
