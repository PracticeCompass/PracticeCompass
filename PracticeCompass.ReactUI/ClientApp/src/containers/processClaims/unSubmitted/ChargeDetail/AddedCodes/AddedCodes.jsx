import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CheckboxComponent from "components/Checkbox";
import TextBox from "components/TextBox";
import ButtonComponent from "components/Button";
import DropDown from "components/DropDown";
import { TextArea } from "@progress/kendo-react-inputs";
import { units } from "../ChargeDetailData";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class AddedCodes extends Component {
  state = {
    proc1: null,
    descriptionProc1: null,
    anesthesia: false,
    proc2: null,
    descriptionProc2: null,
    minutes: null,
    timeUnits: null,
    chargeNote: null,
    includeInStatement: false,
    includeInClaim: false,
    NDCCode: null,
    quantity: null,
    units: null,
  };
  render() {
    return (
      <Fragment>
        <div style={{ width: "100%", padding: "5px" }}>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ float: "left" }}>
              <fieldset
                className="fieldsetStyle"
                style={{ width: "740px", height: "150px", marginRight: "10px" }}
              >
                {/* <legend
                                    className="legendStyle"
                                    style={{ paddingRight: "5px", paddingLeft: "5px" }}
                                >
                                </legend> */}
                <div>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <div style={{ float: "left" }}>
                      <CheckboxComponent
                        id="anesthesia"
                        label="Anesthesia"
                        value={this.state.anesthesia}
                        onChange={(e) => this.setState({ anesthesia: e.value })}
                      />
                    </div>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "134px" }}>
                        <label className="userInfoLabel">
                          Related Surgical Procedures
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rowHeight"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      paddingLeft: "10px",
                    }}
                  >
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left" }}>
                        <label className="userInfoLabel">Time From</label>
                      </div>
                      <div style={{ float: "left", width: "100px" }}>
                        <TextBox
                          value={this.state.description}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ description: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Proc1</label>
                      </div>
                      <div style={{ float: "left", width: "100px" }}>
                        <TextBox
                          value={this.state.proc1}
                          className="unifyHeight"
                          onChange={(e) => this.setState({ proc1: e.value })}
                        ></TextBox>
                      </div>
                      <div style={{ float: "left", marginTop: "-3px" }}>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={this.togglePatientDialog}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "345px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "260px" }}>
                        <TextBox
                          value={this.state.descriptionProc1}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionProc1: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rowHeight"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      paddingLeft: "10px",
                    }}
                  >
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Time To</label>
                      </div>
                      <div style={{ float: "left", width: "100px" }}>
                        <TextBox
                          value={this.state.description}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ description: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Proc2</label>
                      </div>
                      <div style={{ float: "left", width: "100px" }}>
                        <TextBox
                          value={this.state.proc1}
                          className="unifyHeight"
                          onChange={(e) => this.setState({ proc2: e.value })}
                        ></TextBox>
                      </div>
                      <div style={{ float: "left", marginTop: "-3px" }}>
                        <ButtonComponent
                          icon="search"
                          type="search"
                          classButton="infraBtn-primary find-button"
                          onClick={this.togglePatientDialog}
                        >
                          Find
                        </ButtonComponent>
                      </div>
                    </div>
                    <div style={{ float: "left", width: "345px" }}>
                      <div style={{ float: "left", marginLeft: "10px" }}>
                        <label className="userInfoLabel">Description</label>
                      </div>
                      <div style={{ float: "left", width: "260px" }}>
                        <TextBox
                          value={this.state.descriptionProc2}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ descriptionProc2: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rowHeight"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      paddingLeft: "10px",
                    }}
                  >
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Minutes</label>
                      </div>
                      <div style={{ float: "left", width: "100px" }}>
                        <TextBox
                          value={this.state.minutes}
                          className="unifyHeight"
                          onChange={(e) => this.setState({ minutes: e.value })}
                        ></TextBox>
                      </div>
                    </div>
                    <div style={{ float: "left" }}>
                      <div style={{ float: "left", marginLeft: "15px" }}>
                        <label className="userInfoLabel">Time Units</label>
                      </div>
                      <div style={{ float: "left", width: "69px" }}>
                        <TextBox
                          value={this.state.timeUnits}
                          className="unifyHeight"
                          onChange={(e) =>
                            this.setState({ timeUnits: e.value })
                          }
                        ></TextBox>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div style={{ float: "left" }}>
              <fieldset
                className="fieldsetStyle"
                style={{ width: "400px", height: "150px" }}
              >
                <legend
                  className="legendStyle"
                  style={{ paddingRight: "5px", paddingLeft: "5px" }}
                >
                  Notes
                </legend>
                <div>
                  <div
                    className="rowHeight"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      paddingLeft: "10px",
                    }}
                  >
                    <div style={{ float: "left" }}>
                      <label className="userInfoLabel">Charge Note</label>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      paddingLeft: "10px",
                      paddingRight: "5px",
                    }}
                  >
                    <TextArea
                      rows={5}
                      style={{ width: "100%", height: "2cm" }}
                      value={this.state.chargeNote ?? ""}
                      onChange={(e) => {
                        this.setState({ chargeNote: e.value });
                      }}
                    ></TextArea>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      paddingLeft: "10px",
                      paddingRight: "5px",
                    }}
                  >
                    <div style={{ float: "left" }}>
                      <CheckboxComponent
                        id="includeInStatement"
                        label="Include In Statement"
                        value={this.state.includeInStatement}
                        onChange={(e) =>
                          this.setState({ includeInStatement: e.value })
                        }
                      />
                    </div>
                    <div style={{ float: "left" }}>
                      <CheckboxComponent
                        style={{ marginRight: "5px" }}
                        id="includeInClaim"
                        label="Include In Claim"
                        value={this.state.includeInClaim}
                        onChange={(e) =>
                          this.setState({ includeInClaim: e.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <div style={{ float: "left" }}>
              <fieldset
                className="fieldsetStyle"
                style={{ width: "280px", height: "110px" }}
              >
                <legend
                  className="legendStyle"
                  style={{ paddingRight: "5px", paddingLeft: "5px" }}
                >
                  NDC Codes
                </legend>
                <div>
                  <div
                    className="rowHeight"
                    style={{ display: "flex", flexFlow: "row" }}
                  >
                    <div style={{ float: "left", marginLeft: "15px" }}>
                      <label className="userInfoLabel">NDC Code</label>
                    </div>
                    <div style={{ float: "left", width: "100px" }}>
                      <TextBox
                        value={this.state.NDCCode}
                        className="unifyHeight"
                        onChange={(e) => this.setState({ NDCCode: e.value })}
                      ></TextBox>
                    </div>
                  </div>
                  <div
                    className="rowHeight"
                    style={{ display: "flex", flexFlow: "row" }}
                  >
                    <div style={{ float: "left", marginLeft: "23px" }}>
                      <label className="userInfoLabel">Quantity</label>
                    </div>
                    <div style={{ float: "left", width: "100px" }}>
                      <TextBox
                        value={this.state.quantity}
                        className="unifyHeight"
                        onChange={(e) => this.setState({ quantity: e.value })}
                      ></TextBox>
                    </div>
                  </div>
                  <div
                    className="rowHeight"
                    style={{ display: "flex", flexFlow: "row" }}
                  >
                    <div style={{ float: "left", marginLeft: "42px" }}>
                      <label className="userInfoLabel">Units</label>
                    </div>
                    <div style={{ float: "left", width: "100px" }}>
                      <DropDown
                        className="unifyHeight"
                        data={units}
                        value={this.state.units}
                        onChange={(e) => this.setState({ units: e.value })}
                      ></DropDown>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddedCodes);
