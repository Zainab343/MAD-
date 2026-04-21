import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { globalStyles } from "../Styles/globalStyles";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[globalStyles.container, { backgroundColor: darkMode ? "#333" : "#fff" }]}>
      <Text style={{ fontSize: 22, color: darkMode ? "#fff" : "#000", marginBottom: 20 }}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </Text>
      <Switch value={darkMode} onValueChange={setDarkMode} />
    </View>
  );
}