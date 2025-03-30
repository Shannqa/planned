import React, { useContext, useEffect, useState, Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
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

const CustomMenu = (props) => {
  const { style, children, layouts, ...other } = props;
  const position = { top: 200, left: 200 };
  return (
    <View {...other} style={[style, position]}>
      {children}
    </View>
  );
};

export default class PopupMenu extends Component {
  /* Workaround for a current bug - onPress doesn't work in react navigation header menu. Need to trigger menu to open on onPressIn instead */
  constructor(props, ctx) {
    super(props, ctx);
    this.state = { opened: false };
  }

  onOptionSelect(value) {
    this.setState({ oepened: false });
  }
  onTriggerPress() {
    this.setState({ opened: true });
  }
  onBackdropPress() {
    this.setState({ opened: false });
  }
  selector() {
    console.log("select");
  }

  render({ bob }) {
    const { opened } = this.state;
    const [menuData, setMenuData] = useState([]);
    console.log(bob);
    return (
      <Menu
        renderer={CustomMenu}
        ref={this.onRef}
        opened={opened}
        onBackdropPress={() => this.onBackdropPress()}
        onSelect={(value) => this.onOptionSelect(value)}
      >
        <MenuTrigger
          style={styles.trigger}
          onPressIn={() => this.onTriggerPress()}
          customStyles={{
            triggerTouchable: { onPressIn: () => this.onTriggerPress() },
          }}
        >
          <Entypo name="dots-three-vertical" size={22} color="black" />
        </MenuTrigger>
        <MenuOptions>
          <FlatList
            data={menuData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // <Pressable
              <MenuOption onSelect={() => item.action()} text={item.label} />
              //   style={({ pressed }) => [
              //     pressed ? colors.menuPressed : colors.menuUnpressed,
              //     styles.menuItem,
              //   ]}
              //   onPress={() => item.action()}
              // >
              //   <Text style={styles.menuText}>{item.label}</Text>
              // </Pressable>
            )}
          />
          {/* <MenuOption onSelect={() => selector()} text="option" /> */}
        </MenuOptions>
        {/* <TouchableOpacity onPressIn={() => this.openMenu()}>
            <Text>Open please</Text>
          </TouchableOpacity> */}
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  trigger: {
    flex: 1,
  },
});
