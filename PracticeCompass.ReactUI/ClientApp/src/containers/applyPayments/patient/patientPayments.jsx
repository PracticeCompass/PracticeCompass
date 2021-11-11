import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { guarantorColumns, applyPatientPaymentColumns, patientPaymentColumns, AmountFilter } from "./patientPaymentsData";
import {
  insuranceColumns,
  methodList,
  creditCared,
  PracticeColumns,
  insuranceAssignmentColumns,
  DOSFilter,
} from "../insurance/insurancePaymentsData";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import EditableGrid from "../../../components/editableGrid";
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import CheckboxComponent from "../../../components/Checkbox"
import DatePickerComponent from "../../../components/DatePicker";
import config from "../../../config";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import { SaveLookups } from "../../../redux/actions/lookups";
import { GetGridColumns, SaveGridColumns } from "../../../redux/actions/GridColumns"
import NotificationComponent from "../../common/notification";
import PatientFindDialogComponent from "../../common/patientFindDialog";
import { patientColumns } from "../../processPatients/patients/patient/patientData";
import $ from "jquery";
import Show_HideDialogComponent from "../../common/show_hideDialog";
import {
  resetPatientList,
  getPracticeList,
  resetPracticeList,
} from "../../../redux/actions/patient";
import {
  getguarantorList,
  resetGuarantorList,
  resetPhysicianList,
  getPhysicianList,
} from "../../../redux/actions/claimList";
import {
  getPatientPayments, getPaymentAssignments, GetPaymentDetails,
  savePayment,
  getApplyPatientPayments,
  ApplyPayments
} from "../../../redux/actions/payments"
const DATA_ITEM_KEY_PATIENT = "patientListgridID";
const idGetterPaient = getter(DATA_ITEM_KEY_PATIENT);
const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);

const DATA_ITEM_KEY_PATIENT_PAYMENT = "paymentSID";
const idGetterPatientPaymentID = getter(DATA_ITEM_KEY_PATIENT_PAYMENT);

const DATA_ITEM_KEY_Apply_PATIENT_PAYMENT = "id";
const idGetterApplyPatientPaymentID = getter(DATA_ITEM_KEY_Apply_PATIENT_PAYMENT);

const DATA_ITEM_KEY_Physician = "entitySID";
const idGetterPhysicianID = getter(DATA_ITEM_KEY_Physician);

const DATA_ITEM_KEY_INSURANCE_Details_PAYMENT = "chargeSID";
const idGetterInsuranceDetailsPaymentID = getter(DATA_ITEM_KEY_INSURANCE_Details_PAYMENT);

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
    paymentClass: state.payments.paymentClass,
    physicians: state.claimList.physicians,
    patientPayments: state.payments.patientPayments,
    paymentAssignments: state.payments.paymentAssignments,
    applyPatientPayments: state.payments.applyPatientPayments,
    UiExpand:state.ui.UiExpand
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getPatientList: (name) => dispatch(getpatientList(name)),
    getguarantorList: (name, refreshData, skip) =>
      dispatch(getguarantorList(name, refreshData, skip)),
    resetPatientList: () => dispatch(resetPatientList()),
    resetGuarantorList: () => dispatch(resetGuarantorList()),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
    resetPracticeList: () => dispatch(resetPracticeList()),
    getPhysicianList: (name, refreshdata, skip) =>
      dispatch(getPhysicianList(name, refreshdata, skip)),
    resetPhysicianList: () => dispatch(resetPhysicianList()),
    getPatientPayments: (PracticeID, PatientID, DateType, Datevalue, Fullyapplied, amountType, amountFilter) => dispatch(getPatientPayments(PracticeID, PatientID, DateType, Datevalue, Fullyapplied, amountType, amountFilter)),
    getPaymentAssignments: (PaymentSID) => dispatch(getPaymentAssignments(PaymentSID)),
    GetPaymentDetails: (PaymentSID) => dispatch(GetPaymentDetails(PaymentSID)),
    getApplyPatientPayments: (patientID) => dispatch(getApplyPatientPayments(patientID)),
    savePayment: (PaymentSID, PracticeID, PostDate, Source, PayorID, Class, Amount, Method, CreditCard, AuthorizationCode, Voucher, CreateMethod, CurrentUser) =>
      dispatch(savePayment(PaymentSID, PracticeID, PostDate, Source, PayorID, Class, Amount, Method, CreditCard, AuthorizationCode, Voucher, CreateMethod, CurrentUser)),
    ApplyPayments: (list) => dispatch(ApplyPayments(list)),
    SaveGridColumns: (name, columns) =>
      dispatch(SaveGridColumns(name, columns)),
    GetGridColumns: (name) => dispatch(GetGridColumns(name)),
  };
}

