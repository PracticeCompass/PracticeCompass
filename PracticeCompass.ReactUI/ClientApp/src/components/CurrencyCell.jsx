import * as React from "react";
import { connect } from "react-redux";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import TextBox from "./TextBox";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export class CurrencyGridCell extends React.Component {
  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange({
        dataIndex: 0,
        dataItem: this.props.dataItem,
        field: this.props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.value != null ? e.value : 0,
      });
    }
  };
 currencyFormat(num) {
    return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
  render() {
    const { dataItem } = this.props;
    const field = this.props.field || "";
    const dataValue = dataItem[field] === null ? "" : dataItem[field];
    let colorStyle={color:"black"};
    let column = this.props.myProp.columns.find((x) => x.field == field);
    if(dataValue < 0)colorStyle={color:"red"};
    if (column.fontColor)colorStyle={color:column.fontColor};
    let fontWeight={};
    if(column.fontWeight) fontWeight={fontWeight:column.fontWeight};
    return (
      <td style={{ textAlign: "right"},fontWeight,colorStyle}>
        {(dataItem.inEdit && column.editable!= false) ? (
          <TextBox
            type="numeric"
            format="c2"
            className="unifyHeight"
            defaultValue={0}
            value={dataValue ?? 0}
            onChange={this.handleChange}
          ></TextBox>
        ) : (
            this.currencyFormat(dataValue)
        )}
      </td>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyGridCell);
