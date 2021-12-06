import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ParseERAMessages } from "../../redux/actions/claimList";
import {GetFiles,GetFileContent} from "../../redux/actions/ERA";
import { getter } from "@progress/kendo-react-common";
import GridComponent from "../../components/Grid";
import TextEditor from "../../components/TextEditor";
import {ERAColumns} from "./ERAData"

const DATA_ITEM_KEY_FILE_ID = "fileID";
const idGetterFileID = getter(DATA_ITEM_KEY_FILE_ID);

function mapStateToProps(state) {
  return {
       files : state.era.files
  };
}

function mapDispatchToProps(dispatch) {
  return { 
    ParseERAMessages: () => dispatch(ParseERAMessages()),
    GetFiles:()=>dispatch(GetFiles()),
    GetFileContent:(path)=>dispatch(GetFileContent(path))
   };
}
class ERA extends Component {
  componentDidMount() {
    this.props.ParseERAMessages();
  }
  state={
    ERAColumns:ERAColumns,
    content:"",
    refresh:true
  }
  componentDidMount(){
   this.props.GetFiles();
  }
  onFileGridSelectionChange = async (event) => {

  }
  onFileDoubleGridSelectionChange = async (event) => {
    if(event.dataItem !=null){
      this.setState({refresh:false});
      let content= await this.props.GetFileContent(event.dataItem.filePath);
      this.setState({content,refresh:true});
    }
  }
  render() {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            width: "100%",
          }}
        >
          <div style={{ float: "left", marginRight:"10px" }}>
            <GridComponent
              id="eraFiles"
              columns={this.state.ERAColumns}
              skip={0}
              take={24}
              onSelectionChange={
                this.onFileGridSelectionChange
              }
              onRowDoubleClick={
                this.onFileDoubleGridSelectionChange
              }
              // getSelectedItems={this.getSelectedClaims}
              // selectionMode="multiple"
              DATA_ITEM_KEY="fileID"
              idGetter={idGetterFileID}
              data={this.props.files || []}
              height="570px"
              width="470px"
              //hasCheckBox={true}
              sortColumns={[]}
              onSortChange={this.onSortChange}
            // pageChange={this.pageChange}
            ></GridComponent>
          </div>
          <div style={{ float: "left", width: "100%" }}>
            { this.state.refresh &&(
               <TextEditor content={this.state.content}></TextEditor>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ERA);
