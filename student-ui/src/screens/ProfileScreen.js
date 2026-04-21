// src/screens/ProfileScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../Styles/globalStyles";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <View style={[globalStyles.container, { backgroundColor: "#f2f2f2" }]}>
      {/* Online profile image */}
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
        style={globalStyles.profileImage}
      />

      {/* Name input */}
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={text => setName(text)}
      />

      {/* Age input */}
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={age}
        onChangeText={text => setAge(text)}
      />

      {/* Live display */}
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Name: {name ? name : "—"}
      </Text>
      <Text style={{ fontSize: 18 }}>
        Age: {age ? age : "—"}
      </Text>

      {/* Confirm button */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 30 }]}
        onPress={() => Alert.alert("Profile Saved", `Name: ${name}\nAge: ${age}`)}
      >
        <Text style={globalStyles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}