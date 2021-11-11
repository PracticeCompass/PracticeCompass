import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const DropdownFilterCell = (props) => {
  const hasValue = (value) => Boolean(value && value !== props.defaultValue);

  const onChange = (event) => {
    const hasValueNew = hasValue(event.target.value);
    props.onChange({
      value: hasValueNew ? event.target.value : "",
      operator: hasValueNew ? "eq" : "",
      syntheticEvent: event.syntheticEvent,
    });
  };

  const onClearButtonClick = (event) => {
    event.preventDefault();
    props.onChange({
      value: "",
      operator: "",
      syntheticEvent: event,
    });
  };

  return (
    <div className="k-filterable">
      <DropDownList
        data={props.data}
        onChange={onChange}
        value={props.value || props.defaultValue}
        defaultItem={props.defaultValue}
      />
      <button
        className="k-button k-button-icon k-clear-button-visible"
        title="Clear"
        disabled={!hasValue(props.value)}
        onClick={onClearButtonClick}
      >
        <span className="k-icon k-i-filter-clear" />
      </button>
    </div>
  );
};

export default DropdownFilterCell;
