import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import RemoteDropDown from "./RemoteDropDown";
import {
  AutoComplete,
  ComboBox,
  MultiColumnComboBox,
  DropDownList,
  MultiSelect,
  DropDownTree,
} from "@progress/kendo-react-dropdowns";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

const columns = [
  {
    field: "id",
    header: "ID",
    width: "100px",
  },
  {
    field: "name",
    header: "Name",
    width: "300px",
  },
  {
    field: "position",
    header: "Position",
    width: "300px",
  },
];
const getRemoteDropDown = (props) => {
  return (
    <RemoteDropDown
      value={props.value}
      width={props.width}
      dataItemKey={props.dataItemKey}
      textField={props.textField}
      getBaseUrl={(filter) => props.getBaseUrl(filter)}
      onChange={props.onChange}
    ></RemoteDropDown>
  );
};
const GetItemHtml = (items) => {
  let props = items.props;
  if (props.type == "autoComplete") {
    return (
      <AutoComplete
        className="unifyHeight"
        id={props.id}
        data={props.data}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    );
  } else if (props.type == "dropDownList") {
    return (
      <DropDownList
        className={props.className ?? "unifyHeight"}
        id={props.id}
        textField={props.textField ?? "text"}
        data={props.data}
        dataItemKey={props.dataItemKey ?? "id"}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    );
  } else if (props.type == "multiColumnComboBox") {
    return (
      <MultiColumnComboBox
        className="unifyHeight"
        id={props.id}
        data={props.data}
        columns={props.columns ?? columns}
        textField={props.textField ?? "name"}
        onChange={props.onChange}
      />
    );
  } else if (props.type == "multiSelect") {
    return (
      <MultiSelect
        className="unifyHeight"
        id={props.id}
        data={props.data}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    );
  } else if (props.type == "dropDownTree") {
    return (
      <DropDownTree
        className={props.className ?? "unifyHeight"}
        id={props.id}
        data={props.data}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        textField={props.textField ?? "text"}
        dataItemKey={props.dataItemKey ?? "id"}
      />
    );
  } else if (props.type == "remoteDropDown") {
    return getRemoteDropDown(props);
  } else {
    return (
      <ComboBox
        className={props.className ?? "unifyHeight"}
        disabled={props.disabled}
        id={props.id}
        textField={props.textField ?? "text"}
        data={props.data}
        dataItemKey={props.dataItemKey ?? "id"}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        filterable={true}
        width="300px"
        style={{ fontSize: "11px", width:"300px" }}
      />
    );
  }
};
class DropDown extends Component {
  render() {
    return (
      <Fragment>
        <GetItemHtml props={this.props}></GetItemHtml>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
