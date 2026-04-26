import React, { useState, useEffect } from "react";
import { remove } from "firebase/database";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { auth, database } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { ref, set, get } from "firebase/database";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");

  const saveNote = async () => {
    await set(ref(database, "users/" + user.uid), { note });
    loadNote();
  };

  const loadNote = async () => {
    const snapshot = await get(ref(database, "users/" + user.uid));
    if (snapshot.exists()) {
      setSavedNote(snapshot.val().note);
    }
  };
  const deleteNote = async () => {
  await remove(ref(database, "users/" + user.uid));
  setSavedNote("");
  };
  const logout = () => {
    signOut(auth);
    navigation.replace("Login");
  };

  useEffect(() => {
    loadNote();
  }, []);

  return (
    <ImageBackground
  source={require("../assets/myimage.png")}
  style={styles.background}
  resizeMode="cover"
>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Hello 👋</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <TextInput
            placeholder="Write something..."
            placeholderTextColor="#ccc"
            style={styles.input}
            value={note}
            onChangeText={setNote}
          />

          <TouchableOpacity style={styles.button} onPress={saveNote}>
            <Text style={styles.buttonText}>Save Note</Text>
          </TouchableOpacity>

          <Text style={styles.saved}>Saved: {savedNote}</Text>
            <TouchableOpacity style={styles.logout} onPress={deleteNote}>
        <Text style={styles.logoutText}>Delete Note</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
  },
  container: {
    margin: 20,
    padding: 25,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  email: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  saved: {
    color: "#fff",
    marginTop: 15,
    textAlign: "center",
  },
  logout: {
    marginTop: 20,
  },
  logoutText: {
    color: "#FF6B6B",
    textAlign: "center",
    fontWeight: "bold",
  },
});
