import * as React from "react";
import { Slider, NumericTextBox } from "@progress/kendo-react-inputs";
import { Pager } from "@progress/kendo-react-data-tools";
import { useTableKeyboardNavigation } from "@progress/kendo-react-data-tools";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import DropDown from "./DropDown";
export const MyPager = (props) => {
  const currentPage = Math.floor(props.skip / props.take) + 1;
  const totalPages = Math.ceil((props.total || 0) / props.take);
  const totalTake =
    props.skip + props.take > props.total ?? 0
      ? props.total
      : props.skip + props.take;
  const handleChange = (e) => {
    if (props.onPageChange) {
      props.onPageChange({
        skip: (e.value - 1) * props.take,
        take: props.take,
        syntheticEvent: e,
        nativeEvent: e.nativeEvent,
        target: e.target,
      });
    }
  };

  return (
    <div
      className={props.className}
      style={{
        borderTop: "1px solid",
        borderTopColor: "inherit",
      }}
    >
      <div className="row">
        <div className="col-8">
          <Pager
            style={{ border: "none" }}
            skip={props.skip}
            take={props.take}
            total={props.total}
            onPageChange={props.onPageChange}
            buttonCount={10}
            info={false}
            previousNext={true}
            type="numeric"
          />
        </div>

        <div className="col-4" style={{ textAlign: "center" }}>
          <label>{`${
            props.total > 0 ? props.skip + 1 + " - " : ""
          }${totalTake} of ${props.totalCount ?? props.total} items`}</label>
        </div>
      </div>
    </div>
  );
};
export const CurrencyCell = (props) => {
  let column = props.myProp.columns.find((x) => x.field == props.field);
  let columnStyle={};
  let isNegative=false;
  let value=Number(props.dataItem[props.field]);
  if(!isNaN(+props.dataItem[props.field]) && (value<0)){
    columnStyle.color="red";
    isNegative=true;
    value=value*-1;
  }
  if (column.fontColor)columnStyle.color=column.fontColor;
  if(column.fontWeight) columnStyle.fontWeight=column.fontWeight;
  return (
    <td
    style={columnStyle}
      ref={(node) => {
        if (node) {
          node.style.setProperty("text-align", "right", "important");
          node.style.setProperty("padding-right", "5px", "important");
        }
      }}
    >
      {props.dataItem[props.field] == null || props.dataItem[props.field].toString().includes("$") ? props.dataItem[props.field]
        : '$' +(isNegative?'(':'') + (value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))+(isNegative?')':'')  }
    </td>
  );
};
export const cellWithIcon = (props) => {
  return (
    <td style={{ color: "red" }}>
      <span className="k-icon k-i-file-pdf k-i-pdf"></span>
    </td>
  );
};
export const CustomCell = (props) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  const navigationAttributes = useTableKeyboardNavigation(props.id);
  //let column = props.myProp.columns[props.columnIndex];
  let column = props.myProp.columns.find((x) => x.field == field);

  if (column.type === "checkBox") {
    return (
      <td
        colSpan={props.colSpan}
        role={"gridcell"}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
        {...navigationAttributes}
      >
        <Checkbox
          style={{ marginLeft: "35%" }}
          value={value}
          disabled={props.dataItem.inEdit != true}
        />
      </td>
    );
  } else if (column.type === "button") {
    return (
      <td
        colSpan={props.colSpan}
        role={"gridcell"}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
        {...navigationAttributes}
      >
        <Button
          className={"infraBtn infraBtn-primary gridbtn"}
          //   onClick={this.props.onClick}
          style={{ padding: "0px !important;" }}
          // disabled={true}
        >
          {column.title}
        </Button>
      </td>
    );
  } else if (column.type === "dropDown") {
    return (
      <td
        colSpan={props.colSpan}
        role={"gridcell"}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
        // {...{
        //   [GRID_COL_INDEX_ATTRIBUTE]: props.columnIndex,
        // }}
        {...navigationAttributes}
      >
        <DropDown
          className="unifyHeight"
          type={column.dropDownType != null ? column.dropDownType : null}
          textField={column.textField}
          dataItemKey={column.dataItemKey}
          data={column.data}
          // value={this.state.CompanyName}
          getBaseUrl={props.myProp.getBaseUrl}
          // onChange={(e) => this.setState({ CompanyName: e.value })}
        ></DropDown>
      </td>
    );
  } else {
    return (
      <td
        colSpan={props.colSpan}
        role={"gridcell"}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
        // {...{
        //   [GRID_COL_INDEX_ATTRIBUTE]: props.columnIndex,
        // }}
        {...navigationAttributes}
      >
        value
      </td>
    );
  }
};
