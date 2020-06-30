import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, AsyncStorage } from "react-native";
import {
  Container, Content, Thumbnail, H1, Button, H2, View, Spinner, Badge
} from "native-base";
import BackIcon from '../../assets/icon/back-icon.svg';
import styles from './ViewbookStyle';
import {getDetailBooks, postBorrowBook, borrowBooks, putBorrowBooks} from '../../utils/http';

// import { connect } from "react-redux";
// import { rentBook, returnBook, getBooks } from "../public/redux/action/books";
// import NavigationService from "../components/Navigationservice";

console.disableYellowBox = true;


class Viewbook extends Component {


 constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.idbooks,
            books_id: this.props.route.params.idbooks,
            id_borrow: this.props.route.params.id_borrow,
            image: this.props.route.params.imagebooks,
            title: this.props.route.params.titlebooks,
            statusBorrow: 1,
            statusReturn: 2,
            borrow:  "borrow",
            library: [],
            number: ''
        };


        AsyncStorage.getItem('user').then((result) => {
        if(result){
             const data = JSON.parse(result);
            this.setState({number: data.id_user});
            
             
        }
    });
    }

   handleBorrow = async event => {
    

     const { id, borrow} = this.state;
    await borrowBooks({id, borrow})
    .then((response) => {
      this.setState({
        response: response.data.result
      })
            // alert('You have successfully borrowed  book')

            // window.location.reload()
            alert('You have successfully borrowed  book');
            
          })
    .catch((error) => {
      console.log(error)
    })

     const {
            books_id,
            number,
            title,
            image,
            statusBorrow
        } = this.state;

    const body = {
            books_id,
            number,
            title,
            image,
            statusBorrow
        };

    console.log('body', body)

     await postBorrowBook((body))
        .then((response) => {

            //console.log('borrow', response)
             //alert('You have successfully borrowed  book');
             this.props.navigation.navigate('Home')
            
        })
        .catch((error) => {
            console.log(error)
        })

    // await this.props.dispatch(rentBook(idbooks))
    // NavigationService.navigate('History')
  }
  handleReturn = async event => {
    event.preventDefault();

        const {
            id_borrow,
            books_id
        } = this.state;

        const body = {
            id_borrow,
            books_id
        };

        await putBorrowBooks(body)
        .then((response) => {
            this.setState({
                response: response.data.result
            })

            
            alert('You have successfully returned the book')
            this.props.navigation.navigate('Home')
            
            
        })
        .catch((error) => {
            console.log(error)
        })


    // const idbooks = this.props.navigation.getParam('idbooks');
    // await this.props.dispatch(returnBook(idbooks));
    // NavigationService.navigate('History')
  }

   getBookData = async() => {
      // const {search, sortBy, page, limit} = this.state
     const id = this.state.id;
     console.log('idoleh', id)
        await getDetailBooks(id)
        .then((response) => {

          this.setState({
             library: response.data.result,
         })
      })
        .catch((error) => {
          console.log(error.response.data.message)
          
      })
    }  

 componentDidMount = () => {
      
        this.getBookData()

    }


  render() {
    const {library} = this.state;
       console.log('library', library) 
return (

      <Container style={styles.container}>  
        {library ? (
          library.map((books, index) => {
            if (books.id == this.props.route.params.idbooks) {
              return(
        <Content padder key={index}>
           
              <View style={{marginRight: -20, marginLeft: -20}}>
                <Image style={styles.detailimage} source={{ uri: 'http://18.212.132.68:8001/images/'+books.image }} />
                 <Button transparent style={{position: 'absolute'}} onPress={() => this.props.navigation.navigate('Home')}>
                    <BackIcon width={30} height={30} style={{ marginLeft: 20,    backgroundColor: ' rgba(0, 0, 0, 0.5)', borderRadius: 50, borderColor: 'rgba(0, 0, 0, 0.5)'}}  fill={"white"}/>
                  </Button>
              </View>
              <View>
              
               

                {books.statusbook == 'Available' ? (
                  
                    <Text style={styles.textbadgestatus}>{books.statusbook}</Text>
                  
                ): (
                
                  <Text style={styles.textbadgestatus}>{books.statusbook}</Text>
                )}
              </View>


                  <Text style={styles.textbadgeauthor}>{books.author}</Text>
                
                <Thumbnail style={styles.floatingimage} large square source={{ uri: 'http://18.212.132.68:8001/images/'+books.image }} />
                <H1 style={styles.title}>{books.title.substring(0,10)}...</H1>
                
            <Content style={styles.description}>
                <Text>{books.description}</Text>
            </Content>
            {books.statusbook == 'Available' ? (
            
             <View style={styles.ButtonSection}>
              <Button rounded style={styles.rentbutton} onPress={this.handleBorrow}>
                  <H2 style={styles.textrent}>BORROW BOOKS</H2>
              </Button>
            </View>
            ): books.statusbook !== 'Available' ? (
           
             <View style={styles.ButtonSection}>
              <Button rounded style={styles.rentbutton} onPress={this.handleReturn}>
                  <H2 style={styles.textrent}>RETURN BOOKS</H2>
              </Button>
            </View>

            ): null}

        </Content>
        )
      }
    })
  ): <Spinner color="blue" /> }
      </Container>

    );
      
    
  };
}



export default Viewbook;
