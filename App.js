import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { StackNavigator } from 'react-navigation';

import HomeScreen  from './screens/home';
import ScanScreen  from './screens/scan';
console.disableYellowBox = true ;

import { BarCodeScanner, Permissions } from 'expo';
import { Provider } from 'react-redux'
import { createStore } from 'redux'



const initial_state = {
  listing: []
}

function reducer(prev_state = initial_state, action) {
  switch (action.type) {

    case 'QRCODE_INIT' :
      return Object.assign({}, prev_state , {
          listing: action.payload.list
        })

    case 'CLEAR' :
      return Object.assign({}, prev_state , {
          listing: []
        })
    case 'ADD' :
      return Object.assign({}, prev_state , {
          listing:action.payload.list
      })
    case 'ClearOne' :
      return Object.assign({}, prev_state , {
          listing:action.payload.list
      })


  }
  return prev_state
}

const store = createStore(reducer)





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


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
      <RootStack />
      </Provider>
    )
  }
}
