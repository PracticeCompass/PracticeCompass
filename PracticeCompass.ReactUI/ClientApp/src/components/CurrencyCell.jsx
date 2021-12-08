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
 currencyFormat(num,isNegative) {
     num= isNegative ? Number(num) * -1 : Number(num);
    return '$' +(isNegative ? '(' : '') + (Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')) +(isNegative ? ')' : '')
 }
  render() {
    const { dataItem } = this.props;
    const field = this.props.field || "";
    const dataValue = dataItem[field] === null ? "" : dataItem[field];
    let column = this.props.myProp.columns.find((x) => x.field == field);
    let columnStyle={ textAlign: "right"};
    let isNegative=false;
    if(dataValue < 0){
      columnStyle.color ="red";
      isNegative=true;
    }
    if (column.fontColor)columnStyle.color =column.fontColor;
    if(column.fontWeight) columnStyle.fontWeight=column.fontWeight;
    if(dataItem["type"]=="Charge"){
      columnStyle.borderTopWidth="3px";
      columnStyle.borderTopColor="black";
    }
    return (
      <td style={columnStyle}
      ref={(node) => {
        if (node) {
          node.style.setProperty("text-align", "right", "important");
          node.style.setProperty("padding-right", "5px", "important");
        }
      }}>
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
           (column.isEmptyZero && Number(dataValue)==0)?  '':
            (this.currencyFormat(dataValue,isNegative))
        )}
      </td>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyGridCell);
