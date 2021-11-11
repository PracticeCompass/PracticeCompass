import * as React from "react";
import { connect } from "react-redux";

import {
    Grid,
    GridColumn as Column,
    getSelectedState,
    getSelectedStateFromKeyDown,
    GridToolbar
} from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
import { Slider, NumericTextBox } from "@progress/kendo-react-inputs";
import { filterBy, orderBy } from "@progress/kendo-data-query";
import { MyPager, CurrencyCell, CustomCell, cellWithIcon, MyCommandCell } from "./GridData.js";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { GetGridColumns, SaveGridColumns } from "../redux/actions/GridColumns";
import ButtonComponent from "./Button"
import $ from "jquery";
import DropDownCell from "./DropDownCell";
import CheckBoxCell from "./CheckBoxCell";
import CurrencyGridCell from "./CurrencyCell";
import MergeCell from "./mergeCell";
const SELECTED_FIELD = "selected";
const ADJUST_PADDING = 4;
const COLUMN_MIN = 4;

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        GetGridColumns: (name) => dispatch(GetGridColumns(name)),
        SaveGridColumns: (name, columns) =>
            dispatch(SaveGridColumns(name, columns)),
    };
}

class ColumnNameCell extends React.Component {
    render() {
        return (
            <td title={this.props.dataItem[this.props.field]}>
                {this.props.dataItem[this.props.field]}
            </td>
        );
    }
}
class EditableGrid extends React.Component {
    MyCustomCell = (props) => {
        return <CustomCell {...props} myProp={this.props} />;
    };
    Currentpager = (props) => {
        return <MyPager {...props} totalCount={this.props.totalCount} />;
    };
    minGridWidth = 0;
    state = {
        selectedState: {},
        setMinWidth: false,
        gridCurrent: 0,
        skip: 0,
        take: 15,
        filterable: false,
        filter: {},
        sort: [],
        allowUnsort: true,
        multiple: false,
        dragEnabled: false,
        cellEnabled: false,
        selectionMode: "single",
        patientDataItemKey: "",
        hasCheckBox: false,
        activeRowRender: false,
        editID: null,
    };
    rowRender = (trElement, props) => {
        if (this.state.activeRowRender) {
            return this.props.onRowRender(trElement, props);
        } else return React.cloneElement(trElement, trElement.props.children);
    };
    pageChange = (event) => {
        try {
            this.setState({
                skip: event.page.skip,
                take: event.page.take,
            });
            this.props.pageChange(event.page.skip, event.page.take);
        } catch (error) { }
    };
    onColumnReorder = async (event) => {
        //localStorage.setItem(this.props.id, JSON.stringify(event.columns));
        await this.props.SaveGridColumns(
            this.props.id,
            JSON.stringify(event.columns)
        );
    };
    async componentDidUpdate(prevProps) {
        if (prevProps.data !== null && this.props.data != null && prevProps.data.length > this.props.data.length) {
           await this.setState({ skip: 0})
        }
    }
    componentDidMount() {
        this.grid = document.querySelector(".k-grid");
        window.addEventListener("resize", this.handleResize);
        if (this.props.columns) {
            this.props.columns.map((item) =>
                item.minWidth !== undefined
                    ? (this.minGridWidth += item.minWidth)
                    : this.minGridWidth
            );
            this.setState({
                allowUnsort: this.props.allowUnsort,
                multiple: this.props.multiple,
                filter: this.props.filter,
                filterable: this.props.filterable,
                sort: this.props.sortColumns,
                gridCurrent: this.grid.offsetWidth,
                setMinWidth: this.grid.offsetWidth < this.minGridWidth,
                patientDataItemKey: this.props.DATA_ITEM_KEY,
                selectionMode: this.props.selectionMode,
                skip: this.props.skip ? this.props.skip : 0,
                take: this.props.take ? this.props.take : 15,
                data: this.props.data ?? null,
                hasCheckBox: this.props.hasCheckBox ?? false,
                activeRowRender: this.props.activeRowRender ?? false,
            });
        }
    }
    cellClick = () => { };
    handleResize = () => {
        if (this.grid.offsetWidth < this.minGridWidth && !this.state.setMinWidth) {
            this.setState({
                setMinWidth: true,
            });
        } else if (this.grid.offsetWidth > this.minGridWidth) {
            this.setState({
                gridCurrent: this.grid.offsetWidth,
                setMinWidth: false,
            });
        }
    };
    sortChange = (event) => {
        this.setState({
            sort: event.sort,
        });
        this.props.onSortChange(event.sort[0].field, event.sort[0].dir);
    };
    getData = (sort) => {
        return orderBy(this.props.data, sort);
    };

    onSelectionChange = (event) => {
        const selectedState = getSelectedState({
            event,
            selectedState: this.state.selectedState,
            dataItemKey: this.props.DATA_ITEM_KEY,
        });
        this.setState({
            selectedState,
        });
        event.dataItem = event.dataItems[event.endRowIndex];
        this.props.onSelectionChange(event);
        if (this.state.hasCheckBox) {
            let _selectedItems = "";
            const selectedItems = JSON.stringify(selectedState).split(",");
            selectedItems.forEach((element) => {
                if (element.split(":")[1].includes("true")) {
                    let itemId = element.split(":")[0].includes("{")
                        ? element.split(":")[0].replace("{", "")
                        : element.split(":")[0];
                    _selectedItems = _selectedItems + itemId + ",";
                }
            });
            this.props.getSelectedItems(_selectedItems);
        }
    };

