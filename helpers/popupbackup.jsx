import React, { useContext, useEffect, useState, Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  withMenuContext,
  renderers,
} from "react-native-popup-menu";
import Entypo from "@expo/vector-icons/Entypo";

const Openner = (props) => (
  <Pressable
    onPressIn={() => {
      props.ctx.menuActions.openMenu("menu-1");
    }}
  >
    <Text>clickkk</Text>
  </Pressable>
);
const ContextOpenner = withMenuContext(Openner);

export default class PopupMenu extends Component {
  // selector() {
  //   console.log("11111");
  // }
  constructor(props) {
    super(props);
    this.state = {
      Touchable: Button,
    };
  }
  openMenu() {
    this.menu.open();
  }
  onRef = (r) => {
    this.menu = r;
  };

  render() {
    const { Touchable } = this.state;
    const buttonText = "select";

    return (
      <Menu name="menu-1" ref={this.onRef} onSelect={this.open}>
        <MenuTrigger
          text="OOOo"
          // onPress={}
          // customStyles={{
          //   // TriggerTouchableComponent: Button,
          //   triggerTouchable: { title: "aaa" },
          // }}
        />
        {/* <ContextOpenner /> */}
        {/* <Pressable onPressIn={() => this.onTriggerPress()}>
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </Pressable> */}
        {/* <Text>aaaa</Text> */}
        {/* <Entypo name="dots-three-vertical" size={22} color="black" /> */}

        <MenuOptions
          customStyles={{
            optionsWrapper: {
              position: "absolute",
              top: 100,
              right: 10,
              zIndex: 100,
            },
          }}
        >
          <MenuOption onSelect={() => selector()} text="option" />
        </MenuOptions>
        {/* <TouchableOpacity onPressIn={() => this.openMenu()}>
          <Text>Open please</Text>
        </TouchableOpacity> */}
      </Menu>
    );
  }
}
