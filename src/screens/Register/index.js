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
import { Keyboard, KeyboardAvoidingView, Platform,  TouchableWithoutFeedback,  SafeAreaView, Image,  ScrollView, StyleSheet, TextInput, View } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Col, Grid } from "react-native-easy-grid";
import {postRegister} from '../../utils/http';
import { connect } from 'react-redux';
import { requestRegister } from '../../redux/action/auth';
import styles from './RegisterStyle';


const mapStateToProps = (auth) => {
  return {
    auth
  }
}

console.disableYellowBox = true;


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      role: 1,
      password: "",
      errorUser: '',
      errorPassword: '',
    };
  }

   validUsernameRegex = username => {

      var re =  RegExp(/([a-z])\w+/g);

      return re.test(username);

    }


  
     validPasswordRegex = password => {

      var ga =  /^([a-zA-Z0-9_-]){8,16}$/;

      return ga.test(password);

    }

  handleRegister = async event => {
   
    // if (
    //   this.state.username == "" ||
    //   this.state.name == "" ||
    //   this.state.password == "" 
    // ) {
    //   alert("Please fill all column")
    // } else {
    //   const { name, username, password, role } = this.state;
      
    //   await postRegister({name, username,password, role})
    //   .then((response) => {
    //     this.setState({
    //       response: response.data.result
    //     })
    //     alert('Data successfully added');
    //     this.props.navigation.navigate('Login')
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //                 // alert('You failed to Register')
    //   })
    //   // await this.props.dispatch(userRegister(username, password));

    // }



    if (
       this.state.username == "" ||
      this.state.name == "" ||
      this.state.password == "" 
    ) {
      alert("Please fill all column")
    } else {
      
            if (this.state.errorUser && this.state.errorPassword  === 1) {

                alert('Failed Register');
            } else {

                   const { name, username, password, role } = this.state;

                   const body = {
                    name,
                    username,
                    password,
                    role,
                  }



                  this.props.dispatch(requestRegister(body, this.props.navigation))
            }

    }
  }
    
  render() {
     const {errorUser, errorPassword} = this.state;
    return (
       <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <ScrollView showsVerticalScrollIndicator={false}>
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
                              style={styles.input3} 
                              placeholder='Name' 
                               maxLength={20} 
                               onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                            />


                          <TextInput 
                              style={styles.input1} 
                              placeholder='Username' 
                               onChangeText={(username) => {
                                this.setState({username},()=>{

                                  if (!this.validUsernameRegex(this.state.username)) {

                                    this.setState({errorUser: 1});

                                  } else {
                                    this.setState({errorUser: 2});
                                  }

                                })

                              }}
                                value={this.state.username}
                            />

                           {errorUser === 1 && 
                           <Text style={{color: 'red', marginLeft: 20, marginTop: 5}}>Username must be lowercase!</Text>}
                            
                            <TextInput 
                              style={styles.input2} 
                              placeholder='Password' 
                              secureTextEntry 
                                maxLength={16} 
                                 onChangeText={(password) => {
                                   this.setState({password},()=>{

                                  if (!this.validPasswordRegex(this.state.password)) {

                                    this.setState({errorPassword: 1});

                                  } else {
                                    this.setState({errorPassword: 2});
                                  }

                                })

                              }}
                                value={this.state.password}
                            />

                            {errorPassword === 1 && 
                             <Text style={{color: 'red', marginLeft: 20, marginTop: 5}}>Password must be 8 characters long!</Text>}
                           
                            <View style={styles.btnContainer}>
                                <Button style={{ borderRadius: 25,}} onPress={this.handleRegister} ><Text style={{textAlign: 'center', marginLeft: 120}}>Sign Up</Text></Button>

                            </View>
                            <Text style={{ color: '#4B4C72', fontFamily: "Airbnb Cereal App",  marginLeft: 25, marginTop: 20}}>You already have an account,</Text>
                              <Button transparent style={{marginLeft: 217, marginTop: -35}} onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ color: '#4B4C72', fontFamily: "Airbnb Cereal App", textDecorationLine:'underline' }}>Sign In</Text>
                            </Button>
                            <View style={{ flex : 1 }} />
                        </View>
                         </ScrollView>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
    );
   
  }
}



export default connect(mapStateToProps)(Register)

