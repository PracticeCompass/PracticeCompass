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
export class MergeCell extends React.Component {
  localizedData = [{ value: "Accepted", text: "Accepted" }, { value: "Denied", text: "Denied" }, { value: "Zero Or Low Pay", text: "Zero Or Low Pay" }];
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
    let items = JSON.parse(this.props.field);
    let text="";
    for(let i=0;i<items.length;i++){
      if(dataItem[items[i].text]==null || dataItem[items[i].text]=="") continue;
       text=text+ dataItem[items[i].text]+" "+items[i].s+" ";
    }
    text= text.trimEnd().replace(/,\s*$/, "").replace(/\/$/, "");
    let columnStyle={};
    if(dataItem["type"]=="Charge"){
      columnStyle.borderTopWidth="3px";
      columnStyle.borderTopColor="black";
    }
    return (
      <td style={columnStyle}>
         {text}
      </td>
    )
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(MergeCell);