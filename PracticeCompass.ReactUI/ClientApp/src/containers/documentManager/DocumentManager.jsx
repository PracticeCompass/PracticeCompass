import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetFiles, GetFileContent } from "../../redux/actions/fileManager";
import { getter } from "@progress/kendo-react-common";
import EditableGrid from "../../components/editableGrid";
import TextEditor from "../../components/TextEditor";
import { documentColumns } from "./DocumentManagerData";
import DocumentManagerDialog from "./documentManagerDialog"
import SaveFilterComponent from "../common/saveFilter";
import NotificationComponent from "../common/notification";
import Show_HideDialogComponent from "../common/show_hideDialog";
import config from "../../../src/config";
import TextBox from "../../components/TextBox";
import DropDown from "../../components/DropDown";
import DatePickerComponent from "../../components/DatePicker"
import CheckboxComponent from "../../components/Checkbox";
import ButtonComponent from "../../components/Button";
import {
  GetGridColumns,
  SaveGridColumns,
} from "../../redux/actions/GridColumns";

const DATA_ITEM_KEY_FILE_ID = "fileID";
const idGetterFileID = getter(DATA_ITEM_KEY_FILE_ID);

function mapStateToProps(state) {
  return {
    files: state.fileManager.files
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetFiles: () => dispatch(GetFiles()),
    GetFileContent: (path) => dispatch(GetFileContent(path)),
    SaveGridColumns: (name, columns) =>
    dispatch(SaveGridColumns(name, columns)),
     GetGridColumns: (name) => dispatch(GetGridColumns(name)),
  };
}
class DocumentManager extends Component {

  state = {
    documentColumns: documentColumns,
    content: "",
    refresh: true,
    refreshFilter: true,
    documentColumns: documentColumns,
    success: false,
    none: false,
    error: false,
    warning: false,
    info: false,
    timer: 5000,
  }
  async componentDidMount() {
    this.getGridColumns();
    let files = await this.props.GetFiles();
    this.setState({ files });
  }
  onFileGridSelectionChange = async (event) => {
    if (event.dataItem != null) {
      this.setState({ refresh: false });
      let content = await this.props.GetFileContent(event.dataItem.path);
      this.setState({ content, refresh: true });
    }
  }
  onFileDoubleGridSelectionChange = async (event) => {
    this.setState({ showNote: true, fileRow: event.dataItem });
  }
  toggledocumentManagerDialog = (isProcessed, documentNote) => {
    let fileIndex = this.state.files.findIndex(x => x.fileName == this.state.fileRow.fileName);
    if (fileIndex > -1) {
      this.state.files[fileIndex].isProcessed = isProcessed;
      this.state.files[fileIndex].notes = documentNote
    }
    this.setState({ showNote: false, fileRow: null });
  }
  getFilters(filter) {
    if (filter !== undefined) filter = "";
    return `${config.baseUrl}/Filters/FiltersGet?Entity=documentManager&DisplayName=${filter}`;
  }
  toggleShowColumnsDialog = () => {
    this.setState({
      Show_HidePlanDialogVisible: false,
    });
  };
  getGridColumns = async () => {
    this.setState({ refreshGrid: false });
    let currentColumns = await this.props.GetGridColumns("documentManager");
    if (currentColumns != null && currentColumns != "") {
      currentColumns = JSON.parse(currentColumns?.columns) ?? documentColumns;
      this.setState({ documentColumns: currentColumns });
    }
    this.setState({ refreshGrid: true });
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
        "documentManager",
        JSON.stringify(columns)
      );
      this.setState({
        documentColumns: JSON.parse(GridColumns?.columns),
        Show_HidePlanDialogVisible: false,
      });
    }
  };
  render() {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            width: "100%",
          }}
        >
          {this.state.showNote && (
            <DocumentManagerDialog
              row={this.state.fileRow}
              toggledocumentManagerDialog={this.toggledocumentManagerDialog}
            >
            </DocumentManagerDialog>
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
          {this.state.Show_HidePlanDialogVisible && (
            <Show_HideDialogComponent
              columns={this.state.documentColumns}
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
                <div style={{ float: "left", marginLeft: "46px" }}>
                  <label className="userInfoLabel">File Name</label>
                </div>
                <div style={{ width: "200px", float: "left" }}>
                  <TextBox
                    className="unifyHeight"
                    value={this.state.fileName}
                    onChange={(e) =>
                      this.setState({
                        fileName: e.value,
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
              <div style={{ float: "left", marginLeft: "71px" }}>
                <label className="userInfoLabel">Date</label>
              </div>
              <div className="dateStyle" style={{ float: "left", marginLeft: "5px" }}>
                <DatePickerComponent
                  className="unifyHeight"
                  placeholder="MM/DD/YYYY"
                  format="M/dd/yyyy"
                  value={this.state.fileDate}
                  onChange={(e) => this.setState({ fileDate: e.value })}
                ></DatePickerComponent>
              </div>
            </div>


            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ float: "left", marginLeft: "44px" }}>
                <CheckboxComponent
                  style={{ marginRight: "5px" }}
                  id="processed"
                  label="Processed"
                  value={this.state.processed}
                  onChange={(e) => this.setState({ processed: e.value })}
                />
              </div>
            </div>
            <div
              className="rowHeight"
              style={{ display: "flex", flexFlow: "row nowrap" }}
            >
              <div style={{ float: "left", marginLeft: "10px" }}>
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
                  float: "left",
                  marginLeft: "443px",
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
                    id="eraFiles"
                    columns={this.state.documentColumns}
                    skip={0}
                    take={24}
                    onSelectionChange={
                      this.onFileGridSelectionChange
                    }
                    onRowDoubleClick={
                      this.onFileDoubleGridSelectionChange
                    }
                    // getSelectedItems={this.getSelectedClaims}
                    // selectionMode="multiple"
                    DATA_ITEM_KEY="fileID"
                    idGetter={idGetterFileID}
                    data={this.state.files || []}
                    height="570px"
                    width="100%"
                    //hasCheckBox={true}
                    sortColumns={[]}
                    onSortChange={this.onSortChange}
                    displayNoteDialog={this.displayNoteDialog}
                  // pageChange={this.pageChange}
                  ></EditableGrid>
                </div></div>
            </div>
          </div>
          <div style={{ float: "left", width: "100%" }}>
            {this.state.refresh && (
              <TextEditor content={this.state.content}></TextEditor>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentManager);