    onKeyDown = (event) => {
        const selectedState = getSelectedStateFromKeyDown({
            event,
            selectedState: this.state.selectedState,
            dataItemKey: this.state.patientDataItemKey,
        });
        this.setState({
            selectedState,
        });
    };

    onHeaderSelectionChange = (event) => {
        const checkboxElement = event.syntheticEvent.target;
        const checked = checkboxElement.checked;
        const selectedState = {};
        this.props.data.forEach((item) => {
            selectedState[this.props.idGetter(item)] = checked;
        });
        this.setState({
            selectedState,
        });
    };
    setWidth = (minWidth) => {
        if (minWidth === undefined) minWidth = 0;
        // else minWidth = null;
        let width = this.state.setMinWidth
            ? minWidth
            : minWidth +
            (this.state.gridCurrent - this.minGridWidth) /
            this.props.columns.length;
        if (width > COLUMN_MIN) width -= ADJUST_PADDING;
        return width;
    };
     
    render() {
        let Columns = this.props.columns.sort((a, b) =>
            a.orderIndex > b.orderIndex ? 1 : -1
        );
        return <div id={this.props.id} style={{ width: "100%" }} onClick={this.closeEdit}>
            <Tooltip openDelay={100}>
                <Grid
                    rowRender={this.rowRender}
                    pager={this.Currentpager}
                    style={{
                        height: this.props.height ?? "400px",
                        width: this.props.width ?? "100%",
                    }}
                    id={this.props.id}
                    sortable={{ allowUnsort: false, mode: "single" }}
                    sort={this.state.sort}
                    resizable={true}
                    reorderable={true}
                    selectedField={SELECTED_FIELD}
                    selectable={{
                        enabled: true,
                        drag: this.state.dragEnabled,
                        cell: this.state.cellEnabled,
                        mode: this.state.selectionMode,
                    }}
                    cellClick={(event) => this.cellClick(event)}
                    navigatable={true}
                    filterable={this.state.filterable}
                    filter={this.state.filter}
                    onFilterChange={(e) => {
                        this.setState({
                            filter: e.filter,
                        });
                    }}
                    onHeaderSelectionChange={this.onHeaderSelectionChange}
                    onSortChange={this.sortChange}
                    onSelectionChange={(event) => this.onSelectionChange(event)}
                    // onKeyDown={(event) => this.props.isEditable != true && this.props.onKeyDown(event)}
                    onRowDoubleClick={(event) => this.props.onRowDoubleClick(event)}

                    data={
                        this.props.isEditable ?
                            this.props.data
                                ? this.props.data
                                    .slice(this.state.skip, this.state.take + this.state.skip)
                                    .map((item) => ({
                                        ...item,
                                        inEdit: item[this.props.editColumn] === this.state.editID
                                    }))
                                : []
                            :
                            this.props.data
                                ? this.props.data
                                    .slice(this.state.skip, this.state.take + this.state.skip)
                                    .map((item) => ({
                                        ...item,
                                        [SELECTED_FIELD]:
                                            this.state.selectedState[this.props.idGetter(item)],
                                    }))
                                : []
                    }

                    skip={this.state.skip}
                    take={this.state.take}
                    total={this.props.data ? this.props.data.length : 0}
                    pageable={true}
                    onPageChange={this.pageChange}
                    editField={"inEdit"}
                    onRowClick={this.props.isEditable && this.rowClick}
                    onItemChange={this.props.isEditable && this.itemChange}
                >
                    {/* {this.props.isEditable && (
                        <GridToolbar>
                            <div id="toolBar" onClick={this.closeEdit}>
                                <ButtonComponent
                                    type="edit"
                                    icon="edit"
                                    classButton="infraBtn-primary"
                                    onClick={this.addRecord}
                                >
                                    Add New
                                </ButtonComponent>
                            </div>
                        </GridToolbar>
                    )} */}
                    {this.state.hasCheckBox && (
                        <Column
                            field={SELECTED_FIELD}
                            width="50px"
                            headerSelectionValue={false}
                        />
                    )}
                    {Columns &&
                        Columns.map((column, index) => {
                            if (column.hide) return;

                            return (
                                <Column
                                    field={column.field}
                                    title={column.title}
                                    key={index}
                                    width={this.setWidth(column.minWidth)}
                                    cell={
                                        column.cell=="merge"? MergeCell:
                                        column.cell=="currency"?CurrencyGridCell:
                                        column.cell =="checkBox"? CheckBoxCell:
                                        column.cell == "dropDown" ?DropDownCell:
                                        column.type == "currency"
                                            ? CurrencyCell
                                            : column.iscellWithIcon
                                                ? cellWithIcon
                                                : column.isCustomCell 
                                                    ? this.MyCustomCell
                                                    : column.showToolTip && ColumnNameCell
                                    }
                                    editable={column.editable}
                                    editor={column.editor}
                                />
                            );

                        })
                    }
                </Grid>;
            </Tooltip>
        </div>
    }

    rowClick = event => {
        this.setState({
            editID: event.dataItem[this.props.editColumn]
        });
    };
    itemChange = event => {
        this.props.itemChange(event);
    };
    closeEdit = event => {
        if (event.target === event.currentTarget) {
            this.setState({
                editID: null
            });
        }
    };
    addRecord = () => {
        const {
            data
        } = this.state;
        const newRecord = {
            [this.props.editColumn]: data == null || data.length == 0 ? 1 : Math.max(...data.map(item => item[this.props.editColumn])) + 1

        };
        this.setState({
            data: [newRecord, ...data],
            editID: newRecord[this.props.editColumn]
        });
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableGrid);