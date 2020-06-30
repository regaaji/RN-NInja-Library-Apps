import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, AsyncStorage } from "react-native";
import {
  Container, Content, Thumbnail, H1, Button, H2, View, Spinner, Badge
} from "native-base";
import Arrow from '../../assets/icon/Back-Icon.png'
import {getDetailBooks, postBorrowBook, borrowBooks, putBorrowBooks} from '../../utils/http';

// import { connect } from "react-redux";
// import { rentBook, returnBook, getBooks } from "../public/redux/action/books";
// import NavigationService from "../components/Navigationservice";

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
            // window.location.reload()

          // toast.success('You have successfully returned the book')
            
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
            <Content>
              <View>
                <Image style={styles.detailimage} source={{ uri: 'http://6b5e44c77101.ngrok.io/images/'+books.image }} />
              </View>
              <View>
              
                <Badge primary style={styles.contentbadge}>
                  <Text style={styles.textbadge}>{books.statusbook}</Text>
                </Badge>
                {books.statusbook == 'Available' ? (
                  <Badge info style={styles.contentbadge}>
                    <Text style={styles.textbadge}>{books.statusbook}</Text>
                  </Badge>
                ): (
                
                <Badge warning style={styles.contentbadge}>
                  <Text style={styles.textbadge}>{books.statusbook}</Text>
                </Badge>
                )}
              </View>
            </Content>
                <Thumbnail style={styles.floatingimage} large square source={{ uri: 'http://f1a8dda07a77.ngrok.io/images/'+books.image }} />
                <H1 style={styles.title}>{books.title.substring(0,12)}...</H1>
                <Text style={styles.date}>{books.date_released}</Text>
            <Content style={styles.description}>
                <Text>{books.description}</Text>
            </Content>
            {books.statusbook == 'Available' ? (
            
             <View style={styles.ButtonSection}>
              <Button rounded warning style={styles.rentbutton} onPress={this.handleBorrow}>
                  <H2 style={styles.textrent}>BORROW</H2>
              </Button>
            </View>
            ): books.statusbook !== 'Available' ? (
           
             <View style={styles.ButtonSection}>
              <Button rounded danger style={styles.rentbutton} onPress={this.handleReturn}>
                  <H2 style={styles.textrent}>RETURN</H2>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentbadge: {
    marginTop: 10,
    marginLeft: 20
  },
  textbadge: {
    color: 'white',
    fontFamily: "Airbnb Cereal App",
  },
  detailimage:  {
      width: '100%',
      height: 300,
      flex: 1,
      overlayColor: 'grey'
  },
  floatingimage: {
      position: 'absolute',
      resizeMode: 'contain',
      borderRadius: 10,
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
      marginTop: 75
  },
   ButtonSection: {
      justifyContent: 'center',
      alignItems: 'center'
   },
  textrent: {
      color: 'white',
      marginLeft: 50,
      fontFamily: "Airbnb Cereal App",
  },
  textreturn: {
    color: 'white',
    marginLeft: 30,
    fontFamily: "Airbnb Cereal App",
}
});

export default Viewbook;
