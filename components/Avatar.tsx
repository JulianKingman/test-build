import React from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "../utils/colors";

const AVATAR_SIZE = 20;

const Avatar = () => <View style={styles.avatar} />;

const styles = StyleSheet.create({
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    backgroundColor: COLORS.grey,
  },
});

export default Avatar;
