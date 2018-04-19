import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StackNavigator } from 'react-navigation';

import {HomeScreen}  from './screens/home';
import {ScanScreen}  from './screens/scan';
console.disableYellowBox = true ;

import { BarCodeScanner, Permissions } from 'expo';




export default class App extends React.Component {
  
  render() {
    return <RootStack />
  }
}

// const RootStack = StackNavigator({
//     home : {
//       screen : HomeScreen
//     },
//     scan : {
//       screen : ScanScreen,
//     },
//
// })

const RootStack = StackNavigator(
   {
       home: {
           screen: HomeScreen,
       },
       scan: {
           screen: ScanScreen,
       },
   },
   {
       mode: 'modal',
      //  headerMode: 'none',
   }
);
