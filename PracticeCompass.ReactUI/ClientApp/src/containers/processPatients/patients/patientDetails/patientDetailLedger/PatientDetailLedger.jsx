import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FilterableGridComponent from "components/FilterableGrid";
import { columns } from "./patientDetailLedgerData";
import { getter } from "@progress/kendo-react-common";
import { GetPatientLedger } from "../../../../../redux/actions/patientDetails";
import ButtonComponent from "../../../../../components/Button";
import Show_HideDialogComponent from "../../../../common/show_hideDialog";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  GetGridColumns,
  SaveGridColumns,
} from "../../../../../redux/actions/GridColumns";
import ClaimDetail from "../../../../processClaims/unSubmitted/ClaimDetail/ClaimDetail";
import ChargeDetail from "../../../../processClaims/unSubmitted/ChargeDetail/ChargeDetail";
import { exportExcelFile } from "../../../../common/export";
import moment from 'moment';
function mapStateToProps(state) {
  return { UiExpand: state.ui.UiExpand };
}

function mapDispatchToProps(dispatch) {
  return {
    GetPatientLedger: (personID) => dispatch(GetPatientLedger(personID)),
    GetGridColumns: (name) => dispatch(GetGridColumns(name)),
    SaveGridColumns: (name, columns) =>
      dispatch(SaveGridColumns(name, columns)),
  };
}
const DATA_ITEM_KEY_PatientLedger = "gridID";
const idGetterPaientLedger = getter(DATA_ITEM_KEY_PatientLedger);
class PatientDetailLedger extends Component {
  state = {
    selected: 0,
    skip: 0,
    take: 23,
    patientDetailsLedger: null,
    patientId: 0,
    Show_HideDialogVisible: false,
    ledgerColumns: columns,
    refreshGrid: true,
    Show_ClaimDetailsDialog: false,
    Show_ChargeDetailsDialog: false,
    gridWidth: null,
    claimDetails: {},
    chargeDetails: {},
  };
  constructor() {
    super();
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  async componentDidMount() {
    await this.getGridColumns();
    if (
      this.props.patientDetails != null &&
      this.state.patientId != this.props.patientDetails.patientID
    ) {
      let patientLedger = await this.props.GetPatientLedger(
        this.props.patientDetails.personID
      );
      if (patientLedger == null) return;

      await this.setState({
        patientId: this.props.patientDetails.patientID,
        patientDetailsLedger: patientLedger,
      });
    }
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
    this.setState({
      gridWidth: window.innerWidth - (!this.props.UiExpand ? 120 : 310),
    });
  }
  componentDidUpdate = (event) => {
    if (event.UiExpand != this.props.UiExpand) {
      this.updateDimensions();
    }
  };
  handleSelect = (e) => {
    this.setState({ selected: e.selected });
  };
  onSortChange = () => { };
  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns("patientLedger");
    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns) ?? columns;
      this.setState({ ledgerColumns: currentColumns });
    }
    this.setState({ refreshGrid: true });
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
      //localStorage.setItem("patientGrid", JSON.stringify(columns));
      let GridColumns = await this.props.SaveGridColumns(
        "patientLedger",
        JSON.stringify(columns)
      );
      this.setState({
        ledgerColumns: JSON.parse(GridColumns?.columns),
        Show_HideDialogVisible: false,
      });
      this.setState({ Show_HideDialogVisible: false });
      setTimeout(() => {
        this.setState({ refreshGrid: true });
      }, 10);
    }
  };
  onRowRender(trElement, props) {
    const activity = props.dataItem.activityType;
    const white = {
      backgroundColor: "rgb(255, 255, 255)",
    };
    const yellow = {
        backgroundColor: "rgb(252, 252, 207)",
    };
    const green = {
        backgroundColor: "rgb(144,238,144)",
    };
    // const orange= {
    //   backgroundColor: "rgb(255, 191, 128)",
    // }
    // const red = {
    //   backgroundColor: "rgb(243, 23, 0, 0.32)",
    // };
    let trProps = {
      style: white,
    };
    switch (activity) {
      case "Charge Details":
        trProps = { style: yellow };
        break;
      case "Claim":
        trProps = { style: white };
        break;
      case "Txn":
        trProps = { style: green };
        break;
      default:
        trProps = { style: white };
        break;
    }

    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  }
  onPatientLedgerGridSelectionChange = (event) => {
    if (event.dataItem.activityTypeStr === "Claim") {
      const selectedClaim = {
        claimSID: event.dataItem.claimSID,
        practiceID: 0,
      };
      this.setState({ claimDetails: selectedClaim });
      this.setState({ Show_ClaimDetailsDialog: true });

      //console.log(event.dataItem.claimSID);
    } else if (event.dataItem.activityTypeStr === "Charge Details") {
      const selectedCharge = {
        chargeSID: event.dataItem.chargeSID,
        practiceID: 0,
      };
      this.setState({ chargeDetails: selectedCharge });
      this.setState({ Show_ChargeDetailsDialog: true });
      //console.log(event.dataItem.chargeSID);
    }
    // this.props.setPatientDetails(
    //   event.dataItems == null || event.dataItems.length == 0
    //     ? event.dataItem
    //     : event.dataItems[event.endRowIndex]
    // );
  };
  onPatientLedgerGridDoubleSelectionChange = (event) => {
    if (event.dataItem.activityTypeStr === "Claim") {
      const selectedClaim = {
        claimSID: event.dataItem.claimSID,
        practiceID: 0,
      };
      this.setState({ claimDetails: selectedClaim });
      this.setState({ Show_ClaimDetailsDialog: true });
      //console.log(event.dataItem.claimSID);
    } else if (event.dataItem.activityTypeStr === "Charge Details") {
      const selectedCharge = {
        chargeSID: event.dataItem.chargeSID,
        practiceID: 0,
      };
      this.setState({ chargeDetails: selectedCharge });
      this.setState({ Show_ChargeDetailsDialog: true });
      //console.log(event.dataItem.chargeSID);
    }
    // this.props.setPatientDetails(
    //   event.dataItems == null || event.dataItems.length == 0
    //     ? event.dataItem
    //     : event.dataItems[event.endRowIndex]
    // );
    // this.props.setPatientDetailExpanded();
  };
  setExporter = (exporter) => {
    this.setState({ _export: exporter });
  }
  render() {
    return (
      <Fragment>
        <div
          className="accordion"
          id="accordionExample"
          style={{ width: this.state.gridWidth }}
        >
          <div className="card bg-light mb-3">
            <div
              id="patientLedger"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              {this.state.patientDetailsLedger && this.state.refreshGrid && (
                <div className="card-body">
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
                        exportExcelFile(this.state._export, this.state.patientDetailsLedger, this.state.ledgerColumns);
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
                  <FilterableGridComponent
                    id="ledgerGrid"
                    columns={this.state.ledgerColumns}
                    data={this.state.patientDetailsLedger}
                    skip={0}
                    take={this.state.take}
                    height={window.innerHeight - 220}
                    width="100%"
                    activeRowRender={true}
                    onRowRender={this.onRowRender}
                    onSelectionChange={this.onPatientLedgerGridSelectionChange}
                    onRowDoubleClick={
                      this.onPatientLedgerGridDoubleSelectionChange
                    }
                    selectionMode="single"
                    DATA_ITEM_KEY="gridID"
                    idGetter={idGetterPaientLedger}
                    sortColumns={[]}
                    onSortChange={this.onSortChange}
                    setExporter={this.setExporter}
                    fileName={"Ledger " + moment().format('DD/MM/YYYY, h:mm:ss a') + ".xlsx"}
                  // pageChange={this.pageChange}
                  ></FilterableGridComponent>
                </div>
              )}
              {this.state.Show_HideDialogVisible && (
                <Show_HideDialogComponent
                  columns={this.state.ledgerColumns}
                  toggleShowColumnsDialog={this.toggleShowColumnsDialog}
                  SaveColumnsShow={this.SaveColumnsShow}
                ></Show_HideDialogComponent>
              )}
              {this.state.Show_ClaimDetailsDialog && (
                <Dialog
                  title={"Claim Details"}
                  onClose={() => {
                    this.setState({ Show_ClaimDetailsDialog: false });
                  }}
                  width={window.innerWidth - 235}
                  height={window.innerHeight - 80}
                >
                  <ClaimDetail
                    claimDetails={this.state.claimDetails}
                  ></ClaimDetail>
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
                            this.setState({ Show_ClaimDetailsDialog: false });
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
              {this.state.Show_ChargeDetailsDialog && (
                <Dialog
                  title={"Charge Details"}
                  onClose={() => {
                    this.setState({ Show_ChargeDetailsDialog: false });
                  }}
                  width={window.innerWidth - 235}
                  height={window.innerHeight - 80}
                >
                  <ChargeDetail
                    ChargeDetails={this.state.chargeDetails}
                  ></ChargeDetail>
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
                            this.setState({ Show_ChargeDetailsDialog: false });
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
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetailLedger);
