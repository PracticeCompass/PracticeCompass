import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {
  insuranceColumns,
  methodList,
  creditCared,
  insurancePatientColumns,
  PracticeColumns,
  insuranceAssignmentColumns,
  DOSFilter,
  AmountFilter,
  applyPlanPaymentColumns,
  guarantorColumns
} from "./insurancePaymentsData";
import {
  getguarantorList,
  resetGuarantorList
} from "../../../redux/actions/claimList";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../components/Button";
import GridComponent from "../../../components/Grid";
import EditableGrid from "../../../components/editableGrid"
import DropDown from "../../../components/DropDown";
import TextBox from "../../../components/TextBox";
import DatePickerComponent from "../../../components/DatePicker";
import CheckboxComponent from "../../../components/Checkbox"
import config from "../../../config";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import { SaveLookups } from "../../../redux/actions/lookups";
import NotificationComponent from "../../common/notification";
import { GetGridColumns, SaveGridColumns } from "../../../redux/actions/GridColumns"
import {
  resetInsuranceList,
  getinsuranceList,
  getPracticeList,
  resetPracticeList,
} from "../../../redux/actions/patient";
import {
  getInsurancePayments,
  GetPaymentDetails,
  getPaymentAssignments,
  savePayment,
  getApplyInsurancePayment,
  ApplyPayments
} from "../../../redux/actions/payments";
import Show_HideDialogComponent from "../../common/show_hideDialog";
import $ from "jquery";

const DATA_ITEM_KEY_INSURANCE = "entitySID";
const idGetterInsurance = getter(DATA_ITEM_KEY_INSURANCE);
const DATA_ITEM_KEY_PRACTICE = "practiceID";
const idGetterPracticeID = getter(DATA_ITEM_KEY_PRACTICE);
const DATA_ITEM_KEY_INSURANCE_PAYMENT = "paymentSID";
const idGetterInsurancePaymentID = getter(DATA_ITEM_KEY_INSURANCE_PAYMENT);

const DATA_ITEM_KEY_INSURANCE_Details_PAYMENT = "chargeSID";
const idGetterInsuranceDetailsPaymentID = getter(DATA_ITEM_KEY_INSURANCE_Details_PAYMENT);

const DATA_ITEM_KEY_Apply_PLAN_PAYMENT = "id";
const idGetterApplyPlanPaymentID = getter(DATA_ITEM_KEY_Apply_PLAN_PAYMENT);

function mapStateToProps(state) {
  return {
    insuranceList: state.patients.insuranceList,
    dropDownInsurance: state.lookups.insurances,
    guarantorList: state.claimList.guarantorList,
    dropDownGuarantors: state.lookups.guarantors,
    dropDownPractices: state.lookups.practices,
    practiceList: state.patients.paractices,
    paymentClass: state.payments.paymentClass,
    insurancePayments: state.payments.insurancePayemnts,
    paymentAssignments: state.payments.paymentAssignments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getPatientList: (name) => dispatch(getpatientList(name)),
    getguarantorList: (name, refreshData, skip) =>
      dispatch(getguarantorList(name, refreshData, skip)),
    resetGuarantorList: () => dispatch(resetGuarantorList()),
    getinsuranceList: (name, refreshData,
      skip) => dispatch(getinsuranceList(name, refreshData,
        skip)),
    resetInsuranceList: () => dispatch(resetInsuranceList()),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    getPracticeList: (name) => dispatch(getPracticeList(name)),
    resetPracticeList: () => dispatch(resetPracticeList()),
    getInsurancePayments: (PracticeID, PatientID, DateType, Datevalue, Fullyapplied, amountType,
      amountFilter) => dispatch(getInsurancePayments(PracticeID, PatientID, DateType, Datevalue, Fullyapplied, amountType,
        amountFilter)),
    GetPaymentDetails: (PaymentSID) => dispatch(GetPaymentDetails(PaymentSID)),
    getPaymentAssignments: (PaymentSID) => dispatch(getPaymentAssignments(PaymentSID)),
    savePayment: (PaymentSID, PracticeID, PostDate, Source, PayorID, Class, Amount, Method, CreditCard, AuthorizationCode, Voucher, CreateMethod, CurrentUser) =>
      dispatch(savePayment(PaymentSID, PracticeID, PostDate, Source, PayorID, Class, Amount, Method, CreditCard, AuthorizationCode, Voucher, CreateMethod, CurrentUser)),
    getApplyInsurancePayment: (GuarantorID, DOSType, DOSvalue, InsuranceID, ClaimIcnNumber) => dispatch(getApplyInsurancePayment(GuarantorID, DOSType, DOSvalue, InsuranceID, ClaimIcnNumber)),
    ApplyPayments: (list) => dispatch(ApplyPayments(list)),
    SaveGridColumns: (name, columns) =>
      dispatch(SaveGridColumns(name, columns)),
    GetGridColumns: (name) => dispatch(GetGridColumns(name)),

  };
}

