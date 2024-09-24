import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons, FontAwesome } from "@expo/vector-icons"; // Expo vector icons

let lastTap = null;

const PostComponent = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false); // State to manage the like status
  const [likedComments, setLikedComments] = useState([]); // Manage liked comments
  const [commentText, setCommentText] = useState(""); // Manage new comment text
  const [comments, setComments] = useState(dummyComments); // State to store comments

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setLiked(!liked); // Toggle like status on double-tap
    } else {
      lastTap = now;
    }
  };

  const handleLikeComment = (id) => {
    setLikedComments((prevState) =>
      prevState.includes(id)
        ? prevState.filter((commentId) => commentId !== id)
        : [...prevState, id]
    );
  };

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        username: "new_user",
        comment: commentText,
        likes: 0,
        profilePic: "https://example.com/profile.png", // Add a default profile picture
      };
      setComments([newComment, ...comments]);
      setCommentText(""); // Clear input
    }
  };

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Ionicons name="person-circle-outline" size={40} color="black" />
        <Text style={styles.username}>cat_lover123</Text>
      </View>

      {/* Post Image (Double Tap to Like) */}
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.postImagePlaceholder}>
          <Text style={styles.postImageText}>Post Image</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Post Footer */}
      <View style={styles.postFooter}>
        <View style={styles.iconRow}>
          <TouchableOpacity>
            {/* Change the color of the like icon to green when liked */}
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "green" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Post Description */}
        <Text style={styles.description}>
          <Text style={styles.username}>cat_lover123 </Text>
          This is a description of the post. It's very similar to how Instagram
          shows it.
        </Text>
      </View>

      {/* Modal for Comments */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                {/* Profile Picture */}
                <Image
                  source={{ uri: item.profilePic }}
                  style={styles.profilePic}
                />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUsername}>{item.username}</Text>
                  </View>
                  <Text>{item.comment}</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity
                      onPress={() => handleLikeComment(item.id)}
                    >
                      <Ionicons
                        name={
                          likedComments.includes(item.id)
                            ? "heart"
                            : "heart-outline"
                        }
                        size={16}
                        color={
                          likedComments.includes(item.id) ? "red" : "black"
                        }
                      />
                    </TouchableOpacity>
                    <Text>
                      {likedComments.includes(item.id)
                        ? item.likes + 1
                        : item.likes}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.replyText}>Reply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          {/* Add Comment Section */}
          <View style={styles.addCommentContainer}>
            <TextInput
              style={styles.commentInput}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostComponent;

const dummyComments = [
  {
    id: 1,
    username: "user1",
    comment: "This is amazing!",
    likes: 2,
    profilePic: "https://example.com/user1.png",
  },
  {
    id: 2,
    username: "user2",
    comment: "So cute!",
    likes: 3,
    profilePic: "https://example.com/user2.png",
  },
];

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  postImagePlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  postImageText: {
    color: "#999",
    fontSize: 16,
  },
  postFooter: {
    padding: 10,
  },
  iconRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    width: 120,
  },
  description: {
    fontSize: 14,
  },
  bottomSheet: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  replyText: {
    marginLeft: 10,
    color: "#007AFF",
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
