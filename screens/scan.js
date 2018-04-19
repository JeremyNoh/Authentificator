import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";

export default class Scan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }



  render() {
    return (
      <View style={styles.container}>
          <Text> ADD </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 10
  }
});
