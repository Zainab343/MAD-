import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("Registered!"))
      .catch((e) => alert(e.message));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace("Home"))
      .catch((e) => alert(e.message));
  };

  return (
    <ImageBackground
  source={require("../assets/myimage.png")}
  style={styles.background}
  resizeMode="cover"
>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonOutline} onPress={register}>
            <Text style={styles.buttonOutlineText}>Register</Text>
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
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
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
  buttonOutline: {
    borderColor: "#6C63FF",
    borderWidth: 2,
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonOutlineText: {
    color: "#6C63FF",
    textAlign: "center",
    fontWeight: "bold",
  },
});