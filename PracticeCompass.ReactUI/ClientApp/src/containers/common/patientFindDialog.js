import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import TextBox from "../../components/TextBox";
import DropDown from "../../components/DropDown";
import ButtonComponent from "../../components/Button";
import DatePickerComponent from "../../components/DatePicker";
import { getter } from "@progress/kendo-react-common";
import GridComponent from "../../components/Grid";
import { DOBFilter } from "../../containers/processPatients/patients/patient/patientData";
import { getpatientList } from "../../redux/actions/patient";
function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        getPatientList: (
            fname,
            lname,
            patientAccountNumber,
            patientNumber,
            dobType,
            dob,
            skip,
            refreshData
        ) =>
            dispatch(
                getpatientList(
                    fname,
                    lname,
                    patientAccountNumber,
                    patientNumber,
                    dobType,
                    dob,
                    skip,
                    refreshData
                )
            ),
    };
}
class PatientFindDialogComponent extends Component {
    state = {
        filterName: this.props.filterName,
        dobtype: null,
        dob: null,
        patientAccountNumber: null,
        fName: null,
        lName: null,
        patientNumber: null,
        skip: 0,
    };
    patientsearch = async (refreshData = true) => {
        await this.props.getPatientList(
            this.state.fName,
            this.state.lName,
            this.state.patientAccountNumber,
            this.state.patientNumber,
            this.state.dobtype ? this.state.dobtype.id : 0,
            this.state.dob ? this.state.dob.toLocaleDateString() : "",
            refreshData ? 0 : this.props.data.length ?? 0,
            refreshData
        );
    };
    onSortChange = () => { };
    onKeyDown = () => { };
    getNextData = async () => {
        await this.patientsearch(false);
        this.setState({ isVisibleNextData: false });
    };
    pageChange = async (skip, take) => {
        if (skip == 0) return;
        if (this.props.data.length < skip + take + 1) {
            this.setState({ isVisibleNextData: true, skip: this.props.data.length });
            this.getNextData();
        } else {
            this.setState({ isVisibleNextData: false });
        }
    };
    onSelectionChange = () => {

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
                        <div style={{ marginLeft: "25px", width: "200px" }}>
                            <TextBox
                                id="firstName"
                                placeholder="Enter First Name" //"Enter Insurance Company Name"
                                value={this.state.fName}
                                onChange={(e) =>
                                    this.setState({
                                        fName: e.value,
                                    })
                                }
                            // onEnterPress={this.props.clickOnSearch}
                            ></TextBox>
                        </div>
                        <div style={{ marginLeft: "10px", width: "200px" }}>
                            <TextBox
                                id="lastName"
                                placeholder="Enter Last Name" //"Enter Insurance Company Name"
                                value={this.state.lName}
                                onChange={(e) =>
                                    this.setState({
                                        lName: e.value,
                                    })
                                }
                            // onEnterPress={this.props.clickOnSearch}
                            ></TextBox>
                        </div>
                        <div style={{ marginLeft: "10px", width: "200px" }}>
                            <TextBox
                                id="insuranceDialog"
                                placeholder="Enter Patient Account Number" //"Enter Insurance Company Name"
                                value={this.state.patientAccountNumber}
                                onChange={(e) =>
                                    this.setState({
                                        patientAccountNumber: e.value,
                                    })
                                }
                            // onEnterPress={this.props.clickOnSearch}
                            ></TextBox>
                        </div>
                        <div style={{ width: "200px", marginLeft: "10px" }}>
                            <ButtonComponent
                                icon="search"
                                type="search"
                                classButton="infraBtn-primary action-button"
                                onClick={this.patientsearch}
                            >
                                Search
                            </ButtonComponent>
                        </div>
                    </div>
                    <div className="row">
                        <div style={{ marginLeft: "25px", width: "200px" }}>
                            <TextBox
                                id="insuranceDialog"
                                placeholder="Enter Patient Number" //"Enter Insurance Company Name"
                                value={this.state.patientNumber}
                                onChange={(e) =>
                                    this.setState({
                                        patientNumber: e.value,
                                    })
                                }
                            // onEnterPress={this.props.clickOnSearch}
                            ></TextBox>
                        </div>
                        <div style={{ float: "left", marginLeft: "10px" }}>
                            <label className="userInfoLabel">DOB</label>
                        </div>
                        <div
                            style={{
                                float: "left",
                                width: "148px",
                                marginRight: "3px",
                            }}
                        >
                            <DropDown
                                className="unifyHeight"
                                id="DOB"
                                name="DOB"
                                data={DOBFilter}
                                textField="text"
                                dataItemKey="text"
                                defaultValue={{ id: "1", text: "Equal" }}
                                value={this.state.dobtype}
                                onChange={(e) => this.setState({ dobtype: e.value })}
                            ></DropDown>
                        </div>
                        <div style={{ float: "left", width: "164px" }}>
                            <DatePickerComponent
                                className="unifyHeight"
                                placeholder="Select Patient DOB"
                                format="M/dd/yyyy"
                                value={this.state.dob}
                                onChange={(e) => this.setState({ dob: e.value })}
                            ></DatePickerComponent>
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
                                    total={
                                        this.props.data != null && this.props.data.length > 0
                                            ? this.props.data[0].count
                                            : null
                                    }
                                    totalCount={
                                        this.props.data != null && this.props.data.length > 0
                                            ? this.props.data[0].totalCount
                                            : this.props.data.length
                                    }
                                    onSelectionChange={this.onSelectionChange}
                                    onRowDoubleClick={this.props.onRowDoubleClick}
                                    //onKeyDown={this.props.onKeyDown}
                                    columns={this.props.columns}
                                    data={this.props.data}
                                    //sort={this.props.sort}
                                    allowUnsort={true}
                                    multiple={false}
                                    selectionMode="single"
                                    //sortable={true}
                                    idGetter={this.props.idGetterLookup}
                                    DATA_ITEM_KEY={this.props.dataItemKey}
                                    sortColumns={[]}
                                    onSortChange={this.onSortChange}
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
)(PatientFindDialogComponent);
