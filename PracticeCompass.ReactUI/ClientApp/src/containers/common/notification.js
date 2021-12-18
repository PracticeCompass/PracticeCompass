import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Slide } from "@progress/kendo-react-animation";

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class NotificationComponent extends Component {
  state = {
    success: false,
    error: false,
    warning: false,
    info: false,
    none: false,
  };
  onClose =()=>{
    this.setState({
      success: false,
      error: false,
      warning: false,
      info: false,
      none: false,
    });
  }
  render() {
    return (
      <Fragment>
        <NotificationGroup
          style={{
            zIndex: 1000,
            right: 0,
            top: 0,
            alignItems: "flex-start",
            flexWrap: "wrap-reverse",
          }}
        >
          <Slide direction={this.props.success ? "up" : "down"}>
            {this.props.success && (
              <Notification
                type={{ style: "success", icon: true }}
                closable={true}
                onClose={() => this.onClose()}
              >
                <span>{this.props.message}</span>
              </Notification>
            )}
          </Slide>
          <Slide direction={this.props.error ? "up" : "down"}>
            {this.props.error && (
              <Notification
                type={{ style: "error", icon: true }}
                closable={true}
                onClose={() => this.onClose()}
              >
                <span>{this.props.message}</span>
              </Notification>
            )}
          </Slide>
          <Slide direction={this.props.warning ? "up" : "down"}>
            {this.props.warning && (
              <Notification
                type={{ style: "warning", icon: true }}
                closable={true}
                onClose={() => this.onClose()}
              >
                <span>{this.props.message}</span>
              </Notification>
            )}
          </Slide>
          <Slide direction={this.props.info ? "up" : "down"}>
            {this.props.info && (
              <Notification
                type={{ style: "info", icon: true }}
                closable={true}
                onClose={() => this.onClose()}
              >
                <span>{this.props.message}</span>
              </Notification>
            )}
          </Slide>
          <Slide direction={this.props.none ? "up" : "down"}>
            {this.props.none && (
              <Notification
                type={{ style: "none", icon: false }}
                closable={true}
                onClose={() => this.onClose()}
                style={{ overflow: "visible" }}
              >
                <span>{this.props.message}</span>
              </Notification>
            )}
          </Slide>
        </NotificationGroup>
      </Fragment>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationComponent);
