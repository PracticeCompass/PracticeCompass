import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TextBox from "../../../components/TextBox";
import DropDown from "../../../components/DropDown";
import GridComponent from "../../../components/Grid";
import ButtonComponent from "../../../components/Button"
import {
  Columns
} from "./PhysiciansData";
import {
  countryStateGetUrl
} from "../../processPatients/patients/patientDetails/patientDetailSummary/patientDetailSummaryData.js";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class PhysiciansDetails extends Component {
  state = {
    filterName: this.props.filterName,
    selected: 0,
  };
  handleSelect = (e) => {
    this.setState({ selected: e.selected });
  };
  onSortChange = () => {

  }
  render() {
    return (
      <Fragment>

        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-12">
            <TabStrip selected={this.state.selected} onSelect={this.handleSelect} style={{ height: "310px" }}>
              <TabStripTab title="Provider Info" style={{ height: "310px" }}>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap", marginLeft: "93px" }}
                >
                  <div style={{ width: "168px" }}>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Salutation</label>
                    </div>
                    <div style={{ width: "100px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.Salutation}
                        onChange={(e) =>
                          this.setState({
                            Salutation: e.value,
                          })
                        }
                      ></TextBox>
                    </div>
                  </div>
                  <div style={{ float: "left", width: "282px", marginLeft: "13px" }}>
                    <div style={{ float: "left" }}>
                      <label className="userInfoLabel">First Name</label>
                    </div>
                    <div style={{ float: "left", width: "140px" }}>
                      <TextBox
                        value={this.state.firstName}
                        className="unifyHeight"
                        onChange={(e) => this.setState({ firstName: e.value })}
                      ></TextBox>
                    </div>
                    <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">M.I.</label>
                    </div>
                    <div style={{ float: "left", width: "36px" }}>
                      <TextBox
                        max={1}
                        className="unifyHeight"
                        value={this.state.MI}
                        onChange={(e) => this.setState({ MI: e.value })}
                      ></TextBox>
                    </div>
                  </div>
                  <div style={{ float: "left", width: "401px" }}>
                    <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">Last Name</label>
                    </div>
                    <div style={{ float: "left", width: "140px" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.LastName}
                        onChange={(e) => {
                          this.setState({ LastName: e.value });
                        }}
                      ></TextBox>
                    </div>
                    <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">Suffix</label>
                    </div>
                    <div style={{ float: "left", width: "70px" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.Suffix}
                        onChange={(e) => {
                          this.setState({ Suffix: e.value });
                        }}
                      ></TextBox>
                    </div>
                  </div>
                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap", marginLeft: "98px" }}
                >
                  <div style={{ width: "391px" }}>
                    <div style={{ float: "left" }}>
                      <label className="userInfoLabel">List Name</label>
                    </div>
                    <div style={{ width: "200px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.ListName}
                        onChange={(e) =>
                          this.setState({
                            ListName: e.value,
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
                  <div style={{ width: "358px" }}>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Tax Identification Number</label>
                    </div>
                    <div style={{ width: "200px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.TaxIdentificationNumber}
                        onChange={(e) =>
                          this.setState({
                            TaxIdentificationNumber: e.value,
                          })
                        }
                      ></TextBox>
                    </div>
                  </div>
                  <div style={{ width: "300px" }}>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Taxonomy Code</label>
                    </div>
                    <div style={{ width: "200px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.TaxonomyCode}
                        onChange={(e) =>
                          this.setState({
                            TaxonomyCode: e.value,
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
                  {/* <div style={{ width: "419px" }}>
                    <div style={{ float: "left", marginLeft: "129px" }}>
                      <label className="userInfoLabel">SSN</label>
                    </div>
                    <div className="SSNStyle" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="###-##-####"
                        placeholder="000-00-00000"
                        className="unifyHeight"
                        value={this.state.SS}
                        onValueChange={(e) => this.setState({ SS: e.value })}
                      ></TextBox>
                    </div>
                  </div> */}
                  <div style={{ width: "246px", marginLeft: "118px" }}>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">UPIN</label>
                    </div>
                    <div style={{ width: "200px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.UPIN}
                        onChange={(e) =>
                          this.setState({
                            UPIN: e.value,
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
                  <div style={{ width: "390px" }}>
                    <div style={{ float: "left", marginLeft: "55px" }}>
                      <label className="userInfoLabel">Provider Position</label>
                    </div>
                    <div style={{ width: "200px", float: "left" }}>
                      <DropDown
                        className="unifyHeight"
                        value={this.state.ProviderPosition}
                        onChange={(e) =>
                          this.setState({
                            ProviderPosition: e.value,
                          })
                        }
                      ></DropDown>
                    </div>
                  </div>

                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ width: "391px" }}>
                    <div style={{ float: "left", marginLeft: "118px" }}>
                      <label className="userInfoLabel">DEA #</label>
                    </div>
                    <div style={{ width: "200px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.DEA}
                        onChange={(e) =>
                          this.setState({
                            DEA: e.value,
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


                </div>
                <br />
              </TabStripTab>
              <TabStripTab title="Contact/Address">
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ width: "344px" }}>
                    <div style={{ float: "left", marginLeft: "22px" }}>
                      <label className="userInfoLabel">Company</label>
                    </div>
                    <div style={{ width: "260px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.Company}
                        onChange={(e) =>
                          this.setState({
                            Company: e.value,
                          })
                        }
                      ></TextBox>
                    </div>
                  </div>
                  <div style={{ width: "272px" }}>
                    <div style={{ float: "left", marginLeft: "3px" }}>
                      <label className="userInfoLabel">Occupation</label>
                    </div>
                    <div style={{ width: "200px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.Occupation}
                        onChange={(e) =>
                          this.setState({
                            Occupation: e.value,
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
                  <div style={{ width: "432px" }}>
                    <div style={{ float: "left", marginLeft: "43px" }}>
                      <label className="userInfoLabel">Email</label>
                    </div>
                    <div style={{ width: "260px", float: "left" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.Email}
                        onChange={(e) =>
                          this.setState({
                            Email: e.value,
                          })
                        }
                      ></TextBox>
                    </div>
                  </div>

                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row" }}
                >
                  <div style={{ float: "left", width: "377px" }}>
                    <div style={{ float: "left", marginLeft: "17px" }}>
                      <label className="userInfoLabel">Address 1</label>
                    </div>
                    <div style={{ float: "left", width: "300px" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.Address1}
                        onChange={(e) => {
                          this.setState({ Address1: e.value });
                        }}
                      ></TextBox>
                    </div>
                  </div>


                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ float: "left", width: "377px" }}>
                    <div style={{ float: "left", marginLeft: "17px" }}>
                      <label className="userInfoLabel">Address 2</label>
                    </div>
                    <div style={{ float: "left", width: "300px" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.Address2}
                        onChange={(e) => this.setState({ Address2: e.value })}
                      ></TextBox>
                    </div>
                  </div>
                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ float: "left", width: "400px" }}>
                    <div style={{ float: "left", marginLeft: "51px" }}>
                      <label className="userInfoLabel">City</label>
                    </div>
                    <div style={{ float: "left", width: "133px" }}>
                      <TextBox
                        className="unifyHeight"
                        value={this.state.City}
                        onChange={(e) => this.setState({ City: e.value })}
                      ></TextBox>
                    </div>
                    <div style={{ float: "left", marginLeft: "29px" }}>
                      <label className="userInfoLabel">State</label>
                    </div>
                    <div style={{ float: "left", width: "105px" }}>
                      <DropDown
                        className="unifyHeight"
                        id="stateList"
                        name="stateList"
                        type="remoteDropDown"
                        textField="stateCode"
                        dataItemKey="stateCode"
                        getBaseUrl={(filter) => countryStateGetUrl(filter)}
                        value={this.state.Statevalue}
                        onChange={(e) => this.setState({ Statevalue: e.value })}
                      ></DropDown>
                    </div>
                  </div>
                  <div style={{ float: "left", width: "336px" }}>
                    <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">Zip</label>
                    </div>
                    <div className="ZipStyle" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="#####-####"
                        placeholder="00000-0000"
                        className="unifyHeight"
                        value={this.state.Zip}
                        onValueChange={(e) => this.setState({ Zip: e.target.value })}
                      ></TextBox>
                    </div>
                    {/* <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">SSN</label>
                    </div>
                    <div className="SSNStyle" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="###-##-####"
                        placeholder="000-00-00000"
                        className="unifyHeight"
                        value={this.state.SS}
                        onValueChange={(e) => this.setState({ SS: e.value })}
                      ></TextBox>
                    </div> */}
                  </div>
                </div>

                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row" }}
                >
                  <div style={{ float: "left", width: "440px" }}>
                    <div style={{ float: "left" }}>
                      <label className="userInfoLabel">Home Phone</label>
                    </div>
                    <div className="PhoneStyle" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="(###) ###-####"
                        placeholder="(000) 000-0000"
                        className="unifyHeight"
                        value={this.state.HomePhone}
                        onValueChange={(e) =>
                          this.setState({ HomePhone: e.target.value })
                        }
                      ></TextBox>
                    </div>
                  </div>


                </div>

                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ float: "left", width: "435px" }}>
                    <div style={{ float: "left", marginLeft: "3px" }}>
                      <label className="userInfoLabel">Work Phone</label>
                    </div>
                    <div className="PhoneStyle" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="(###) ###-####"
                        placeholder="(000) 000-0000"
                        className="unifyHeight"
                        value={this.state.WorkPhone}
                        onValueChange={(e) =>
                          this.setState({ WorkPhone: e.target.value })
                        }
                      ></TextBox>
                    </div>
                    <div style={{ float: "left", marginLeft: "5px" }}>
                      <label className="userInfoLabel">Ext</label>
                    </div>
                    <div className="phoneExt" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="#####"
                        placeholder="00000"
                        className="unifyHeight"
                        value={this.state.Ext}
                        onValueChange={(e) => this.setState({ Ext: e.target.value })}
                      ></TextBox>
                    </div>
                  </div>
                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ float: "left", width: "400px" }}>
                    <div style={{ float: "left", marginLeft: "13px" }}>
                      <label className="userInfoLabel">Cell Phone</label>
                    </div>
                    <div className="PhoneStyle" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="(###) ###-####"
                        placeholder="(000) 000-0000"
                        className="unifyHeight"
                        value={this.state.CellPhone}
                        onValueChange={(e) =>
                          this.setState({ CellPhone: e.target.value})
                        }
                      ></TextBox>
                    </div>
                  </div>
                </div>
                <div
                  className="rowHeight"
                  style={{ display: "flex", flexFlow: "row nowrap" }}
                >
                  <div style={{ width: "356px" }}>
                    <div style={{ float: "left", marginLeft: "53px" }}>
                      <label className="userInfoLabel">Fax</label>
                    </div>
                    <div className="PhoneStyle" style={{ float: "left" }}>
                      <TextBox
                        type="maskedTextBox"
                        format="(###) ###-####"
                        placeholder="(000) 000-0000"
                        className="unifyHeight"
                        value={this.state.fax}
                        onValueChange={(e) =>
                          this.setState({ fax: e.target.value })
                        }
                      ></TextBox>
                    </div>
                  </div>
                </div>


                <br />
              </TabStripTab>
              <TabStripTab title="Plan">
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
                        columns={
                          Columns
                        }
                        height="200px"
                        width="100%"
                        onSelectionChange={this.onPatientGridSelectionChange}
                        onRowDoubleClick={this.onPatientGridDoubleSelectionChange}
                        selectionMode="single"
                        sortColumns={[]}
                        onSortChange={this.onSortChange}
                      ></GridComponent>
                    </div>
                  </div>
                </div>

              </TabStripTab>
            </TabStrip>
          </div>
          <div className="col-12" style={{ marginTop: "10px", marginBottom: "10px" }}>
            <div style={{ float: "left" }}>
              <ButtonComponent
                type="edit"
                icon="edit"
                classButton="infraBtn-primary insurance-button "
                onClick={() => {
                  this.props.setInsuranceExpanded();
                }}
              >
                Save
              </ButtonComponent>
            </div>
            <div style={{ float: "left", width: "200px !important" }}>
              <ButtonComponent
                type="edit"
                icon="cancel"
                classButton="infraBtn-primary insurance-button "
                onClick={() => {
                  this.props.setInsuranceExpanded();
                }}
              >
                Cancel
              </ButtonComponent>
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
)(PhysiciansDetails);
