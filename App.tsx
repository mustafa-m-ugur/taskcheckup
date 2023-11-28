import React, { useState } from "react";
//import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import AuthNavigation from "./src/navigation/AuthNavigation";

function App() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default App;