import React, { Component } from "react";
import {
  Container,
  Text,
  Form,
  Item,
  Label,
  Input,
  Thumbnail,
  Button,
  Icon
} from "native-base";
import {  Keyboard, KeyboardAvoidingView, Platform,  TouchableWithoutFeedback,  SafeAreaView, Image,  ScrollView, StyleSheet, TextInput, View } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Col, Grid } from "react-native-easy-grid";
import { AsyncStorage } from "react-native"
import { connect } from 'react-redux';
//import {postLogin} from '../../utils/http';

import { requestLogin } from '../../redux/action/auth';
import styles from './LoginStyle';


const mapStateToProps = (auth) => {
  return {
    auth
  }
}

console.disableYellowBox = true;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      textUsername: '',
      textPassword: '',
      errorUser: '',
      errorPassword: ''
    };

   
  }


   componentDidMount = async () => {
        try {

            AsyncStorage.getItem('user', (error, result) => {
                if (result) {
                   
                    this.props.navigation.navigate('Home')
                } else {
                    this.props.navigation.navigate('Login')
                }
             });

           
        } catch(err) {
            console.log(err)
        }
    }

    validUsernameRegex = textUsername => {

      var re =  RegExp(/([a-z])\w+/g);

      return re.test(textUsername);

    }


  
     validPasswordRegex = textPassword => {

      var ga =  /^([a-zA-Z0-9_-]){8,16}$/;

      return ga.test(textPassword);

    }


  handleLogin = async event => {

    
    if (
      this.state.textUsername == "" ||
      this.state.textPassword == ""
    ) {
      alert("Please fill all column")
    } else {
      
            if (this.state.errorUser && this.state.errorPassword  === 1) {

                alert('Failed Login');
            } else {

                   const {textUsername, textPassword} = this.state

                   const body = {
                    textUsername,
                    textPassword,
                  }



                  this.props.dispatch(requestLogin(body, this.props.navigation))
            }

          
            

    }
  }

  
    
  render() {
    const {errorUser, errorPassword} = this.state;
    console.log('valid', errorPassword)
    return (

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                             <Text
                                style={{
                                  paddingTop: 20,
                                  paddingBottom: 10,
                                  fontSize: 40,
                                  marginLeft: 10,
                                  color: "#4B4C72",
                                  fontFamily: "Airbnb Cereal App"
                                }}
                              >
                                Here To Get Welcomed !
                              </Text>
                          <TextInput 
                              style={styles.input1} 
                              placeholder='Username' 
                               onChangeText={(textUsername) => {
                                this.setState({textUsername},()=>{

                                  if (!this.validUsernameRegex(this.state.textUsername)) {

                                    this.setState({errorUser: 1});

                                  } else {
                                    this.setState({errorUser: 2});
                                  }

                                })

                              }}
                                value={this.state.textUsername}
                            />

                           {errorUser === 1 && 
                           <Text style={{color: 'red', marginLeft: 20, marginTop: 5}}>Username must be lowercase!</Text>}
                            
                            <TextInput 
                              style={styles.input2} 
                              placeholder='Password' 
                              secureTextEntry 
                                maxLength={16} 
                                 onChangeText={(textPassword) => {
                                   this.setState({textPassword},()=>{

                                  if (!this.validPasswordRegex(this.state.textPassword)) {

                                    this.setState({errorPassword: 1});

                                  } else {
                                    this.setState({errorPassword: 2});
                                  }

                                })

                              }}
                                value={this.state.textPassword}
                            />

                            {errorPassword === 1 && 
                             <Text style={{color: 'red', marginLeft: 20, marginTop: 5}}>Password must be 8 characters long!</Text>}
                           
                            <View style={styles.btnContainer}>
                                <Button style={{ borderRadius: 25,}} onPress={this.handleLogin} ><Text style={{textAlign: 'center', marginLeft: 120}}>Sign In</Text></Button>

                            </View>
                            <Text style={{ color: '#4B4C72', fontFamily: "Airbnb Cereal App",  marginLeft: 35, marginTop: 20}}>You don't have an account,</Text>
                              <Button transparent style={{marginLeft: 215, marginTop: -35}} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ color: '#4B4C72', fontFamily: "Airbnb Cereal App", textDecorationLine:'underline' }}>Sign Up</Text>
                            </Button>
                            <View style={{ flex : 1 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
    );

  
   
  }
}



export default connect(mapStateToProps)(Login)