import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import {
  NumericTextBox,
  Input,
  MaskedTextBox,
} from "@progress/kendo-react-inputs";
import "../assets/style/global.css";
import NumberFormat from "react-number-format";
import { Tooltip } from "@progress/kendo-react-tooltip";
function mapStateToProps() {
  return {};
}
function mapDispatchToProps() {
  return {};
}
const GetItemHtml = (items) => {
  let props = items.props;
  if (props.type == "maskedTextBox") {
    return (
      <NumberFormat
        format={props.format}
        value={props.value ?? ""}
        mask={props.mask}
        className="unifyHeight"
        placeholder={props.placeholder}
        
        onChange={props.onValueChange}
      />
    );
  } else if (props.type == "masked") {
    return (
      <MaskedTextBox
        className="unifyHeight"
        mask={props.mask}
        value={props.value ?? ""}
        readonly={props.readonly ?? false}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    );
  } else if (props.type == "numeric") {
    return (
      <NumericTextBox
        className="unifyHeight"
        defaultValue={props.value}
        format={props.format ?? "n2"}
        spinners={false}
        min={0}
        value={props.value ?? 0}
        maxLength={props.max}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    );
  } else if (props.type == "toolTip") {
    return (
      <Tooltip>
        <Input
          className="unifyHeight"
          valid={props.valid ?? true}
          type={props.type}
          id={props.id}
          value={props.value ?? ""}
          disabled={props.disabled ?? false}
          maxLength={props.max}
          onChange={props.onChange}
          onBlur={props.onBlur}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
        />
      </Tooltip>
    );
  } else {
    return (
      <Input
        className="unifyHeight"
        valid={props.valid ?? true}
        type={props.type}
        id={props.id}
        value={props.value ?? ""}
        disabled={props.disabled ?? false}
        maxLength={props.max}
        onChange={props.onChange}
        onBlur={props.onBlur}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
      />
    );
  }
};
class TextBox extends Component {
  componentDidMount() {
    var _ = this;
    $("#" + this.props.id).keypress(function (event) {
      if (event.which == 13 && _.props.onEnterPress != null) {
        _.props.onEnterPress();
      }
    });
  }
  render() {
    return (
      <Fragment>
        <GetItemHtml props={this.props}></GetItemHtml>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
