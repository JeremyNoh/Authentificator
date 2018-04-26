import React from 'react';
import {StyleSheet, Text, View, Alert, head, Button} from 'react-native';
import {Constants, BarCodeScanner, Permissions} from 'expo';
import { connect } from 'react-redux';
import  _  from "lodash" ;


class ScanScreen extends React.Component {

    state = {
        hasCameraPermission: null,
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = ({data}) => {

      // const {state, goBack } = this.props.navigation
        // Alert.alert(
        //     'Scan successful!',
        //     JSON.stringify(data)
        // );
        // console.log(data)




        let findElement =  data.match(/^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)/);
        label = findElement[1]
        secret =  findElement[2]
        issuer =  findElement[3]

        const obj =  {
          label,
          secret,
          issuer
        }

        if(_.some(this.props.listing, obj )){
            alert(`Sorry the entry ${obj.label} already exist`)

          } else {
            this.props.dispatch({type : 'ADD' , data : obj})

            // this.setState({listing:[...this.state.listing, obj]}, () => {
            //   list = JSON.stringify(this.state.listing)
            //   console.log(list);
            //   this.pushItem(list)
            //
            // });
          }


        this.props.navigation.goBack() ;



    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{height: 200, width: 200}}
                        />
                }
                <Text> {this.props.secret}  {this.props.label}  {this.props.issuer} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    buttonAdd: {
        alignItems: 'center',
        backgroundColor: '#8bc900',
        padding: 10,
        marginBottom: 30,
        marginTop: 50
    },
});


function mapStateToProps(state) {
  return {
    listing: state.listing
  }
}

export default connect(mapStateToProps)(ScanScreen)