class PatientPayments extends Component {
  state = {
    method: null,
    methodSelected: 0,
    methodTabSelected: 0,
    patientPaymentExpanded: true,
    patientPaymentDetailsExpanded: false,
    applypatientPaymentExpanded: false,
    selected: 0,
    refreshFilter: true,
    tabSelected: 0,
    dostype: null,
    dos: null,
    payment_calss: null,
    patientGuarantorID: null,
    patientDetailsGuarantorID: null,
    guarantorSearchText: null,
    guarantorVisible: false,
    guarantorDetailsVisible: false,
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

    subInsurancePhysicianID: null,
    subPatientPhysicianID: null,

    practiceVisiblePatient: false,
    practiceVisibleSubPatient: false,
    practiceVisibleInsurance: false,
    practiceVisibleSubInsurance: false,
    fullyApplied: false,
    patientPracticeID: null,
    insurancePracticeID: null,
    subPatientPracticeID: null,
    subInsurancePracticeID: null,
    practiceSearchText: null,
    physicianSearchText: null,
    applyPatientPayments: [],
    patientPaymentColumns: patientPaymentColumns,
    insuranceAssignmentColumns: insuranceAssignmentColumns,
    applyPatientPaymentColumns:applyPatientPaymentColumns
  };
  componentDidMount = () => {
    this.getGridColumns();
  }
  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns('patientPayment');
    let patientDetailsPayment = await this.props.GetGridColumns('patientDetailsPayment');
    let applyedPatient = await this.props.GetGridColumns('applyedPatient');
    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns)?? patientPaymentColumns;
      this.setState({ patientPaymentColumns: currentColumns });
    }
    if (patientDetailsPayment != null && patientDetailsPayment != "") {
      patientDetailsPayment = JSON.parse(patientDetailsPayment?.columns) ?? insuranceAssignmentColumns;
      this.setState({ insuranceAssignmentColumns: patientDetailsPayment });
    }
    if(applyedPatient !=null && applyedPatient !=""){
      applyedPatient = JSON.parse(applyedPatient?.columns) ?? applyPatientPaymentColumns;
      this.setState({ applyPatientPaymentColumns: applyedPatient });
    }
    this.setState({ refreshGrid: true });
  }

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

  getParacticesUrl(filter) {
    return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
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
  cancelPatientDialog = () => {
    this.setState({
      patientSelectedState: null,
    });
    this.togglePatientDialog();
  };
  onSortChange = () => { };
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
  handleMethodTabSelect = (e) => {
    this.setState({
      methodTabSelected: e.selected,
      methodSelected: e.selected,
    });
  };
  guarantorsearch = (refreshData, skip) => {
    this.props.getguarantorList(
      this.state.guarantorSearchText,
      refreshData,
      skip
    );
  };
  toggleGuarantorDialog = (isDetails = false) => {
    if (this.state.guarantorVisible || this.state.guarantorDetailsVisible) {
      this.setState({
        guarantorSearchText: null,
      });
      this.props.resetGuarantorList();
    }
    if (this.state.guarantorVisible || this.state.guarantorDetailsVisible) {
      this.setState({
        guarantorDetailsVisible: false,
        guarantorVisible: false
      });
    } else {
      if (isDetails) {
        this.setState({
          guarantorDetailsVisible: !this.state.guarantorDetailsVisible,
        });
      } else {
        this.setState({
          guarantorVisible: !this.state.guarantorVisible,
        });
      }
    }
  };
  cancelGuarantorDialog = () => {
    this.setState({
      guarantorSelectedState: null,
    });
    this.toggleGuarantorDialog();
  };
  patientPaymentGridSearch = () => {
    //this.props.getPatientPayments(142690, 886880)
    this.props.getPatientPayments(this.state.patientPracticeID?.entityId, this.state.patientGuarantorID?.entityId,
      this.state.txnDatetype ? this.state.txnDatetype.id : 0, this.state.txnDate ? this.state.txnDate.toLocaleDateString() : null, this.state.fullyApplied ?? false, this.state.amountType, this.state.amountFilter);
  }
  onPatientPaymentGridSelectionChange = async (event) => {
    let patientPaymentDetails = event.dataItems == null || event.dataItems.length == 0
      ? event.dataItem
      : event.dataItems[event.endRowIndex]
    if (patientPaymentDetails.remaining == null) {
      patientPaymentDetails.remaining = patientPaymentDetails.amount
    }
    this.setState({
      patientPaymentDetails
    });

  };
  onPatientPaymentGridDoubleSelectionChange = async (event) => {
    let patientPaymentDetails = event.dataItems == null || event.dataItems.length == 0
      ? event.dataItem
      : event.dataItems[event.endRowIndex];
    patientPaymentDetails = await this.EditPaymentPatient(patientPaymentDetails);
  };
  setPatientPaymentDetailExpanded = () => {
    //$("#patient").children("span").trigger("click");
    $("#PatientPaymentDetailsSearch").children("span").trigger("click");
  };
  setApplyPatientPaymentExpanded = () => {
    $("#ApplyPatientPayment").children("span").trigger("click");
  };
  onGuarantorSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setGuarantorItem(selectedDataItems[0].entitySID, selectedDataItems[0].sortName);
  };
  setGuarantorItem = (entityId, entityName) => {
    if (this.state.guarantorVisible) {
      this.setState({
        patientGuarantorID: {
          entityId, entityName
        }
      })
    }
    else if (this.state.guarantorDetailsVisible) {
      this.setState({
        patientDetailsGuarantorID: {
          entityId, entityName
        }
      })

    }
  }
  onGuarantorDoubleClick = async (event) => {

    this.setGuarantorItem(event.dataItem.entitySID, event.dataItem.sortName);
    this.props.SaveLookups(event.dataItem.entitySID, "Guarantor");
    //this.selectGuarantor();
    this.toggleGuarantorDialog();
  };
  onGuarantorKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setGuarantorItem(selectedDataItems[0].entitySID, selectedDataItems[0].sortName);
  };
  onApplyPaymentGridSelectionChange = () => {

  }
  onApplyPaymentGridDoubleSelectionChange = () => {

  }
  async EditPaymentPatient(patientPaymentDetails) {
    if (patientPaymentDetails == null) {
      this.setState({
        warning: true,
        message: "Please Select Payment to Edit.",
      });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
      return;
    }
    let remaining = patientPaymentDetails.remaining;
    this.props.getPaymentAssignments(patientPaymentDetails.paymentSID);
    patientPaymentDetails = await this.props.GetPaymentDetails(patientPaymentDetails.paymentSID);
    if (patientPaymentDetails) {
      patientPaymentDetails.remaining = remaining;
      if (patientPaymentDetails.remaining == null) {
        patientPaymentDetails.remaining = patientPaymentDetails.amount
      }
      if (patientPaymentDetails.practiceID != null && (this.props.dropDownPractices == null ||
        this.props.dropDownPractices.filter(
          (x) => x.entityId == patientPaymentDetails.practiceID
        ).length == 0)) {
        await this.props.SaveLookups(
          patientPaymentDetails?.practiceID,
          "Practice"
        );
      }
      if (patientPaymentDetails.payorID != null && (this.props.dropDownGuarantors == null ||
        this.props.dropDownGuarantors.filter(
          (x) => x.entityId == patientPaymentDetails.payorID
        ).length == 0)) {
        this.props.SaveLookups(patientPaymentDetails?.payorID, "Guarantor");
      }
      this.setState({
        patientPaymentDetails,
        paymentSID: patientPaymentDetails.paymentSID,
        subInsurancePracticeID: {
          entityName: patientPaymentDetails?.practiceName,
          entityId: patientPaymentDetails?.practiceID,
        },
        patientDetailsGuarantorID: {
          entityName: patientPaymentDetails?.payorName,
          entityId: patientPaymentDetails?.payorID
        },
        payment_calss: {
          description: patientPaymentDetails?.paymentClass,
          lookupCode: patientPaymentDetails?.paymentClasscode
        },
        amountDetails: patientPaymentDetails?.amount,
        remainingDetails: patientPaymentDetails?.remaining,
        txnDataDetails: patientPaymentDetails ? new Date(patientPaymentDetails?.postDate) : null,
        methodDetails: {
          label: patientPaymentDetails?.payMethod,
          value: patientPaymentDetails?.paymentmethodcode
        },
        voucherdetails: patientPaymentDetails?.voucher,
        authorizationCode: patientPaymentDetails?.authorizationCode,
        creditCardDetails: {
          code: patientPaymentDetails?.creditCard,
          value: patientPaymentDetails?.creditCardname
        }
      });
    } else {
      this.resetPatientDetails();
    }
    this.setPatientPaymentDetailExpanded();
    return patientPaymentDetails;
  }
  resetPatientDetails = () => {
    this.setState({
      patientPaymentDetails: null,
      paymentSID: null,
      subInsurancePracticeID: null,
      patientDetailsGuarantorID: null,
      payment_calss: null,
      amountDetails: null,
      txnDataDetails: null,
      methodDetails: null,
      voucherdetails: null,
      authorizationCode: null,
      creditCardDetails: null
    });
  }
  savePatientPaymentDetails = async () => {
    let resp = await this.props.savePayment(this.state.paymentSID ?? 0, this.state.subInsurancePracticeID?.entityId, this.state.txnDataDetails ? new Date(this.state.txnDataDetails).toLocaleDateString() : null,
      "G", this.state.patientDetailsGuarantorID?.entityId, this.state.payment_calss ? this.state.payment_calss.lookupCode : null, this.state.amountDetails, this.state.methodDetails ? this.state.methodDetails.value : null,
      this.state.creditCardDetails ? this.state.creditCardDetails.code : null, this.state.authorizationCode, this.state.voucherdetails, "M", 1)
    if (resp) {
      this.setState({
        success: true,
        message: "Save Payment succefully.",
      });
      setTimeout(() => {
        this.setState({
          success: false,
        });
      }, this.state.timer);
    } else {
      this.setState({
        error: true,
        message: "Save Payment failed.",
      });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
    }
  }
  closeNotification = () => {
    this.setState({
      success: false,
      error: false,
      warning: false,
      info: false,
      none: false,
    });
  };
  onInsuranceDetailsGridSelectionChange = (event) => {
    //this.setApplyInsurancePaymentExpanded();
  }
  onInsuranceDetailsGridDoubleSelectionChange = (event) => {
    // this.setApplyInsurancePaymentExpanded();
  }
  ApplyPatientPayment = async () => {
    if (this.state.patientPaymentDetails == null) {
      this.setState({
        warning: true,
        message: "Please Select Payment to Apply.",
      });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
      return;
    }
    //this.props.getPaymentAssignments(3260);

    this.props.getPaymentAssignments(this.state.patientPaymentDetails.paymentSID);
    //let applyData = await this.props.getApplyPatientPayments(3260);
    let applyData = await this.props.getApplyPatientPayments(this.state.patientPaymentDetails.payorID);
    this.setState({
      applyPatientPayments: applyData,
      applyPatientPaymentsbackup: [...applyData]
    });
    this.setApplyPatientPaymentExpanded();
  }
  applyItemChanged = (event) => {
    if (this.state.patientPaymentDetails == null) return;

    const field = event.field || '';
    const inEditID = event.dataItem["chargeSID"];
    let rowIndex = this.state.applyPatientPayments.findIndex(item => item["chargeSID"] === inEditID);
    let backUpData = { ...this.state.applyPatientPaymentsbackup[rowIndex] };

    let data = this.state.applyPatientPayments.map(item => item["chargeSID"] === inEditID ? {
      ...item,
      [field]: event.value,
      isEdit: true
    } : item);

    let disableApply = false;
    if (field == "patientPaid" || field == "adjustments") {
      let amount = Number(data[rowIndex]["amount"].replace("$", ""));
      let chargeBalance = Number(data[rowIndex]["chargeBalance"].replace("$", ""));

      chargeBalance = amount - (data[rowIndex]["adjustments"] + data[rowIndex]["patientPaid"]);
      let remaining = this.state.patientPaymentDetails.remaining;

      if (field == "patientPaid") {
        remaining = remaining - (data[rowIndex]["patientPaid"] - backUpData["patientPaid"]);
      }
      if (amount < 0 || remaining < 0) {
        disableApply = true;
        this.setState({
          warning: true,
          message: "Payment is higher than remaining.",
        });
        setTimeout(() => {
          this.setState({
            warning: false,
          });
        }, this.state.timer);
        return;
      }
      data[rowIndex]["chargeBalance"] = "$" + chargeBalance;
      this.state.patientPaymentDetails.remaining = remaining;
    }
    this.setState({
      applyPatientPayments: data, disableApply
    });
  }
  filterApplyListChanged = async () => {
    if (this.state.applyPatientPayments != null && this.state.patientPaymentDetails != null) {
      let list = this.state.applyPatientPayments.filter(item => item.isEdit == true);
      this.setState({ filterapplyPatientPayments: list || [] });
    }
  }
  ApplyListChanged = async () => {
    if (this.state.applyPatientPayments != null && this.state.patientPaymentDetails != null) {
      let list = this.state.applyPatientPayments.map(item => item.isEdit == true ? {
        chargeSID: item.chargeSID,
        paymentSID: this.state.patientPaymentDetails.paymentSID,
        payorID: item.claimSID,
        amountPaid: item.patientPaid,
        adjustment: item.adjustments,
        PaymentType: "G"
      } : null);
      list = list.filter(i => i != null);
      let result = await this.props.ApplyPayments(list);
      if (result) {
        this.setState({
          success: true,
          message: "Save Apply succefully.",
        });
        setTimeout(() => {
          this.setState({
            success: false,
          });
        }, this.state.timer);
      } else {
        this.setState({
          error: true,
          message: "Error Apply succefully.",
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, this.state.timer);
      }
    }
  }
  toggleShowColumnsDialog = () => {
    this.setState({ Show_HidePatientDialogVisible: false, Show_HideChargeDialogVisible: false ,Show_HideApplyDialogVisible:false});
  };
  SaveColumnsShow = async (columns) => {
    if (!columns.find((x) => x.hide != true)) {
      this.setState({ Show_HidePatientDialogVisible: false });
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
        "patientPayment",
        JSON.stringify(columns)
      );
      this.setState({
        applyPatientPayments: JSON.parse(GridColumns?.columns),
        Show_HidePatientDialogVisible: false,
      });
    }
  };
  SaveChargeColumnsShow = async (columns) => {
    if (!columns.find((x) => x.hide != true)) {
      this.setState({ Show_HideChargeDialogVisible: false });
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
        "patientDetailsPayment",
        JSON.stringify(columns)
      );
      this.setState({
        insuranceAssignmentColumns: JSON.parse(GridColumns?.columns),
        Show_HideChargeDialogVisible: false,
      });
    }
  };
  SaveApplyColumnsShow = async (columns) => {
    if (!columns.find((x) => x.hide != true)) {
      this.setState({ Show_HideApplyDialogVisible: false });
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
        "applyedPatient",
        JSON.stringify(columns)
      );
      this.setState({
        applyPatientPaymentColumns: JSON.parse(GridColumns?.columns),
        Show_HideApplyDialogVisible: false,
      });
    }
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
          {this.state.Show_HidePatientDialogVisible && (
            <Show_HideDialogComponent
              columns={this.state.patientPaymentColumns}
              toggleShowColumnsDialog={this.toggleShowColumnsDialog}
              SaveColumnsShow={this.SaveColumnsShow}
            ></Show_HideDialogComponent>
          )}
          {this.state.Show_HideChargeDialogVisible && (
            <Show_HideDialogComponent
              columns={this.state.insuranceAssignmentColumns}
              toggleShowColumnsDialog={this.toggleShowColumnsDialog}
              SaveColumnsShow={this.SaveChargeColumnsShow}
            ></Show_HideDialogComponent>
          )}
          {this.state.Show_HideApplyDialogVisible && (
            <Show_HideDialogComponent
              columns={this.state.applyPatientPaymentColumns}
              toggleShowColumnsDialog={this.toggleShowColumnsDialog}
              SaveColumnsShow={this.SaveApplyColumnsShow}
            ></Show_HideDialogComponent>
          )}
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
          {(this.state.guarantorVisible || this.state.guarantorDetailsVisible) && (
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
          <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
            <PanelBarItem
              id="PatientPaymentSearch"
              expanded={this.state.patientPaymentExpanded}
              title="Patient Payment"
            >
              <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                <div style={{ float: "left", width: "100%" }}>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ marginLeft: "32px" }}>
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
                      <label className="userInfoLabel">Guarantor </label>
                    </div>
                    <div className="GuarantorStyle">
                      <DropDown
                        className="unifyHeight"
                        data={this.props.dropDownGuarantors}
                        textField="entityName"
                        dataItemKey="entityId"
                        defaultValue={this.state.patientGuarantorID}
                        value={this.state.patientGuarantorID}
                        onChange={(e) =>
                          this.setState({
                            patientGuarantorID: {
                              entityName: e.value?.entityName,
                              entityId: e.value?.entityId,
                            }
                          })
                        }
                      ></DropDown>
                    </div>
                    <div>
                      <ButtonComponent
                        icon="search"
                        type="search"
                        classButton="infraBtn-primary find-button"
                        onClick={() => this.toggleGuarantorDialog(false)}
                        style={{ marginTop: "0px" }}
                      >
                        Find
                      </ButtonComponent>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", flexFlow: "row", width: "100%" }}
                  >
                    <div style={{ width: "54px", marginLeft: "27px" }}>
                      <label className="userInfoLabel">Txn Date</label>
                    </div>
                    <div style={{ width: "147px" }}>
                      <DropDown
                        data={DOSFilter}
                        textField="text"
                        dataItemKey="id"
                        className="unifyHeight"
                        id="tins"
                        name="tins"
                        value={this.state.txnDatetype}
                        onChange={(e) => this.setState({ txnDatetype: e.value })}
                      ></DropDown>
                    </div>
                    <div className="dateStyle" style={{ marginLeft: "5px" }}>
                      <DatePickerComponent
                        className="unifyHeight"
                        placeholder="MM/DD/YYYY"
                        format="M/dd/yyyy"
                        value={this.state.txnDate}
                        onChange={(e) => this.setState({ txnDate: e.value })}
                      ></DatePickerComponent>
                    </div>

                    <div style={{ width: "51px", marginLeft: "10px" }}>
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
                    <div>
                      <CheckboxComponent
                        style={{ marginRight: "5px" }}
                        id="isCopayExmpted"
                        label="Fully Applied"
                        value={this.state.fullyApplied}
                        onChange={(e) => this.setState({ fullyApplied: e.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexFlow: "row", marginLeft: "20px" }}
              >
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    classButton="infraBtn-primary action-grid-button"
                    icon="search"
                    type="search"
                    onClick={this.patientPaymentGridSearch}
                  >
                    Search
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={() => {
                      this.setPatientPaymentDetailExpanded()
                    }}
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
                      this.ApplyPatientPayment();
                    }
                    }
                  >
                    Apply
                  </ButtonComponent>
                </div>
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    type="edit"
                    icon="edit"
                    classButton="infraBtn-primary action-button"
                    onClick={() => {
                      this.EditPaymentPatient(this.state.patientPaymentDetails);
                    }}
                  >
                    Edit
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
                      this.setState({ Show_HidePatientDialogVisible: true });
                    }}
                  >
                    Edit Grid
                  </ButtonComponent>
                </div>
              </div>
              <div style={{ display: "flex", flexFlow: "row", width:window.innerWidth- (!this.props.UiExpand?80:260)}}>
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
                      id="collapseOne1"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <GridComponent
                        id="patientPayment"
                        columns={this.state.patientPaymentColumns}
                        skip={0}
                        take={21}
                        onSelectionChange={this.onPatientPaymentGridSelectionChange}
                        onRowDoubleClick={this.onPatientPaymentGridDoubleSelectionChange}
                        // getSelectedItems={this.getSelectedClaims}
                        // selectionMode="multiple"
                        DATA_ITEM_KEY="paymentSID"
                        idGetter={idGetterPatientPaymentID}
                        data={this.props.patientPayments}
                        totalCount={
                          this.props.patientPayments != null && this.props.patientPayments.length > 0
                            ? this.props.patientPayments[0].totalCount
                            : this.props.patientPayments.length
                        }
                        height="500px"
                        width="100%"
                        //hasCheckBox={true}
                        sortColumns={[]}
                        onSortChange={this.onSortChange}
                      // pageChange={this.pageChange}
                      ></GridComponent>
                    </div>
                  </div>
                </div>
              </div>

            </PanelBarItem>
            <PanelBarItem
              id="PatientPaymentDetailsSearch"
              expanded={this.state.patientPaymentDetailsExpanded}
              title="Patient Payment Details"
            >
              <div
                style={{
                  marginTop: "5px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexFlow: "row" }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <div style={{ marginLeft: "16px" }}>
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
                            this.setState({
                              practiceVisibleSubInsurance: true,
                            })
                          }
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexFlow: "row nowrap" }}>

                      <div style={{ marginLeft: "2px" }}>
                        <label className="userInfoLabel">Guarantor</label>
                      </div>
                      <div className="GuarantorStyle">
                        <DropDown
                          className="unifyHeight"
                          data={this.props.dropDownGuarantors}
                          textField="entityName"
                          dataItemKey="entityId"
                          defaultValue={this.state.patientDetailsGuarantorID}
                          value={this.state.patientDetailsGuarantorID}
                          onChange={(e) =>
                            this.setState({
                              patientDetailsGuarantorID: {
                                entityName: e.value?.entityName,
                                entityId: e.value?.entityId,
                              }
                            })
                          }
                        ></DropDown>
                      </div>
                      <div>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={() => this.toggleGuarantorDialog(true)}
                          style={{ marginTop: "0px" }}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <div style={{ float: "left", marginLeft: "32px" }}>
                        <label className="userInfoLabel">Class </label>
                      </div>
                      <div
                        className="insuranceStyle"
                        style={{ float: "left" }}
                      >
                        <DropDown
                          className="unifyHeight"
                          data={this.props.paymentClass}
                          textField="description"
                          dataItemKey="lookupCode"
                          value={this.state.payment_calss}
                          onChange={(e) =>
                            this.setState({
                              payment_calss: e.value,
                            })
                          }
                        ></DropDown>
                      </div>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Txn Date </label>
                      </div>
                      <div className="dateStyle" style={{ float: "left" }}>
                        <DatePickerComponent
                          id="planEndDate"
                          name="planEndDate"
                          className="unifyHeight"
                          placeholder="MM/DD/YYYY"
                          format="M/dd/yyyy"
                          value={
                            this.state.txnDataDetails
                          }
                          onChange={(e) =>
                            this.setState({ txnDataDetails: e.value })
                          }
                        ></DatePickerComponent>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <div style={{ float: "left", marginLeft: "14px" }}>
                        <label className="userInfoLabel">Amount </label>
                      </div>
                      <div style={{ float: "left", width: "100px" }}>
                        <TextBox
                          type="numeric"
                          format="c2"
                          className="unifyHeight"
                          value={this.state.amountDetails}
                          onChange={(e) =>
                            this.setState({
                              amountDetails: e.value,
                            })
                          }
                        ></TextBox>
                      </div>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Remaining </label>
                      </div>
                      <div style={{ float: "left", width: "100px" }}>
                        <TextBox
                          type="numeric"
                          format="c2"
                          className="unifyHeight"

                          value={this.state.remainingDetails}
                          onChange={(e) =>
                            this.setState({
                              remainingDetails: e.value,
                            })
                          }
                        ></TextBox>
                      </div>
                      <div style={{ marginLeft: "30px" }}>
                        <ButtonComponent
                          classButton="infraBtn-primary action-button"
                          look="outline"
                          icon="edit"
                          type="edit"
                          onClick={this.savePatientPaymentDetails}
                        >
                          Save
                        </ButtonComponent>
                      </div>
                    </div>

                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <fieldset
                        className="fieldsetStyle"
                        style={{
                          width: "540px",
                          marginTop: "5px",
                          height: "85px",
                          marginLeft: "10px"
                        }}
                      >
                        <legend
                          className="legendStyle"
                          style={{ paddingRight: "5px", paddingLeft: "5px" }}
                        >
                          Payment Method
                        </legend>
                        <div className="row" style={{ marginLeft: "5px" }}>
                          <div style={{ float: "left", marginLeft: "24px" }}>
                            <label className="userInfoLabel">Method</label>
                          </div>
                          <div style={{ float: "left", width: "215px" }}>
                            <DropDown
                              className="unifyHeight"
                              data={methodList}
                              textField="label"
                              dataItemKey="value"
                              value={this.state.methodDetails}
                              onChange={(e) =>
                                this.setState({
                                  methodDetails: e.value,
                                })
                              }
                            ></DropDown>
                          </div>
                          <div style={{ float: "left", marginLeft: "12px" }}>
                            <label className="userInfoLabel">Voucher </label>
                          </div>
                          <div style={{ float: "left", width: "100px" }}>
                            <TextBox
                              className="unifyHeight"
                              value={this.state.voucherdetails}
                              onChange={(e) =>
                                this.setState({
                                  voucherdetails: e.value,
                                })
                              }
                            ></TextBox>
                          </div>
                        </div>
                        <div className="row" style={{ marginLeft: "5px" }}>
                          <div style={{ float: "left", marginLeft: "5px" }}>
                            <label className="userInfoLabel">
                              Credit Card
                            </label>
                          </div>
                          <div style={{ float: "left", width: "215px" }}>
                            <DropDown
                              className="unifyHeight"
                              data={creditCared}
                              textField="value"
                              dataItemKey="code"
                              value={this.state.creditCardDetails}
                              onChange={(e) =>
                                this.setState({
                                  creditCardDetails: e.value,
                                })
                              }
                            ></DropDown>
                          </div>
                          <div style={{ float: "left", marginLeft: "12px" }}>
                            <label className="userInfoLabel">
                              Authorization Code
                            </label>
                          </div>
                          <div style={{ float: "left", width: "100px" }}>
                            <TextBox
                              className="unifyHeight"
                              value={this.state.authorizationCode}
                              onChange={(e) =>
                                this.setState({
                                  authorizationCode: e.value,
                                })
                              }
                            ></TextBox>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                </div>

                <fieldset
                  className="fieldsetStyle"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                    width:window.innerWidth- (!this.props.UiExpand?120:300),
                    marginLeft: "10px"
                  }}
                >
                  <legend
                    className="legendStyle"
                    style={{ paddingRight: "5px", paddingLeft: "5px" }}
                  >
                    Assignement Payment
                  </legend>
                  <div style={{ display: "flex", flexFlow: "row", marginBottom: "2px", height: "20px" }}>
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
                          this.setState({ Show_HideChargeDialogVisible: true });
                        }}
                      >
                        Edit Grid
                      </ButtonComponent>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
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
                          id="collapseOne2"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <GridComponent
                            id="patientDetailsPayment"
                            columns={this.state.insuranceAssignmentColumns}
                            skip={0}
                            take={21}
                            onSelectionChange={this.onInsuranceDetailsGridSelectionChange}
                            onRowDoubleClick={this.onInsuranceDetailsGridDoubleSelectionChange}
                            // getSelectedItems={this.getSelectedClaims}
                            // selectionMode="multiple"
                            DATA_ITEM_KEY="chargeSID"
                            idGetter={idGetterInsuranceDetailsPaymentID}
                            data={this.props.paymentAssignments}
                            totalCount={
                              this.props.paymentAssignments != null && this.props.paymentAssignments.length > 0
                                ? this.props.paymentAssignments[0].totalCount
                                : this.props.paymentAssignments.length
                            }
                            height="500px"
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
                </fieldset>

              </div>
            </PanelBarItem>
            <PanelBarItem
              id="ApplyPatientPayment"
              expanded={this.state.applypatientPaymentExpanded}
              title="Apply Patient Payments"
            >
              <div
                style={{
                  marginTop: "5px",
                  marginBottom: "30px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexFlow: "row" }}>
                  <TabStrip
                    className="userManagmentTabStrip"
                    selected={this.state.tabSelected}
                    onSelect={this.handleTabSelect}
                    style={{ width: "100%" }}
                  >
                    <TabStripTab title="Apply Patient Payments Details">
                      <div
                        style={{
                          // display: "flex",
                          // flexFlow: "row",
                          width: "100%",
                        }}
                      >
                        <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
                          <div style={{ float: "left", marginLeft: "14px" }}>
                            <label className="userInfoLabel">Amount </label>
                          </div>
                          <div style={{ float: "left", width: "100px" }}>
                            <TextBox
                              type="numeric"
                              format="c2"
                              className="unifyHeight"
                              value={this.state.patientPaymentDetails?.amount}
                              onChange={(e) =>
                                this.setState({
                                  amountApply: e.value,
                                })
                              }
                              disabled={true}
                            ></TextBox>
                          </div>
                          <div style={{ float: "left", marginLeft: "10px" }}>
                            <label className="userInfoLabel">Remaining </label>
                          </div>
                          <div style={{ float: "left", width: "132px" }}>
                            <TextBox
                              type="numeric"
                              format="c2"
                              className="unifyHeight"
                              value={this.state.patientPaymentDetails?.remaining == null ? this.state.patientPaymentDetails?.amount : this.state.patientPaymentDetails?.remaining}
                              onChange={(e) =>
                                this.setState({
                                  remaining: e.value,
                                })
                              }
                              disabled={true}
                            ></TextBox>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row", height: "20px" }}>
                          <div
                            style={{
                              float: "right",
                              position: "absolute",
                              marginRight: "18px",
                              right: "0",
                            }}
                          >
                            <ButtonComponent
                              type="add"
                              classButton="infraBtn-primary action-button"
                              onClick={() => {
                                this.setState({ Show_HideApplyDialogVisible: true });
                              }}
                            >
                              Edit Grid
                            </ButtonComponent>
                          </div>
                        </div>
                        <fieldset
                          className="fieldsetStyle"
                          style={{
                            width:window.innerWidth- (!this.props.UiExpand?148:330),
                            marginTop: "5px",
                            marginBottom: "10px",
                            height: "435px",
                            marginLeft: "10px"
                          }}
                        >
                          <legend
                            className="legendStyle"
                            style={{ paddingRight: "5px", paddingLeft: "5px" }}
                          >
                            Assignement Payment
                          </legend>
                          <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%", marginBottom: "10px" }}>
                            <ButtonComponent
                              icon="edit"
                              type="edit"
                              classButton="infraBtn-primary"
                              onClick={() => { this.filterApplyListChanged() }}
                              style={{ marginTop: "0px" }}
                              disabled={this.state.applyPatientPayments == null || this.state.applyPatientPayments.filter(item => item.isEdit).length == 0}
                            >
                              Apply
                            </ButtonComponent>

                          </div>
                          <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
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
                                  // style={{ width:window.innerWidth- (!this.props.UiExpand?120:290)}}
                                >
                                  <EditableGrid
                                    data={this.state.applyPatientPayments}
                                    id="applyedPatient"
                                    skip={0}
                                    take={11}
                                    height="350px"
                                    width="100%"
                                    editColumn={"chargeSID"}
                                    DATA_ITEM_KEY="chargeSID"
                                    idGetter={idGetterApplyPatientPaymentID}
                                    onSelectionChange={this.onApplyPaymentGridSelectionChange}
                                    onRowDoubleClick={this.onApplyPaymentGridDoubleSelectionChange}
                                    columns={this.state.applyPatientPaymentColumns}
                                    onSortChange={this.onSortChange}
                                    itemChange={this.applyItemChanged}
                                    // pageChange={this.pageChange}
                                    isEditable={true}
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
                        </fieldset>
                        <fieldset
                          className="fieldsetStyle"
                          style={{
                            width:window.innerWidth- (!this.props.UiExpand?148:330),
                            marginTop: "5px",
                            marginBottom: "30px",
                            height: "435px",
                            marginLeft: "10px"
                          }}
                        >
                          <legend
                            className="legendStyle"
                            style={{ paddingRight: "5px", paddingLeft: "5px" }}
                          >
                            Confirmation
                          </legend>
                          <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%", marginBottom: "10px" }}>
                            <ButtonComponent
                              icon="edit"
                              type="edit"
                              classButton="infraBtn-primary"
                              onClick={() => this.ApplyListChanged}
                              style={{ marginTop: "0px" }}
                              disabled={this.state.disableApply || (this.state.filterapplyPatientPayments == null || this.state.filterapplyPatientPayments.filter(item => item.isEdit).length == 0)}
                            >
                              Post
                            </ButtonComponent>
                          </div>
                          <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
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
                                  // style={{ width:window.innerWidth- (!this.props.UiExpand?120:290)}}
                                >

                                  <GridComponent
                                    data={this.state.filterapplyPatientPayments || []}
                                    id="applyedPatient"
                                    skip={0}
                                    take={11}
                                    height="350px"
                                    width="100%"
                                    editColumn={"chargeSID"}
                                    DATA_ITEM_KEY="chargeSID"
                                    idGetter={idGetterApplyPatientPaymentID}
                                    onSelectionChange={this.onApplyPaymentGridSelectionChange}
                                    onRowDoubleClick={this.onApplyPaymentGridDoubleSelectionChange}
                                    columns={this.state.applyPatientPaymentColumns}
                                    //itemChange={this.applyItemChanged}
                                    onSortChange={this.onSortChange}
                                  // pageChange={this.pageChange}
                                  // isEditable={true}
                                  // totalCount={
                                  //   this.props.patientApplys != null && this.props.patientApplys.length > 0
                                  //     ? this.props.patientApplys[0].totalCount
                                  //     : this.props.patientApplys.length
                                  // }
                                  ></GridComponent>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </TabStripTab>
                    <TabStripTab title="Apply Patient Payments Assignment" selected={"true"}>
                      <div style={{ display: "flex", flexFlow: "row", marginBottom: "2px", height: "20px" }}>
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
                              this.setState({ Show_HideChargeDialogVisible: true });
                            }}
                          >
                            Edit Grid
                          </ButtonComponent>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          width: "100%",
                        }}
                      >
                        <fieldset
                          className="fieldsetStyle"
                          style={{
                            width: "100%",
                            marginTop: "5px",
                            marginBottom: "5px",
                            // height: "85px",
                            marginLeft: "10px",
                            width:window.innerWidth- (!this.props.UiExpand?140:320)
                          }}
                        >
                          <legend
                            className="legendStyle"
                            style={{ paddingRight: "5px", paddingLeft: "5px" }}
                          >
                            Assignement Payment
                          </legend>
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
                                id="collapseOne9"
                                className="collapse show"
                                aria-labelledby="headingOne"
                                data-parent="#accordionExample"
                              >
                                <GridComponent
                                  id="patientDetailsPayment"
                                  columns={this.state.insuranceAssignmentColumns}
                                  skip={0}
                                  take={21}
                                  onSelectionChange={this.onInsuranceDetailsGridSelectionChange}
                                  onRowDoubleClick={this.onInsuranceDetailsGridDoubleSelectionChange}
                                  // getSelectedItems={this.getSelectedClaims}
                                  // selectionMode="multiple"
                                  DATA_ITEM_KEY="chargeSID"
                                  idGetter={idGetterInsuranceDetailsPaymentID}
                                  data={this.props.paymentAssignments}
                                  totalCount={
                                    this.props.paymentAssignments != null && this.props.paymentAssignments.length > 0
                                      ? this.props.paymentAssignments[0].totalCount
                                      : this.props.paymentAssignments.length
                                  }
                                  height="500px"
                                  width="100%"
                                  //hasCheckBox={true}
                                  sortColumns={[]}
                                  onSortChange={this.onSortChange}
                                  pageChange={this.pageChange}
                                ></GridComponent>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </TabStripTab>

                  </TabStrip>
                </div>
              </div>
            </PanelBarItem>
          </PanelBar>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientPayments);
