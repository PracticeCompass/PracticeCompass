import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import TextBox from "../../components/TextBox";
import ButtonComponent from "../../components/Button";
import { getter } from "@progress/kendo-react-common";
import GridComponent from "../../components/Grid";

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}
class FindDialogComponent extends Component {
  state = {
    filterName: this.props.filterName,
  };
  onSortChange = () => {

  }
  pageChange = async (skip, take) => {
    if (skip == 0) return;
    if (this.props.data.length < (skip + take) + 2) {
      this.setState({ isVisibleNextData: true, skip: this.props.data.length });
      this.getNextData();
    } else {
      this.setState({ isVisibleNextData: false });
    }
  };
  getNextData = async () => {
    await this.props.clickOnSearch(false, this.props.data.length);
    this.setState({ isVisibleNextData: false })
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  onSelectionChange = () => { };
  onKeyDown = () => { };
  onTextSearchChange = async(e) => {
    await this.props.onTextSearchChange(e);
    this.props.clickOnSearch();
  }
  render() {
    return (
      <Fragment>
        <Dialog
          title={this.props.title} //"Insurance Search"}
          onClose={this.props.toggleDialog}
          height={750}
          width={900}
        >
          <div className="row">
            <div className="col-8" style={{ marginLeft: "10px" }}>
              <TextBox
                id="insuranceDialog"
                placeholder={this.props.placeholder} //"Enter Insurance Company Name"
                value={this.props.searcTextBoxValue}
                onChange={this.onTextSearchChange}
                onEnterPress={this.props.clickOnSearch}
              ></TextBox>
            </div>
            <div className="col-3">
              <ButtonComponent
                icon="search"
                type="search"
                classButton="infraBtn-primary action-button"
                onClick={this.props.clickOnSearch}
              >
                Search
              </ButtonComponent>

            </div>
          </div>
          <div
            className="accordion"
            id="accordionExample"
            style={{ paddingTop: "5px" }}
          >
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
                  id="findDialog"
                  height="550px"
                  width="100%"
                  take={24}
                  onSelectionChange={this.onSelectionChange}
                  onRowDoubleClick={this.props.onRowDoubleClick}
                  //onKeyDown={this.props.onKeyDown}
                  columns={this.props.columns}
                  data={this.props.data}
                  //sort={this.props.sort}
                  totalCount={this.props.data != null && this.props.data.length > 0 ? this.props.data[0].totalCount : this.props.data.length}
                  allowUnsort={true}
                  multiple={false}
                  selectionMode="single"
                  sortColumns={[]}
                  onSortChange={this.onSortChange}
                  //sortable={true}
                  idGetter={this.props.idGetterLookup}
                  DATA_ITEM_KEY={this.props.dataItemKey}
                  pageChange={this.pageChange}
                ></GridComponent>
              </div>
            </div>
          </div>
          <DialogActionsBar>
            <div style={{ textAlign: "right", marginRight: "15px" }}>
              <ButtonComponent
                type="button"
                className="k-button"
                onClick={this.props.cancelDialog}
                style={{ fontSize: "12px" }}
              >
                Cancel
              </ButtonComponent>
            </div>
          </DialogActionsBar>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindDialogComponent);
