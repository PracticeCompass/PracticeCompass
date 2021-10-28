import * as React from "react";
import { Slider, NumericTextBox } from '@progress/kendo-react-inputs';
import { Pager } from "@progress/kendo-react-data-tools";
import { useTableKeyboardNavigation } from "@progress/kendo-react-data-tools";
import { Checkbox } from "@progress/kendo-react-inputs";
import DropDown from "./DropDown";
export const MyPager = (props) => {
    const currentPage = Math.floor(props.skip / props.take) + 1;
    const totalPages = Math.ceil((props.total || 0) / props.take);
    const totalTake= (props.skip+props.take)>props.total??0?props.total:props.skip+props.take;
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
                       style={{border:"none"}}
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

                <div className="col-4" style={{textAlign:"end"}}>
                    <label style={{marginRight:"20px"}}>{`${props.total>0?props.skip+1+' - ':''}${totalTake} of ${props.totalCount??props.total} items`}</label></div>
            </div>
        </div>
    );
};
export const CurrencyCell = (props) => {
    return <td style={{ textAlign: "right" }}>{props.dataItem[props.field]}</td>;
};
export const cellWithIcon = (props) => {
    return <td style={{color: "red"}}><span className="k-icon k-i-file-pdf k-i-pdf"></span></td>;
};
export const CustomCell = (props) => {
    const field = props.field || "";
    const value = props.dataItem[field];
    const navigationAttributes = useTableKeyboardNavigation(props.id);
    let column = props.myProp.columns[props.columnIndex];
    if (column.type === "checkBox") {
        return (
            <td
                colSpan={props.colSpan}
                role={"gridcell"}
                aria-colindex={props.ariaColumnIndex}
                aria-selected={props.isSelected}
                {...navigationAttributes}
            >
                <Checkbox style={{ marginLeft: "35%" }} disabled={true} />
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
export const MyCommandCell = props => {
    const {
      dataItem
    } = props;
    const inEdit = dataItem[props.editField];
    const isNewItem = dataItem.ProductID === undefined;
    return inEdit ? <td className="k-command-cell">
        <button className="k-button k-grid-save-command" onClick={() => isNewItem ? props.add(dataItem) : props.update(dataItem)}>
          {isNewItem ? "Add" : "Update"}
        </button>
        <button className="k-button k-grid-cancel-command" onClick={() => isNewItem ? props.discard(dataItem) : props.cancel(dataItem)}>
          {isNewItem ? "Discard" : "Cancel"}
        </button>
      </td> : <td className="k-command-cell">
        <button className="k-primary k-button k-grid-edit-command" onClick={() => props.edit(dataItem)}>
          Edit
        </button>
        <button className="k-button k-grid-remove-command" onClick={() => props.confirm("Confirm deleting: " + dataItem.ProductName) && props.remove(dataItem)}>
          Remove
        </button>
      </td>;
  };