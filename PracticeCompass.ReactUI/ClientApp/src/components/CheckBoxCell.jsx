import * as React from 'react';
import { connect } from "react-redux";
import { ComboBox } from '@progress/kendo-react-dropdowns';
import CheckboxComponent from "./Checkbox"
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
  };
}
export class CheckBoxCell extends React.Component {
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
    const column=  this.props.myProp.columns.filter(item=>item.field==field);
    return <td>
      <CheckboxComponent
        style={{ marginRight: "5px" }}
        label=""
        value={dataValue}
        // disabled={!dataItem.inEdit}
        onChange={this.handleChange}
      />
    </td>;
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxCell);