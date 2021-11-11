import * as React from 'react';
import { connect } from "react-redux";
import { ComboBox } from '@progress/kendo-react-dropdowns';
function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
export class DropDownCell extends React.Component {
  localizedData = [{value:"Accepted",text:"Accepted"},{value:"Denied",text:"Denied"},{value:"Zero Or Low Pay",text:"Zero Or Low Pay"}];
  handleChange = e => {
    if (this.props.onChange) {
      this.props.onChange({
        dataIndex: 0,
        dataItem: this.props.dataItem,
        field: this.props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.value.value
      });
    }
  };

  render() {
    const {
      dataItem
    } = this.props;
    const field = this.props.field || '';
    const dataValue = dataItem[field] === null ? '' : dataItem[field];
    return <td>
            {dataItem.inEdit || this.props.editor == "edit" ? 
            
      <ComboBox style={{
        width: "180px"
      }} onChange={this.handleChange} value={this.localizedData.find(c => c.value === dataValue)} data={this.localizedData} textField="text" /> : dataValue?.toString()}
          </td>;
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DropDownCell);