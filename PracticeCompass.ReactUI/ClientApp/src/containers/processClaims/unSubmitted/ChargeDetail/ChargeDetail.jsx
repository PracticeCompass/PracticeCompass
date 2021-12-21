import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import ButtonComponent from "../../../../components/Button";
import GridComponent from "../../../../components/Grid";
import { columns } from "./ChargeDetailData";
import Details from "./Details/Details";
import AddedCodes from "./AddedCodes/AddedCodes";
import Show_HideDialogComponent from "../../../common/show_hideDialog";
import NotificationComponent from "../../../common/notification";
import { getter } from "@progress/kendo-react-common";
import { GetCharageActivity } from "../../../../redux/actions/chargeDetail";
import {exportExcelFile} from "../../../common/export";
import moment from 'moment';
import {
  GetGridColumns,
  SaveGridColumns
} from "../../../../redux/actions/GridColumns";
const DATA_ITEM_KEY_CHARGES_Activity = "gridID";
const idGetterChargesActivity = getter(DATA_ITEM_KEY_CHARGES_Activity);
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    GetCharageActivity: chargeSID => dispatch(GetCharageActivity(chargeSID)),
    GetGridColumns: name => dispatch(GetGridColumns(name)),
    SaveGridColumns: (name, columns) => dispatch(SaveGridColumns(name, columns))
  };
}

class ChargeDetail extends Component {
  state = {
    selected: 0,
    refreshGrid: true,
    success: false,
    none: false,
    error: false,
    warning: false,
    info: false,
    timer: 5000,
    chargeID: 0,
    chargeActivity: null,
    chargeListColumns: columns
  };
  async componentDidMount() {
    if (
      this.props.ChargeDetails != null &&
      this.props.ChargeDetails.chargeSID != undefined &&
      this.state.chargeID != this.props.ChargeDetails.chargeSID
    ) {
      let chargeActivityData = await this.props.GetCharageActivity(
        this.props.ChargeDetails.chargeSID
      );
      await this.setState({
        // patientId: claimDetails.patientID,
        chargeActivity: chargeActivityData,
        chargeID: this.props.ChargeDetails.chargeSID
      });
    }
    this.getGridColumns();
  }
  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns("chargeDetailsId");
    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns) ?? columns;
      this.setState({ chargeListColumns: currentColumns });
    }
    this.setState({ refreshGrid: true });
  };
  handleSelect = e => {
    this.setState({ selected: e.selected });
  };
  toggleShowColumnsDialog = () => {
    this.setState({ Show_HideDialogVisible: false });
  };
  onSortChange = () => { };
  SaveColumnsShow = async columns => {
    if (!columns.find(x => x.hide != true)) {
      this.setState({ Show_HideDialogVisible: false });
      this.setState({ warning: true, message: "Cann't hide all columns" });
      setTimeout(() => {
        this.setState({
          warning: false
        });
      }, this.state.timer);
      return;
    } else {
      this.setState({ refreshGrid: false });
      //localStorage.setItem("chargeDetailsId", JSON.stringify(columns));
      let GridColumns = await this.props.SaveGridColumns(
        "chargeDetailsId",
        JSON.stringify(columns)
      );
      this.setState({
        chargeListColumns: JSON.parse(GridColumns?.columns),
        Show_HideDialogVisible: false
      });
      setTimeout(() => {
        this.setState({ refreshGrid: true });
      }, 10);
    }
  };
  onChargeActivitySelection = () => { };
  closeNotification = () => {
    this.setState({
      success: false,
      error: false,
      warning: false,
      info: false,
      none: false
    });
  };
  setExporter = (exporter) => {
    this.setState({ _export: exporter });
}
  render() {
    return (
      <Fragment>
        <div
          style={{
            paddingTop: "5px",
            overflow: "hidden",
            marginTop: "10px",
            marginBottom: "5px",
            paddingBottom: "5px"
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
          />
          {this.state.Show_HideDialogVisible && (
            <Show_HideDialogComponent
              columns={this.state.chargeListColumns}
              toggleShowColumnsDialog={this.toggleShowColumnsDialog}
              SaveColumnsShow={this.SaveColumnsShow}
            />
          )}
          <TabStrip
            className="userManagmentTabStrip"
            selected={this.state.selected}
            onSelect={this.handleSelect}
          >
            <TabStripTab title="Details" selected="true">
              <Details ChargeDetails={this.props.ChargeDetails} />
            </TabStripTab>
            <TabStripTab title="Added Codes">
              <AddedCodes ChargeDetails={this.props.ChargeDetails} />
            </TabStripTab>
            {/* <TabStripTab title="Charge Notes">
              <ClaimDetailSubmissionHistory></ClaimDetailSubmissionHistory>
            </TabStripTab> */}
          </TabStrip>
        </div>
        <div
          style={{
            float: "left",
            marginLeft: "10px",
            right: "0"
          }}
        >
          <ButtonComponent
            look="outline"
            icon="edit"
            classButton="infraBtn-primary"
            style={{ marginTop: "0px", marginLeft: "5px" }}
          >
            Save
          </ButtonComponent>
        </div>
        <div
          style={{
            float: "right",
            position: "absolute",
            marginRight: "10px",
            right: "0"
          }}
        >
          <ButtonComponent
            type="add"
            icon="export"
            classButton="infraBtn-primary"
            onClick={() => {
              exportExcelFile(this.state._export, this.state.chargeActivity, this.state.chargeListColumns);
            }}
          >
            Export to Excel
          </ButtonComponent>
          <ButtonComponent
            type="add"
            style={{ marginLeft: "11px" }}
            classButton="infraBtn-primary action-button"
            onClick={() => {
              this.setState({ Show_HideDialogVisible: true });
            }}
          >
            Edit Grid
          </ButtonComponent>
        </div>
        <div
          className="accordion"
          id="accordionSummary"
          style={{ marginBottom: "35px", marginTop: "35px" }}
        >
          <div
            className="card bg-light mb-3"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "5px"
            }}
          >
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionSummary"
            >
              {this.state.refreshGrid && (
                <GridComponent
                  id="chargeDetailsId"
                  columns={this.state.chargeListColumns}
                  skip={0}
                  take={15}
                  onSelectionChange={this.onChargeActivitySelection}
                  onRowDoubleClick={this.onChargeActivitySelection}
                  selectionMode="single"
                  DATA_ITEM_KEY={DATA_ITEM_KEY_CHARGES_Activity}
                  idGetter={idGetterChargesActivity}
                  data={this.state.chargeActivity}
                  height="350px"
                  width="100%"
                  sortColumns={[]}
                  onSortChange={this.onSortChange}
                  setExporter={this.setExporter}
                  fileName={"Charge Detail " + moment().format('DD/MM/YYYY, h:mm:ss a') + ".xlsx"}
                />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChargeDetail);
