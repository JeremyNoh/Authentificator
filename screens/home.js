import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView , AsyncStorage , Platform, Alert} from 'react-native';
import { StackNavigator } from "react-navigation";
import ScanScreen from "./scan";
import  _  from "lodash" ;
import { connect } from 'react-redux'



 class HomeScreen extends React.Component {



  async componentWillMount(){
    console.log("componentWillMount")
    try {
      const result = await AsyncStorage.getItem('listing')
      if (result) {
        list  = JSON.parse(result) ;
        this.props.dispatch({type : 'QRCODE_INIT' , payload : {list} })
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
  //
  // _add = obj => {
  //   if(_.some(this.state.listing, obj )){
  //     alert(`Sorry the entry ${obj.label} already exist`)
  //
  //   } else {
  //
  //     this.setState({listing:[...this.state.listing, obj]}, () => {
  //       list = JSON.stringify(this.state.listing)
  //       console.log(list);
  //       this.pushItem(list)
  //
  //     });
  //   }
  //
  // };

  async removeItem(){
    try {
      console.log("sa supprime bien");

        await AsyncStorage.removeItem('listing');
      } catch (error) {
    }
  }


  clear = () => {
    this.props.dispatch({ type: 'CLEAR' })
    this.removeItem()
  };

  suppOne = id => {
    valuer = false
    Alert.alert(
            'Suppression',
            'Etes vous sur de vouloir supprimer cette entrée',
            [
              {text: 'Cansel',  valuer : true },

                {text: 'OK',  onPress: () => {
                  list = [...this.props.listing]
                  list.splice(id ,1)
                  const str = JSON.stringify(list)
                  AsyncStorage.setItem('listing' , str).then(() => {
                    this.props.dispatch({ type: 'ClearOne', payload : {list} })
                  })
                }},
            ],
            { cancelable: false }
        )





  };

  static navigationOptions = {
    title: "Authentificator"
  };

  render()
   {
       const list = this.props.listing.map((item , id ) => {
           console.log(item);
           return (
               <TouchableOpacity  key = {id} onPress={() => this.suppOne(id)}>
                   <Text style={styles.ListText}>
                       {item.secret} {item.label} {item.issuer}
                   </Text>
               </TouchableOpacity>
           )
       })

       return (
           <View style={styles.container}>
               <TouchableOpacity
                   style={styles.buttonAdd}
                   onPress={() =>
                       this.props.navigation.navigate("scan")
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
    // backgroundColor: "#fff",
    backgroundColor: Platform.OS === 'ios' ? "#ffffff"  : "#119199" ,
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



function mapStateToProps(state) {
  return {
    listing: state.listing
  }
}

export default connect(mapStateToProps)(HomeScreen)
