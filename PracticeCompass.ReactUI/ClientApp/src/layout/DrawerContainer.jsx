import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerItem,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { itemsList } from "./Items";
import logo from "../assets/images/logo.png";
import $ from "jquery";

const CustomItem = (props) => {
  const { visible, ...others } = props;
  const arrowDir = props["data-expanded"]
    ? "k-i-arrow-chevron-down"
    : "k-i-arrow-chevron-right";
  return (
    <React.Fragment>
      {props.visible === false ? null : (
        <DrawerItem {...others}>
          {props.visible === true && (
            <span
              style={{
                paddingLeft: "40px",
              }}
            />
          )}
          {props.icon && <span className={"k-icon " + props.icon} />}
          {props.img && (
            <div className="custom-toolbar" style={{ width: "213px" }}>
              <Button
                id="expandButton"
                icon="menu"
                look="flat"
                className="logoButton"
                onClick={props.handleClick}
              />
              <img
                className={"px-2 mr-md-auto"}
                style={{ height: "45px" }}
                src={logo}
              />
            </div>
          )}
          {!props.img && <span className={"k-item-text"}>{props.text}</span>}
          {props["data-expanded"] !== undefined && !props.img && (
            <span
              className={"k-icon " + arrowDir}
              style={{
                position: "absolute",
                right: 10,
              }}
            />
          )}
        </DrawerItem>
      )}
    </React.Fragment>
  );
};

class DrawerContainer extends Component {
  state = {
    expanded: true,
    items: itemsList,
  };
  componentDidMount() {
    var thisref = this;
    $("#expandButton").click(function (event) {
      thisref.handleClick();
    });
  }
  handleClick = () => {
    this.props.onexpand(!this.state.expanded);
    this.setState((e) => ({ expanded: !e.expanded }));
  };

  onSelect = (ev) => {
    const currentItem = ev.itemTarget.props;
    const isParent = currentItem["data-expanded"] !== undefined;
    const nextExpanded = !currentItem["data-expanded"];
    const newData = this.state.items.map((item) => {
      const {
        selected,
        ["data-expanded"]: currentExpanded,
        id,
        ...others
      } = item;
      const isCurrentItem = currentItem.id === id;
      return {
        selected: isCurrentItem,
        ["data-expanded"]:
          isCurrentItem && isParent ? nextExpanded : currentExpanded,
        id,
        ...others,
      };
    });
    this.setState({
      items: newData,
    });
    if (ev.itemTarget.props.id !== 0) {
      this.props.history.push(ev.itemTarget.props.route);
    }
  };
  render() {
    const data = this.state.items.map((item) => {
      const { parentId, ...others } = item;

      if (parentId !== undefined) {
        const parent = this.state.items.find(
          (parent) => parent.id === parentId
        );
        return { ...others, visible: parent["data-expanded"] };
      }
      return item;
    });
    return (
      <div>
        <Drawer
          expanded={this.state.expanded}
          mode="push"
          width={230}
          items={data}
          item={CustomItem}
          onSelect={this.onSelect}
        >
          {!this.state.expanded && (
            <div
              className="custom-toolbar"
              style={{ width: "50px", height: "104%" }}
            >
              <Button
                id="expandButton"
                icon="menu"
                look="flat"
                className="logoButton"
                onClick={this.handleClick}
              />
            </div>
          )}
          <DrawerContent>{this.props.children}</DrawerContent>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(DrawerContainer);
