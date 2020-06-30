import React, { Component } from "react";
import { StyleSheet,  Image } from "react-native";
import { AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Button,
  Footer,
  FooterTab,
  Icon,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Right,
  Left,
  Badge,
  Header,
  Body,
  Title,
  Spinner,
  View
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import {getHistory} from '../../utils/http';
import NextIcon from '../../assets/icon/next-icon.svg';
import styles from './HistoryStyle'
// import { getRent } from "../public/redux/action/books";
// import { connect } from "react-redux";

console.disableYellowBox = true;


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      number: '',
    };


   

  }
 

  componentDidMount = async () => {

     AsyncStorage.getItem('user').then((result) => {
        if(result){
             const data = JSON.parse(result);
            this.setState({number: data.id_user});
             const id_user = this.state.number;
              //console.log('data', this.state.number);
                getHistory(id_user)
                .then((response) => {

                  this.setState({
                     history: response.data.result,
                 })

                

              })
                .catch((error) => {
                  console.log(error.response.data.message)
                  
              })
        }
    });
     



    //this.getHistoryData()
    // this.setState({
    //   history: this.props.book.bookRent
    // });
  };

  render() {
    const {history} = this.state;
     //console.log('data_history', history)

      return (
        <Container style={styles.container}>
          
          <Content padder showsVerticalScrollIndicator={false}> 
                     
        
             
              {history &&
                    history.map((dataHistory, index) => (
                <TouchableOpacity
                key={index}
                 onPress={() => this.props.navigation.navigate("Viewbook", {
                      id_borrow: dataHistory.id_borrow,
                      idbooks: dataHistory.books_id,
                      imagebooks: dataHistory.name_image,
                      titlebooks: dataHistory.title,

                    })}
              >
                <Card>
                  <CardItem>
                    <Thumbnail
                      style={styles.floatingimage}
                      large
                     source={{ uri: 'http://18.212.132.68:8001/images/'+dataHistory.name_image }}
                      square
                    />
                     <View style={[{flexDirection:'column'}, styles.elementsContainer]}>

                          <View>
                                 <Text style={styles.cardtext}>{dataHistory.title.substring(0,8)}...</Text>
                          </View>



                              {dataHistory.status == 2 ? (
                             
                                <Text style={styles.badgetext}>BORROW BOOKS</Text>
                              
                                ): dataHistory.status == 1 ? (
                               
                                
                                <Text style={styles.badgetext}>RETURN BOOKS</Text>
                              
                                ): null}

                      </View>
                 
                    
                    <Right>
                      <NextIcon width={20} height={20} />
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity> 
              ))}
            

          </Content>
           <Footer style={styles.footertabicon}>
            <FooterTab style={styles.footertabiconlist}>
              <Button
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image source={require("../../assets/icon/home.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
              </Button>
              <Button light onPress={() => this.props.navigation.navigate("History")}>
                <Image source={require("../../assets/icon/history.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
              </Button>
              <Button onPress={() => this.props.navigation.navigate("Account")}>
               <Image source={require("../../assets/icon/account.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      )
    }
  }




// const mapStateToProps = state => {
//   return {
//     book: state.book
//   };
// };

// export default connect(mapStateToProps)(History);
export default History;
