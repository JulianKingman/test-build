import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatBubble from "./components/ChatBubble";
import ChatWrapper from "./components/ChatWrapper";

const gradientProps = {
  colors: ["#9cc9f2", "#d0a8aa", "#f27e3f", "#f27e3f"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient {...gradientProps} style={StyleSheet.absoluteFill} />
      <ChatWrapper />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
