import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import ButtonComponent from "../../../components/Button";
import { getter } from "@progress/kendo-react-common";
import TextBox from "../../../components/TextBox";
import DropDown from "../../../components/DropDown";
import GridComponent from "../../../components/Grid";
import { insuranceColumns } from "./InsurancesData"
import config from "../../../../src/config";
import SaveFilterComponent from "../../common/saveFilter";
import NotificationComponent from "../../common/notification";
import Show_HideDialogComponent from "../../common/show_hideDialog";
import {
  getFilters,
  FilterDelete,
  FilterInsert,
  FilterUpdate,
} from "../../../redux/actions/filter";
import {
  GetGridColumns,
  SaveGridColumns,
} from "../../../redux/actions/GridColumns";
import { getPlans } from "../../../redux/actions/plans";
const DATA_ITEM_KEY_PLAN = "planId";
const idGetterInsuranceList = getter(DATA_ITEM_KEY_PLAN);
function mapStateToProps(state) {
  return {
    plans: state.plans.plans,
    UiExpand: state.ui.UiExpand,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFilters: (entity) => dispatch(getFilters(entity)),
    FilterDelete: (filterId) => dispatch(FilterDelete(filterId)),
    FilterInsert: (displayName, body, entity, order, userId) =>
      dispatch(FilterInsert(displayName, body, entity, order, userId)),
    FilterUpdate: (filterId, displayName, body, entity, order, userId) =>
      dispatch(
        FilterUpdate(filterId, displayName, body, entity, order, userId)
      ),
    getPlans: (searchGrid) => dispatch(getPlans(searchGrid)),
    SaveGridColumns: (name, columns) =>
    dispatch(SaveGridColumns(name, columns)),
    GetGridColumns: (name) => dispatch(GetGridColumns(name)),
  };
}
class Insurance extends Component {
  constructor() {
    super();
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  state = {
    refreshFilter: true,
    success: false,
    none: false,
    error: false,
    warning: false,
    info: false,
    timer: 5000,
    Zip: null,
    group: null,
    name: null,
    listName: null,
    take: 28,
    insuranceColumns:insuranceColumns
  }
  onSortChange = () => {

  }
  componentDidMount=()=>{
    this.getGridColumns();
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentDidUpdate=(event)=>{
    if(event.UiExpand != this.props.UiExpand){
      this.updateDimensions();
    }
  }
  updateDimensions() {
    this.setState({
      gridWidth:   window.innerWidth - (!this.props.UiExpand ? 120 : 273)
    })
  }
  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns("Plan");
    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns) ?? insuranceColumns;
      this.setState({ insuranceColumns: currentColumns });
    }
    this.setState({ refreshGrid: true });
  };
  planGridSearch = async (refreshData = true) => {
    var plaGrid = {
      PlanID: this.state.selectedPlanId
        ? this.state.selectedPlanId
        : 0,
      ZIP: this.state.Zip ?? '',
      // skip: refreshData ? 0 : this.props.Patients.length,
      skip: 0,
      SortColumn: this.state.selectedSortColumn
        ? this.state.selectedSortColumn
        : "",
      SortDirection: this.state.sortDirection ? this.state.sortDirection : "",
    };
    await this.props.getPlans(plaGrid);
  };
  getFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=insurance&DisplayName=${filter}`;
  }
  filterChange = async (event) => {
    if (event && event.value) {
      await this.setState({
        currentFilter: event.value,
      });
      let body = JSON.parse(event.value.body);
      await this.setState({
        Zip: body?.Zip,
        group: body?.group,
        listName: body?.listName,
        name: body?.name,
      });
    } else {
      this.reset();
    }
  };
  toggleSaveDialog = () => {
    this.setState({ visibleSaveFilter: false, editFilter: false });
  };
  saveFilter = async (event) => {
    this.toggleSaveDialog();
    var patientGrid = JSON.stringify({
      name: this.state.name
        ? this.state.name
        : null,
      listName: this.state.listName
        ? this.state.listName
        : null,
      group: this.state.group
        ? this.state.group
        : null,
      Zip: this.state.Zip ? this.state.Zip : null
    });
    if (this.state.currentFilter && this.state.currentFilter.filterID) {
      let updateFilter = await this.props.FilterUpdate(
        this.state.currentFilter.filterID,
        event,
        patientGrid,
        "insurance",
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
        patientGrid,
        "insurance",
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
  reset = () => {
    this.setState({
      Zip: null,
      group: null,
      listName: null,
      name: null,
      currentFilter: null
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
  onPlanGridDoubleSelectionChange = () => {

  }
  onPlanGridSelectionChange = () => {

  }
  toggleShowColumnsDialog = () => {
    this.setState({
      Show_HidePlanDialogVisible: false,
    });
  };
  SaveColumnsShow = async (columns) => {
    this.setState({ refreshGrid: false });
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
      let GridColumns = await this.props.SaveGridColumns(
        "Plan",
        JSON.stringify(columns)
      );
      this.setState({
        insuranceColumns: JSON.parse(GridColumns?.columns),
        Show_HidePlanDialogVisible: false,
      });
    }
    this.setState({refreshGrid:true});
  };
  render() {
    return (
      <Fragment>
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
        <div
          style={{
            marginLeft: "20px",
            backgroundColor: "white",
            padding: "5px",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ width: "312px" }}>
                <div style={{ float: "left", marginLeft: "33px" }}>
                  <label className="userInfoLabel">Filter</label>
                </div>
                {this.state.refreshFilter && (
                  <div className="filterStyle" style={{ float: "left" }}>
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
                  </div>
                )}
              </div>
              <div style={{ float: "left", width: "210px" }}>
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
                <ButtonComponent
                  type="delete"
                  icon="delete"
                  classButton="infraBtn-primary action-button"
                  onClick={this.delete}
                >
                  Delete
                </ButtonComponent>
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
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ width: "270px" }}>
                <div style={{ float: "left", marginLeft: "29px" }}>
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
              <div style={{ width: "269px" }}>
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <label className="userInfoLabel">List Name</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
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
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ width: "270px" }}>
                <div style={{ float: "left", marginLeft: "25px" }}>
                  <label className="userInfoLabel">Group</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    value={this.state.group}
                    onChange={(e) =>
                      this.setState({
                        group: e.value,
                      })
                    }
                  ></DropDown>
                </div>
              </div>
            </div>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap", marginBottom: "10px" }}
            >




              <div style={{ width: "256px" }}>
                <div style={{ float: "left", marginLeft: "42px" }}>
                  <label className="userInfoLabel">Zip</label>
                </div>
                <div className="ZipStyle" style={{ float: "left" }}>
                  <TextBox
                    type="maskedTextBox"
                    format="#####-####"
                    placeholder="00000-0000"
                    className="unifyHeight"
                    value={this.state.Zip}
                    onValueChange={(e) => {
                      this.setState({
                        Zip: e.target.value
                      })
                    }}
                  ></TextBox>
                </div>
              </div>
            </div>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ float: "left" }}>
                <ButtonComponent
                  icon="search"
                  type="search"
                  classButton="infraBtn-primary action-button"
                  onClick={this.planGridSearch}
                >
                  Search
                </ButtonComponent>
              </div>
              {/* <div style={{ float: "left", width: "200px !important" }}>
                <ButtonComponent
                  type="edit"
                  icon="edit"
                  classButton="infraBtn-primary insurance-button "
                  onClick={() => {
                    this.setState({ visibleSaveFilter: true });
                  }}
                >
                  Save
                </ButtonComponent>
              </div> */}
              <div style={{ float: "left" }}>
                <ButtonComponent
                  type="edit"
                  icon="edit"
                  classButton="infraBtn-primary insurance-button "
                  onClick={() => {
                    this.setState({ providerVisible: true });
                  }}
                >
                  Documents
                </ButtonComponent>
              </div>
              <div style={{ float: "left", width: "200px !important" }}>
                <ButtonComponent
                  type="edit"
                  icon="edit"
                  classButton="infraBtn-primary details-button  "
                  onClick={() => {
                    this.props.setInsuranceDetailExpanded();
                  }}
                >
                  Plan Details
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
                id="physicianGrid"
                data={this.props.plans}
                columns={
                 this.state.insuranceColumns
                }
                height="640px"
                width="100%"
                onSelectionChange={this.onPlanGridSelectionChange}
                onRowDoubleClick={this.onPlanGridDoubleSelectionChange}
                selectionMode="single"
                sortColumns={[]}
                onSortChange={this.onSortChange}
                idGetter={idGetterInsuranceList}
                take={this.state.take}
                DATA_ITEM_KEY="planId"
              ></GridComponent>
            </div>
          </div>
        </div>
</div>
      </Fragment>


    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
