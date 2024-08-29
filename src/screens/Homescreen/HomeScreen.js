import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy data for posts, tweets, and videos
const posts = [
  { id: "1", type: "post", content: "This is an Instagram-like post!" },
  { id: "2", type: "tweet", content: "This is a tweet-like content!" },
  { id: "3", type: "video", content: "This is a YouTube-like video!" },
];

const HomeScreen = () => {
  const renderItem = ({ item }) => {
    if (item.type === "post") {
      return <Text style={styles.postStyle}>{item.content}</Text>;
    } else if (item.type === "tweet") {
      return <Text style={styles.tweetStyle}>{item.content}</Text>;
    } else if (item.type === "video") {
      return <Text style={styles.videoStyle}>{item.content}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postStyle: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  tweetStyle: {
    padding: 10,
    margin: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
  },
  videoStyle: {
    padding: 10,
    margin: 10,
    backgroundColor: "#dcdcdc",
    borderRadius: 8,
  },
});
