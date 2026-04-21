import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles } from "../Styles/globalStyles";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent:"center", alignItems:"center" }}>
        <Text style={[globalStyles.title, { color:"white" }]}>Student App</Text>

        <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate("Profile")}>
          <Text style={globalStyles.buttonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate("Settings")}>
          <Text style={globalStyles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate("Contact")}>
          <Text style={globalStyles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}