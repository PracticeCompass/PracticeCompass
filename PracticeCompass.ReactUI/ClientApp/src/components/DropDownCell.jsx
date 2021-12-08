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
    value:"Accepted,Apply all",text:"Accepted, Apply all"},
    {value:"Denied because of contract",text:"Denied because of contract"},
    {value:"Zero or low pay",text:"Zero or low pay"},
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
    let itemStyle={};
    if(dataItem["type"]=="Charge"){
      if(dataValue=="Accepted,Apply all"){
        itemStyle={backgroundColor:"green",borderTopWidth:"3px",borderTopColor:"black"};
      }
      else if(dataValue=="Denied because of contract"){
        itemStyle={backgroundColor:"red",borderTopWidth:"3px",borderTopColor:"black"};
      }else if(dataValue=="Zero or low pay"){
        itemStyle={backgroundColor:"yellow",borderTopWidth:"3px",borderTopColor:"black"};
      }else{
        itemStyle={borderTopWidth:"3px",borderTopColor:"black"}
      }
    }


    return <td style={itemStyle}>
            {dataItem.inEdit || this.props.editor == "edit" ? 
            
      <ComboBox style={{
        width: "100%",height:"18px"
      }} onChange={this.handleChange} value={Items.find(c => c.value === dataValue)} data={Items} textField="text" /> : dataValue?.toString()}
          </td>;
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DropDownCell);