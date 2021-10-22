import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TextArea } from "@progress/kendo-react-inputs";
import GridComponent from "components/Grid";
import { GetClaimNotes } from "../../../../redux/actions/claimDetails"
import {
  columnsclaimNote
} from "./ClaimDetailData";
import { getter } from "@progress/kendo-react-common";
const DATA_ITEM_KEY_NOTE = "claimNoteSID";
const idGetterNoteID = getter(DATA_ITEM_KEY_NOTE);
function mapStateToProps(state) {
  return {
    claimNotes: state.claimDetails.claimNotes
  };
}

function mapDispatchToProps(dispatch) {
  return { GetClaimNotes: (claimID) => dispatch(GetClaimNotes(claimID)) };
}
class ClaimDetailClaimNotes extends Component {
  state = {
    claimNotes: "",
    claimId:null
  };
  onNoteGridSelectionChange = (event) => {
    if (event.dataItem) {
      this.setState({ claimNotes: event.dataItem.body });
    } else {
      this.setState({ claimNotes: "" });
    }
  }
  componentDidMount() {
    if (
      this.props.claimDetails != null &&
      this.props.claimDetails.claimSID != undefined &&
      this.state.claimId != this.props.claimDetails.claimSID
    ) {
      this.props.GetClaimNotes(this.props.claimDetails.claimSID);
      this.setState({
        claimId: this.props.claimDetails.claimSID,
      });
    }
  }
  onSortChange=()=>{
    
  }
  render() {
    return (
      <>
        <div
          style={{
            marginTop: "5px",
            marginLeft: "20px",
            backgroundColor: "white",
            // height: "350px",
            padding: "5px",
          }}
        >
          <div className="row">
            <div className="col-12">
              <label className="userInfoLabel">Statement Note</label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TextArea
                rows={5}
                style={{ width: "100%", height: "4cm" }}
                value={this.state.statementNotes ?? ""}
                onChange={(e) =>
                  this.setState({
                    statementNotes: e.value,
                  })
                }
              ></TextArea>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <label className="userInfoLabel">Bill Notes</label>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TextArea
                rows={5}
                style={{ width: "100%", height: "4cm" }}
                value={this.state.claimNotes ?? ""}
                onChange={(e) =>
                  this.setState({
                    claimNotes: e.value,
                  })
                }
              ></TextArea>
            </div>
            <div className="col-12" style={{ marginTop: "3px" }}>
              <GridComponent
                id="claimDetailClaimGridId"
                data={this.props.claimNotes}
                height="150px"
                width="100%"
                skip={0}
                take={3}
                columns={columnsclaimNote}
                selectionMode="single"
                onSelectionChange={this.onNoteGridSelectionChange}
                onRowDoubleClick={this.onNoteGridSelectionChange}
                idGetter={idGetterNoteID}
                DATA_ITEM_KEY="claimNoteSID"
                sortColumns={[]}
                onSortChange={this.onSortChange}
              ></GridComponent>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimDetailClaimNotes);
