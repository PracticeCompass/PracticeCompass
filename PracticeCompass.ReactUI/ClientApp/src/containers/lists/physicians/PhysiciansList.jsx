import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TextBox from "../../../components/TextBox";
import DropDown from "../../../components/DropDown";
import GridComponent from "../../../components/Grid";
import {
  providerColumns
} from "./PhysiciansData";
import ButtonComponent from "../../../components/Button";
import { getter } from "@progress/kendo-react-common";
import config from "../../../../src/config";
import SaveFilterComponent from "../../common/saveFilter";
import NotificationComponent from "../../common/notification";
import {
  getFilters,
  FilterDelete,
  FilterInsert,
  FilterUpdate,
} from "../../../redux/actions/filter";
import { getPhysicians } from "../../../redux/actions/Physician"

const DATA_ITEM_KEY_PROVIDER = "providergridID";
const idGetterProvider = getter(DATA_ITEM_KEY_PROVIDER);

function mapStateToProps(state) {
  return {
    physicians: state.physicians.physicians,
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
    getPhysicians: (searchGrid) => dispatch(getPhysicians(searchGrid))
  };
}

class PhysiciansList extends Component {
  state = {
    success: false,
    none: false,
    error: false,
    warning: false,
    info: false,
    timer: 5000,
    firstName: null,
    Zip: null,
    lastName: null,
    Position: null,
    providerVisible: false,
    refreshFilter: true,
    skip: 0,
    take: 28,
  }
  onSortChange = () => {

  }
  getFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=physician&DisplayName=${filter}`;
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
  toggleSaveDialog = () => {
    this.setState({ visibleSaveFilter: false, editFilter: false });
  };
  saveFilter = async (event) => {
    this.toggleSaveDialog();
    var patientGrid = JSON.stringify({
      firstName: this.state.firstName
        ? this.state.firstName
        : null,
      lastName: this.state.lastName
        ? this.state.lastName
        : null,
      Zip: this.state.Zip
        ? this.state.Zip
        : null,
      Position: this.state.Position ? this.state.Position : null
    });
    if (this.state.currentFilter && this.state.currentFilter.filterID) {
      let updateFilter = await this.props.FilterUpdate(
        this.state.currentFilter.filterID,
        event,
        patientGrid,
        "physician",
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
        "physician",
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
      firstName: null,
      lastName: null,
      Position: null,
      currentFilter: null
    });
  };
  filterChange = async (event) => {
    if (event && event.value) {
      await this.setState({
        currentFilter: event.value,
      });
      let body = JSON.parse(event.value.body);
      await this.setState({
        firstName: body?.firstName,
        lastName: body?.lastName,
        Zip: body?.Zip,
        Position: body?.Position,
      });
    } else {
      this.reset();
    }
  };
  physicianGridSearch = async (refreshData = true) => {
    var physicianGrid = {
      ProviderID: this.state.selectedProviderId
        ? this.state.selectedProviderId
        : 0,
      firstName: this.state.firstName??'',
      lastName: this.state.lastName??'',
      ZIP: this.state.Zip??0,
      // skip: refreshData ? 0 : this.props.Patients.length,
      skip: 0,
      SortColumn: this.state.selectedSortColumn
        ? this.state.selectedSortColumn
        : "",
      SortDirection: this.state.sortDirection ? this.state.sortDirection : "",
    };
    await this.props.getPhysicians(physicianGrid);
  };
  onSortChange = async (column, sort) => {
    await this.setState({
      selectedSortColumn: column,
      sortDirection: sort,
    });
    this.physicianGridSearch();
  };
  onPhysiciansGridSelectionChange = (event) => {
    this.setState({selectedPhysician: event.dataItem});
  }
  onPhysiciansGridDoubleSelectionChange = (event) => {
    this.props.setInsuranceDetailExpanded();
    this.props.setInsuranceDetails(event.dataItem);
  }
  openPhysicianRow=()=>{
    if(this.state.selectedPhysician){
      this.props.setInsuranceDetailExpanded();
      this.props.setInsuranceDetails(this.state.selectedPhysician);
    }else{
    this.setState({
      warning: true,
      message: "Please Select Physician.",
    });
    setTimeout(() => {
      this.setState({
        warning: false,
      });
    }, this.state.timer);
  }
}
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
              <div style={{ width: "313px" }}>
                <div style={{ float: "left", marginLeft: "39px" }}>
                  <label className="userInfoLabel">Filter</label>
                </div>
                {this.state.refreshFilter && (
                  <div className="filterStyle" style={{ float: "left" }}>
                    <DropDown
                      className="unifyHeight"
                      id="physicianFilter"
                      name="physicianFilter"
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
              <div style={{ width: "211px" }}>
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <label className="userInfoLabel">First Name</label>
                </div>
                <div style={{ width: "140px", float: "left" }}>
                  <TextBox
                    className="unifyHeight"
                    value={this.state.firstName}
                    onChange={(e) =>
                      this.setState({
                        firstName: e.value,
                      })
                    }
                  ></TextBox>
                </div>
              </div>
              <div style={{ width: "269px" }}>
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <label className="userInfoLabel">Last Name</label>
                </div>
                <div style={{ width: "140px", float: "left" }}>
                  <TextBox
                    className="unifyHeight"
                    value={this.state.lastName}
                    onChange={(e) =>
                      this.setState({
                        lastName: e.value,
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
              <div style={{ width: "280px" }}>
                <div style={{ float: "left", marginLeft: "20px" }}>
                  <label className="userInfoLabel">Position</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    value={this.state.Position}
                    onChange={(e) =>
                      this.setState({
                        Position: e.value,
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

              <div style={{ width: "160px" }}>
                <div style={{ float: "left", marginLeft: "47px" }}>
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
                  onClick={this.physicianGridSearch}
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
                    this.openPhysicianRow();
                  }}
                >
                  Physician Details
                </ButtonComponent>
              </div>
            </div>

          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            width: window.innerWidth - (!this.props.UiExpand ? 120 : 273),
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
                  data={this.props.physicians}
                  columns={
                    providerColumns
                  }
                  height="400px"
                  width="100%"
                  onSelectionChange={this.onPhysiciansGridSelectionChange}
                  onRowDoubleClick={this.onPhysiciansGridDoubleSelectionChange}
                  selectionMode="single"
                  idGetter={idGetterProvider}
                  DATA_ITEM_KEY="providergridID"
                  sortColumns={[]}
                  onSortChange={this.onSortChange}
                  height="640px"
                  width="100%"
                  skip={0}
                  take={this.state.take}
                ></GridComponent>
              </div>
            </div>
          </div>
        </div>

      </Fragment>


    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhysiciansList);
