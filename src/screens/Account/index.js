import React, { Component } from "react";
import { StyleSheet, AsyncStorage, Image, View } from "react-native";
import {
    Container, Content, Button, Footer, FooterTab, Icon, ListItem, Left, Body, Right, Text, Header, Title
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import NextIcon from '../../assets/icon/next-icon.svg';
import styles from './AccountStyle';

console.disableYellowBox = true;


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
        };
      }

    componentDidMount = async () => {
        try {

            AsyncStorage.getItem('user', (error, result) => {
                if (result !== null) {
                    let resultParsed = JSON.parse(result)
                    this.setState({
                        name: resultParsed.username,
                    });
                }
             });

           
        } catch(err) {
            console.log(err)
        }
    }

    async removeItemValue() {
      try {
        // Mengahpus data kdari local storage
          await AsyncStorage.removeItem('user');
         alert('You have successfully logout')
      }
      catch(exception) {
        console.log(exception)
         alert('You failed to logout')
      }
  }

  render() {
    return (
      <Container style={styles.container}>
        
        <Content padder>
             <View style={styles.container}>
                  <View style={styles.header}></View>
                  <Image style={styles.avatar} source={require('../../assets/icon/avatar6.png')}/>
                  <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <Text style={styles.name}>{this.state.name}</Text>
                      <Text style={styles.info}>User</Text>
                      
                      
                      <TouchableOpacity style={styles.buttonContainer}  onPress={this.removeItemValue}>
                        <Text style={{color: 'white'}}>Logout</Text>  
                      </TouchableOpacity>              
                     
                    </View>
                </View>
             </View>
        </Content>
       <Footer style={styles.footertabicon}>
	          <FooterTab style={styles.footertabiconlist}>
	            <Button
	              onPress={() => this.props.navigation.navigate("Home")}
	            >
	              <Image source={require("../../assets/icon/home.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
	            </Button>
	            <Button onPress={() => this.props.navigation.navigate("History")}>
	              <Image source={require("../../assets/icon/history.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
	            </Button>
	            <Button light onPress={() => this.props.navigation.navigate("Account")}>
	             <Image source={require("../../assets/icon/account.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
	            </Button>
	          </FooterTab>
          </Footer>
      </Container>
    );
  }
}



export default Account;
