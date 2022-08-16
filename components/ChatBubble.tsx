import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../lark/colors";
import Avatar from "./Avatar";

interface ChatBubbleProps {
  text?: string;
  lark?: boolean;
  onPress?: () => void;
}

const ChatBubble = ({ lark = true, text, onPress }: ChatBubbleProps) => {
  const dynamicStyles = useMemo(
    () =>
      lark
        ? {
            wrapper: {},
            bubble: {
              backgroundColor: COLORS.white,
              marginLeft: 10,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
            },
            text: { color: COLORS.black },
          }
        : {
            wrapper: {
              justifyContent: "flex-end",
            },
            bubble: {
              backgroundColor: COLORS.green,
              borderTopLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            text: { color: COLORS.white },
          },
    [lark]
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, dynamicStyles.wrapper]}
    >
      {lark && <Avatar />}
      <View style={[styles.bubble, dynamicStyles.bubble]}>
        <Text style={dynamicStyles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  bubble: {
    paddingVertical: 10,
    marginBottom: 5,
    paddingHorizontal: 13,
    borderRadius: 15,
  },
});

export default ChatBubble;
