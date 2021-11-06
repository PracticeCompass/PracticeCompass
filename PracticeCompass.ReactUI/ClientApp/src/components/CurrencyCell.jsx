import * as React from 'react';
import { connect } from "react-redux";
import { ComboBox } from '@progress/kendo-react-dropdowns';
import TextBox from "./TextBox"
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
  };
}
export class CurrencyGridCell extends React.Component {
  handleChange = e => {
    if (this.props.onChange) {
      this.props.onChange({
        dataIndex: 0,
        dataItem: this.props.dataItem,
        field: this.props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.value
      });
    }
  };

  render() {
    const {
      dataItem
    } = this.props;
    const field = this.props.field || '';
    const dataValue = dataItem[field] === null ? '' : dataItem[field];
    return <td style={{textAlign:"right"}}>
      {dataItem.inEdit?
      <TextBox
        type="numeric"
        format="c2"
        className="unifyHeight"
        value={dataValue}
        onChange={this.handleChange}
      ></TextBox>:"$"+dataValue?.toString()}

    </td>;
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyGridCell);