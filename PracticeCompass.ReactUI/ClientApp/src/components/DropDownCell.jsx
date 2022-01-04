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
  GroupCode=[{value: 'CO', text: 'CO'},
  {value: 'PR', text: 'PR'},
  {value: 'CR', text: 'CR'},
  {value: 'OA', text: 'OA'},
  {value: 'PI', text: 'PI'}];
  ReasonCode=[{value:'45' ,text:'45'},
  {value:'2' ,text:'2'},
  {value:'253' ,text:'253'},
  {value:'3' ,text:'3'},
  {value:'23' ,text:'23'},
  {value:'237' ,text:'237'},
  {value:'1' ,text:'1'},
  {value:'29' ,text:'29'},
  {value:'16' ,text:'16'},
  {value:'252' ,text:'252'},
  {value:'144' ,text:'144'},
  {value:'22' ,text:'22'},
  {value:'59' ,text:'59'},
  {value:'97' ,text:'97'},
  {value:'B7' ,text:'B7'},
  {value:'18' ,text:'18'},
  {value:'197' ,text:'197'},
  {value:'96' ,text:'96'},
  {value:'163' ,text:'163'},
  {value:'45' ,text:'45'},
  {value:'284' ,text:'284'},
  {value:'107' ,text:'107'},
  {value:'8' ,text:'8'},
  {value:'109' ,text:'109'},
  {value:'150' ,text:'150'},
  {value:'226' ,text:'226'},
  {value:'198' ,text:'198'},
  {value:'204' ,text:'204'},
  {value:'27' ,text:'27'},
  {value:'242' ,text:'242'},
  {value:'227' ,text:'227'},
  {value:'15' ,text:'15'},
  {value:'55' ,text:'55'},
  {value:'A1' ,text:'A1'},
  {value:'50' ,text:'50'},
  {value:'129' ,text:'129'},
  {value:'131' ,text:'131'},
  {value:'31' ,text:'31'},
  {value:'151' ,text:'151'},
  {value:'133' ,text:'133'},
  {value:'100' ,text:'100'},
  {value:'24' ,text:'24'},
  {value:'206' ,text:'206'},
  {value:'192' ,text:'192'},
  {value:'216' ,text:'216'},
  {value:'236' ,text:'236'},
  {value:'137' ,text:'137'},
  {value:'187' ,text:'187'},
  {value:'4' ,text:'4'},
  {value:'26' ,text:'26'},
  {value:'200' ,text:'200'},
  {value:'243' ,text:'243'},
  {value:'223' ,text:'223'},
  {value:'94' ,text:'94'},
  {value:'B16' ,text:'B16'},
  {value:'209' ,text:'209'}]
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
    let Items=[];
    //dataItem["type"]=="Charge"? this.charageData:this.detailsData;
    let column= this.props.myProp.columns.find(x=>x.field == field);
    let selectedColumn= column.Items;
    if(dataItem["type"]=="Charge") Items=this.charageData;
    else if(selectedColumn=="ReasonCode") Items=this.ReasonCode;
    else if(selectedColumn=="GroupCode") Items=this.GroupCode;
    else Items=this.detailsData;

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