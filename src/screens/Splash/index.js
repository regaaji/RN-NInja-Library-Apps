import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
import Cover from '../../assets/images/cover.svg'
import styles from './SplashStyle'

const Splash = ({navigation}) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.replace('Landing');
		}, 3000);
	})
	return (
		<Container style={styles.container}>
		    <Content contentContainerStyle={styles.content}>
		    	<Cover width={200} height={200}/>
		    	<Text style={styles.textTitle}>Ninja Library App</Text>
		    	<Text style={styles.textSubTitle}> ~ keep an eye on your book collection</Text>
		    </Content>
		  </Container>
	)
}


export default Splash;