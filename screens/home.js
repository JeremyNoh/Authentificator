import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StackNavigator } from 'react-navigation';

export class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {  };
  }

  add = () => {
    console.log("add")
  };

  clear = () => {
    console.log("clear")
  };

    static navigationOptions = {
    title: 'Authentificator',
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonAdd} onPress={this.add}>
          <Text> ADD </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClear} onPress={this.clear}>
          <Text> CLEAR</Text>
        </TouchableOpacity>

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
  },
  buttonAdd: {
    alignItems: "center",
    backgroundColor: "#66ff99",
    padding: 10,
    marginBottom : 30,
    marginTop: 50,
  },
  buttonClear: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
  }
});
