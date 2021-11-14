import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FilterableGridComponent from "components/FilterableGrid";
import { columns } from "./patientDetailLedgerData";
import { getter } from "@progress/kendo-react-common";
import { GetPatientLedger } from "../../../../../redux/actions/patientDetails";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    GetPatientLedger: (personID) => dispatch(GetPatientLedger(personID)),
  };
}
const DATA_ITEM_KEY_PatientLedger = "patientLedgerID";
const idGetterPaientLedger = getter(DATA_ITEM_KEY_PatientLedger);
class PatientDetailLedger extends Component {
  state = {
    selected: 0,
    skip: 0,
    take: 23,
    patientDetailsLedger: null,
    patientId: 0,
  };
  async componentDidMount() {
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
  }
  handleSelect = (e) => {
    this.setState({ selected: e.selected });
  };
  onSortChange = () => {};

  onRowRender(trElement, props) {
    const activity = props.dataItem.activityType;
    const white = {
      backgroundColor: "rgb(255, 255, 255)",
    };
    const yellow = {
      backgroundColor: "rgb(255, 255, 0)",
    };
    const green = {
      backgroundColor: "rgb(55, 180, 0,0.32)",
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
  render() {
    return (
      <Fragment>
        <div
          className="accordion"
          id="accordionExample"
          style={{ height: window.innerHeight - 200 }}
        >
          <div className="card bg-light mb-3">
            <div
              id="patientLedger"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              {this.state.patientDetailsLedger && (
                <div className="card-body">
                  <FilterableGridComponent
                    id="ledgerGrid"
                    columns={columns}
                    data={this.state.patientDetailsLedger}
                    skip={0}
                    take={this.state.take}
                    height={window.innerHeight - 200}
                    width="100%"
                    activeRowRender={true}
                    onRowRender={this.onRowRender}
                    // onSelectionChange={this.onPatientGridSelectionChange}
                    // onRowDoubleClick={this.onPatientGridDoubleSelectionChange}
                    selectionMode="single"
                    DATA_ITEM_KEY="patientLedgerID"
                    idGetter={idGetterPaientLedger}
                    sortColumns={[]}
                    onSortChange={this.onSortChange}
                    // pageChange={this.pageChange}
                  ></FilterableGridComponent>
                </div>
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
