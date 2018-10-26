import {
   SIGNUP_START,
   SIGNUP_FAIL,
   SIGNUP_SUCCESS,
   LOGIN_START,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   ACTIVE_USERS,
   ACTIVE_FAIL,
   CLEAR_AUTH,
   CLEAR_AUTH_ERROR,
   CLEAR_ACTIVE_USER,
   CHAT_MESSAGE
} from '../types'

import api from '../api'
import axios from 'axios'




export const initiateLogin = ({username:UserName,password}) => {
     
    return async(dispatch) => {

        try{
            console.log(UserName)
            
             dispatch({
                 type : LOGIN_START
             })

             if(!UserName || !password){
                 dispatch({
                     type : LOGIN_FAIL,
                     payload : {
                        errorType: 'login' , 
                        errorLog: 'Please fill all the required fields.',
                        errorMessage : 'Please fill all the required fields.'
                     }
                 })
             }

             const res = await axios.post(api('loginUrl'),{UserName,password})

             console.log(res);
             const {username , name,_id} = res.data.user
             
             dispatch({
                 type : LOGIN_SUCCESS,
                 payload : {
                      username,name,_id
                 }
             })


        }catch(e){
            let errorMessage = 'Please connect to the internet and try again.'
            if(e.response && e.response.status === 401){
                errorMessage = 'Incorrect Email or password.'
            }

            dispatch({
                type:LOGIN_FAIL,
                payload: { 
                    errorType: 'login' , 
                    errorLog: e.response && e.response.data,
                    errorMessage
                }
                
            })
        }
    }
}


export const clearAuthUser = ({username}) => {
    return async(dispatch) => {
   
        try{
             
            const res = await axios.post(api('clearAuth'),{username})
            console.log(res)
            dispatch({
                    type : CLEAR_AUTH,
                    payload:{
                        errorLog :'',
                        errorMessage:'',
                        errorType:''
                    }
            })
           
  }catch(e){
                let errorMessage = 'Please connect to the internet and try again.'
                if(e.response && e.response.status === 500){
                    errorMessage = 'error while login-out'
                }

                dispatch({
                    type: CLEAR_AUTH_ERROR,
                    payload: { 
                        errorType: 'login-out' , 
                        errorLog: e.response && e.response.data,
                        errorMessage
                    }
                    
                })
  }

}}


//retrive online user

export const getAllActiveUser = () => {
     return async(dispatch) => {
        
        try{

            dispatch({
                type : CLEAR_ACTIVE_USER
            })

            const res = await axios.get(api('getAllActiveUser'))
            console.log('105',res)

            const {allActiveUsers} = res.data.users

            dispatch({
                 type : ACTIVE_USERS,
                 payload : {
                     allActiveUsers
                 }
            })



        }catch(e){

            let errorMessage = 'something wrong'
            if(e.response && e.response.status === 401){
                errorMessage = 'no active user'
            }

            dispatch({
                type : ACTIVE_FAIL,
                payload : {
                    errorType : 'active-search',
                    errorLog : e,
                    errorMessage 
                }
            })

        }

     }
}

export const getUserChat = ({_id}) => {

    return async(dispatch) => {

          try{
                console.log(_id)
                const res = await axios.post(api('getUserChat'),{_id})
                console.log('166',res)
               
                dispatch({
                    type : CHAT_MESSAGE,
                    payload : {

                    }
                })

          }catch(e){
            let errorMessage = 'something wrong'
            if(e.response && e.response.status === 401){
                errorMessage = 'no active user'
            }
            console.log(errorMessage)  
            
          }

    }

}

export const initiateSignup = ({username,password,name}) => {
    
    return async(dispatch) => {


        try{
                dispatch({
                    type:SIGNUP_START
                }) 

                if(!username || !password || !name){
                    dispatch({
                        type : SIGNUP_FAIL,
                        payload : {
                            errorType: 'signup' , 
                            errorLog: 'Please fill all the required fields.',
                            errorMessage : 'Please fill all the required fields.'
                        }
                    })
                }

                if(!validateEmail(username)){
                    dispatch({
                        type : SIGNUP_FAIL,
                        payload : {
                            errorType: 'signup' , 
                            errorLog: 'Invalid email',
                            errorMessage : 'invalid email'
                        }
                    })
                }

                if(password.length < 8) {
                    dispatch({
                        type : SIGNUP_FAIL,
                        payload : {
                            errorType: 'signup' , 
                            errorLog: 'Password must be atleast 8 characters.',
                            errorMessage : 'Password must be atleast 8 characters.'
                        }
                    })
                }

               const res = await axios.post(api('signupUrl'),{
                   username,password,name
               })

               console.log(res)

               dispatch({
                   type : SIGNUP_SUCCESS
               })

            }catch(e){
                console.log(e.response)
                let errorMessage = e.response.data.message || 'Could not signup.Please try again.'

                dispatch({
                    type:SIGNUP_FAIL,
                    payload: {
                        errorType: 'signup' , 
                        errorLog: e.response.data,
                        errorMessage
                    }
                    
                })
}
    }

}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}