import Axios from 'axios'
import qs from 'qs'

const URL_STRING = 'http://18.212.132.68:8001/books/'
const URL_API = 'http://18.212.132.68:8001/book/'



export const getBooks = () => {
	// const requestData = {
 //        search,sortBy, page,limit
 //    }
    // console.log(qs.stringify(requestData))
	return Axios.get(`${URL_STRING}`, {
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded' 
        }    
    })
}


export const getSearch = (title) => {	
	return Axios.get(`${URL_STRING}?search=${title}`, {
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded' 
        }    
    })
}


export const getGenre = () => {	
	return Axios.get(`${URL_API}genres`)
}


export const getDetailBooks = (id) => {
    console.log(id)
    return Axios.get(`${URL_STRING}${id}`, {
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded' 
        }    
    })
}


export const postRegister = (body) => {
    const data = new URLSearchParams()
    data.append('name', body.name)
    data.append('username', body.username)
    data.append('password', body.password)
    data.append('role', body.role)
    return Axios.post(`${URL_API}auth/register`, data, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const postLogin = (body) => {
    const data = new URLSearchParams()
    data.append('username', body.textUsername)
    data.append('password', body.textPassword)
    return Axios.post(`${URL_API}auth/login`, data, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}


export const getHistory = (id_user) => {    
    return Axios.get(`${URL_API}authors/history/${id_user}`, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const borrowBooks = (body) => {
    const data = new URLSearchParams()
    data.append('status', body.borrow)
    return Axios.put(`${URL_STRING}borrow/${body.id}`, data, {
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded' 
        }    
    })
}

export const postBorrowBook = (body) => {
    const data = new FormData()
    
    data.append('books_id', body.books_id)
    data.append('user_id', body.number)
    data.append('name_image', body.image)
    data.append('title', body.title)
    data.append('status', body.statusBorrow)

    return Axios.post(`${URL_STRING}borrow`, data, {
        headers: {
              'content-type': 'application/x-www-form-urlencoded'
        }
    })

}


export const putBorrowBooks = (body) => {
    const data = new FormData()
    console.log("body",body);   
    data.append('books_id', body.books_id)

    return Axios.put(`${URL_STRING}/borrowHistory/${body.id_borrow}`, data, {
        headers: {
              'content-type': ' multipart/form-data'
        }
    })
}