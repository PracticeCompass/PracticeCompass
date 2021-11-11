import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TextBox from "components/TextBox";
import DropDown from "components/DropDown";
import CheckboxComponent from "../../../../components/Checkbox";
import DatePickerComponent from "components/DatePicker";
import { TextArea } from "@progress/kendo-react-inputs";

function mapStateToProps(state) {
  return {
    claimDetailsData: state.claimDetails.claimDetails,
    UiExpand:state.ui.UiExpand
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

class ClaimDetailFilling extends Component {
  state = {
    dateOfIllnessCurrent: null,
    dateOfIllnessSimilar: null,
    initialTXDate: null,
    disablilityDatesFrom: null,
    disablilityDatesTo: null,
    hospitalizationDatesFrom: null,
    hospitalizationDatesTo: null,
    isOutsideLab: false,
    outSideLabCharge: null,
    otherDate: null,
    otherDateQuailifier: null,
    box31: null,
    box24NPI: null,
    box24TaxonomyCode: null,
    box8: null,
    box9C: null,
    box9B: null,
    box10D: null,
    box11C: null,
    box19: null,
    box30L: null,
    box30R: null,
  };
  async componentDidMount() {}
  render() {
    return (
      <Fragment>
        <div
          style={{
            marginTop: "5px",
            marginLeft: "20px",
            backgroundColor: "white",
            padding: "5px",
          }}
        >
          <div className="row rowHeight">
            {/* <div
              style={{
                textAlign: "right",
                marginLeft: "43px",
                marginRight: "19px",
              }}
            >
              <label className="userInfoLabel">Date of Illness</label>
            </div>
            <div>
              <label className="userInfoLabel">Current: </label>
            </div>
            <div style={{ width: "150px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.dateOfIllnessCurrent}
                onChange={(e) =>
                  this.setState({ dateOfIllnessCurrent: e.value })
                }
              ></DatePickerComponent>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <label className="userInfoLabel">Similar: </label>
            </div>
            <div style={{ width: "150px", marginRight: "10px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.dateOfIllnessSimilar}
                onChange={(e) =>
                  this.setState({ dateOfIllnessSimilar: e.value })
                }
              ></DatePickerComponent>
            </div> */}
            <div style={{ marginLeft: "154px" }}>
              <label className="userInfoLabel">Box 31 - Physician </label>
            </div>
            <div style={{ width: "300px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box31}
                onChange={(e) =>
                  this.setState({
                    box31: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div>
          <div className="row rowHeight">
            {/* <div
              style={{
                textAlign: "right",
                marginLeft: "45px",
                marginRight: "19px",
              }}
            >
              <label className="userInfoLabel">Initial Tx Date</label>
            </div>
            <div>
              <label className="userInfoLabel">Current: </label>
            </div>
            <div style={{ width: "150px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.initialTXDate}
                onChange={(e) => this.setState({ initialTXDate: e.value })}
              ></DatePickerComponent>
            </div> */}
            <div style={{ marginLeft: "68px" }}>
              <label className="userInfoLabel">
                Box 24J - Rendering Provider NPI
              </label>
            </div>
            <div style={{ width: "300px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box24NPI}
                onChange={(e) =>
                  this.setState({
                    box24NPI: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div>
          <div className="row rowHeight">
            {/* <div
              style={{
                textAlign: "right",
                marginLeft: "32px",
                marginRight: "32px",
              }}
            >
              <label className="userInfoLabel">Disability Dates:</label>
            </div>
            <div>
              <label className="userInfoLabel">From: </label>
            </div>
            <div style={{ width: "150px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.disablilityDatesFrom}
                onChange={(e) =>
                  this.setState({ disablilityDatesFrom: e.value })
                }
              ></DatePickerComponent>
            </div>
            <div style={{ marginLeft: "37px" }}>
              <label className="userInfoLabel">To: </label>
            </div>
            <div style={{ width: "150px", marginRight: "10px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.disablilityDatesTo}
                onChange={(e) => this.setState({ disablilityDatesTo: e.value })}
              ></DatePickerComponent>
            </div> */}
            <div>
              <label className="userInfoLabel">
                Box 24j - Rendering Provider Taxonomy Code
              </label>
            </div>
            <div style={{ width: "300px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box24TaxonomyCode}
                onChange={(e) =>
                  this.setState({
                    box24TaxonomyCode: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div>
          {/* <div className="row rowHeight">
            <div style={{ textAlign: "right", marginRight: "31px" }}>
              <label className="userInfoLabel">Hospitalization Dates:</label>
            </div>
            <div>
              <label className="userInfoLabel">From: </label>
            </div>
            <div style={{ width: "150px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.hospitalizationDatesFrom}
                onChange={(e) =>
                  this.setState({ hospitalizationDatesFrom: e.value })
                }
              ></DatePickerComponent>
            </div>
            <div style={{ marginLeft: "37px" }}>
              <label className="userInfoLabel">To: </label>
            </div>
            <div style={{ width: "150px", marginRight: "10px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.hospitalizationDatesTo}
                onChange={(e) =>
                  this.setState({ hospitalizationDatesTo: e.value })
                }
              ></DatePickerComponent>
            </div>
            <div style={{ marginLeft: "44px" }}>
              <label className="userInfoLabel">Box 8 </label>
            </div>
            <div style={{ width: "100px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box8}
                onChange={(e) =>
                  this.setState({
                    box8: e.value,
                  })
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <label className="userInfoLabel">Box 9c </label>
            </div>
            <div style={{ width: "100px", marginRight: "10px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box9C}
                onChange={(e) =>
                  this.setState({
                    box9C: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div> */}
          {/* <div className="row rowHeight">
            <div className="wrap" style={{ marginLeft: "59px" }}>
              <CheckboxComponent
                id="isAutoAccident"
                label="Is outside lab"
                style={{ marginRight: "5px" }}
                value={this.state.isOutsideLab}
                onChange={(e) => this.setState({ isOutsideLab: e.value })}
              ></CheckboxComponent>
            </div>
            <div style={{ marginLeft: "72px" }}>
              <label className="userInfoLabel">Outside Lab Charge</label>
            </div>
            <div style={{ marginRight: "30px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.outSideLabCharge}
                onChange={(e) =>
                  this.setState({
                    outSideLabCharge: e.value,
                  })
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "48px" }}>
              <label className="userInfoLabel">Box 9b </label>
            </div>
            <div style={{ width: "100px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box9B}
                onChange={(e) =>
                  this.setState({
                    box9B: e.value,
                  })
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "31px" }}>
              <label className="userInfoLabel">Box 10d </label>
            </div>
            <div style={{ width: "200px" }}>
              <DropDown
                //data={InsuranceCategory}
                textField="text"
                dataItemKey="id"
                className="unifyHeight"
                id="ins"
                name="ins"
                value={this.state.box10D}
                onChange={(e) => this.setState({ box10D: e.value })}
              ></DropDown>
            </div>
          </div>
          <div className="row rowHeight">
            <div>
              <label className="userInfoLabel">Other Date:</label>
            </div>
            <div style={{ width: "150px", marginRight: "10px" }}>
              <DatePickerComponent
                className="unifyHeight"
                placeholder="MM/DD/YYYY"
                format="M/dd/yyyy"
                value={this.state.otherDate}
                onChange={(e) => this.setState({ otherDate: e.value })}
              ></DatePickerComponent>
            </div>
            <div>
              <label className="userInfoLabel">Other Date Qualifier:</label>
            </div>
            <div style={{ width: "200px", marginRight: "10px" }}>
              <DropDown
                //data={InsuranceCategory}
                textField="text"
                dataItemKey="id"
                className="unifyHeight"
                id="ins"
                name="ins"
                value={this.state.otherDateQuailifier}
                onChange={(e) =>
                  this.setState({ otherDateQuailifier: e.value })
                }
              ></DropDown>
            </div>

            <div style={{ marginLeft: "33px" }}>
              <label className="userInfoLabel">Box 11c</label>
            </div>
            <div style={{ width: "100px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box11C}
                onChange={(e) =>
                  this.setState({
                    box11C: e.value,
                  })
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "39px" }}>
              <label className="userInfoLabel">Box 19</label>
            </div>
            <div style={{ width: "100px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box19}
                onChange={(e) =>
                  this.setState({
                    box19: e.value,
                  })
                }
              ></TextBox>
            </div>
          </div> */}
          <div className="row">
            <div>
              <label className="userInfoLabel">Statement Note:</label>
            </div>
            {/* <div style={{ marginLeft: "498px" }}>
              <label className="userInfoLabel">Box 30L </label>
            </div>
            <div style={{ width: "100px", marginRight: "10px" }}>
              <TextBox
                type="text"
                className="unifyHeight"
                value={this.state.box30L}
                onChange={(e) =>
                  this.setState({
                    box30L: e.value,
                  })
                }
              ></TextBox>
            </div>
            <div style={{ marginLeft: "21px" }}>
              <label className="userInfoLabel">Box 30R </label>
            </div>
            <div style={{ width: "200px", marginRight: "10px" }}>
              <DropDown
                //data={InsuranceCategory}
                textField="text"
                dataItemKey="id"
                className="unifyHeight"
                id="ins"
                name="ins"
                value={this.state.box30R}
                onChange={(e) => this.setState({ box30R: e.value })}
              ></DropDown>
            </div> */}
          </div>
          <div className="row">
            <div style={{ width: "1500px" }}>
              <TextArea
                rows={5}
                className="textAreaUnifyHeight"
                style={{ height: "1cm" }}
                value={this.state.statementNotes ?? ""}
                onChange={(e) =>
                  this.setState({
                    statementNotes: e.value,
                  })
                }
              ></TextArea>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimDetailFilling);
