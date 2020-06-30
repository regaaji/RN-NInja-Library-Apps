
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    footertabicon: {
        backgroundColor: 'white'
    },
    footertabiconlist: {
        backgroundColor: 'white',
    },
    homeicon: {
        color: "#4B4C72"
    },
    historyicon: {
        color: "#4B4C72"
    },
    accounticon: {
        color: "#4B4C72"
    },
    headerset: {
        backgroundColor: 'white'
    },
    titleset: {
        color: "#4B4C72",
        fontFamily: "Airbnb Cereal App",
        fontSize: 25,
    },
    backbutton: {
        color: "#4B4C72",
    },



  container: {
    marginTop: -30,
  },
   header:{
    backgroundColor: "#4B4C72",
    height:200,
    marginLeft: -30,
    marginRight: -30
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#4B4C72",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:30,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#4B4C72",
  },
});

export default styles;