import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import SaveFilterComponent from "../../common/saveFilter";
import NotificationComponent from "../../common/notification";
import Show_HideDialogComponent from "../../common/show_hideDialog";
import FindDialogComponent from "../../common/findDialog";
import { getter } from "@progress/kendo-react-common";
import TextBox from "../../../components/TextBox";
import DropDown from "../../../components/DropDown";
import CheckboxComponent from "../../../components/Checkbox";
import GridComponent from "../../../components/Grid";
import ButtonComponent from "../../../components/Button";
import { lookupColumns } from "./LookUpsData";
import config from "../../../../src/config";

const DATA_ITEM_KEY_LOOKUP_TYPE = "lookupType";
const idGetterLookupType = getter(DATA_ITEM_KEY_LOOKUP_TYPE);

const DATA_ITEM_KEY_LOOKUP_CODE = "lookupCode";
const idGetterLookupCode = getter(DATA_ITEM_KEY_LOOKUP_CODE);


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class LookUpsList extends Component {
  state = {
    refreshFilter: true
  }
  getFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=lookupCode&DisplayName=${filter}`;
  }
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
    
  toggleLookupDialog = () => {
    if (this.state.lookupVisible) {
      this.setState({
        lookupSearchText: null,
      });
      this.props.resetPlanGroupList();
    }
    this.setState({
      lookupVisible: !this.state.lookupVisible,
    });
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
        {this.state.lookupVisible && (
          <FindDialogComponent
            title="Lookup Type Search"
            placeholder="Enter lookup Type or description"
            searcTextBoxValue={this.state.lookupSearchText}
            onTextSearchChange={(e) => {
              this.setState({
                lookupSearchText: e.value,
              });
            }}
            clickOnSearch={this.planGroupSearch}
            dataItemKey="LookupType"
            data={this.props.planGroups}
            columns={[]}
            onSelectionChange={this.onPlanGroupSelectionChange}
            onRowDoubleClick={this.onPlanGroupDoubleClick}
            onKeyDown={this.onPlanGroupKeyDown}
            idGetterLookup={idGetterLookupType}
            toggleDialog={this.toggleLookupDialog}
            cancelDialog={this.toggleLookupDialog}
            skipNextData={true}
          ></FindDialogComponent>
        )}
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
              <div style={{ width: "348px" }}>
                <div style={{ float: "left", marginLeft: "75px" }}>
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
              <div style={{ width: "370px" }}>
                <div style={{ float: "left", marginLeft: "29px" }}>
                  <label className="userInfoLabel">Lookup Code</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
                  <TextBox
                    className="unifyHeight"
                    value={this.state.lookupCode}
                    onChange={(e) =>
                      this.setState({
                        lookupCode: e.value,
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
              <div style={{ width: "375px" }}>
                <div style={{ float: "left", marginLeft: "31px" }}>
                  <label className="userInfoLabel">Lookup Type</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
                  <DropDown
                    className="unifyHeight"
                    data={this.props.dropDownLookUpType}
                    textField="entityName"
                    dataItemKey="entityId"
                    defaultValue={this.state.selectedLookUpType}
                    value={this.state.selectedLookUpType}
                    onChange={(e) =>
                      this.setState({
                        selectedLookUpType: {
                          entityId: e.value?.entityId,
                          entityName: e.value?.entityName,
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
                    onClick={this.toggleLookupDialog}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
            </div>


            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ float: "left", marginLeft: "44px" }}>
                <CheckboxComponent
                  style={{ marginRight: "5px" }}
                  id="active"
                  label="Active"
                  value={this.state.active}
                  onChange={(e) => this.setState({ active: e.value })}
                />
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
              {/* <div style={{ float: "left" }}>
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
              </div> */}
              <div style={{ float: "left", width: "200px !important" }}>
                <ButtonComponent
                  type="edit"
                  icon="edit"
                  classButton="infraBtn-primary details-button  "
                  onClick={() => {
                    this.openLookupRow();
                  }}
                >
                  Lookup Details
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
                  id="LookupGrid"
                  data={[]}
                  columns={
                    lookupColumns
                  }
                  height="640px"
                  width="100%"
                  onSelectionChange={this.onPlanGridSelectionChange}
                  onRowDoubleClick={this.onPlanGridDoubleSelectionChange}
                  selectionMode="single"
                  sortColumns={[]}
                  onSortChange={this.onSortChange}
                  idGetter={idGetterLookupCode}
                  take={this.state.take}
                  DATA_ITEM_KEY="gridId"
                ></GridComponent>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LookUpsList);
