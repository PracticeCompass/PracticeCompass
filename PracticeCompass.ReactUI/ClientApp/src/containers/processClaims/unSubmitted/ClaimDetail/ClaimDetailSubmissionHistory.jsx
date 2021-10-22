import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import GridComponent from "../../../../components/Grid";
import { submissionHistoryColumns } from "./ClaimDetailData";
import { ClaimSubmissionHistoryGet } from "../../../../redux/actions/claimDetails";
import { SaveLookups } from "../../../../redux/actions/lookups";
import { getter } from "@progress/kendo-react-common";

const DATA_ITEM_KEY_Submission = "gridId";
const idGetterGridID = getter(DATA_ITEM_KEY_Submission);
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    ClaimSubmissionHistoryGet: (claimID) =>
      dispatch(ClaimSubmissionHistoryGet(claimID)),
    SaveLookups: (EntityValueID, EntityName) =>
      dispatch(SaveLookups(EntityValueID, EntityName)),
  };
}

class ClaimDetailSubmissionHistory extends Component {
  state = {
    claimSubmissionHistory: null,
    claimId: 0,
  };
  async componentDidMount() {
    if (
      this.props.claimDetails != null &&
      this.props.claimDetails.claimSID != undefined &&
      this.state.claimId != this.props.claimDetails.claimSID
    ) {
      let submissionHistoryData = await this.props.ClaimSubmissionHistoryGet(
        this.props.claimDetails.claimSID
      );
      await this.setState({
        // patientId: claimDetails.patientID,
        claimSubmissionHistory: submissionHistoryData,
        claimId: this.props.claimDetails.claimSID,
      });
    }
  }
  onSortChange = () => {};
  render() {
    return (
      <Fragment>
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
                id="ClaimDetailSubmissionHistoryId"
                skip={0}
                take={15}
                // onSelectionChange={this.onClaimGridSelectionChange}
                // onRowDoubleClick={this.onClaimGridDoubleSelectionChange}
                selectionMode="single"
                DATA_ITEM_KEY="gridID"
                idGetter={idGetterGridID}
                data={this.state.claimSubmissionHistory}
                height="415px"
                width="100%"
                columns={submissionHistoryColumns}
                sortColumns={[]}
                onSortChange={this.onSortChange}
              ></GridComponent>
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
)(ClaimDetailSubmissionHistory);