class insurancePayments extends Component {
  state = {
    insurancePaymentExpanded: true,
    insurancePaymentDetailsExpanded: false,
    applyInsurancePaymentExpanded: false,
    selected: 0,
    tabSelected: 0,
    method: null,
    creditCard: null,
    methodSelected: 0,
    methodTabSelected: 0,
    payment_calss: null,
    insuranceVisible: false,
    insuranceSearchText: null,
    insuranceSelectedState: null,
    insuranceIDSelectedState: null,
    insuranceNameSelected: null,
    insuranceID: null,
    timer: 5000,
    dostype: null,
    dos: null,
    insurancePhysicianID: null,
    insuranceType: null,
    practiceVisiblePatient: false,
    practiceVisibleSubPatient: false,
    practiceVisibleInsurance: false,
    practiceVisibleSubInsurance: false,
    guarantorVisible: false,
    patientPracticeID: null,
    insurancePracticeID: null,
    subPatientPracticeID: null,
    subInsurancePracticeID: null,
    practiceSearchText: null,
    fullyApplied: false,
    guarantorSearchText: null,
    applyPlanPayments: [],
    amountType: null,
    amountFilter: null,
    insuranceColumns: insuranceColumns,
    insuranceAssignmentColumns: insuranceAssignmentColumns,
    applyPlanPaymentColumns:applyPlanPaymentColumns
  };
  componentDidMount = () => {
    this.getGridColumns();
  }
  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns('insurancePayment');
    let patientDetailsPayment = await this.props.GetGridColumns('planDetailsPayment');
    let applyedPlan = await this.props.GetGridColumns('applyedPlan');

    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns) ?? insuranceColumns;
      this.setState({ insuranceColumns: currentColumns });
    }
    if (patientDetailsPayment != null && patientDetailsPayment != "") {
      patientDetailsPayment = JSON.parse(patientDetailsPayment?.columns) ?? insuranceAssignmentColumns;
      this.setState({ insuranceAssignmentColumns: patientDetailsPayment });
    }
    if(applyedPlan !=null && applyedPlan !=""){
      applyedPlan = JSON.parse(applyedPlan?.columns) ?? applyPlanPaymentColumns;
      this.setState({ applyPlanPaymentColumns: applyedPlan });
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
  handleMethodTabSelect = (e) => {
    this.setState({
      methodTabSelected: e.selected,
      methodSelected: e.selected,
    });
  };
  async getInsuranceFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=paymentInsurance&DisplayName=${filter}`;
  }
  getParacticesUrl(filter) {
    return `${config.baseUrl}/patient/PracticesGet?sortname=${filter}`;
  }
  // patientsearch = () => {
  //     this.props.getPatientList(this.state.patientSearchText);
  // };
  toggleInsuranceDialog = (isDetails = false) => {
    if (this.state.insuranceVisible || this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceSearchText: null,
      });
      this.props.resetInsuranceList();
    }
    if (this.state.insuranceVisible || this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceVisible: false,
        insuranceDetailsVisible: false
      });
    } else {
      if (isDetails) {
        this.setState({
          insuranceDetailsVisible: !this.state.insuranceDetailsVisible
        });
      } else {
        this.setState({
          insuranceVisible: !this.state.insuranceVisible
        });
      }

    }
  };
  onInsuranceDoubleClick = async (event) => {
    if (this.state.insuranceVisible) {
      await this.setState({
        insuranceSelectedState: event.dataItem.sortName,
        insuranceIDSelectedState: event.dataItem.entitySID,
        insuranceNameSelected: event.dataItem.sortName,
        insuranceID: event.dataItem.entitySID,
      });
    } else if (this.state.insuranceDetailsVisible) {
      await this.setState({
        insuranceDetailsSelectedState: event.dataItem.sortName,
        insuranceDetailsIDSelectedState: event.dataItem.entitySID,
        insuranceDetailsNameSelected: event.dataItem.sortName,
        insuranceDetailsID: event.dataItem.entitySID,
      });
    }
    this.props.SaveLookups(event.dataItem.entitySID, "Insurance");
    //this.selectInsurance();
    this.toggleInsuranceDialog();
  };
  onInsuranceKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    if (this.state.insuranceVisible) {
      this.setState({
        insuranceSelectedState: selectedDataItems[0].sortName,
        insuranceIDSelectedState: selectedDataItems[0].entitySID,
      });
    } else if (this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceDetailsSelectedState: selectedDataItems[0].sortName,
        insuranceDetailsIDSelectedState: selectedDataItems[0].entitySID,
      });
    }
  };
  insuranceSearch = async (refreshData, skip) => {
    this.props.getinsuranceList(this.state.insuranceSearchText, refreshData,
      skip);
  };
  onInsuranceSelectionChange = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    if (this.state.insuranceVisible) {
      this.setState({
        insuranceSelectedState: selectedDataItems[0].sortName,
        insuranceIDSelectedState: selectedDataItems[0].entitySID,
      });
    } else if (this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceDetailsSelectedState: selectedDataItems[0].sortName,
        insuranceDetailsIDSelectedState: selectedDataItems[0].entitySID,
      });
    }
  };
  cancelInsuranceDialog = () => {
    if (this.state.insuranceVisible) {
      this.setState({
        insuranceSelectedState: null,
      });
    } else if (this.state.insuranceDetailsVisible) {
      this.setState({
        insuranceDetailsSelectedState: null,
      });
    }
    this.toggleInsuranceDialog();
  };
  onSortChange = () => { };
  toggleSaveInsuranceDialog = () => {
    this.setState({
      visibleInsuranceSaveFilter: false,
      editInsuranceFilter: false,
    });
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
  setInsurancePaymentDetailsExpanded = () => {
    $("#InsurancePaymentDetails").children("span").trigger("click");
  };
  setApplyInsurancePaymentExpanded = () => {
    $("#ApplyInsurancePayment").children("span").trigger("click");
  };
  practiceSearch = () => {
    this.props.getPracticeList(this.state.practiceSearchText);
  };
  insurancePaymentGridSearch = async () => {
    this.props.getInsurancePayments(this.state.insurancePracticeID ? this.state.insurancePracticeID.entityId : null, this.state.insuranceID,
      this.state.txnDatetype ? this.state.txnDatetype.id : 0, this.state.txnDate ? this.state.txnDate.toLocaleDateString() : null, this.state.fullyApplied ?? false, this.state.amountType, this.state.amountFilter);
  }
  onInsurancePaymentGridSelectionChange = (event) => {
    let InsurancePaymentDetails = event.dataItems == null || event.dataItems.length == 0
      ? event.dataItem
      : event.dataItems[event.endRowIndex]
    if (InsurancePaymentDetails.remaining == null) {
      InsurancePaymentDetails.remaining = InsurancePaymentDetails.amount
    }
    this.setState({
      InsurancePaymentDetails
    });
  };
  onInsurancePaymentGridDoubleSelectionChange = async (event) => {
    let InsurancePaymentDetails = event.dataItems == null || event.dataItems.length == 0
      ? event.dataItem
      : event.dataItems[event.endRowIndex];
    InsurancePaymentDetails = await this.EditInsurance(InsurancePaymentDetails);
  };
  onInsuranceDetailsGridSelectionChange = (event) => {
    //this.setApplyInsurancePaymentExpanded();
  }
  onInsuranceDetailsGridDoubleSelectionChange = (event) => {
    // this.setApplyInsurancePaymentExpanded();
  }
  async EditInsurance(InsurancePaymentDetails) {

    if (InsurancePaymentDetails == null) {
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
    let remaining = InsurancePaymentDetails?.remaining;
    this.props.getPaymentAssignments(InsurancePaymentDetails.paymentSID);
    InsurancePaymentDetails = await this.props.GetPaymentDetails(InsurancePaymentDetails.paymentSID);
    if (InsurancePaymentDetails) {
      InsurancePaymentDetails.remaining = remaining;
      if (InsurancePaymentDetails.remaining == null) {
        InsurancePaymentDetails.remaining = InsurancePaymentDetails.amount
      }
      if (InsurancePaymentDetails.practiceID != null && (this.props.dropDownPractices == null ||
        this.props.dropDownPractices.filter(
          (x) => x.entityId == InsurancePaymentDetails.practiceID
        ).length == 0)) {
        await this.props.SaveLookups(
          InsurancePaymentDetails?.practiceID,
          "Practice"
        );
      }
      if (InsurancePaymentDetails.payorID != null && (this.props.dropDownInsurance == null ||
        this.props.dropDownInsurance.filter(
          (x) => x.entityId == InsurancePaymentDetails.payorID
        ).length == 0)) {
        this.props.SaveLookups(InsurancePaymentDetails?.payorID, "Insurance");
      }

      this.setState({
        InsurancePaymentDetails,
        paymentSID: InsurancePaymentDetails.paymentSID,
        subInsurancePracticeID: {
          entityName: InsurancePaymentDetails?.practiceName,
          entityId: InsurancePaymentDetails?.practiceID,
        },
        insuranceDetailsID: InsurancePaymentDetails?.payorID,
        insuranceDetailsNameSelected: InsurancePaymentDetails?.payorName,
        payment_calss: {
          description: InsurancePaymentDetails?.paymentClass,
          lookupCode: InsurancePaymentDetails?.paymentClasscode
        },
        amountDetails: InsurancePaymentDetails?.amount,
        remainingDetails: InsurancePaymentDetails?.remaining,
        txnDataDetails: InsurancePaymentDetails ? new Date(InsurancePaymentDetails?.postDate) : null,
        methodDetails: {
          label: InsurancePaymentDetails?.payMethod,
          value: InsurancePaymentDetails?.paymentmethodcode
        },
        voucherdetails: InsurancePaymentDetails?.voucher,
        authorizationCode: InsurancePaymentDetails?.authorizationCode,
        creditCardDetails: {
          code: InsurancePaymentDetails?.creditCard,
          value: InsurancePaymentDetails?.creditCardname
        }
      });
    } else {
      this.resetInsuranceDetails();
    }
    this.setInsurancePaymentDetailsExpanded();
    return InsurancePaymentDetails;
  }

  resetInsuranceDetails() {
    this.setState({
      InsurancePaymentDetails: null,
      paymentSID: null,
      subInsurancePracticeID: null,
      insuranceDetailsID: null,
      insuranceDetailsNameSelected: null,
      payment_calss: null,
      amountDetails: null,
      txnDataDetails: null,
      methodDetails: null,
      voucherdetails: null,
      authorizationCode: null,
      creditCardDetails: null

    });
  }
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
  saveInsurancePaymentDetails = async () => {
    let resp = await this.props.savePayment(this.state.paymentSID ?? 0, this.state.subInsurancePracticeID?.entityId, this.state.txnDataDetails ? new Date(this.state.txnDataDetails).toLocaleDateString() : null,
      "I", this.state.insuranceDetailsID, this.state.payment_calss?.lookupCode, this.state.amountDetails, this.state.methodDetails?.value,
      this.state.creditCardDetails?.code, this.state.authorizationCode, this.state.voucherdetails, "M", 1)
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
  findClaim = async () => {
    //(GuarantorID,DOSType,DOSvalue,InsuranceID,ClaimIcnNumber)
    let applyData = await this.props.getApplyInsurancePayment(this.state.patientApplyGuarantorID, this.state.txnApplyDatetype, this.state.txnApplyDate ? new Date(this.state.txnApplyDate) : null, this.state.insuranceApplyID, this.state.billNumber);
    this.setState({
      applyPlanPayments: applyData,
      applyPlanPaymentsbackup: [...applyData]
    });
  }
  ApplyInsurancePayment = async () => {
    if (this.state.InsurancePaymentDetails == null) {
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

    this.props.getPaymentAssignments(this.state.InsurancePaymentDetails.paymentSID);
    //let applyData= await this.props.getApplyPatientPayments(3260);

    this.setApplyInsurancePaymentExpanded();
  }

  applyItemChanged = (event) => {
    if (this.state.InsurancePaymentDetails == null || this.state.applyPlanPayments == null) return;

    const field = event.field || '';
    const inEditID = event.dataItem["chargeSID"];
    let rowIndex = this.state.applyPlanPayments.findIndex(item => item["chargeSID"] === inEditID);
    let backUpData = { ...this.state.applyPlanPaymentsbackup[rowIndex] };
    let data = this.state.applyPlanPayments.map(item => item["chargeSID"] === inEditID ? {
      ...item,
      [field]: event.value,
      isEdit: true
    } : item);

    let disableApply = false;
    if (field == "insurancePaid" || field == "adjustments") {

      let amount = Number(data[rowIndex]["amount"].replace("$", ""));
      let chargeBalance = Number(data[rowIndex]["chargeBalance"].replace("$", ""));

      chargeBalance = amount - (data[rowIndex]["adjustments"] + data[rowIndex]["insurancePaid"]);
      let remaining = this.state.InsurancePaymentDetails.remaining;
      if (field == "insurancePaid") {
        remaining = remaining - (data[rowIndex]["insurancePaid"] - backUpData["insurancePaid"]);
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
      this.state.InsurancePaymentDetails.remaining = remaining;
    }
    this.setState({
      applyPlanPayments: data, disableApply
    });
  }
  filterApplyListChanged = async () => {
    if (this.state.applyPlanPayments != null && this.state.InsurancePaymentDetails != null) {
      let list = this.state.applyPlanPayments.filter(item => item.isEdit == true);

      this.setState({ filterApplyPlanPayments: list || [] });
    }
  }
  ApplyListChanged = async () => {
    if (this.state.applyPlanPayments != null && this.state.InsurancePaymentDetails != null) {
      let list = this.state.applyPlanPayments.map(item => item.isEdit == true ? {
        chargeSID: item.chargeSID,
        paymentSID: this.state.InsurancePaymentDetails.paymentSID,
        payorID: item.claimSID,
        amountPaid: item.insurancePaid,
        adjustment: item.adjustments,
        PaymentType: "I"
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
    this.setState({ Show_HidePlanDialogVisible: false, Show_HideChargeDialogVisible: false, Show_HideApplyDialogVisible: false });
  };
  SaveColumnsShow = async (columns) => {
    if (!columns.find((x) => x.hide != true)) {
      this.setState({ Show_HidePlanDialogVisible: false });
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
        "insurancePayment",
        JSON.stringify(columns)
      );
      this.setState({
        insuranceColumns: JSON.parse(GridColumns?.columns),
        Show_HidePlanDialogVisible: false,
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
        "planDetailsPayment",
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
        "applyedPlan",
        JSON.stringify(columns)
      );
      this.setState({
        applyPlanPaymentColumns: JSON.parse(GridColumns?.columns),
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
          {this.state.Show_HidePlanDialogVisible && (
            <Show_HideDialogComponent
              columns={this.state.insuranceColumns}
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
              columns={this.state.applyPlanPaymentColumns}
              toggleShowColumnsDialog={this.toggleShowColumnsDialog}
              SaveColumnsShow={this.SaveApplyColumnsShow}
            ></Show_HideDialogComponent>
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
          {(this.state.insuranceVisible ||
            this.state.insuranceDetailsVisible) && (
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
                columns={insurancePatientColumns}
                onSelectionChange={this.onInsuranceSelectionChange}
                onRowDoubleClick={this.onInsuranceDoubleClick}
                onKeyDown={this.onInsuranceKeyDown}
                idGetterLookup={idGetterInsurance}
                toggleDialog={this.cancelInsuranceDialog}
                cancelDialog={this.cancelInsuranceDialog}
                getNextData={true}
              ></FindDialogComponent>
            )}
          <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
            <PanelBarItem
              id="InsurancePaymentSearch"
              expanded={this.state.insurancePaymentExpanded}
              title="Plan Payment"
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  width: "100%",
                  marginTop: "10px",
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
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <label className="userInfoLabel">Plan Company</label>
                </div>
                <div
                  className="insuranceStyle"
                  style={{
                    float: "left",
                    width: "314px",
                    marginLeft: "3px",
                  }}
                >
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
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    look="outline"
                    icon="search"
                    type="search"
                    classButton="infraBtn-primary find-button"
                    onClick={() => this.toggleInsuranceDialog(false)}
                    style={{ marginTop: "0px" }}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>

              <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                <div style={{ width: "57px", marginLeft: "36px" }}>
                  <label className="userInfoLabel">Txn Date </label>
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

                <div style={{ width: "57px", marginLeft: "10px" }}>
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
              <div
                style={{ display: "flex", flexFlow: "row", marginLeft: "15px" }}
              >
                <div style={{ float: "left" }}>
                  <ButtonComponent
                    icon="search"
                    type="search"
                    classButton="infraBtn-primary action-button"
                    onClick={this.insurancePaymentGridSearch}
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
                    onClick={this.ApplyInsurancePayment}
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
                      this.EditInsurance(this.state.InsurancePaymentDetails);
                      //this.setInsurancePaymentDetailsExpanded();
                    }
                    }
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
                      this.setState({ Show_HidePlanDialogVisible: true });
                    }}
                  >
                    Edit Grid
                  </ButtonComponent>
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
                        columns={this.state.insuranceColumns}
                        skip={0}
                        take={21}
                        onSelectionChange={this.onInsurancePaymentGridSelectionChange}
                        onRowDoubleClick={this.onInsurancePaymentGridDoubleSelectionChange}
                        // getSelectedItems={this.getSelectedClaims}
                        // selectionMode="multiple"
                        DATA_ITEM_KEY="paymentSID"
                        idGetter={idGetterInsurancePaymentID}
                        data={this.props.insurancePayments}
                        totalCount={
                          this.props.insurancePayments != null && this.props.insurancePayments.length > 0
                            ? this.props.insurancePayments[0].totalCount
                            : this.props.insurancePayments.length
                        }
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
              id="InsurancePaymentDetails"
              expanded={this.state.insurancePaymentDetailsExpanded}
              title="Plan Payment Details"
            >
              <div
                style={{
                  marginTop: "5px",

                  width: "100%",
                }}
              >

                <div
                  style={{
                    marginTop: "5px",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ marginLeft: "42px" }}>
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
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ float: "left", marginLeft: "5px" }}>
                          <label className="userInfoLabel">Plan Company </label>
                        </div>
                        <div
                          className="insuranceStyle"
                          style={{ float: "left" }}
                        >
                          <DropDown
                            className="unifyHeight"
                            data={this.props.dropDownInsurance}
                            textField="entityName"
                            dataItemKey="entityId"
                            defaultValue={{
                              entityId: this.state.insuranceDetailsID,
                              entityName: this.state.insuranceDetailsNameSelected,
                            }}
                            value={{
                              entityId: this.state.insuranceDetailsID,
                              entityName: this.state.insuranceDetailsNameSelected,
                            }}
                            onChange={(e) =>
                              this.setState({
                                insuranceDetailsSelectedState: e.value?.entityName,
                                insuranceDetailsIDSelectedState: e.value?.entityId,
                                insuranceDetailsNameSelected: e.value?.entityName,
                                insuranceDetailsID: e.value?.entityId,
                              })
                            }
                          ></DropDown>
                        </div>
                        <div style={{ float: "left" }}>
                          <ButtonComponent
                            look="outline"
                            icon="search"
                            type="search"
                            classButton="infraBtn-primary find-button"
                            onClick={() => this.toggleInsuranceDialog(true)}
                            style={{ marginTop: "0px" }}
                          >
                            Find
                          </ButtonComponent>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row" }}>
                        <div style={{ float: "left", marginLeft: "58px" }}>
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
                        <div style={{ float: "left", marginLeft: "40px" }}>
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
                        <div style={{ float: "left", marginLeft: "40px" }}>
                          <ButtonComponent
                            classButton="infraBtn-primary action-button"
                            look="outline"
                            icon="edit"
                            type="edit"
                            onClick={() => this.saveInsurancePaymentDetails()}
                          >
                            Save
                          </ButtonComponent>
                        </div>
                      </div>
                    </div>
                    <div style={{ float: "left" }}>

                      <div style={{ display: "flex", flexFlow: "row", marginLeft: "0px" }}>
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


                </div>

                <fieldset
                  className="fieldsetStyle"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                    // height: "85px",
                    marginLeft: "10px"
                  }}
                >
                  <legend
                    className="legendStyle"
                    style={{ paddingRight: "5px", paddingLeft: "5px" }}
                  >
                    Assignement Payment
                  </legend>
                  <div style={{ display: "flex", flexFlow: "row", marginBottom: "4px", height: "20px" }}>
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
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <GridComponent
                            id="planDetailsPayment"
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
                </fieldset>

              </div>
            </PanelBarItem>
            <PanelBarItem
              id="ApplyInsurancePayment"
              expanded={this.state.applyInsurancePaymentExpanded}
              title="Apply Plan Payment"
            >
              <div
                style={{ display: "flex", flexFlow: "row", marginTop: "10px" }}
              >
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
                      <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%", marginBottom: "10px" }}>
                        <fieldset
                          className="fieldsetStyle"
                          style={{
                            width: "695px",
                            marginTop: "5px",
                            height: "66px",
                            marginLeft: "10px"
                          }}
                        >
                          {/* <legend
                            className="legendStyle"
                            style={{ paddingRight: "5px", paddingLeft: "5px" }}
                          >
                            Payment Method
                          </legend> */}
                          <div className="row nowrap rowHeight" style={{ marginTop: "10px" }}>
                            <div style={{ textAlign: "right", marginLeft: "66px" }}>
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
                            <div style={{ float: "left", marginLeft: "5px" }}>
                              <label className="userInfoLabel">Plan Company</label>
                            </div>
                            <div
                              className="insuranceStyle"
                              style={{
                                float: "left",
                                width: "314px",
                                marginLeft: "3px",
                              }}
                            >
                              <DropDown
                                className="unifyHeight"
                                data={this.props.dropDownInsurance}
                                textField="entityName"
                                dataItemKey="entityId"
                                defaultValue={{
                                  entityId: this.state.insuranceApplyID,
                                  entityName: this.state.insuranceApplyNameSelected,
                                }}
                                value={{
                                  entityId: this.state.insuranceApplyID,
                                  entityName: this.state.insuranceApplyNameSelected,
                                }}
                                onChange={(e) =>
                                  this.setState({
                                    insuranceApplySelectedState: e.value?.entityName,
                                    insuranceApplyIDSelectedState: e.value?.entityId,
                                    insuranceApplyNameSelected: e.value?.entityName,
                                    insuranceApplyID: e.value?.entityId,
                                  })
                                }
                              ></DropDown>
                            </div>
                            <div style={{ float: "left" }}>
                              <ButtonComponent
                                look="outline"
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary find-button"
                                onClick={() => this.toggleInsuranceDialog(false)}
                                style={{ marginTop: "0px" }}
                              >
                                Find
                              </ButtonComponent>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexFlow: "row", width: "100%" }}>
                            <div style={{ width: "57px", marginLeft: "36px" }}>
                              <label className="userInfoLabel">Txn Date </label>
                            </div>
                            <div style={{ width: "147px" }}>
                              <DropDown
                                data={DOSFilter}
                                textField="text"
                                dataItemKey="id"
                                className="unifyHeight"
                                id="tins"
                                name="tins"
                                value={this.state.txnApplyDatetype}
                                onChange={(e) => this.setState({ txnApplyDatetype: e.value })}
                              ></DropDown>
                            </div>
                            <div className="dateStyle" style={{ marginLeft: "5px" }}>
                              <DatePickerComponent
                                className="unifyHeight"
                                placeholder="MM/DD/YYYY"
                                format="M/dd/yyyy"
                                value={this.state.txnApplyDate}
                                onChange={(e) => this.setState({ txnApplyDate: e.value })}
                              ></DatePickerComponent>
                            </div>
                            <div>
                              <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary"
                                onClick={() => this.findClaim()}
                                style={{ marginTop: "0px" }}
                              >
                                Find Claim
                              </ButtonComponent>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
                        <div style={{ float: "left", marginLeft: "14px" }}>
                          <label className="userInfoLabel">Amount </label>
                        </div>
                        <div style={{ float: "left", width: "100px" }}>
                          <TextBox
                            type="numeric"
                            format="c2"
                            className="unifyHeight"
                            value={this.state.InsurancePaymentDetails?.amount}
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
                            value={this.state.InsurancePaymentDetails?.remaining}
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
                          width: "1559px",
                          marginTop: "5px",
                          marginBottom: "5px",
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
                        <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
                          <ButtonComponent
                            icon="edit"
                            type="edit"
                            classButton="infraBtn-primary"
                            onClick={() => { this.filterApplyListChanged() }}
                            style={{ marginTop: "10px", marginLeft: "10px" }}
                            disabled={this.state.applyPlanPayments == null || this.state.applyPlanPayments.filter(item => item.isEdit).length == 0}
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
                              >
                                <EditableGrid
                                  data={this.state.applyPlanPayments}
                                  id="applyedPatient"
                                  skip={0}
                                  take={10}
                                  height="350px"
                                  width="100%"
                                  editColumn={"chargeSID"}
                                  DATA_ITEM_KEY="chargeSID"
                                  idGetter={idGetterApplyPlanPaymentID}
                                  onSelectionChange={this.onApplyPaymentGridSelectionChange}
                                  onRowDoubleClick={this.onApplyPaymentGridDoubleSelectionChange}
                                  columns={this.state.applyPlanPaymentColumns}
                                  itemChange={this.applyItemChanged}
                                  onSortChange={this.onSortChange}
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
                          width: "1559px",
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
                        <div style={{ display: "flex", flexFlow: "row nowrap", width: "100%" }}>
                          <ButtonComponent
                            icon="edit"
                            type="edit"
                            classButton="infraBtn-primary"
                            onClick={() => { this.ApplyListChanged() }}
                            style={{ marginTop: "0px", marginLeft: "10px" }}
                            disabled={this.state.disableApply || (this.state.filterApplyPlanPayments == null || this.state.filterApplyPlanPayments.filter(item => item.isEdit).length == 0)}
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
                              >
                                <GridComponent
                                  data={this.state.filterApplyPlanPayments || []}
                                  id="applyedPlan"
                                  skip={0}
                                  take={10}
                                  height="350px"
                                  width="100%"
                                  editColumn={"chargeSID"}
                                  DATA_ITEM_KEY="chargeSID"
                                  idGetter={idGetterApplyPlanPaymentID}
                                  onSelectionChange={this.onApplyPaymentGridSelectionChange}
                                  onRowDoubleClick={this.onApplyPaymentGridDoubleSelectionChange}
                                  columns={this.state.applyPlanPaymentColumns}
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
                  <TabStripTab title="Payment Assignment">
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
                          marginLeft: "10px"
                        }}
                      >
                        <legend
                          className="legendStyle"
                          style={{ paddingRight: "5px", paddingLeft: "5px" }}
                        >
                          Assignement Payment
                        </legend>
                        <div style={{ display: "flex", flexFlow: "row", marginBottom: "8px", height: "20px" }}>
                          <div
                            style={{
                              float: "right",
                              position: "absolute",
                              marginRight: "28px",
                              right: "0"
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
                                id="planDetailsPayment"
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
                      </fieldset>
                    </div>
                  </TabStripTab>
                </TabStrip>
              </div>
            </PanelBarItem>
          </PanelBar>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(insurancePayments);
