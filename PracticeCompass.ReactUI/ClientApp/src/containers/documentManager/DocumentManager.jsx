import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ParseERAMessages } from "../../redux/actions/claimList";
import {GetFiles,GetFileContent} from "../../redux/actions/fileManager";
import { getter } from "@progress/kendo-react-common";
import EditableGrid from "../../components/editableGrid";
import TextEditor from "../../components/TextEditor";
import {documentColumns} from "./DocumentManagerData";
import DocumentManagerDialog from "./documentManagerDialog"

const DATA_ITEM_KEY_FILE_ID = "fileID";
const idGetterFileID = getter(DATA_ITEM_KEY_FILE_ID);

function mapStateToProps(state) {
  return {
       files : state.fileManager.files
  };
}

function mapDispatchToProps(dispatch) {
  return { 
    GetFiles:()=>dispatch(GetFiles()),
    GetFileContent:(path)=>dispatch(GetFileContent(path))
   };
}
class DocumentManager extends Component {

  state={
    documentColumns:documentColumns,
    content:"",
    refresh:true
  }
  async componentDidMount(){
   let files=await this.props.GetFiles();
   this.setState({files});
  }
  onFileGridSelectionChange = async (event) => {
    if(event.dataItem !=null){
      this.setState({refresh:false});
      let content= await this.props.GetFileContent(event.dataItem.path);
      this.setState({content,refresh:true});
    }
  }
  onFileDoubleGridSelectionChange = async (event) => {
      this.setState({showNote:true,fileRow:event.dataItem});
  }
  toggledocumentManagerDialog=( isProcessed,documentNote)=>{
    let fileIndex= this.state.files.findIndex(x=>x.fileName == this.state.fileRow.fileName);
    if(fileIndex>-1){
      this.state.files[fileIndex].isProcessed=isProcessed;
      this.state.files[fileIndex].notes=documentNote
    }
    this.setState({showNote:false,fileRow:null});
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
          {this.state.showNote &&(
            <DocumentManagerDialog
              row={this.state.fileRow}
              toggledocumentManagerDialog={this.toggledocumentManagerDialog}
            >
            </DocumentManagerDialog>
          )}
          <div style={{ float: "left", marginRight:"10px" }}>
            <EditableGrid
              id="eraFiles"
              columns={this.state.documentColumns}
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
              data={this.state.files || []}
              height="570px"
              width="470px"
              //hasCheckBox={true}
              sortColumns={[]}
              onSortChange={this.onSortChange}
              displayNoteDialog={this.displayNoteDialog}
            // pageChange={this.pageChange}
            ></EditableGrid>
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
export default connect(mapStateToProps, mapDispatchToProps)(DocumentManager);
