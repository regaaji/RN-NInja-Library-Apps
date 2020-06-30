import React, { Component } from "react";
import axios from 'axios';
import { StyleSheet, Image } from "react-native";
import {
  Container,
  Header,
  Button,
  Icon,
  Item,
  Input,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Footer,
  FooterTab,
  Body,
  View,
  Spinner
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import randomColor from "randomcolor";
import styles from './HomeStyle'
import { AirbnbRating } from "react-native-ratings";
import { connect } from "react-redux";
//import {getSearch, getBooks, getGenre} from '../../utils/http';


import { 
  getAllBook, 
  getAllSearch, 
  getSortTitle, 
  getSortAuthor, 
  getSortGenre, 
  getPagination 
} from "../../redux/action/book";

const mapStateToProps = (book) => {
  return {
    book
  }
}

console.disableYellowBox = true;


class Home extends Component {


 constructor(props) {
        super(props);
        this.state = {
            library: [],
            libraryGenre: [],
            search: '',
            sortBy: "",
            page: "",
            limit: ""
        };
    }

    getBookData = async() => {
      

      await this.props.dispatch(getAllBook())
      this.setState({
     library: this.props.book.book.bookData.result
   })

      
    }  

   
  
   componentDidMount = () => {
      
        this.getBookData()
        // this.getGenreData()
    }


     
      
      
    handleSearch = async () => {
      const title = this.state.search;
      

      await this.props.dispatch(getAllSearch(title))  

       // console.log('book',this.props.book.bookData.result)
       this.setState({
          library: this.props.book.book.bookData.result
        })

            //console.log('ok', this.state.search)
      
    }

    render(){


    const {library, libraryGenre} = this.state;
        //console.log('library',library)
    return (
      <Container style={styles.container}>
        <Header searchBar rounded style={styles.headersearch}>
          <Text style={styles.title}>Ninja Libray App</Text>
          <Item style={styles.inputsearch}>
            <Button transparent  onPress={() => this.handleSearch()}>
             <Image source={require("../../assets/icon/search-icon.png")} style={{width: 20, height: 20,marginLeft: 10}} tintColor='#4B4C72'/>
            </Button>
            <Input placeholder="Search" 
            onChangeText={search => this.setState({ search })}
            value={this.state.search}
           
            />
          </Item>
        </Header>

        <Content padder showsVerticalScrollIndicator={false}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        
               

            
           <TouchableOpacity>
              <Card style={styles.cardcontainer}>
                <CardItem style={styles.carditemcontainer1}>
                  <Left>
                    <Text style={styles.cardtext}>chronicle</Text>
                  </Left>
                  <Image
                    style={styles.imagecard}
                    source={require("../../assets/images/genrebook.png")}
                    />
                 
                </CardItem>
              </Card>
            </TouchableOpacity>

             <TouchableOpacity>
              <Card style={styles.cardcontainer}>
                <CardItem style={styles.carditemcontainer2}>
                  <Left>
                    <Text style={styles.cardtext}>education</Text>
                  </Left>
                  <Image
                    style={styles.imagecard}
                    source={require("../../assets/images/genrebook.png")}
                    />
                 
                </CardItem>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.cardcontainer}>
                <CardItem style={styles.carditemcontainer3}>
                  <Left>
                    <Text style={styles.cardtext}>solace</Text>
                  </Left>
                  <Image
                    style={styles.imagecard}
                    source={require("../../assets/images/genrebook.png")}
                    />
                 
                </CardItem>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.cardcontainer}>
                <CardItem style={styles.carditemcontainer4}>
                  <Left>
                    <Text style={styles.cardtext}>fantasy</Text>
                  </Left>
                  <Image
                    style={styles.imagecard}
                    source={require("../../assets/images/genrebook.png")}
                    />
                 
                </CardItem>
              </Card>
            </TouchableOpacity>

          </ScrollView>
          <Text style={styles.titlestyle}>List Book</Text>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' , flex: 1 }}>
           
               {library ? (
              library.map((books, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.props.navigation.navigate("Viewbook", {
                      idbooks: books.id,
                      imagebooks: books.image,
                      titlebooks: books.title,
                      

                    })}
                  >
                    <Card noShadow style={{ margin: 15, width: 160 }} pointerEvents="none">
                      <CardItem style={styles.cardlistdowncontainer}>
                        <View>
                        <Image
                          source={{ uri: 'http://18.212.132.68:8001/images/'+books.image }}
                          style={styles.cardlistdown}
                        />
                        </View>
                      </CardItem>
                      <CardItem>
                        <Body>
                          <Text style={styles.titlebook}>{books.title.substring(0,8)}...</Text>
                          <AirbnbRating
                            style={{ margin: 0 }}
                            size={10}
                            showRating={false}
                            isDisabled={true}
                            reviews={false}
                          />
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Spinner color='blue' />
            )} 
             





            </View>
          </ScrollView>
        </Content>
        <Footer style={styles.footertabicon}>
          <FooterTab style={styles.footertabiconlist}>
            <Button
              light
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Image source={require("../../assets/icon/home.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("History")}>
              <Image source={require("../../assets/icon/history.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Account")}>
             <Image source={require("../../assets/icon/account.png")} style={{width: 25, height: 25}} tintColor='#4B4C72'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

// const colorBg = randomColor({
//   luminosity: "dark"
// });




export default connect(mapStateToProps)(Home);
