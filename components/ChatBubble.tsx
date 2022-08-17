import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../utils/colors";
import Avatar from "./Avatar";

interface ChatBubbleProps {
  text?: string;
  isIncoming?: boolean;
  onPress?: () => void;
}

const ChatBubble = ({ isIncoming = true, text, onPress }: ChatBubbleProps) => {
  const dynamicStyles = useMemo(
    () =>
      isIncoming
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
    [isIncoming]
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, dynamicStyles.wrapper]}
    >
      {isIncoming && <Avatar />}
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
