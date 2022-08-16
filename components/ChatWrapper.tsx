import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import COLORS from "../lark/colors";

const conversation: Conversations = require("../lark/conversation.json");
import ChatBubble from "./ChatBubble";

const DELAY = 1.5 * 1000;

const ChatWrapper = () => {
  const [activeChats, setActiveChats] = useState<ConversationNode[]>([]);
  const [buttons, setButtons] = useState<ConversationNode[]>([]);
  const [currentNodeIds, setCurrentNodeIds] = useState<string[]>([
    conversation.startNodeId,
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const addChatsByCurrentNodeIds = useCallback(async (nodeIds: string[]) => {
    const newChats = nodeIds.map((nId) => conversation.nodes[nId]);
    const isButton = newChats.reduce(
      (bool, chat) => bool || chat?.input?.type === "button",
      false
    );

    const nextIds = newChats.reduce(
      (ids, chat) => [...ids, ...chat.childrenIds],
      [] as string[]
    );
    if (isButton) {
      setButtons(newChats);
      return;
    }
    setActiveChats((existingChats) => [...existingChats, ...newChats]);
    setCurrentNodeIds(nextIds);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      addChatsByCurrentNodeIds(currentNodeIds);
      setLoading(false);
    }, DELAY);
  }, [currentNodeIds.join("")]);

  const handleButtonPress = useCallback(
    (nodeIds: string[], chatText) => () => {
      setCurrentNodeIds(nodeIds);
      setActiveChats((chats) => [
        ...chats,
        { text: chatText, childrenIds: [], lark: false },
      ]);
      setButtons([]);
    },
    []
  );

  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        contentContainerStyle={styles.flatlistWrapper}
        style={styles.flatlist}
        data={activeChats}
        itemLayoutAnimation={Layout.springify()}
        renderItem={({ item }) => {
          if (!item) return null;
          return (
            <ChatBubble
              text={item?.input?.text ?? item?.text}
              lark={item?.lark}
            />
          );
        }}
        ListFooterComponent={
          loading ? <ActivityIndicator color={COLORS.white} /> : null
        }
      />
      <Animated.FlatList
        data={buttons}
        contentContainerStyle={styles.buttonListWrapper}
        style={styles.buttonList}
        renderItem={({ item }) => (
          <ChatBubble
            onPress={handleButtonPress(item.childrenIds, item?.input?.text)}
            text={item?.input?.text}
            lark={false}
          />
        )}
        scrollEnabled={false}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 25,
    justifyContent: "space-between",
  },
  flatlistWrapper: {
    alignItems: "stretch",
  },
  flatlist: { flex: 1 },
  buttonListWrapper: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonList: { flexGrow: 0 },
});

export default ChatWrapper;
