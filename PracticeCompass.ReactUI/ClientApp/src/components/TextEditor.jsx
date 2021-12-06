import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FontName,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export class TextEditor extends React.Component {

  render() {

    return (
      <Editor
      tools={[
      ]}
      contentStyle={{
        height: 850,
      }}
      defaultContent={this.props.content}
    />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
