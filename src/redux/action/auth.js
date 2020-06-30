 import {
    getAuthAction,
    getAuthRegister
} from "./actionTypes";
import {
  postLogin,
  postRegister
} from "../../utils/http";
import { AsyncStorage } from "react-native";


export const requestLogin = (body, props) => {
    return {
        type: getAuthAction,
        payload: postLogin(body)
          .then(res => {
                console.log('res', res.status)

                if (res.status === 200) {
                    alert('You have successfully logged in')
                   
                           let data = {
                                username: res.data.result.username,
                                id_user: res.data.result.id,
                            }

                            console.log('auth', data)

                            //console.log('data_login', JSON.stringify(data));
                            AsyncStorage.setItem('user', JSON.stringify(data));
                        props.navigate('Home')
                    
                }  

            })
    }
}

export const requestRegister = (body, props) => {
    return {
        type: getAuthRegister,
        payload: postRegister(body)
          .then(result => {
            if (result.status === 200) {
                alert("Register Success")
                try {
                    props.navigate('Login')
                } catch (error) {
                    console.log('a shit just happened')
                }
            }
        }).catch(error => {
            console.log(error)
        })

    }
}