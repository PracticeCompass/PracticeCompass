import * as React from "react";
import { connect } from "react-redux";

import { DatePicker } from "@progress/kendo-react-dateinputs";
import {
  IntlProvider,
  load,
  LocalizationProvider,
} from "@progress/kendo-react-intl";

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}
class DatePickerComponent extends React.Component {
  render() {
    return (
      <LocalizationProvider language="en-US">
        <IntlProvider locale="en-US">
          <DatePicker
            className="unifyHeight"
            width={this.props.width}
            placeholder={this.props.placeholder}
            // defaultShow={this.props.defaultShow ?? true}
            disabled={this.props.disabled ?? false}
            defaultValue={this.props.value}
            value={this.props.value}
            format={this.props.format ? this.props.format : "mm/dd/yyyy"}
            onChange={this.props.onChange}
            weekNumber={this.props.weekNumber ?? true}
          />
        </IntlProvider>
      </LocalizationProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePickerComponent);
