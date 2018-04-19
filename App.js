import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StackNavigator } from 'react-navigation';

import {HomeScreen}  from './screens/home';


export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}

const RootStack = StackNavigator({
    home : {
      screen : HomeScreen
    }
})
