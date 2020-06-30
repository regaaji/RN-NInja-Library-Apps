
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentbadge: {
    marginTop: 10,
    marginLeft: 20
  },
  textbadgeauthor: {
    color: 'black',
    fontSize: 20,
    marginLeft: 15,
    fontFamily: "Airbnb Cereal App",
  },
   textbadgestatus: {
    color: '#4B4C72',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 15,
     marginTop: 20,
     marginBottom: 10,
    fontFamily: "Airbnb Cereal App",
  },
  detailimage:  {
      width: '100%',
      height: 300,
      marginTop: -20,
      flex: 1,
      overlayColor: 'grey'
  },
  floatingimage: {
      position: 'absolute',
   
      borderRadius: 10,
      borderColor: '#999595',
      borderWidth: 2,
      height: 140,
      marginTop: 220,
      right: 50
  },
  description: {
      fontFamily: "Airbnb Cereal App",
      marginTop: 40,
      marginRight: 20,
      marginLeft: 20
  },
  title: {
      marginLeft: 20,
      position: 'absolute',
      fontFamily: "Airbnb Cereal App",
      color: 'white',
      marginTop: 250,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  rentbutton: {
      width: 200,
      marginTop: 75,
      backgroundColor: '#4B4C72'
  },
   ButtonSection: {
      justifyContent: 'center',
      alignItems: 'center'
   },
  textrent: {
      color: 'white',
      fontSize: 20,
      marginLeft: 25,
      fontFamily: "Airbnb Cereal App",
  },
  textreturn: {
    color: 'white',
    marginLeft: 30,
    fontFamily: "Airbnb Cereal App",
}
});

export default styles;