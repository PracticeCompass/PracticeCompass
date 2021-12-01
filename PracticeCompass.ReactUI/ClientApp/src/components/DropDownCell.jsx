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
  detailsData = [{
    value:"Physician Responsibility",text:"Physician Responsibility"},
    {value:"Move responsibility to the next level. Secondary/tertiary insurance or patient.",text:"Move responsibility to the next level. Secondary/tertiary insurance or patient."},
    {value:"Patient responsibility",text:"Patient responsibility"},
    {value:"Manual Processing",text:"Manual Processing"},
  ];  
  charageData= [{
    value:"Accepted",text:"Accepted"},
    {value:"Rejected",text:"Rejected"}
  ];
  handleChange = e => {
    if (this.props.onChange) {

      this.props.onChange({
        dataIndex: 0,
        dataItem: this.props.dataItem,
        field: this.props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.value?.value
      });
    }
  };

  render() {
    const {
      dataItem
    } = this.props;
    const field = this.props.field || '';
    const dataValue = dataItem[field] === null ? '' : dataItem[field];
    const Items=dataItem["type"]=="Charge"? this.charageData:this.detailsData;
    const itemStyle=dataItem["type"]=="Charge"?{backgroundColor:"blue"}:{};
    return <td style={itemStyle}>
            {dataItem.inEdit || this.props.editor == "edit" ? 
            
      <ComboBox style={{
        width: "300px",height:"18px"
      }} onChange={this.handleChange} value={Items.find(c => c.value === dataValue)} data={Items} textField="text" /> : dataValue?.toString()}
          </td>;
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DropDownCell);