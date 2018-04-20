import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView , AsyncStorage} from 'react-native';
import { StackNavigator } from "react-navigation";
import { ScanScreen } from "./scan";
import  _  from "lodash" ;


export class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      listing: []
    };
  }

  async componentWillMount(){
    try {
      const result = await AsyncStorage.getItem('listing')
      if (result) {
        list  = JSON.parse(result) ;
        this.setState({listing:JSON.parse(result)});
      }
    } catch (e) {
      console.log(e);
    }
  }


  async pushItem(list){
    try {
        await AsyncStorage.setItem('listing',list);
      } catch (error) {
    }
  }

  _add = obj => {
    if(_.some(this.state.listing, obj )){
      alert(`Sorry the entry ${obj.label} already exist`)

    } else {
      this.setState({listing:[...this.state.listing, obj]}, () => {
        list = JSON.stringify(this.state.listing)
        console.log(list);
        this.pushItem(list)

      });


    }

  };

  clear = () => {
    this.setState({listing:[]});
    console.log("clear");
  };

  static navigationOptions = {
    title: "Authentificator"
  };

  render()
   {
       const list = this.state.listing.map((item , id ) => {
           console.log(item);
           return (
               <View  key = {id}>
                   <Text style={styles.ListText}>
                       {item.secret} {item.label} {item.issuer}
                   </Text>
               </View>
           )
       })

       return (
           <View style={styles.container}>
               <TouchableOpacity
                   style={styles.buttonAdd}
                   onPress={() =>
                       this.props.navigation.navigate("scan", {
                           add: this._add
                       })
                   }
               >
                   <Text> ADD </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttonClear} onPress={this.clear}>
                   <Text> CLEAR</Text>
               </TouchableOpacity>
               <ScrollView>{list}</ScrollView>


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
    marginBottom: 30,
    marginTop: 50
  },
  buttonClear: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10
  },
  ListText: {
    alignItems: "center",
    color: '#000000',
    backgroundColor: "#ffff66",
    marginTop : 10,
    padding: 10
}
});
