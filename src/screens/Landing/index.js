import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Button,
  Footer,
  FooterTab,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Right,
  Left,
  Badge,
  Header,
  Body,
  Title
} from "native-base"

// import SampleComponent from './pages/SampleComponent';
// import StylingComponent from './pages/StylingComponent';
// import FlexBox from './pages/FlexBox';
// import Position from './pages/Position';
// import PropsDinamis from './pages/PropsDinamis';
// import StateDinamis from './pages/StateDinamis';
// import Comunication from './pages/Comunication';

import image1 from '../../assets/images/register1.png';
import image2 from '../../assets/images/search1.png';
import image3 from '../../assets/images/reading1.png';

import styles from './LandingStyle'

const slides = [
  {
    key: '1',
    title: 'You Must Login',
    text: 'You must be a user if you want to \n access the application',
    image:  image1,
    backgroundColor: '#9785dc',
  },
  {
    key: '2',
    title: 'Find More Books',
    text: 'Enjoy many books with easier search',
    image: image2,
    backgroundColor: '#9785dc',
  },
  {
    key: '3',
    title: 'Let us Start',
    text: 'Are you ready then lets do it',
    image: image3,
    backgroundColor: '#9785dc',
  }
];


console.disableYellowBox = true;

export default class Landing extends Component {
 

   constructor(props){
    super(props);
      this.state = {
      showRealApp: false
    }
  }

  componentDidMount = async () => {
        try {

            AsyncStorage.getItem('user', (error, result) => {
                if (result) {
                   
                    this.props.navigation.navigate('Home')
                } else {
                    this.props.navigation.navigate('Landing')
                }
             });

           
        } catch(err) {
            console.log(err)
        }
    }


  _renderItem = ({ item }) => {
    return (
     <Container style={{backgroundColor: item.backgroundColor}}>
        <Content contentContainerStyle={styles.content}>
          <Text style={styles.textTitle}>{item.title}</Text>
         <Image source={item.image} style={{width: 200, height: 200}}/>
          <Text style={styles.textSubTitle}> {item.text}</Text>
        </Content>
      </Container>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    this.props.navigation.navigate('Login');
  }
  render() {
    if (this.state.showRealApp) {
      return <View style={styles.container}>
        <Text style= {styles.text}>
          You are Home!!
        </Text>


      </View>;
    } else {
      return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone} showSkipButton/>;       
    }
  }
}







