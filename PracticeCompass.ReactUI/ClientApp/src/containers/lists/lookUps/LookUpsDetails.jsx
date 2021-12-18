import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import NotificationComponent from "../../common/notification";
import TextBox from "../../../components/TextBox";
import DropDown from "../../../components/DropDown";
import CheckboxComponent from "../../../components/Checkbox";
import ButtonComponent from "../../../components/Button";
import { TextArea } from "@progress/kendo-react-inputs";
import { getter } from "@progress/kendo-react-common";
import FindDialogComponent from "../../common/findDialog";
import { lookupColumns, lookupTypeColumns } from "./LookUpsData";
import { resetlookupTypeList, getLookupTypes, addLookupCodes } from "../../../redux/actions/lookupCode"
import { SaveLookups } from "../../../redux/actions/lookups";

const DATA_ITEM_KEY_LOOKUP_TYPE = "lookupType";
const idGetterLookupType = getter(DATA_ITEM_KEY_LOOKUP_TYPE);
function mapStateToProps(state) {
  return {
    lookupTypes: state.lookupCodes.lookupTypes,
    dropDownlookupTypes: state.lookups.lookupTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetlookupTypeList: () => dispatch(resetlookupTypeList()),
    getLookupTypes: (search) => dispatch(getLookupTypes(search)),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
    addLookupCodes: (data) =>
      dispatch(addLookupCodes(data))
  };
}
class LookUpsDetails extends Component {
  state = {
    lookupDetais: {},
    timer: 5000,
  }
  componentDidMount() {
    this.setState({ lookupDetais: this.props.LookupsDetails })
    if (this.props.LookupsDetails != null) {
      let row = this.props.LookupsDetails;
      this.setState({
        selectedLookUpType: {
          entityId: row.lookupType,
          entityName: row.lookupType,
        },
        active: row.recordStatus == "true",
        lookupCode: row.lookupCode,
        description: row.description,
        isAdd:false,
        gridId: row.gridId
      })
    }else{
      this.setState({
        isAdd:true
      })
    }
  }
  toggleLookupDialog = () => {
    if (this.state.lookupVisible) {
      this.setState({
        lookupSearchText: null,
      });
      this.props.resetlookupTypeList();
    }
    this.setState({
      lookupVisible: !this.state.lookupVisible,
    });
  };
  onLookupTypesKeyDown = (event) => {
    var selectedDataItems = event.dataItems.slice(
      event.startRowIndex,
      event.endRowIndex + 1
    );
    this.setState({
      selectedLookUpType: selectedDataItems[0]
        ? {
          entityName: selectedDataItems[0].lookupType,
          entityId: selectedDataItems[0].lookupType,
        }
        : null,
    });
  };
  onLookupTypesDoubleClick = (event) => {
    this.setState({
      selectedLookUpType: {
        entityId: event.dataItem.lookupType,
        entityName: event.dataItem.lookupType,
      },
    });
    this.props.SaveLookups(event.dataItem.lookupType, "lookupTypes");
    //this.selectPatient();
    this.toggleLookupDialog();
  }
  lookupCodesSearch = () => {
    this.props.getLookupTypes(this.state.lookupSearchText ?? '');
  };
  saveLookUpDetails = async () => {
    if(this.state.lookupCode ==null || this.state.description==null || this.state.selectedLookUpType==null){
      this.setState({ warning: true, message: "Please fill lookup Code,description and lookup Type" });
      setTimeout(() => {
        this.setState({
          warning: false,
        });
      }, this.state.timer);
      return;
    }
    var lookupGrid = {
      LookupCode: this.state.lookupCode
        ? this.state.lookupCode
        : '',
      LookupType: this.state.selectedLookUpType ? this.state.selectedLookUpType.entityId : '',
      description: this.state.description,
      RecordStatus: this.state.active == null || this.state.active == false ? 'I' : 'A',
      IsAdd:this.state.isAdd,
      gridId:this.state.gridId
    };
    let result = await this.props.addLookupCodes(lookupGrid);
    if (result) {
      this.setState({ success: true, message: "lookup ("+ this.state.lookupCode +") save succefully" });
      setTimeout(() => {
        this.setState({
          success: false,
        });
      }, this.state.timer);
      this.props.setLookupType({
          entityId:this.state.selectedLookUpType.entityId,
          entityName:this.state.selectedLookUpType.entityId,
        });
        this.props.setLookupsExpanded();
      return;
    } else {
      this.setState({ error: true, message: "lookup ("+ this.state.lookupCode +")save failed" });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, this.state.timer);
      return;
    }
    //this.props.setLookupsExpanded();
  }
  render() {
    return (
      <Fragment>
        <div
          style={{
            marginLeft: "20px",
            backgroundColor: "white",
            padding: "5px",
            height: "190px"
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
              clickOnSearch={this.lookupCodesSearch}
              dataItemKey="lookupType"
              data={this.props.lookupTypes}
              columns={lookupTypeColumns}
              onSelectionChange={this.onLookupTypesClick}
              onRowDoubleClick={this.onLookupTypesDoubleClick}
              onKeyDown={this.onLookupTypesKeyDown}
              idGetterLookup={idGetterLookupType}
              toggleDialog={this.toggleLookupDialog}
              cancelDialog={this.toggleLookupDialog}
              skipNextData={true}
            ></FindDialogComponent>
          )}
          <div style={{ width: "100%" }}>
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
                    data={this.props.dropDownlookupTypes}
                    textField="entityName"
                    dataItemKey="entityId"
                    disabled={this.state.lookupDetais != null}
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
                    disabled={this.state.lookupDetais != null}
                    classButton="infraBtn-primary find-button"
                    onClick={this.toggleLookupDialog}
                  >
                    Find
                  </ButtonComponent>
                </div>
              </div>
              <div style={{ width: "280px" }}>
                <div style={{ float: "left" }}>
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
              <div style={{ float: "left" }}>
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
              style={{ display: "flex", flexFlow: "row nowrap", marginTop: "10px" }}
            >
              <div style={{ width: "515px" }}>
                <div style={{ float: "left", marginLeft: "38px" }}>
                  <label className="userInfoLabel">Description</label>
                </div>
                <div style={{ width: "400px", float: "left" }}>


                  <TextArea
                    rows={5}
                    style={{ width: "100%", height: "3cm" }}
                    value={this.state.description ?? ""}
                    onChange={(e) =>
                      this.setState({
                        description: e.value,
                      })
                    }
                  ></TextArea>
                </div>
              </div>
            </div>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap", marginTop: "90px" }}
            >
              <div style={{ float: "right" }}>
                <ButtonComponent
                  type="edit"
                  icon="edit"
                  classButton="infraBtn-primary insurance-button "
                  onClick={() => {
                    this.saveLookUpDetails();
                  }}
                >
                  Save
                </ButtonComponent>
              </div>
              <div style={{ float: "right", width: "200px !important" }}>
                <ButtonComponent
                  type="edit"
                  icon="cancel"
                  classButton="infraBtn-primary insurance-button "
                  onClick={() => {
                    this.props.setLookupsExpanded();
                  }}
                >
                  Cancel
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LookUpsDetails);
