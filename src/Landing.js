import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Landing({ navigation }) {
  const [name, setName] = useState(null);

  const handleChangeText = async (name) => {
    setName(name);
    try {
      const value = JSON.stringify(name);
      await AsyncStorage.setItem("name", value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readUser();
  }, []);

  const readUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("name");
      const parseValue = JSON.parse(jsonValue);
      console.log(parseValue);
      if (parseValue) {
        navigation.navigate("Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnPress = async () => {
    if (!name) {
      alert("Name cannot be empty");
    } else {
      try {
        const value = JSON.stringify(name);
        await AsyncStorage.setItem("name", value);
        navigation.navigate("Home");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Please enter your name</Text>
      <TextInput
        style={styles.textInputstyle}
        onChangeText={handleChangeText}
        value={name}
      />
      <Button title="Submit" onPress={handleOnPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputstyle: {
    width: "90%",
    height: 40,
    borderBottomWidth: 1,
  },
  textStyle: {
    fontSize: 20,
  },
});
