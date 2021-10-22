import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { RadioButton } from "@progress/kendo-react-inputs";

class RadioButtonComponent extends React.Component {
  render() {
    var i = i + 1;
    return (
      <div>
        {this.props.items &&
          this.props.items.map((item) => {
            return (
              <div key={item.value} style={this.props.type=="horizontal"?{float:"left",marginLeft:"15px"}:{}}>
                <RadioButton
                  className="userInfoLabel"
                  name={this.props.name}
                  value={item.value}
                  checked={this.props.selectedValue == item.value}
                  label={item.label}
                  onChange={this.props.handleChange}
                />
                <br></br>
              </div>
            );
          })}
      </div>
    );
  }
} 
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioButtonComponent);
